'use client'
import { CaretLeft } from '@phosphor-icons/react';
import React from 'react';
import { useSelector } from 'react-redux';

const BookingSummary = ({ totalAmount = 900, onContinue, setSelectedFlight, selectedType }) => {
    const { flights } = useSelector((s) => s.flights)
    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Back Button */}
            <button
                className=" cursor-pointer w-full md:w-auto px-6 py-3 bg-transparent text-primary-1 border border-[#054E72] 
                text-sm font-semibold rounded-md shadow-sm inline-flex items-center justify-center gap-2"
                onClick={() => setSelectedFlight(null)}
            >
                <CaretLeft />
                Back
            </button>

            {/* Booking Summary + Continue Button */}
            <div className="w-full md:w-auto flex flex-col md:flex-row justify-end items-center gap-4  p-4 rounded-[8px]">
                <div className="text-center md:text-right flex flex-col gap-1">
                    <div className="text-[#5F5F5C] font-medium text-base md:text-[20px]">Booking total:</div>
                    <div className="text-[#3E3E3B] font-semibold text-[24px] md:text-[32px]">
                        {flights?.[0]?.common_info?.currency} {selectedType.price}
                    </div>
                </div>

                <button
                    className=" cursor-pointer  w-full md:w-auto px-6 py-3 bg-[#BAA981] text-white text-sm font-semibold 
                    rounded-md shadow-sm inline-flex items-center justify-center gap-2"
                    onClick={onContinue}
                >
                    Continue to Passenger <span className="text-lg">›</span>
                </button>
            </div>
        </div>
    );
};

export default BookingSummary;
