'use client'
import useIsMobile from '@/hooks/useIsMobile';
import React, { useState } from 'react';



const ProgressBar = ({ steps, activeStep, setActiveStep }) => {
  const isLg = !useIsMobile(1024)

  const completedPercentage = ((activeStep + 1) / steps.length) * 100;

  return (
    <div className="relative w-full h-[66px] overflow-hidden">
      {/* Full grey background arrow */}
      <svg
        viewBox="0 0 1078 66"
        className="absolute w-full h-full"
        preserveAspectRatio="none"
      >
        <path d="M0 0H1048.16L1077.5 34L1048.16 66H0V0Z" fill="var(--bg-100)" />
      </svg>

      {/* Dynamic blue progress arrow */}
      <svg
        viewBox="0 0 1078 66"
        className="absolute top-0 left-0 h-full transition-all duration-300"
        style={{ width: `${completedPercentage}%` }}
        preserveAspectRatio="none"
      >
        <path d="M0 0H1048.16L1077.5 34L1048.16 66H0V0Z" fill="var(--primary-1)" />
      </svg>


      {/* Step Items */}
      <div className="relative z-10 flex justify-between items-center h-full px-4 md:px-10">
        {steps.map((step, index) => {
          const isCompleted = index <= activeStep;
          const stepColor = isCompleted ? 'text-white' : 'text-400';
          const borderColor = isCompleted ? 'border-white' : 'border-[var(text-400)]';

          return (
            <div
              key={index}
              className={`flex ${isLg ? 'flex-row gap-2' : 'flex-col gap-1 text-center'
                } items-center min-w-[100px]`}
            >
              <div
                className={`w-[26px] h-[26px] flex items-center justify-center rounded-full border ${borderColor} text-xs ${stepColor}`}
              >
                {index + 1}
              </div>

{isLg ? (
  <span className={`text-sm font-medium ${stepColor}`}>
    {step.label}
  </span>
) : (
  index === activeStep && (
    <div
      className={`text-sm font-medium leading-[16px] ${isLg ? '' : 'text-[11px]'} ${stepColor}`}
    >
      {step.label.split(' ').map((word, i) => (
        <div key={i}>{word}</div>
      ))}
    </div>
  )
)}



            </div>

          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
