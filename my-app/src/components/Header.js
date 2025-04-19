import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <h1>Автопрокат</h1>
            <nav>
                <ul>
                    <li><Link to="/cars">Автомобілі</Link></li>
                    <li><Link to="/bookings">Мої бронювання</Link></li>
                    <li><Link to="/about">Про нас</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;