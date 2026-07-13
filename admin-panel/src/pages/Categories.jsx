import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import CategoryRow from '../components/common/CategoryRow'; 

export default function Categories() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics', providers: 12 },
    { id: 2, name: 'Clothing', providers: 8 },
    { id: 3, name: 'Home & Garden', providers: 15 },
    { id: 4, name: 'Sports', providers: 6 },
    { id: 5, name: 'Books', providers: 9 },
  ]);

  const [categoryInput, setCategoryInput] = useState('');

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!categoryInput.trim()) return;

    const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    setCategories([...categories, { id: newId, name: categoryInput, providers: 0 }]);
    setCategoryInput('');
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="p-8 max-w-6xl w-full mx-auto space-y-6">
      
      <h1 className="text-2xl font-bold text-[#0f172a]">Categories</h1>

      <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h2 className="text-sm font-bold text-[#0f172a] mb-4">Add New Category</h2>
        <form onSubmit={handleAddCategory} className="flex gap-4">
          <input 
            type="text" 
            placeholder="Enter category name" 
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 transition-all placeholder:text-slate-400"
          />
          <button 
            type="submit"
            className="bg-[#94a3b8] hover:bg-[#64748b] text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 transition-colors shadow-sm"
          >
            <Plus size={16} />
            Add Category
          </button>
        </form>
      </section>

      <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold tracking-wider text-slate-400 uppercase bg-slate-50/50">
              <th className="py-4 px-6 w-24">Sr.No</th>
              <th className="py-4 px-6">Name</th>
              <th className="py-4 px-6 w-40">Providers</th>
              <th className="py-4 px-6 w-32">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {categories.map((category, index) => (
              <CategoryRow 
                key={category.id}
                id={category.id}
                srNo={index + 1}
                name={category.name}
                providersCount={category.providers}
                onDelete={handleDeleteCategory}
              />
            ))}
          </tbody>
        </table>
      </section>

    </div>
  );
}