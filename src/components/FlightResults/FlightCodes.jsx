import Image from 'next/image';
import React from 'react'
import tabicon from '@/assets/images/tabicon.png';

const FlightCodes = () => (
    <div className="flex items-center gap-4 my-1">
        {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-2">
                <Image src={tabicon} alt="Flight logo" width={24} height={24} className="w-6 h-6 object-contain" />
                <span className="text-sm  text-black">XH700</span>
            </div>
        ))}
    </div>
);


export default FlightCodes