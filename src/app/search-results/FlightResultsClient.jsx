'use client'
import React, { useEffect, useState } from 'react'
import DateNavigation from '@/components/FlightResults/DateNavigation'
import FilterControls from '@/components/FlightResults/FilterControls'
import FlightCard from '@/components/FlightResults/FlighSelectStep/FlightCard'
import Header from '@/components/FlightResults/Header'
import ProgressBar from '@/components/FlightResults/ProgressBar'
import RouteInfo from '@/components/FlightResults/RouteInfo'
import SortFilterModal from '@/components/FlightResults/FlighSelectStep/SortFilterModal'
import { FunnelSimple, X } from '@phosphor-icons/react'
import HeaderMobile from '@/components/FlightResults/HeaderMobile'
import ProgressBarMb from '@/components/FlightResults/ProgressBarMb'
import Section from '@/components/FlightResults/Section'
import FlighSelectStep from '@/components/FlightResults/FlighSelectStep/FlighSelectStep'
import Divider from '@/components/FlightResults/FlighSelectStep/Divider'
import SearchResultsFooter from '@/components/FlightResults/SearchResultsFooter'
import PassengerDetails from '@/components/FlightResults/PassengerDetails/PassengerDetails'
import Payment from '@/components/FlightResults/PaymentStep/Payment'
import { AirplaneTilt, ArrowsClockwise, Briefcase, CheckCircle, EyeSlash, SuitcaseSimple, XCircle } from '@phosphor-icons/react';
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setSearchParams, setSelectedF, setSelectedPlan } from '@/store/flightSlice'
import { createPaymentService, getFlightsService } from '@/store/Services/flightServices'
import NoResults from '@/components/FlightResults/NoResults'
import Screen from '@/components/Ui/Screen'
import SessionExpiredModal from '@/components/FlightResults/SessionExpiredModal'
import { useRouter } from 'next/navigation'
import POSNotice from '@/components/FlightResults/POSNotice'
import PosSelectorModal from '@/components/FlightResults/FlighSelectStep/PosSelectorModal'

