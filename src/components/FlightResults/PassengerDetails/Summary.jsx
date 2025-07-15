'use client'
import React from 'react';
import { ArrowRight, CheckCircle } from '@phosphor-icons/react';
import tabIcon from '@/assets/images/tabicon.png';
import Image from 'next/image';
import DurationDashed from '../DurationDashed';
import formatDateReadble from '@/util/formatDateReadble';
import useFlightRouteDetails from '@/hooks/useFlightRouteDetails';
import useFormattedFlightTimes from '@/hooks/useFormattedFlightTimes';
import useFlightDetails from '@/hooks/useFlightDetails';
import FlightTimeInfo from '../FlightTimeInfo';
import useIsMobile from '@/hooks/useIsMobile';
const data = {
    title: 'Price summary',
    from: 'Damascus',
    to: 'Dubai',
    date: '10, JUL 2025',
    time: { dep: '16:00', arr: '18:30', depCode: 'DAM', arrCode: 'DXB', duration: 'Non-stop, 2h 30m' },
    classType: 'Business',
    fare: { label: 'Adult X1', base: 'USD 850', taxes: 'USD 45', total: 'USD 900' },
    note: 'Free cancellation within 24 hours of booking',
    links: [
        { label: 'View detailed fare rules', href: '#' },
        { label: 'Cost breakdown', href: '#' }
    ]
};

const Summary = ({ selectedFlight, selectedType }) => {
    const { origin, destination, date } = useFlightRouteDetails();
    const isXl = useIsMobile(1280);
    const isLg = useIsMobile(1078);
    const isMd = useIsMobile(768);


    const { arrivalTime, departureTime, duration, segments } = useFormattedFlightTimes(selectedFlight);

    console.log('selectedType', selectedType);


    const {
        type,
        transaction_id,
        total_fare_USD,
        pricing_info,
        info
    } = useFlightDetails(selectedType);

    const getLabel = (key) => {
        switch (key) {
            case "ADT":
                return "Adult";
            case "CHD":
                return "Child";
            case "INF":
                return "Infant";
            default:
                return key;
        }
    };

    return (
        <div className="bg-white rounded-xl p-6 w-full   text-sm font-[Montserrat] shadow-summary">
            <h2 className="text-[#000] text-[18px] font-semibold mb-4">Price summary</h2>

            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 font-semibold text-[16px]">
                    <span className="text-primary-1">{origin.city}</span>
                    <ArrowRight size={16} className="text-[#5F5F5C]" />
                    <span className="text-primary-1">{destination.city}</span>
                    <CheckCircle size={16} weight="fill" className="text-green" />
                </div>
            </div>
            <p className="text-[#5F5F5C] text-sm mb-4">{formatDateReadble(date)}</p>

            {/* <div className="flex justify-between items-center text-sm mb-1 gap-4">

                <div className="flex-1 text-start">
                    <div className="text-800 text-[14px]">{departureTime}</div>
                    <div className="text-800 text-[12px]">{origin.iataCode}</div>
                </div>

                <div className="flex flex-col items-center  ">

                    <DurationDashed
                        length={5}      
                        width={28}     
                        height={28}        
                        logoWidth={14}     
                        startSize={6}     
                    />              
                    <span className="text-[12px] text-600 mt-1">{duration}</span>
                </div>

                <div className="flex-1 text-start">
                    <div className="text-800 text-[14px]">{arrivalTime}</div>
                    <div className="text-800 text-[12px]">{destination.iataCode}</div>
                </div>
            </div> */}

            {/* Arrival */}
            {segments?.map((s, idx) => {
                return (

                    <FlightTimeInfo
                        s={s}
                        idx={idx}
                        flight={selectedFlight}
                        isLg={isLg}
                        isMd={isMd}
                        isXl={isXl}
                        isSummary
                    />
                )
            })}
            <div className="mt-3 mb-4">
                <span className="inline-block bg-primary-1 text-white text-sm font-medium px-4 py-1">
                    {type}
                </span>
            </div>

            <hr className="border-t border-[#E5E5E3] my-4" />
            <div className="text-sm space-y-2">
                {info.pricing_info.map((item) => {
                    return (
                        <>
                            <div className="flex justify-between text-[#000]">
                                <span className="text-[16px] font-semibold">Per {getLabel(item.PaxType)}</span>
                            </div>
                            <div className="flex justify-between"><span className="text-600"> Fare</span><span className="text-600">{item.BaseFare}</span></div>
                            <div className="flex justify-between"><span className="text-600">Taxes</span><span className="text-600">{item.TotalTax}</span></div>
                            <div className="flex justify-between"><span className="text-600">Fees</span><span className="text-600">{item.TotalFees}</span></div>
                            <div className="flex justify-between font-semibold mt-3"><span className="text-700"> Sub-total</span><span className="text-700 text-lg">{item.TotalFare}</span></div>
                            <hr className="border-t border-[#E5E5E3] my-4" />

                        </>
                    )
                })}
            </div>

            <div className="flex justify-between font-semibold mt-3  text-lg"><span className="text-700"> Total</span>
                <span className="text-700 text-lg">{info.total_fare_USD}
                </span></div>




            <hr className="border-t border-[#E5E5E3] my-4" />

            {/* <p className="text-600 text-xs mb-4">{data.note}</p> */}

            <div className="space-y-2 text-sm">
                {data.links.map(({ label, href }, i) => (
                    <a key={i} href={href} className="text-primary-1 underline font-medium">{label}</a>
                ))}
            </div>
        </div>
    );
}

export default Summary;
