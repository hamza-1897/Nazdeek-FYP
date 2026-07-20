import React from 'react';
import { Star } from 'lucide-react';

const ActivityTab = ({ services = [], reviews = [] }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-base font-bold text-gray-800 mb-4">Listed Services on App</h3>
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <div key={service._id} className="p-4 bg-slate-50 border border-gray-100 rounded-lg">
                <h4 className="font-bold text-gray-800 text-sm">{service.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{service.description}</p>
                <div className="mt-3 flex justify-between items-center text-xs">
                  <span className="font-bold text-[#0f3d2e]">PKR {service.price}</span>
                  <span className="text-gray-400 bg-white px-2 py-0.5 rounded border">{service.category}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400">No services listed by this provider yet.</p>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-base font-bold text-gray-800 mb-4">Customer Reviews & Ratings</h3>
        {reviews.length > 0 ? (
          <div className="space-y-3">
            {reviews.map((review) => (
              <div key={review._id} className="p-4 border-b border-gray-100 last:border-none">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-700">{review?.userId?.name || 'Customer'}</span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-bold">{review.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-1">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400">No reviews received yet.</p>
        )}
      </div>
    </div>
  );
};

export default ActivityTab;