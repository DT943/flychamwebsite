'use client'
import { CaretLeft } from '@phosphor-icons/react';
import { useSelector } from 'react-redux';

const StepBtns = ({ activeStep, setActiveStep, handleSubmit }) => {
    console.log('activeStep', activeStep);

    const { isLoadingCreatePassengers, isLoadingCreatePayment } = useSelector((s) => s.flights)

    return (
        <div className="flex justify-between items-center w-full my-8">
            {/* Back to flights */}
            <button
                onClick={() => setActiveStep(0)}
                className={`flex items-center gap-1 px-4 py-2 border border-[var(--primary-1)] font-semibold rounded-md transition 
         text-[var(--primary-1)] hover:bg-[var(--primary-1)] hover:text-white cursor-pointer
        `}
            >
                <CaretLeft size={16} weight="light" />
                Back to flights
            </button>

            {/* Select seats & extras */}
            <button
                disabled={isLoadingCreatePayment || isLoadingCreatePassengers}
                className={`px-4 py-2 rounded-md font-medium transition 
    ${isLoadingCreatePayment || isLoadingCreatePassengers
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-primary-1 text-white hover:bg-white hover:text-primary-1 cursor-pointer'
                    }`}
                onClick={handleSubmit}
            >
                {isLoadingCreatePayment || isLoadingCreatePassengers ? 'Processing...' : activeStep === 1 ? 'Next' : "Go to pay"}
            </button>

        </div>
    );
};

export default StepBtns;
