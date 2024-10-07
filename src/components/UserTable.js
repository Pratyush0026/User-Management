import React from 'react';
import '../index.css';
import './Home.css';


const UserTable = ({ users, onEdit, onDelete, onView }) => {
  return (
    <table className=" table">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300 px-4 py-2">Email</th>
          <th className="border border-gray-300 px-4 py-2">Phone</th>
          <th className="border border-gray-300 px-4 py-2">Username</th>
          <th className="border border-gray-300 px-4 py-2">Street</th>
          <th className="border border-gray-300 px-4 py-2">City</th>
          <th className="border border-gray-300 px-4 py-2">Company Name</th>
          <th className="border border-gray-300 px-4 py-2">Website</th>
          <th className="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="border border-gray-300 px-4 py-2">{user.name}</td>
            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
            <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
            <td className="border border-gray-300 px-4 py-2">{user.username}</td>
            <td className="border border-gray-300 px-4 py-2">{user.address.street}</td>
            <td className="border border-gray-300 px-4 py-2">{user.address.city}</td>
            <td className="border border-gray-300 px-4 py-2">{user.company?.name || 'N/A'}</td>
            <td className="border border-gray-300 px-4 py-2">{user.website || 'N/A'}</td>
            <td className="border border-gray-300 px-4 py-2">
              <button onClick={() => onView(user)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2 button view-button ">View</button>
              <button onClick={() => onEdit(user)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 button edit-button ">Edit</button>
              <button onClick={() => onDelete(user.id)} className="button delete-button">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