const FlightResultsClient = () => {
    const dispatch = useDispatch()
    const { flights, selectedPassengers, searchParams, isLoadingFlights, selectedPlan } = useSelector((state) => state.flights);
    const { flighttype } = searchParams
    const router = useRouter()

    const [showNoice, setShowNotice] = useState(true);
    const [showPosModal, setShowPosModal] = useState(false);
    const [localLoading, setLocalLoading] = useState(true);
    const [isSessionModalOpen, setSessionModalOpen] = useState(false);

    const [isFilterModalOpen, setFilterModalOpen] = useState(false);
    const [isShowDetailsModalOpen, setFlightDetailsOpen] = useState(false);
    const [expandedFlight, setExpandedFlight] = useState(null);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [activeStep, setActiveStep] = useState(0);

    const handleDetailsClick = (flight) => {
        setExpandedFlight(flight);
        setFlightDetailsOpen(true);

    };


    const HeaderBarMobile = () => (
        <div className="px-3 flex items-center justify-between h-16 shadow-md bg-[#F1F1F1]">
            <HeaderMobile />
        </div>
    );

    const handleSelectPlan = (event, flight, col) => {
        event.stopPropagation(); // Prevent bubbling
        dispatch(setSelectedF(flight))
        dispatch(setSelectedPlan(col))

        setSelectedFlight(flight);
        setSelectedType(col);
    };
    const handlePayment = () => {
        const info = selectedType[selectedType.type]

        const data = {
            bookingInfo: {
                transactionId: info.transaction_id,
                travelers: selectedFlight.common_info.travelers,
                segments: selectedFlight.common_info.segments.map((s) => {
                    return {
                        originCode: s.origin_code,
                        destinationCode: s.destination_code,
                        departureDate: s.departure_date,
                        departureTime: s.departure_time,
                        arrivalDate: s.arrival_date,
                        arrivalTime: s.arrival_time,
                        rph: s.rph,
                        journeyDuration: s.journey_duration,
                        flightNumber: s.FlightNumber,
                    }
                }),
                flightClass: selectedType.type === "Economy" ? "Y" : "C",
                paymentAmount: info.total_fare_USD,
                posId: selectedType.commonInfo.pos_id
                ,
                flightType: selectedFlight.common_info.flight,
                ContactInfo: selectedPassengers

            },
            stripeInfo: {
                Amount: Number(info.total_fare),
                Currency: selectedPlan.commonInfo.currency.toLowerCase(),
                Description:
                    `${selectedFlight.common_info.segments[0].origin_code}_${selectedFlight.common_info.segments[0].destination_code}_${selectedFlight.common_info.flight}`
            }
        }

        dispatch(createPaymentService(data)).then((action) => {
            if (createPaymentService.fulfilled.match(action)) {
                const { checkoutUrl } = action.payload;

                if (checkoutUrl) {
                    window.open(checkoutUrl, '_self');
                } else {
                    console.error("Checkout URL not found in payload");
                }
            }
        });

    }
    const handleClickDate = (type) => {

        const originalDate = new Date(searchParams.date + 'Z'); // treat as UTC
        const dateReturn = searchParams.date_return ? new Date(searchParams.date_return + 'Z') : null;

        const year = originalDate.getUTCFullYear();
        const month = originalDate.getUTCMonth();
        const day = originalDate.getUTCDate();

        const delta = type === "next" ? 1 : -1;
        const adjustedDate = new Date(Date.UTC(year, month, day + delta));
        if (dateReturn && adjustedDate > dateReturn) return;

        const formattedDateOnly = `${adjustedDate.getUTCFullYear()}-${String(adjustedDate.getUTCMonth() + 1).padStart(2, '0')}-${String(adjustedDate.getUTCDate()).padStart(2, '0')}`;
        const formattedFullDate = `${formattedDateOnly}T00:00:00`;


        dispatch(setSearchParams({ ...searchParams, date: formattedFullDate }));
        loadFlightsWithDelay({ date: formattedFullDate });
    };




    const steps = [
        {
            label: 'Select flight',
            content: <FlighSelectStep
                handleDetailsClick={handleDetailsClick}
                flights={flights}
                isFilterModalOpen={isFilterModalOpen}
                setFilterModalOpen={setFilterModalOpen}
                isShowDetailsModalOpen={isShowDetailsModalOpen}
                setFlightDetailsOpen={setFlightDetailsOpen}
                expandedFlight={expandedFlight}
                handleSelectPlan={handleSelectPlan}
                selectedFlight={selectedFlight}
                setActiveStep={setActiveStep}
                selectedType={selectedType}
                setSelectedFlight={setSelectedFlight}
                handleClickDate={handleClickDate}
            />
        },
        {
            label: 'Passenger details', content: <PassengerDetails
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                selectedFlight={selectedFlight}
                selectedType={selectedType}
            />

        },
        // { label: 'Seats & Extras', content: <p>3</p> },
        {
            label: 'Pay & confirm', content: <Payment setActiveStep={setActiveStep}
                activeStep={activeStep}

                selectedFlight={selectedFlight}
                selectedType={selectedType}
                handlePayment={handlePayment}
            />
        },
    ];

    const loadFlightsWithDelay = (override = {}) => {
        setLocalLoading(true);

        const updatedDate = override.date || searchParams.date;

        const data = {
            ...searchParams,
            ...override,
            date: updatedDate,
        };

        dispatch(getFlightsService(data));

        const timer = setTimeout(() => {
            setLocalLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    };


    useEffect(() => {
        const data = searchParams;
        const { origin_id, destination_id, date } = searchParams;

        if (!origin_id || !destination_id || !date) {
            router.push("/");
        } else {
            dispatch(getFlightsService(data)).then((action) => {
                if (getFlightsService.rejected.match(action)) {
                    router.push("/");
                }
            });


            const timer = setTimeout(() => {
                setLocalLoading(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, []);


    const handleSelectPos = (id) => {
        const newParams = {
            ...searchParams,
            pos_id: id
        }
        dispatch(getFlightsService(newParams))
        setShowPosModal(false)
    };
    useEffect(() => {
        window.scroll(0, 0)
    }, [activeStep])


    const [timeLeft, setTimeLeft] = useState(7 * 60);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setSessionModalOpen(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    const handleSearchAgain = () => {
        const data = searchParams
        dispatch(getFlightsService(data)).then((action) => {
            if (getFlightsService.fulfilled.match(action)) {
                setSessionModalOpen(false)
                setTimeLeft(7 * 60)
            }
        });
    }
    return (
        <>

            {(isLoadingFlights || localLoading) ? <Screen /> :


                <div className="">
                    <div className='hidden lg:block'>
                        <Header />
                        <main className="w-[70%] mx-auto px-2">
                            <Section><ProgressBar steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} /></Section>

                            <Section><RouteInfo /></Section>
                            {showNoice && (activeStep === 0) &&
                                <POSNotice setShowNotice={setShowNotice} setShowPosModal={setShowPosModal} />
                            }
                            {!selectedFlight &&
                                <Section ><DateNavigation handleClickDate={handleClickDate} /></Section>

                            }
                        </main>
                        <Divider />
                    </div>
                    <div className="lg:hidden  w-full">
                        <HeaderBarMobile />
                        <Section><ProgressBar steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} /></Section>
                        {!selectedFlight &&
                            <Section ><DateNavigation handleClickDate={handleClickDate} /></Section>

                        }
                        {showNoice && (activeStep === 0) &&
                            <POSNotice setShowNotice={setShowNotice} setShowPosModal={setShowPosModal} />
                        }

                        {/* <main className="w-[95%] md:w-[70%] mx-auto px-2 py-4">

                        <ProgressBarMb />
                    </main> */}
                    </div>

                    <main className="w-[95%] md:w-[70%] mx-auto px-2">
                        {steps[activeStep].content}
                        <Section>
                            {flights?.length === 0 && <NoResults />}
                        </Section>
                    </main>

                    {/* <SearchResultsFooter /> */}
                </div>}

            <SessionExpiredModal
                isOpen={isSessionModalOpen}
                onClose={() => setSessionModalOpen(false)}
                handleSearchAgain={handleSearchAgain}
            />
            <PosSelectorModal handleSelectPos={handleSelectPos} isOpen={showPosModal} setIsOpen={setShowPosModal} />

        </>

    );
};


export default FlightResultsClient
