'use client'
import React, { useState } from 'react'
import DateNavigation from '@/components/FlightResults/DateNavigation'
import FilterControls from '@/components/FlightResults/FilterControls'
import FlightCard from '@/components/FlightResults/FlighSelectStep/FlightCard'
import Header from '@/components/FlightResults/Header'
import ProgressBar from '@/components/FlightResults/ProgressBar'
import RouteInfo from '@/components/FlightResults/RouteInfo'
import SortFilterModal from '@/components/FlightResults/FlighSelectStep/SortFilterModal'
import FlightDetailsModal from '@/components/FlightResults/FlighSelectStep/FlightDetailsModal' // you’ll need to create this
import SearchFooter from '@/components/FlightResults/SearchResultsFooter'
import { FunnelSimple, X } from '@phosphor-icons/react'
import HeaderMobile from '@/components/FlightResults/HeaderMobile'
import ProgressBarMb from '@/components/FlightResults/ProgressBarMb'
import Section from '@/components/FlightResults/Section'
import BookingTotalBox from '@/components/FlightResults/BookingTotalBox'
import Title from '@/components/FlightResults/PassengerDetails/Title'
import Summary from '@/components/FlightResults/PassengerDetails/Summary'
import Input from '@/components/Ui/Input'
import TitleDropdown from '@/components/Ui/TitleDropdown'
import DatePicker from 'react-datepicker'
import DateInput from '@/components/Ui/DateInput'
import FormTitle from '@/components/FlightResults/PassengerDetails/FormTitle'

const PassengerDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState(null);

    const flights = [
        {
            departureTime: "22:15", arrivalTime: "02:30", departureCode: "DAM", arrivalCode: "DXB",
            duration: "4h 15m", stops: "1 Stop", businessPrice: 850, stop: true, price: 550, special: true
        },

    ];

    const handleDetailsClick = (flight) => {
        setSelectedFlight(flight);
        setShowDetails(true);
    };

    const renderFlightList = () => (
        <div className="grid gap-6 my-5 ">
            {flights.map((flight, index) => (
                <FlightCard
                    key={index}
                    {...flight}
                    economyPrice={flight.price}
                    preconomyPriceice={flight.price}
                    onDetailsClick={() => handleDetailsClick(flight)}
                    isConfirmed
                />
            ))}
        </div>
    );


    const Divider = () => (
        <div className="w-full my-4 h-px bg-[var(--bg-300)]" />
    );

    const FlightHeader = ({ count, rightComponent }) => (
        <div className="my-4 px-3 flex justify-between items-center mb-6">
            <span className="text-black text-sm font-medium">({count} Result)</span>
            {rightComponent}
        </div>
    );

    const HeaderBarMobile = () => (
        <div className="px-3 flex items-center justify-between h-16 shadow-md bg-[#F1F1F1]">
            <HeaderMobile />
        </div>
    );

    return (
        <>
            {/* Desktop View */}
            <div className="">
                <div className='hidden lg:block'>
                    <Header isEditFlight />

                </div>
                <div className='block lg:hidden'>
                    <HeaderBarMobile />
                </div>
                <main className="w-[100%] md:w-[70%] mx-auto px-2">
                    {/* <Section><ProgressBar /></Section> */}
                    <Section><RouteInfo /></Section>
                    <Section>
                        <div className='flex flex-col xl:flex-row'>
                            <div className='w-full '>

                                <Title />
                                <div className='my-6'>

                                    {/* Form  */}
                                    <FormTitle type="Adult" />
                                    <div class="relative w-full md:w-40 flex gap-4 items-center">
                                        <TitleDropdown />
                                    </div>
                                    <div class="my-4 pr-0 md:pr-8 flex  gap-4">
                                        <div class="relative w-full flex flex-col md:flex-row gap-4 items-center">
                                            <Input
                                                id="email"
                                                type="email"
                                                label="Email"
                                                name="email"
                                                placeholder="you@email.com"
                                            // value={formData.email}
                                            // onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                            <Input
                                                id="email"
                                                type="email"
                                                label="Email"
                                                name="email"
                                                placeholder="you@email.com"
                                            // value={formData.email}
                                            // onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />

                                        </div>

                                    </div>
                                    <div class="relative w-full flex-col md:flex-row pr-0  md:pr-8 flex gap-4 items-center">
                                        <DateInput />
                                        <TitleDropdown />
                                    </div>
                                </div>
                            </div>
                            <div className='w-full '>

                                <Summary />
                            </div>

                        </div>




                    </Section>



                </main>



            </div>

            {/* Mobile View */}
            {/* <div className="lg:hidden  w-full">
                <HeaderBarMobile />
                <div className='w-[90%] mx-auto'>

                    <Section><ProgressBarMb /></Section>


                </div>



            </div> */}
        </>

    );
};


export default PassengerDetails
