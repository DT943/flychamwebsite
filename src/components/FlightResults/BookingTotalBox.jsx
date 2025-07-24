'use client';
import React from 'react';

const BookingTotalBox = ({ price = 900, onContinue }) => {
    return (
        <div className="flex gap-4">
            {/* Booking Info */}
            <div className="text-right flex flex-col gap-4">
                <div className="text-600 text-[20px] font-medium leading-none">
                    Booking total:
                </div>
                <div className="text-700 text-[32px] font-semibold leading-none">
                    USD {price}
                </div>
            </div>

            {/* Continue Button */}
            <button
                onClick={onContinue}
                className="cursor-pointer bg-secondary-1 hover:bg-[#a39261] transition text-[#FFF] text-[16px] font-bold px-6 py-2 rounded-md"
            >
                Continue to Passenger &rsaquo;
            </button>
        </div>
    );
};

export default BookingTotalBox;
