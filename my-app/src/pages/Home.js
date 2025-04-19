import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <section id="hero">
            <h2>Знайдіть свій ідеальний автомобіль</h2>
            <p>Найкращі пропозиції прокату авто в Переможному, Львівській області.</p>
            <div className="hero-buttons">
                <Link to="/cars" className="hero-button">Переглянути автомобілі</Link>
                <Link to="/bookings" className="hero-button">Мої бронювання</Link>
                <Link to="/about" className="hero-button">Дізнатись більше</Link>
            </div>
            {/* Add your photo here */}
            <div className="hero-image-container">
                <img src="hero-image.jpg" alt="Автопрокат - Знайдіть свій автомобіль" className="hero-image" />
            </div>
        </section>
    );
}

export default Home;