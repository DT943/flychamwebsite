'use client';
import React from 'react';
import { AirplaneTakeoff, AirplaneLanding } from '@phosphor-icons/react';
import SwapIcon from './SwapIcon';

const FromToSelector = ({ cities, values, setShowModal, setShowMobileModal, isMobile, handleSwitch }) => {
  const handleOpenWidget = () => (isMobile ? setShowMobileModal(true) : setShowModal(true));

  const { source, destination } = values;

  const getCityInfo = (id) => {
    const city = cities?.find((c) => c.id === id);
    const translation = city?.airPortTranslations?.[0];
    return {
      city: translation?.city || '',
      airport: translation?.airPortName || ''
    };
  };

  const sourceInfo = source ? getCityInfo(source) : { city: 'Departure city', airport: 'Select your origin' };
  const destinationInfo = destination
    ? getCityInfo(destination)
    : { city: 'Arrival city', airport: 'Select your destination' };

  return (
    <div className={`relative flex ${isMobile ? 'flex-col my-3 gap-3' : 'flex-row gap-7'} items-center`}>
      {/* FROM */}
      <div
        onClick={handleOpenWidget}
        className="w-full flex-1 flex items-center space-x-4 bg-[#F5F5F4] hover:bg-[#E7E7E5] transition-colors duration-200 rounded-xl px-6 py-5 cursor-pointer"
      >
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
          <AirplaneTakeoff weight="fill" size={16} color="white" />
        </div>
        <div>
          <p className="text-sm text-gray-500">From</p>
          <p className="text-lg font-semibold text-[#1E1E1E]">{sourceInfo.city}</p>
          <p className="text-xs text-gray-500">{sourceInfo.airport}</p>
        </div>
      </div>

      {/* SWAP */}
      <div
        className="absolute left-1/2 top-1/2 z-10 cursor-pointer -translate-y-1/2"
        style={{ transform: `translateX(${isMobile ? '25vw' : '-50%'})` }}
        onClick={handleSwitch}
      >
        <div className="w-12 h-12 rounded-full bg-white hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center">
          <SwapIcon isMobile={isMobile} />
        </div>
      </div>

      {/* TO */}
      <div
        onClick={handleOpenWidget}
        className="w-full flex-1 flex items-center space-x-4 bg-[#F5F5F4] hover:bg-[#E7E7E5] transition-colors duration-200 rounded-xl px-6 py-5 cursor-pointer"
      >
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
          <AirplaneLanding weight="fill" size={16} color="white" />
        </div>
        <div>
          <p className="text-sm text-gray-500">To</p>
          <p className="text-lg font-semibold text-[#1E1E1E]">{destinationInfo.city}</p>
          <p className="text-xs text-gray-500">{destinationInfo.airport}</p>
        </div>
      </div>
    </div>
  );
};

export default FromToSelector;
