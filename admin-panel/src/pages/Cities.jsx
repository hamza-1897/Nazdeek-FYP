
import React, { useState, useEffect } from 'react';
import { addCity, getAllCities, editCity, deleteCity } from '../api/adminApi';
import CityHeader from '../components/common/CityHeader';
import CityTable from '../components/common/CityTable';
import CityModal from '../components/common/CityModal';

export default function Cities() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCity, setEditingCity] = useState(null);
  const [formData, setFormData] = useState({ name: '', isActive: true });

  const fetchCities = async () => {
    try {
      setLoading(true);
      const res = await getAllCities();
      const data = res?.data || res;
      setCities(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const handleOpenAddModal = () => {
    setEditingCity(null);
    setFormData({ name: '', isActive: true });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (city) => {
    setEditingCity(city);
    setFormData({
      name: city.name || '',
      isActive: city.isActive !== undefined ? city.isActive : true,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      setSubmitting(true);
      if (editingCity) {
        await editCity(editingCity._id, formData);
        await fetchCities();
        setEditingCity(null);
        setFormData({ name: '', isActive: true });
        setIsModalOpen(false);
        alert("City updated successfully!");
      } else {
        await addCity(formData);
        await fetchCities();
        alert("City added successfully!");
        setIsModalOpen(false);
      }

      setIsModalOpen(false);
      setFormData({ name: '', isActive: true });
    } catch (error) {
      const apiError = error.response?.data?.message || "Failed to save city.";
      console.error("Error saving city:", apiError);
      alert(apiError);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCity = async (cityId) => {
    if (!cityId) return;

    if (window.confirm("Are you sure you want to delete this city?")) {
      try {
        const res = await deleteCity(cityId);

        setCities((prevCities) =>
          prevCities.filter((c) => c._id !== cityId)
        );

        alert(res?.message);
        fetchCities();

      } catch (error) {
        const apiError =
          error.response?.data?.message || "Failed to delete city.";
        console.error("Error deleting city:", apiError);
        alert(apiError);
      }
    }
  };

  return (
    <div className="p-8 max-w-7xl w-full mx-auto space-y-6">
      <CityHeader onOpenAddModal={handleOpenAddModal} />

      <CityTable
        cities={cities}
        loading={loading}
        onOpenEditModal={handleOpenEditModal}
        onDeleteCity={handleDeleteCity}
      />

      <CityModal
        isOpen={isModalOpen}
        isEditing={!!editingCity}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onClose={() => setIsModalOpen(false)}
        submitting={submitting}
      />
    </div>
  );
}