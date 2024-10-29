import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/App.css';

const UpdateUser  = () => {
    const { id } = useParams();
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [country, setCountry] = useState('');
    const [age, setAge] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser  = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/backend/api/users/${id}`);
                if (!response.ok) throw new Error('Error in fetchUser');
                const data = await response.json();

                setUsername(data.username);
                setName(data.name);
                setLastname(data.lastname);
                setCountry(data.country);
                setAge(data.age);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUser ();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/backend/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    name,
                    lastname,
                    country,
                    age,
                }),
            });

            if (!response.ok) throw new Error('Error in handleSubmit');
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container">
            <h2 className="title">Update User #{id}</h2>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label className="label">Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input"
                        required
                    />
                </div>
                <div className="input-group">
                    <label className="label">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input"
                        required
                    />
                </div>
                <div className="input-group">
                    <label className="label">Lastname:</label>
                    <input
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        className="input"
                        required
                    />
                </div>
                <div className="input-group">
                    <label className="label">Country:</label>
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="input"
                        required
                    />
                </div>
                <div className="input-group">
                    <label className="label">Age:</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="input"
                        required
                    />
                </div>
                <div className="button-container">
                    <button type="submit" className="create-button">Update</button>
                    <button type="button" className="cancel-button" onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUser;