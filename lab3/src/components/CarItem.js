import React, { useState, useEffect } from 'react';

function CarItem({ car, onBook }) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [message, setMessage] = useState('');
    const [availableUnits, setAvailableUnits] = useState(car.availableUnits);

    useEffect(() => {
        const cars = JSON.parse(sessionStorage.getItem('cars')) || [];
        const updatedCar = cars.find(c => c.id === car.id);
        if (updatedCar) {
            setAvailableUnits(updatedCar.availableUnits);
        } else {
            setAvailableUnits(car.availableUnits);
        }
    }, [car]);

    const handleBooking = () => {
        if (!startDate || !endDate) {
            setMessage('Будь ласка, виберіть обидві дати.');
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            setMessage('Дата початку не може бути пізніше дати закінчення.');
            return;
        }

        if (availableUnits <= 0) {
            setMessage('❌ Немає доступних автомобілів для бронювання.');
            return;
        }

        const success = onBook(car.id, startDate, endDate);
        if (success) {
            setAvailableUnits(prev => prev - 1);
            setMessage('✅ Бронювання успішне!');
        }
    };

    return (
        <div className="car-item">
            <img src={car.image} alt={car.name} className="car-image" />
            <h3>{car.name}</h3>
            <p>Ціна: {car.price} грн/день</p>
            <p>Трансмісія: {car.transmission}</p>
            <p>Доступних одиниць: {availableUnits}</p>

            <div className="booking-section">
                <div className="date-picker">
                    <label htmlFor={`start-${car.id}`}>Початок:</label>
                    <input
                        type="date"
                        id={`start-${car.id}`}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="date-picker">
                    <label htmlFor={`end-${car.id}`}>Кінець:</label>
                    <input
                        type="date"
                        id={`end-${car.id}`}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>

                <button onClick={handleBooking}>Забронювати</button>
            </div>

            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default CarItem;
