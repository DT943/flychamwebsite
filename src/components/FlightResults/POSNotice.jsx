'use client';
import { X } from '@phosphor-icons/react';
import React from 'react';
import { useSelector } from 'react-redux';

const POSNotice = ({ setShowNotice, setShowPosModal }) => {
  const { flights } = useSelector((s) => s.flights);

  const commonInfo = flights?.[0]?.common_info;
  const currency = commonInfo?.currency || '';
  const region = commonInfo?.region?.split(' ')[0] || '';

  return (
    <div className="bg-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between text-sm gap-2 sm:gap-4">
      <div className="flex-1">
        <p className="text-sm font-semibold text-primary-900 mb-1">
          {`You have been redirected to the ${region} point of sale`}
        </p>
        <p className="leading-relaxed text-sm text-600">
          {`Please note: Your booking will follow ${region}'s local terms and consumer protection policies,
          and all charges will be processed in ${currency}. If you wish to book from
          a different region, you can change your region anytime `}
          <button
            type="button"
            onClick={() => setShowPosModal?.(true)}
            className="text-primary-1 underline font-semibold"
          >
            “Change Region”
          </button>
        </p>
      </div>
      <button
        onClick={() => setShowNotice?.(false)}
        className="cursor-pointer self-start sm:self-auto text-800 hover:text-700"
        aria-label="Close notice"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default POSNotice;
