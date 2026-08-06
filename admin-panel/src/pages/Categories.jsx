import React, { useState, useEffect } from 'react';
import { addCategory, getAllCategories, editCategory , deleteCategory } from '../api/adminApi';
import CategoryHeader from '../components/common/CategoryHeader';
import CategoryTable from '../components/common/CategoryTable';
import CategoryModal from '../components/common/CategoryModal';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await getAllCategories();
      const data = res?.data || res;
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenAddModal = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '' });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (category) => {
    setEditingCategory(category);
    setFormData({ 
      name: category.name || '', 
      description: category.description || '' 
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      setSubmitting(true);
      if (editingCategory) {
        await editCategory(editingCategory._id, formData);
        await fetchCategories();
        setEditingCategory(null);
        setFormData({ name: '', description: '' });
        setIsModalOpen(false);
        alert("Category updated successfully!");
      } else {
        await addCategory(formData);
        await fetchCategories();
        alert("Category added successfully!");
        setIsModalOpen(false);
      }

      setIsModalOpen(false);
      setFormData({ name: '', description: '' });
    } catch (error) {
      const apiError = error.response?.data?.message || "Failed to save category.";
    console.error("Error saving category:", apiError);
    alert(apiError);
    } finally {
      setSubmitting(false);
    }
  };

 const handleDeleteCategory = async (categoryId) => {
  if (!categoryId) return;

  if (window.confirm("Are you sure you want to delete this category?")) {
    try {
     const res  =  await deleteCategory(categoryId);
      
      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat._id !== categoryId)
      );

      alert(res?.message );
          fetchCategories();

    } catch (error) {
      const apiError =
        error.response?.data?.message || "Failed to delete category.";
      console.error("Error deleting category:", apiError);
      alert(apiError);
    }
  }
};

  return (
    <div className="p-8 max-w-7xl w-full mx-auto space-y-6">
      <CategoryHeader onOpenAddModal={handleOpenAddModal} />

      <CategoryTable 
        categories={categories}
        loading={loading}
        onOpenEditModal={handleOpenEditModal}
        onDeleteCategory={handleDeleteCategory}
      />

      <CategoryModal 
        isOpen={isModalOpen}
        isEditing={!!editingCategory}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onClose={() => setIsModalOpen(false)}
        submitting={submitting}
      />
    </div>
  );
}