'use client'
import { CalendarBlank } from "@phosphor-icons/react";
import React, { useRef, useState } from "react";

export default function CustomDateInput({ value, onChange, error }) {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null); // ⬅️ create input reference

    const handlePlaceholderClick = () => {
        setIsFocused(true);
        inputRef.current?.focus(); // ⬅️ focus input directly
    };

    return (
        <div className="relative w-full ">
            {/* Placeholder Layer */}
            {!isFocused && !value && (
                <>
                    <div
                        onClick={handlePlaceholderClick}
                        className={
                            `             absolute  gap-4 inset-0 bg-white ${error ? 'text-alert' : 'text-600'} text-sm px-4 py-3 rounded-xl cursor-text z-10 flex items-center justify-between
                        border ${error ? 'border-alert' : 'border-gray-300'}`
                        }
                    >
                        Date of birth
                        <CalendarBlank size={18} />
                    </div>
                </>
            )
            }

            {/* Actual Input */}
            <input
                ref={inputRef}
                type="date"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => !value && setIsFocused(false)}
                className={
                    `w-full bg-100 text-600 text-sm px-4 py-3 pr-10 rounded-xl  focus:outline-none 
                border border-gray-300 ${error ? 'border-alert' : 'border-gray-300'}
selection:bg-[#F00] selection:text-white
    [&::-webkit-calendar-picker-indicator]:opacity-0
    [&::-webkit-calendar-picker-indicator]:pointer-events-none
    [&::-webkit-calendar-picker-indicator]:absolute`
                }
            />

        </div >
    );
}
