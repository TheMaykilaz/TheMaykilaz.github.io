import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
    const { user, logout } = useAuth();

    return (
        <header className="site-header">
            <nav>
                <ul className="nav-links">
                    <li><Link to="/">🏠 Головна</Link></li>
                    <li><Link to="/cars">Автомобілі</Link></li>
                    <li><Link to="/bookings">Мої бронювання</Link></li>
                    <li><Link to="/about">Про нас</Link></li>
                </ul>
                <div className="auth-buttons">
                    {user ? (
                        <button onClick={logout}>Вийти</button>
                    ) : (
                        <>
                            <Link to="/login">Увійти</Link>
                            <Link to="/register">Реєстрація</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;