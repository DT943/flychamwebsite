'use client'
import React, { useEffect, useState } from 'react';
import { EnvelopeSimple, Clock, DownloadSimple, ArrowLeft } from '@phosphor-icons/react';
import logoEn from "@/assets/images/logoEn.png"
import Image from 'next/image';
import FlightTimeInfo from '@/components/FlightResults/FlightTimeInfo';
import { useDispatch, useSelector } from 'react-redux';
import mask from "@/assets/images/mask.png"
import check from "@/assets/images/check.png"
import Divider from '@/components/FlightResults/FlighSelectStep/Divider';
import { getBySessionIdService } from '@/store/Services/flightServices';
import { useRouter, useSearchParams } from 'next/navigation';
import Screen from '@/components/Ui/Screen';
import useFormattedFlightTimes from '@/hooks/useFormattedFlightTimes';
import useIsMobile from '@/hooks/useIsMobile';
import formatTime from '@/util/formatFlightTime';

const BookingConfirm = () => {
    const dispatch = useDispatch();
    const { selectedFlight, sessionInfo, selectedPlan } = useSelector((s) => s.flights);

    const isXl = useIsMobile(1280);
    const isLg = useIsMobile(1078);
    const isMd = useIsMobile(768);
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { duration, stops } = useFormattedFlightTimes(selectedFlight);

    useEffect(() => {
        if (sessionId) {
            dispatch(getBySessionIdService(sessionId))
                .catch(() => setError(true))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
            setError(true);
        }
    }, [dispatch, sessionId]);

    if (loading) return <Screen />;
    if (error || !sessionInfo || !sessionInfo.contact) {
        return <p className="text-center text-alert font-semibold mt-10">Something went wrong. Please try again later.</p>;
    }

    const info = [
        {
            label: "Name",
            value: `${sessionInfo?.contact?.firstName ?? ''} ${sessionInfo?.contact?.lastName ?? ''}`
        },
        {
            label: "Passengers",
            value: sessionInfo?.passengers?.length ?? 0
        },
        {
            label: "Contact",
            value: sessionInfo?.contact?.phoneNumber ?? '-'
        },
        {
            label: "Email",
            value: sessionInfo?.contact?.email ?? '-'
        },
        {
            label: "Booking reference",
            value: sessionInfo?.pnr ?? '-'
        },
        {
            label: "Flight number",
            value: sessionInfo?.segments?.[0]?.flightNumber ?? '-'
        }
    ];
    const router = useRouter()
    const handleClickHome = () => {
        router.push("/")
    }

    return (
        <div className="w-full max-w-[1200px] mx-auto bg-white py-4 px-4 flex flex-col items-center">
            <div className="flex flex-col items-center mb-10">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Image src={check} alt="check" />
                </div>
                <h1 className="text-2xl font-bold text-primary-1 mb-1">Booking confirmed</h1>
                <p className="text-lg text-600">Thank you for your payment</p>
            </div>

            <div className="max-h-[1200px] shadow-lg rounded-[20px] overflow-hidden relative mb-6">
                {/* <div className="absolute top-0 left-1/2 transform -translate-x-[-180px] -translate-y-1/2 w-10 h-10 bg-white rounded-b-full z-10 shadow-lg" />
        <div className="absolute border border-[#ccc] bottom-0 left-1/2 transform -translate-x-[-180px] translate-y-1/2 w-10 h-10 bg-white rounded-t-full z-10 shadow-lg" />
        <div className="absolute top-1/2 -left-[10px] w-5 h-5 rounded-full bg-white border transform -translate-y-1/2" /> */}

                <div className="flex justify-between items-start bg-100 px-3 py-4 text-primary-1">
                    <Image src={logoEn} alt="Logo" />
                    <div className="flex justify-end items-center gap-2 p-[12px_15px] bg-primary-1 rounded-[8px]">
                        <span className="text-white text-xs font-semibold px-3 py-1">{selectedPlan?.title}</span>
                    </div>
                </div>

                <div className='flex'>
                    <div className="flex flex-col justify-between bg-50 relative p-4">
                        {sessionInfo?.segments?.map((s, idx) => {
                            const departureTime = s?.departureDateTime?.split("T")[1] ?? "-";
                            const arrivalTime = s?.arrivalDateTime?.split("T")[1] ?? "-";
                            const segment = {
                                id: s?.id,
                                flightNumber: s?.flightNumber,
                                origin_code: s?.departureAirportCode,
                                destination_code: s?.arrivalAirportCode,
                                departure_time: departureTime,
                                arrival_time: arrivalTime,
                                terminal: s?.terminal,
                                cabinClass: s?.cabinClass,
                                status: s?.status,
                                rph: s?.rph,
                                comment: s?.comment
                            };
                            return (
                                <FlightTimeInfo
                                    key={s?.id || idx}
                                    s={segment}
                                    idx={idx}
                                    flight={selectedFlight}
                                    isLg={isLg}
                                    isMd={isMd}
                                    isXl={isXl}
                                />
                            );
                        })}

                        <div className="flex justify-between bg-[#A6CFE04D] rounded-lg px-2 py-3 mt-6 text-sm text-500">
                            <div className="flex items-start gap-2">
                                <EnvelopeSimple size={24} />
                                <span className='text-[12px] text-500'>We’ve sent your booking confirmation to your email</span>
                            </div>
                            <div className="border-l border-gray-300 h-5 self-center mx-4" />
                            <div className="flex items-start gap-2">
                                <Clock size={24} />
                                <span className='text-[12px] text-500'>Please arrive at the airport at least 3 hours before departure</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-1/3 bg-white p-6 flex flex-col justify-between">
                        {/* <div className="absolute inset-y-0 inset-x-0 left-[69%] w-[10px] border-dashed border-l border-gray-300" /> */}
                        <div className="grid grid-cols-1 gap-y-4 text-sm">
                            {info.reduce((acc, curr, index) => {
                                if (index % 2 === 0) {
                                    acc.push([curr]);
                                } else {
                                    acc[acc.length - 1].push(curr);
                                }
                                return acc;
                            }, []).map((pair, idx) => (
                                <div key={idx} className="grid grid-cols-2 gap-x-6">
                                    {pair.map(({ label, value }, i) => (
                                        <div key={i}>
                                            <div className="text-gray-500">{label}</div>
                                            <div className="font-medium">{value}</div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full border shadow-md border-[#FDFDFC] rounded-[20px] py-6 px-4 mb-6">
                <h3 className="text-sm font-semibold mb-4">Payment Summary</h3>
                <div className="flex justify-between text-sm mb-2 text-600">
                    <span>Base fare</span>
                    <span>{sessionInfo?.baseFareAmount ?? '-'}</span>
                </div>
                <div className="flex justify-between text-sm mb-2 text-600">
                    <span>Taxes & fees</span>
                    <span>{sessionInfo?.taxes?.[0]?.amount ?? '-'}</span>
                </div>
                <Divider />
                <div className="flex justify-between text-sm font-semibold text-primary-1 mb-2">
                    <span>Total Paid</span>
                    <span>{sessionInfo?.paymentAmount ?? '-'}</span>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <button
                    onClick={handleClickHome}
                    className="flex items-center gap-2 border border-primary-1 text-primary-1 px-5 py-2 rounded-md font-medium">
                    <ArrowLeft size={18} />
                    Back to Home Page
                </button>
            </div>
        </div>
    );
};

export default BookingConfirm;