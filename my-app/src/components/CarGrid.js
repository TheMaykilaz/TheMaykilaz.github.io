import React from 'react';
import CarItem from './CarItem';

function CarGrid({ cars, onBook }) {
    return (
        <div className="car-grid">
            {cars.map(car => (
                <CarItem key={car.id} car={car} onBook={onBook} />
            ))}
        </div>
    );
}

export default CarGrid;
