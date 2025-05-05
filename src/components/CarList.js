import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import CarGrid from './CarGrid';

function CarList() {
    const initialCars = [
        { id: 1, name: 'Hyundai Accent', availableUnits: 5, price: 800, transmission: 'Автоматична', image: '/car1.jpg' },
        { id: 2, name: 'Toyota RAV4', availableUnits: 3, price: 1200, transmission: 'Автоматична', image: '/car2.jpg' },
        { id: 3, name: 'Renault Sandero', availableUnits: 7, price: 650, transmission: 'Механічна', image: '/car3.jpg' },
        { id: 4, name: 'Mazda MX-5', availableUnits: 2, price: 1500, transmission: 'Автоматична', image: '/car4.jpg' },
        { id: 5, name: 'Mercedes-Benz E-Class', availableUnits: 1, price: 2000, transmission: 'Автоматична', image: '/car5.jpg' },
        { id: 6, name: 'Volkswagen Caddy', availableUnits: 4, price: 1000, transmission: 'Автоматична', image: '/car6.jpg' }
    ];

    const [availableCars, setAvailableCars] = useState(() => {
        const stored = sessionStorage.getItem('cars');
        return stored ? JSON.parse(stored) : initialCars;
    });

    useEffect(() => {
        sessionStorage.setItem('cars', JSON.stringify(availableCars));
    }, [availableCars]);

    const [filters, setFilters] = useState({
        priceMin: '',
        priceMax: '',
        transmission: '',
        onlyAvailable: false,
    });

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const filteredCars = availableCars.filter(car => {
        const min = filters.priceMin ? parseInt(filters.priceMin) : 0;
        const max = filters.priceMax ? parseInt(filters.priceMax) : Infinity;
        const transmissionMatch = filters.transmission
            ? car.transmission === filters.transmission
            : true;
        const availableMatch = filters.onlyAvailable
            ? car.availableUnits > 0
            : true;

        return (
            car.price >= min &&
            car.price <= max &&
            transmissionMatch &&
            availableMatch
        );
    });

    const handleBook = (carId, startDate, endDate) => {
        const carItem = availableCars.find(car => car.id === carId);

        const existingBookings = JSON.parse(sessionStorage.getItem("userBookings")) || [];
        const newStart = new Date(startDate);
        const newEnd = new Date(endDate);

        const hasConflict = existingBookings.some((booking) => {
            if (booking.carId !== carId) return false;
            const existingStart = new Date(booking.startDate);
            const existingEnd = new Date(booking.endDate);
            return newStart <= existingEnd && newEnd >= existingStart;
        });

        if (hasConflict) {
            alert("Цей автомобіль вже заброньовано на обрані дати.");
            return false;
        }

        // Додаємо бронювання
        const bookingInfo = {
            carId,
            carName: carItem.name,
            startDate,
            endDate,
        };
        existingBookings.push(bookingInfo);
        sessionStorage.setItem("userBookings", JSON.stringify(existingBookings));

        // Firestore
        addDoc(collection(db, "bookings"), {
            carId,
            startDate,
            endDate,
            carName: carItem.name,
            price: carItem.price,
            status: "confirmed"
        }).catch(err => console.error("Firebase error:", err));

        // Оновлюємо доступні машини
        const updatedCars = availableCars.map(car =>
            car.id === carId
                ? { ...car, availableUnits: car.availableUnits - 1 }
                : car
        );
        setAvailableCars(updatedCars);
        sessionStorage.setItem("cars", JSON.stringify(updatedCars));

        // Переходимо на сторінку бронювання
        document.location.href = "/bookings";

        return true;
    };

    return (
        <section id="cars">
            <h2>Доступні автомобілі</h2>

            <div className="filters" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <input
                    type="number"
                    placeholder="Ціна від"
                    name="priceMin"
                    value={filters.priceMin}
                    onChange={handleFilterChange}
                />
                <input
                    type="number"
                    placeholder="Ціна до"
                    name="priceMax"
                    value={filters.priceMax}
                    onChange={handleFilterChange}
                />
                <select
                    name="transmission"
                    value={filters.transmission}
                    onChange={handleFilterChange}
                >
                    <option value="">Будь-яка трансмісія</option>
                    <option value="Автоматична">Автоматична</option>
                    <option value="Механічна">Механічна</option>
                </select>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <input
                        type="checkbox"
                        name="onlyAvailable"
                        checked={filters.onlyAvailable}
                        onChange={handleFilterChange}
                    />
                    Лише доступні
                </label>
            </div>

            <CarGrid cars={filteredCars} onBook={handleBook} />
        </section>
    );
}

export default CarList;
