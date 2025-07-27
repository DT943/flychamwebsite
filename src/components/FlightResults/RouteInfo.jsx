'use client'
import useFlightRouteDetails from '@/hooks/useFlightRouteDetails';
import useIsMobile from '@/hooks/useIsMobile';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import React from 'react';
import { useSelector } from 'react-redux';

const RouteInfo = ({ activeStep, selectedFlight }) => {
    console.log('selectedFlight', selectedFlight);
    const { selectedPlan } = useSelector((s) => s.flights)
    const firstSegment = selectedPlan?.commonInfo?.segments?.[0];
    const destenationAirPortName = firstSegment
        ? `${firstSegment.destination_name} ${firstSegment.destination_code}`
        : '';
    const isLg = !useIsMobile(1024);
    const { destination, origin, date, flighttype } = useFlightRouteDetails()
    return (
        <section className="">
            <div className="flex">
                <div className="flex items-start justify-center gap-4 flex-wrap md:flex-nowrap">
                    {/* From */}
                    <div className="text-center">
                        <h1 className="text-primary-1 text-[16px] lg:text-[32px]  font-bold leading-tight">
                            {origin.city}
                        </h1>

                        <p className="hidden lg:block text-primary-1 text-sm text-start font-normal">
                            {`${origin.originAirPortName} (${origin.iataCode})`}
                        </p>



                    </div>

                    {/* Arrow */}
                    <div className="flex flex-col item-center">

                        <div className="flex justify-center items-center">
                            <ArrowRight size={isLg ? 30 : 20} className='text-400' />
                        </div>
                        {flighttype === "Return" &&
                            <div className="flex justify-center items-center">
                                <ArrowLeft size={isLg ? 30 : 20} className='text-400' />
                            </div>
                        }
                    </div>

                    {/* To */}
                    <div className="text-center">
                        <h1 className="text-primary-1 text-[16px] lg:text-[32px]  font-bold leading-tight">
                            {destination.city}
                        </h1>
                        { }
                        <p className="hidden lg:block text-primary-1 text-sm text-start font-normal">
                            {(Boolean(selectedFlight) || activeStep > 0) ?
                                destenationAirPortName :
                                `${destination.destenationAirPortName} (${destination.iataCode})`
                            }
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RouteInfo;
