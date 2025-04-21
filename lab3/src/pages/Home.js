
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            console.log('Вихід успішний');
        } catch (error) {
            console.error('Помилка при виході:', error);
        }
    };

    return (
        <section id="hero">
            <div className="hero-header">
                <h2>Знайдіть свій ідеальний автомобіль</h2>
                <div className="user-auth">
                    {user ? (
                        <>
                            <span className="user-email">👋 {user.email}</span>
                            <button onClick={handleLogout} className="hero-user-btn logout-btn">
                                Вийти
                            </button>
                        </>
                    ) : null }
                </div>
            </div>

            <p>Найкращі пропозиції прокату авто в Переможному, Львівській області.</p>

            <div className="hero-buttons">
                <Link to="/cars" className="hero-button">Переглянути автомобілі</Link>
                <Link to="/bookings" className="hero-button">Мої бронювання</Link>
                <Link to="/about" className="hero-button">Дізнатись більше</Link>
            </div>

            <div className="hero-image-container">
                <img src="hero-image.jpg" alt="Автопрокат - Знайдіть свій автомобіль" className="hero-image" />
            </div>
        </section>
    );
}

export default Home;
