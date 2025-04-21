import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Bookings() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (user) {
            const bookingsJSON = sessionStorage.getItem('userBookings');
            const bookings = bookingsJSON ? JSON.parse(bookingsJSON) : [];
            setBookings(bookings);
        }
    }, [user]);

    if (!user) {
        return (
            <section id="bookings">
                <h2>Мої бронювання</h2>
                <p>🔒 Зареєструйтесь або увійдіть, щоб забронювати автомобіль.</p>
                <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
                    <Link to="/register" className="hero-user-btn">Реєстрація</Link>
                    <Link to="/login" className="hero-user-btn">Увійти</Link>
                    <Link to="/" className="hero-user-btn">На головну</Link>
                </div>
            </section>
        );
    }

    const handleDelete = (index) => {
        const updatedBookings = [...bookings];
        updatedBookings.splice(index, 1);
        setBookings(updatedBookings);
        sessionStorage.setItem('userBookings', JSON.stringify(updatedBookings));
    };

    const handleDateChange = (index, field, value) => {
        const updatedBookings = [...bookings];
        updatedBookings[index][field] = value;
        setBookings(updatedBookings);
        sessionStorage.setItem('userBookings', JSON.stringify(updatedBookings));
    };

    return (
        <section id="bookings">
            <h2>Мої бронювання</h2>
            <div id="bookings-list">
                {bookings.length > 0 ? (
                    bookings.map((booking, index) => (
                        <div className="booking-item" key={index}>
                            <h3>{booking.carName}</h3>

                            <label>
                                Дата початку:
                                <input
                                    type="date"
                                    value={booking.startDate}
                                    onChange={(e) => handleDateChange(index, 'startDate', e.target.value)}
                                />
                            </label>
                            <br />
                            <label>
                                Дата закінчення:
                                <input
                                    type="date"
                                    value={booking.endDate}
                                    onChange={(e) => handleDateChange(index, 'endDate', e.target.value)}
                                />
                            </label>
                            <br />
                            <button onClick={() => handleDelete(index)}>
                                Видалити
                            </button>
                        </div>
                    ))
                ) : (
                    <p>У вас ще немає підтверджених бронювань.</p>
                )}
            </div>
        </section>
    );
}

const styles = {
    bookingItem: {
        border: '1px solid #ccc',
        padding: '1rem',
        borderRadius: '10px',
        marginBottom: '10px',
        backgroundColor: '#f9f9f9'
    },
    dateInput: {
        margin: '0.5rem 0',
        padding: '0.3rem',
        borderRadius: '5px',
        border: '1px solid #aaa'
    },
    deleteButton: {
        marginTop: '0.5rem',
        backgroundColor: '#c44',
        color: 'white',
        padding: '6px 10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default Bookings;
