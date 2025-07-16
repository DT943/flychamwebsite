'use client'
import React, { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { arSA, enUS } from 'date-fns/locale';
import useIsMobile from '@/hooks/useIsMobile';
import useIsArabic from '@/hooks/useIsArabic';
import TripTypeSelector from '../../TripTypeSelector';
import MonthNavigation from './MonthNavigation';
import SelectedDateDisplay from './SelectedDateDisplay';
import CustomDayContent from './CustomDayContent';

const Dates = ({ formik, handleDateSelect, currentMonth, setCurrentMonth, minMonth, setMinMonth, handleOneWayDateSelect }) => {
    const [shouldAnimateMonth, setShouldAnimateMonth] = useState(false);

    const isMobile = useIsMobile('768');
    const isArabic = useIsArabic();
    const tripType = formik.values.tripType;

    const selected = tripType === 'OneWay'
        ? formik.values.dateStart
            ? new Date(formik.values.dateStart)
            : undefined
        : formik.values.dateStart && formik.values.dateEnd
            ? {
                from: new Date(formik.values.dateStart),
                to: new Date(formik.values.dateEnd)
            }
            : undefined;




    const handleMonthChange = (newMonth) => {
        const normalizedNewMonth = new Date(newMonth.getFullYear(), newMonth.getMonth(), 1);
        const normalizedMinMonth = new Date(minMonth.getFullYear(), minMonth.getMonth(), 1);

        if (normalizedNewMonth < normalizedMinMonth) return;

        setCurrentMonth(normalizedNewMonth);
        setShouldAnimateMonth(true);
    };


    // Automatically stop the animation after 300ms
    useEffect(() => {
        if (shouldAnimateMonth) {
            const timeout = setTimeout(() => {
                setShouldAnimateMonth(false);
            }, 300); // match animation duration
            return () => clearTimeout(timeout);
        }
    }, [shouldAnimateMonth]);


    return (
        <div className="bg-white rounded-2xl p-6 w-full max-w-5xl mx-auto">
            <TripTypeSelector isMobile={isMobile} formik={formik} />
            <div className="hidden md:block w-full my-3 h-[1px] bg-gray-200"></div>

            <SelectedDateDisplay selected={selected} tripType={tripType} />

            <div
                className={`relative transition-all duration-300 ease-in-out ${shouldAnimateMonth ? 'animate-fadeInLeft' : ''
                    }`}
            >
                <MonthNavigation
                    currentMonth={currentMonth}
                    minMonth={new Date()}
                    handleMonthChange={handleMonthChange}
                />

                <DayPicker
                    month={currentMonth}
                    numberOfMonths={isMobile ? 1 : 2}
                    fromMonth={tripType === 'Return' ? minMonth : undefined}

                    pagedNavigation
                    locale={isArabic ? arSA : enUS}
                    disabled={{
                        before:
                            tripType === 'OneWay'
                                ? new Date()
                                : formik.values.dateStart
                                    ? new Date(formik.values.dateStart)
                                    : new Date()
                    }}
                    mode={tripType === 'OneWay' ? 'single' : 'range'}
                    selected={selected}
                    onSelect={tripType === 'OneWay' ? handleOneWayDateSelect : handleDateSelect}
                    className="flex justify-center"
                    classNames={{
                        head_cell: 'uppercase text-xs font-bold text-gray-500 text-center',
                        caption_label: 'text-center text-lg font-semibold text-black',
                        day: 'text-sm text-black transition duration-300 ease-in-out w-8 h-8',
                        today: '',
                        selected:
                            tripType === 'OneWay'
                                ? 'rounded-full text-white bg-secondary'
                                : 'bg-[#B6A889] text-black',
                        range_middle: 'bg-[#e6dabc61] text-black',
                        range_start: isArabic
                            ? 'rounded-r-xl text-white'
                            : 'rounded-l-xl text-white',
                        range_end: isArabic
                            ? 'rounded-l-xl text-white'
                            : 'rounded-r-xl text-white',
                    }}
                    components={{
                        DayContent: (props) => (
                            <CustomDayContent {...props} isArabic={isArabic} />
                        ),
                    }}
                />

                <div className="hidden md:block absolute left-1/2 top-5 bottom-5 w-[1px] bg-gray-200"></div>
            </div>

            <div className="hidden md:block w-full my-3 h-[1px] bg-gray-200"></div>
        </div>
    );
};

export default React.memo(Dates);
