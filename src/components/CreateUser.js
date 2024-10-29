import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/App.css';

const CreateUser  = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [country, setCountry] = useState('');
    const [age, setAge] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const userData = { username, name, lastname, country, age };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/backend/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                navigate('/');
            } else {
                console.error('Error in handleSubmit');
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
        }
    };

    return (
        <div className="container">
            <h2 className="title">Create New User</h2>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label className="label">Username:</label>
                    <input
                        type="text"
                        className="input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label className="label">Name:</label>
                    <input
                        type="text"
                        className="input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label className="label">Lastname:</label>
                    <input
                        type="text"
                        className="input"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label className="label">Country:</label>
                    <input
                        type="text"
                        className="input"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label className="label">Age:</label>
                    <input
                        type="number"
                        className="input"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </div>
                <div className="button-container">
                    <button type="submit" className="create-button">Create</button>
                    <button type="button" className="cancel-button" onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default CreateUser;