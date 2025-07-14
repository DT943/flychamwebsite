'use client'
import Image from 'next/image';
import React from 'react';
import tabIcon from '@/assets/images/tabicon.png';

const DurationDashed = ({
  length = 6,
  width = 28,
  height = 28,
  logoWidth = 14,
  startSize = 6, // replaces `startWidth` for clarity
}) => {
  const Dots = ({ side }) => (
    <div className="flex items-center gap-[4px] mx-[6px]">
      {Array.from({ length }).map((_, i) => (
        <span
          key={`${side}-${i}`}
          className="w-[6px] h-[2px] bg-primary-1 rounded-sm"
        />
      ))}
    </div>
  );

  return (
    <div className="flex items-center justify-center text-primary-1 w-full">
      {/* Start Dot */}
      <span
        style={{ width: startSize, height: startSize }}
        className="rounded-full bg-primary-1"
      />

      {/* Left Dashes */}
      <Dots side="left" />

      {/* Center Icon */}
      <span
        style={{ width, height }}
        className="mx-1 bg-primary-1 rounded-full flex items-center justify-center"
      >
        <Image
          src={tabIcon}
          alt="Flight"
          width={logoWidth}
          height={logoWidth}
          className="object-contain"
        />
      </span>

      {/* Right Dashes */}
      <Dots side="right" />

      {/* End Dot */}
      <span
        style={{ width: startSize, height: startSize }}
        className="rounded-full border border-primary-1"
      />
    </div>
  );
};

export default DurationDashed;
