'use client'
import React from 'react';
import FlightCard from './FlightCard';
import BookingSummary from './BookingSummary';

const FlightList = ({ flights, onDetailsClick, handleSelectPlan, selectedFlight, setActiveStep, selectedType, setSelectedFlight }) => {
    const displayedCards = selectedFlight ? [selectedFlight] : flights
    const isConfirmed = Boolean(selectedFlight)
    return (
        <div className="grid gap-6 my-5 justify-center sm:justify-stretch">

            {displayedCards?.map((flight, index) => (
                <FlightCard
                    key={index}
                    {...flight}
                    flight={Boolean(selectedFlight) ? selectedFlight : flight}
                    economyPrice={flight.price}
                    preconomyPriceice={flight.price}
                    onDetailsClick={onDetailsClick}
                    handleSelectPlan={handleSelectPlan}
                    isConfirmed={isConfirmed}
                    selectedType={selectedType}
                />
            ))}
            {isConfirmed && <BookingSummary selectedType={selectedType} totalAmount={900} onContinue={() => setActiveStep(1)} setSelectedFlight={setSelectedFlight} />}

        </div>
    );
};

export default FlightList;
