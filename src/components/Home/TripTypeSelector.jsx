'use client'
import React, { useEffect, useState } from 'react';

const TripTypeSelector = ({ setFieldValue, values, handleReset }) => {
  const { tripType } = values;

  const handleSelect = (type) => {
    setFieldValue("tripType", type);
    handleReset()
  };

  const TripTypeButton = ({ label, value, tripType, handleSelect }) => (
    <button
      onClick={() => handleSelect(value)}
      className={`relative z-10 w-1/2 text-sm rounded-[20px]
        font-medium transition-colors duration-300
        ${tripType === value ? 'text-white ' : 'text-[#05486e] bg-transparent '}`}
    >
      {label}
    </button>
  );

  return (
    <div
      style={{
        height: '100%',
        paddingLeft: 8.65,
        paddingRight: 8.65,
        paddingTop: 12,
        paddingBottom: 12,
        background: '#F5F5F4',
        borderRadius: 12,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 18.17,
        display: 'inline-flex',
      }}
      className="relative w-[250px] bg-[#f5f5f4] rounded-[24px] flex items-center transition-all duration-300"
    >
      {/* Moving background */}
      <div
        className={`absolute top-1 rounded-[8px] bottom-1 w-[50%] bg-main transition-all duration-500 ease-in-out ${tripType === 'Return' ? 'left-0' : 'left-[50%]'}`}
      />

      {/* Trip type buttons */}
      <TripTypeButton label="Round-trip" value="Return" tripType={tripType} handleSelect={handleSelect} />
      <TripTypeButton label="One-way" value="OneWay" tripType={tripType} handleSelect={handleSelect} />
    </div>
  );
};

export default TripTypeSelector;
