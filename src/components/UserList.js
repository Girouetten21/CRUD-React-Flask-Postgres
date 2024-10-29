import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/App.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Function to get users
    const fetchUsers = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/backend/api/users`);
            if (!response.ok) throw new Error('Error in fetchUsers');
            const data = await response.json();
            data.sort((a, b) => a[0] - b[0]);
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Call fetchUsers when mounting the component
    useEffect(() => {
        fetchUsers();
    }, []);

    // Function to delete a user
    const deleteUser  = async (userId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/backend/api/users/${userId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Error in deleteUser');
            fetchUsers();
        } catch (err) {
            setError(err.message);
        }
    };

    // Trim excess characters
    const truncateString = (str, num) => {
        if (str.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    };

    // Filter users by search term
    const filteredUsers = users.filter(user =>
        user[0].toString().includes(searchTerm.toLowerCase()) ||    // user_id
        user[1].toLowerCase().includes(searchTerm.toLowerCase()) || // Username
        user[2].toLowerCase().includes(searchTerm.toLowerCase()) || // Name
        user[3].toLowerCase().includes(searchTerm.toLowerCase()) || // Lastname
        user[4].toLowerCase().includes(searchTerm.toLowerCase()) || // Country
        user[5].toString().includes(searchTerm.toLowerCase())       // Age
    );

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="title">User Management CRUD</h1>
            <h2 className='title-2'> React - Flask - Postgres</h2>
            <p className="text-center paragraph">
            This is a practice project that demonstrates a basic CRUD (Create, Read, Update, Delete) application for managing users. User data is stored in a Postgres database hosted on Vercel. The frontend was developed with React and the backend with Flask.
                <span className="text-center">
                    <strong> Users created: {users.length}</strong>
                </span>
            </p>
            <h1 className="title">User List</h1>
            <input
                type="text"
                placeholder="Username, name, lastname..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table className="table">
                <thead>
                    <tr>
                        <th className="th">ID</th>
                        <th className="th">Username</th>
                        <th className="th">Name</th>
                        <th className="th">Lastname</th>
                        <th className="th">Country</th>
                        <th className="th">Age</th>
                        <th className="th" colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user[0]}>
                            <td className="td">{user[0]}</td>
                            <td className="td">{truncateString(user[1], 8)}</td>
                            <td className="td">{truncateString(user[2], 8)}</td>
                            <td className="td">{truncateString(user[3], 8)}</td>
                            <td className="td">{truncateString(user[4], 8)}</td>
                            <td className="td">{user[5]}</td>
                            <td className="td-button">
                                <div className="button-container">
                                    <button className="edit-button" onClick={() => navigate(`/edit/${user[0]}`)}>Edit</button>
                                    <button className="delete-button" onClick={() => deleteUser (user[0])}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;