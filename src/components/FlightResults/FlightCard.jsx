'use client';
import React, { useState } from 'react';
import useIsMobile from '@/hooks/useIsMobile';
import { CaretDown, CaretUp, CheckCircle } from '@phosphor-icons/react';
import FlightDetails from './FlightDetails';
import { motion, AnimatePresence } from 'framer-motion';
import FareCard from './FareCard';
import FlightCodes from './FlightCodes';
import FlightTimeInfo from './FlightTimeInfo';


// Main Card
const FlightCard = ({
    departureTime,
    arrivalTime,
    departureCode,
    arrivalCode,
    duration,
    stops,
    economyPrice,
    businessPrice,
    isExpanded = false,
    onDetailsClick, special, isConfirmed
}) => {
    const isLg = useIsMobile(1078);
    const [expanded, setExpanded] = useState(isExpanded);

    return (
        <article
            onClick={() => setExpanded(prev => !prev)}
            className={`
                relative  
    w-full p-4 lg:py-8 lg:px-8 flex flex-col items-center lg:items-stretch 
    rounded-[12px]
    ${isConfirmed
                    ? 'border border-[var(--green)] bg-[#F5F5F4] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.15)]'
                    : 'bg-100'
                }
    ${!isConfirmed ? 'cursor-pointer' : ''}
  `}
        >
            {isConfirmed && (
                <div className="absolute top-0 right-0 flex items-center justify-center gap-1 rounded-bl-[12px] rounded-tr-[12px] bg-green px-3 py-1 text-white text-xs font-semibold shadow-sm">
                    <CheckCircle color='#FFF' size={18} weight='bold' /> Selected flight
                </div>
            )}

            <div className={`flex   gap-0 ${isLg ? 'flex-col' : 'flex-row '}   md:gap-3  justify-between  items-start lg:items-center`}>

                <div className='flex flex-col items-start gap-4 '>
                    <div className="text-[#B00300] text-sm pt-2 self-center">
                        {stops}, {duration}
                    </div>
                    <FlightTimeInfo
                        departureTime={departureTime}
                        arrivalTime={arrivalTime}
                        departureCode={departureCode}
                        arrivalCode={arrivalCode}
                        duration={duration}
                        stops={stops}
                    />
                    <button
                        onClick={onDetailsClick}
                        className="cursor-pointer text-primary-1 text-[12px] md:text-sm font-bold underline  w-fit"
                    >
                        Flight details
                    </button>
                </div>
                <div className="w-full flex justify-between items-center  flex-wrap gap-4 my-2 md:my-0">

                    <div className="w-full flex flex-row gap-4 items-center md:items-start self-center justify-center xl:justify-end">
                        {isConfirmed ?
                            <div className=" bg-primary-1 text-white text-sm font-medium px-4 py-1 rounded-full ">
                                Business
                            </div>

                            :
                            <>
                                <FareCard type="Economy" price={economyPrice} special={special} isLg={isLg} />
                                <FareCard type="Business" price={businessPrice} special={special} isLg={isLg} />
                            </>
                        }


                        {!isConfirmed &&

                            <div className="hidden xl:block cursor-pointer" >
                                <AnimatePresence mode="wait" initial={false}>
                                    {expanded ? (
                                        <motion.span
                                            key="up"
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <CaretUp size={28} className="text-primary-1" />
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="down"
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <CaretDown size={28} className="text-primary-1" />
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </div>

                        }



                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-[#E5E5E3] my-4 lg:my-6" />

            <FlightCodes />


            {!isConfirmed &&

                <AnimatePresence initial={false}>
                    {expanded && (
                        <motion.div
                            key="flight-details"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                            className="overflow-hidden w-full "
                        >
                            <FlightDetails />
                        </motion.div>
                    )}
                </AnimatePresence>

            }



        </article>
    );
};

export default FlightCard;
