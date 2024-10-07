// src/components/UserDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserDetails = ({ users }) => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    const fetchUserDetails = async () => {
        // Fetch user data from local users array
        const foundUser = users.find(user => user.id === parseInt(id));
        if (foundUser) {
            setUser(foundUser);
        } else {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await response.json();
            setUser(data);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, [id, users]);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h2>User Details</h2>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> {user.website}</p>
            <p><strong>Company:</strong> {user.company.name}</p>
            <p><strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>
        </div>
    );
};

export default UserDetails;
