import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

import { getUserBookings, addBooking, updateBooking, deleteBooking } from '../firebase';

function Bookings() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [newBooking, setNewBooking] = useState({ carName: '', startDate: '', endDate: '' });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            const fetchBookings = async () => {
                try {
                    const data = await getUserBookings(user.uid);
                    setBookings(data);
                } catch (err) {
                    setError('Не вдалося завантажити бронювання');
                    console.error(err);
                }
            };

            fetchBookings();
        }
    }, [user]);

    const handleAddBooking = async () => {
        if (!newBooking.carName || !newBooking.startDate || !newBooking.endDate) {
            setError('Будь ласка, заповніть усі поля');
            return;
        }

        try {
            const bookingData = {
                ...newBooking,
                userId: user.uid,
            };
            await addBooking(bookingData);
            const updatedList = await getUserBookings(user.uid);
            setBookings(updatedList);
            setNewBooking({ carName: '', startDate: '', endDate: '' });
            setError(null);
        } catch (err) {
            setError('Не вдалося додати бронювання');
            console.error(err);
        }
    };

    const handleDelete = async (index) => {
        const bookingId = bookings[index].id;
        try {
            await deleteBooking(bookingId);
            setBookings(bookings.filter((_, i) => i !== index));
        } catch (err) {
            setError('Не вдалося видалити бронювання');
            console.error(err);
        }
    };

    const handleDateChange = async (index, field, value) => {
        const updatedBookings = [...bookings];
        updatedBookings[index][field] = value;
        setBookings(updatedBookings);

        try {
            await updateBooking(updatedBookings[index].id, {
                [field]: value,
            });
        } catch (err) {
            setError('Не вдалося оновити бронювання');
            console.error(err);
        }
    };

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

    return (
        <section id="bookings">
            <h2>Мої бронювання</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="booking-form">
                <h3>Нове бронювання</h3>
                <label>
                    Назва авто:
                    <input
                        type="text"
                        value={newBooking.carName}
                        onChange={(e) => setNewBooking({ ...newBooking, carName: e.target.value })}
                    />
                </label>
                <label>
                    Дата початку:
                    <input
                        type="date"
                        value={newBooking.startDate}
                        onChange={(e) => setNewBooking({ ...newBooking, startDate: e.target.value })}
                    />
                </label>
                <label>
                    Дата закінчення:
                    <input
                        type="date"
                        value={newBooking.endDate}
                        onChange={(e) => setNewBooking({ ...newBooking, endDate: e.target.value })}
                    />
                </label>
                <button onClick={handleAddBooking}>Забронювати</button>
            </div>

            <div id="bookings-list">
                {bookings.length > 0 ? (
                    bookings.map((booking, index) => (
                        <div className="booking-item" key={booking.id}>
                            <h3>{booking.carName}</h3>
                            <label>
                                Дата початку:
                                <input
                                    type="date"
                                    value={booking.startDate}
                                    onChange={(e) => handleDateChange(index, 'startDate', e.target.value)}
                                />
                            </label>
                            <label>
                                Дата закінчення:
                                <input
                                    type="date"
                                    value={booking.endDate}
                                    onChange={(e) => handleDateChange(index, 'endDate', e.target.value)}
                                />
                            </label>
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

export default Bookings;
