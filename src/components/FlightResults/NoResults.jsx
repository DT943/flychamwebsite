'use client';
import React from 'react';
import { ArrowLeft } from '@phosphor-icons/react';
import Image from 'next/image';
import nodataImg from '@/assets/images/nodata.png'; // Replace with magnifier vector if needed
import { useRouter } from 'next/navigation';

const NoResults = () => {
    const router = useRouter()
    return (
        <div className="flex flex-col items-center justify-center text-center px-6 py-16">
            {/* Icon/Image */}
            <Image src={nodataImg} />

            {/* Title */}
            <h2 className="text-3xl text-700 md:text-xl font-medium text-gray-800 mb-2">
                No flights found. Please modify your search.
            </h2>

            {/* Suggestions */}
            <ul className="text-lg text-700 font-bold   space-y-1 mb-6">
                <li className="before:content-['•']   before:text-yellow-500 before:mr-2 ">Try different dates</li>
                <li className="before:content-['•']   before:text-yellow-500 before:mr-2">Check nearby airports</li>
                <li className="before:content-['•']   before:text-yellow-500 before:mr-2">Adjust your filters</li>
            </ul>

            {/* Button */}
            <button
                onClick={() => router.push("/")}
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-[#003A59] text-[#003A59] rounded-md text-sm hover:bg-[#003A59] hover:text-white transition">
                <ArrowLeft size={16} className="mr-2" />
                Back to Home
            </button>
        </div>
    );
};

export default NoResults;
