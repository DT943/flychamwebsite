import Image from 'next/image';
import React from 'react'
import tabicon from '@/assets/images/tabicon.png';

const FlightCodes = ({ flight_number }) => (
    <div className="flex items-center gap-4 my-1">
        {[...Array(1)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-2">
                <Image src={tabicon} alt="Flight logo" width={24} height={24} className="w-6 h-6 object-contain" />
                <span className="text-sm  text-black">{flight_number}</span>
            </div>
        ))}
    </div>
);


export default FlightCodes