
const cityModel = require('../../models/cityModel');
const providerModel = require('../../models/providerModel');

const getAllCities = async (req, res) => {
    try {
        const cities = await cityModel.find().lean();

        const citiesWithCounts = await Promise.all(
            cities.map(async (city) => {
                const providersCount = await providerModel.countDocuments({ city: city._id });
                return {
                    ...city,
                    providers: providersCount
                };
            })
        );

        res.status(200).json({
            success: true,
            data: citiesWithCounts
        });
    } catch (error) {
        console.error("Error fetching cities:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

// Add New City
const addCity = async (req, res) => {
  try {
    const { name } = req.body;

    const existingCity = await cityModel.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, 'i') },
    });

    if (existingCity) {
      return res.status(400).json({
        success: false,
        message: 'City with this name already exists.',
      });
    }

    const newCity = new cityModel({
      name: name.trim(),
    });

    await newCity.save();

    return res.status(201).json({
      success: true,
      message: 'City added successfully!',
      city: newCity,
    });
  } catch (error) {
    console.error('Error in addCity:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to add city.',
      error: error.message,
    });
  }
};

// Edit City
const editCity = async (req, res) => {
    try {
        const { cityId } = req.params;
        const { name, isActive } = req.body;

        const city = await cityModel.findById(cityId);
        if (!city) {
            return res.status(404).json({
                success: false,
                message: 'City not found.',
            });
        }

        if (name && name.trim()) {
            const trimmedName = name.trim();

            const existingCity = await cityModel.findOne({
                _id: { $ne: cityId },
                name: { $regex: new RegExp(`^${trimmedName}$`, 'i') },
            });

            if (existingCity) {
                return res.status(400).json({
                    success: false,
                    message: 'Another city with this name already exists.',
                });
            }

            city.name = trimmedName;
        }

        if (isActive !== undefined) {
            city.isActive = isActive;
        }

        await city.save();

        return res.status(200).json({
            success: true,
            message: 'City updated successfully!',
            city,
        });
    } catch (error) {
        console.error('Error in editCity:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to update city.',
            error: error.message,
        });
    }
};

// Delete City
const deleteCity = async (req, res) => {
  try {
    const { cityId } = req.params;
    const city = await cityModel.findByIdAndDelete(cityId);

    if (!city) {
      return res.status(404).json({
        success: false,
        message: 'City not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'City deleted successfully!',
    });
  } catch (error) {
    console.error('Error in deleteCity:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete city.',
      error: error.message,
    });
  }
};

module.exports = { addCity, getAllCities, editCity, deleteCity };