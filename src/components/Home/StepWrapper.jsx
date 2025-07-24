'use client'
import React from "react";
import StepFooterBar from "./StepFooterBar";

const StepWrapper = ({ children, setFieldValue, handleSubmit, onClose, formikValues ,setCurrentMonth}) => {
    const activeTab = formikValues.type;

    const handleStep = (direction) => {
        if (direction === "back") {
            if (activeTab === 3) {
                onClose?.();
            } else {
                setFieldValue("type", activeTab - 1);
            }
        } else if (direction === "next") {
            if (activeTab === 3) {
                alert("finish");
            } else {
                setFieldValue("type", activeTab + 1);
            }
        }
    };

    const isNextDisabled = () => {
        const { source, destination, adults, dateStart, dateEnd, tripType } = formikValues;
        switch (activeTab) {
            case 0:
                return !source;
            case 1:
                return !destination;
            case 3:
                return tripType === 'Return' ? !(dateStart && dateEnd) : !dateStart;
            default:
                return false;
        }
    };

    const getTripDuration = () => {
        const { dateStart, dateEnd, tripType } = formikValues;

        if (tripType === "Return" && dateStart && dateEnd) {
            const start = new Date(dateStart);
            const end = new Date(dateEnd);
            const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            return diff > 0 ? `${diff} days your trip` : '';
        }

        // if (tripType === "OneWay" && dateStart) {
        //     return `One-way: ${new Date(dateStart).toLocaleDateString()}`;
        // }

        return '';
    };

    const handleReset = () => {
        setFieldValue("dateStart", null);
        setFieldValue("dateEnd", null);
        setCurrentMonth(new Date())
    };

    return (
        <div className="bg-white rounded-2xl shadow overflow-hidden px-6 pt-3 pb-6">
            {children}
            {/* <div className="w-full my-4 h-[1px] bg-gray-200" /> */}
            <StepFooterBar
                activeTab={activeTab}
                isNextDisabled={isNextDisabled}
                getTripDuration={getTripDuration}
                handleReset={handleReset}
                handleStep={handleStep}
                onClose={onClose}
                handleSubmit={handleSubmit}
                formikValues={formikValues}

            />
        </div>
    );
};

export default StepWrapper;
