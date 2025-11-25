"use client";
import { useState, useEffect } from 'react';
import { Lead } from '@/lib/types';

interface LeadFormProps {
  initialData?: Partial<Lead>;
  readOnly?: boolean;
  onSubmit?: (data: Partial<Lead>) => void;
  title?: string;
  excludeFields?: (keyof Lead)[];
}

export default function LeadForm({ initialData, readOnly = false, onSubmit, title, excludeFields = [] }: LeadFormProps) {
  const [formData, setFormData] = useState<Partial<Lead>>(initialData || {});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const isFieldVisible = (fieldName: keyof Lead) => !excludeFields.includes(fieldName);

  const inputClassName = "mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-600 p-2.5 text-gray-900 placeholder-gray-400";

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      {title && <h3 className="text-xl font-semibold mb-4 text-gray-900">{title}</h3>}
      
      <div className="space-y-4">
        {isFieldVisible('name') && (
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              disabled={readOnly}
              className={inputClassName}
              placeholder="Enter name"
            />
          </div>
        )}

        {isFieldVisible('email') && (
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              disabled={readOnly}
              className={inputClassName}
              placeholder="Enter email"
            />
          </div>
        )}

        {isFieldVisible('phone') && (
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              disabled={readOnly}
              className={inputClassName}
              placeholder="Enter phone number"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {isFieldVisible('address') && (
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-800 mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                disabled={readOnly}
                className={inputClassName}
                placeholder="Enter address"
              />
            </div>
          )}
          {isFieldVisible('city') && (
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city || ''}
                onChange={handleChange}
                disabled={readOnly}
                className={inputClassName}
                placeholder="Enter city"
              />
            </div>
          )}
          {isFieldVisible('state') && (
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">State</label>
              <input
                type="text"
                name="state"
                value={formData.state || ''}
                onChange={handleChange}
                disabled={readOnly}
                className={inputClassName}
                placeholder="Enter state"
              />
            </div>
          )}
           {isFieldVisible('zip') && (
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Zip Code</label>
              <input
                type="text"
                name="zip"
                value={formData.zip || ''}
                onChange={handleChange}
                disabled={readOnly}
                className={inputClassName}
                placeholder="Enter zip code"
              />
            </div>
          )}
        </div>

        {isFieldVisible('programType') && (
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Program Type</label>
            <input
              type="text"
              name="programType"
              value={formData.programType || ''}
              onChange={handleChange}
              disabled={readOnly}
              className={inputClassName}
              placeholder="Enter program type"
            />
          </div>
        )}

        {isFieldVisible('fees') && (
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Fees</label>
            <input
              type="number"
              name="fees"
              value={formData.fees || ''}
              onChange={handleChange}
              disabled={readOnly}
              className={inputClassName}
              placeholder="Enter fees"
            />
          </div>
        )}

         {isFieldVisible('notes') && (
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes || ''}
              onChange={handleChange}
              disabled={readOnly}
              rows={3}
              className={inputClassName}
              placeholder="Enter notes"
            />
          </div>
        )}
      </div>

      {!readOnly && (
        <div className="mt-6">
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            Submit
          </button>
        </div>
      )}
    </form>
  );
}
