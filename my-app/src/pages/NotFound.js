import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="notfound-container">
            <h1>404</h1>
            <p>На жаль, сторінку не знайдено.</p>
            <Link to="/" className="home-link">Повернутися на головну</Link>
        </div>
    );
}

export default NotFound;
