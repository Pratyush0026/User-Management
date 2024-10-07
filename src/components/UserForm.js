
import React, { useState, useEffect } from 'react';

const UserForm = ({ isOpen, onClose, onSubmit, user }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    address: { street: '', city: '' },
    company: { name: '' },
    website: '',
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        username: user.username,
        address: { street: user.address.street, city: user.address.city },
        company: { name: user.company?.name || '' },
        website: user.website,
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        username: `USER-${Math.random().toString(36).substring(7)}`, // Random username format
        address: { street: '', city: '' },
        company: { name: '' },
        website: '',
      });
    }
  }, [user]);

  const validateForm = () => {
    const validationErrors = {};
    if (!formData.name || formData.name.length < 3) validationErrors.name = 'Name is required and must be at least 3 characters.';
    if (!formData.email) validationErrors.email = 'Email is required.';
    if (!/\S+@\S+\.\S+/.test(formData.email)) validationErrors.email = 'Email is not valid.';
    if (!formData.phone) validationErrors.phone = 'Phone number is required.';
    if (!/^\d{10}$/.test(formData.phone)) validationErrors.phone = 'Phone number is not valid.';
    if (!formData.username || formData.username.length < 3) validationErrors.username = 'Username is required and must be at least 3 characters.';
    if (!formData.address.street) validationErrors.street = 'Street is required.';
    if (!formData.address.city) validationErrors.city = 'City is required.';
    if (formData.company.name && formData.company.name.length < 3) validationErrors.companyName = 'Company name must be at least 3 characters if provided.';
    if (formData.website && !/^https?:\/\/.+\..+/.test(formData.website)) validationErrors.website = 'Website must be a valid URL if provided.';
    
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg mb-4">{user ? 'Edit User' : 'Add User'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border p-2 w-full" />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>
          <div>
            <label>Email</label>
            <input type="text" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="border p-2 w-full" />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>
          <div>
            <label>Phone</label>
            <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="border p-2 w-full" />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
          </div>
          <div>
            <label>Username</label>
            <input type="text" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} className="border p-2 w-full" />
            {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
          </div>
          <div>
            <label>Street</label>
            <input type="text" value={formData.address.street} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })} className="border p-2 w-full" />
            {errors.street && <p className="text-red-500 text-xs">{errors.street}</p>}
          </div>
          <div>
            <label>City</label>
            <input type="text" value={formData.address.city} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })} className="border p-2 w-full" />
            {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
          </div>
          <div>
            <label>Company Name</label>
            <input type="text" value={formData.company.name} onChange={(e) => setFormData({ ...formData, company: { ...formData.company, name: e.target.value } })} className="border p-2 w-full" />
            {errors.companyName && <p className="text-red-500 text-xs">{errors.companyName}</p>}
          </div>
          <div>
            <label>Website</label>
            <input type="text" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="border p-2 w-full" />
            {errors.website && <p className="text-red-500 text-xs">{errors.website}</p>}
          </div>
          <div className="flex justify-between mt-4">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{user ? 'Update User' : 'Add User'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
