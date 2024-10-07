import { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import UserTable from './UserTable'; // Import UserTable to display users
import '../index.css';
import './Home.css';



const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const [searchTerm, setSearchTerm] = useState(''); // New search term state

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true); // Start loading
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    setUsers(response.data);
    setLoading(false); // End loading
  };

  const handleOpenForm = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleViewUser = (user) => {
    alert(JSON.stringify(user, null, 2)); // You can replace this with a modal or a different display
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedUser(null);
  };

  const handleSubmit = async (formData) => {
    if (selectedUser) {
      // Update the user
      setUsers(users.map(user => (user.id === selectedUser.id ? { ...user, ...formData } : user)));
    } else {
      // Add a new user
      const newUser = { ...formData, id: users.length + 1 }; // Assign a new ID
      setUsers([...users, newUser]);
    }
    handleCloseForm();
  };

  const handleDeleteUser = (userId) => {
    // Delete the user
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter users based on the search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">User Management</h1>
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearchChange}
        className="border p-2 mb-4 w-full"
      />

      <button onClick={handleOpenForm} className="view-button button ">
        Add User
      </button>

      {/* Loading Indicator */}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="loader">Loading...</div> {/* You can customize this with a spinner */}
        </div>
      ) : (
        <UserTable 
          users={filteredUsers} // Use filtered users for display
          onEdit={handleEditUser} 
          onDelete={handleDeleteUser} 
          onView={handleViewUser} 
        />
      )}

      <UserForm 
        isOpen={isFormOpen} 
        onClose={handleCloseForm} 
        onSubmit={handleSubmit} 
        user={selectedUser} 
      />
    </div>
  );
};

export default Home;
