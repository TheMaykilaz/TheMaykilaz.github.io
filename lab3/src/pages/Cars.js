import React, { useState } from 'react';
import CarGrid from '../components/CarGrid';

function Cars() {
    const [carsData, setCarsData] = useState([
        { id: 1, name: 'Hyundai Accent', availableUnits: 5, price: 800, transmission: 'Автоматична', image: '/car1.jpg' },
        { id: 2, name: 'Toyota RAV4', availableUnits: 3, price: 1200, transmission: 'Автоматична', image: '/car2.jpg' },
        { id: 3, name: 'Renault Sandero', availableUnits: 7, price: 650, transmission: 'Механічна', image: '/car3.jpg' },
        { id: 4, name: 'Mazda MX-5', availableUnits: 2, price: 1500, transmission: 'Автоматична', image: '/car4.jpg' },
        { id: 5, name: 'Mercedes-Benz E-Class', availableUnits: 1, price: 2000, transmission: 'Автоматична', image: '/car5.jpg' },
        { id: 6, name: 'Volkswagen Caddy', availableUnits: 4, price: 1000, transmission: 'Автоматична', image: '/car6.jpg' }
    ]);

    const handleBook = (carId) => {
        const carItem = document.querySelector(`.car-item[data-car-id="${carId}"]`);
        const startDateInput = carItem.querySelector(`input[name="start-date"]`);
        const endDateInput = carItem.querySelector(`input[name="end-date"]`);

        const startDate = startDateInput.value;
        const endDate = endDateInput.value;

        const carName = carItem.querySelector('h3').textContent;

        const bookingInfo = {
            carName: carName,
            startDate: startDate,
            endDate: endDate
        };

        sessionStorage.setItem('userBookings', JSON.stringify([bookingInfo]));

        document.location.href = "/bookings"; // Redirect immediately
    };

    return (
        <section id="cars">
            <h2>Доступні автомобілі</h2>
            <CarGrid cars={carsData} onBook={handleBook} />
        </section>
    );
}

export default Cars;