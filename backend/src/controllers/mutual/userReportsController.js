const reportModel = require('../../models/reportModel');

// create a new report
const createReport = async (req, res) => {
    try {
        const { reporterId, providerId, reportType, reason } = req.body;
        const newReport = new reportModel({
            reporterId,
            providerId,
            reportType,
            reason
        });
        await newReport.save();
        res.status(201).json({ message: 'Report created successfully', report: newReport });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createReport };
