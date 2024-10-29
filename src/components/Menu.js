import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../image/logo.png';
import '../css/menu.css';

const Menu = () => {
    return (
        <nav className="menu">
            <ul>
                <li>
                    <img src={logo} alt="Logo" width="200" height="200" className="logo" />
                </li>
            </ul>
            <ul>
                <li><Link to="/">Users</Link></li>
                <li><Link to="/create">Create</Link></li>
                <li><a href="https://github.com/Girouetten21/CRUD-React-Flask-Postgres" target="_blank" rel="noopener noreferrer">Github</a></li>
            </ul>
        </nav>
    );
};

export default Menu;