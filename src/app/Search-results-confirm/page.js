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

const FlightResults = () => {
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
      <div className="hidden lg:block">
        <Header isEditFlight/>
        <main className="w-[70%] mx-auto px-2">
          <Section><ProgressBar /></Section>
          <Section><RouteInfo /></Section>
          <Section className="mt-8 mb-4"><DateNavigation isEditFlight /></Section>
          {renderFlightList()}
          <div className="flex items-center justify-end gap-6 w-full mt-6">
            {/* Booking Info */}
            <BookingTotalBox />
          </div>

        </main>

        <SortFilterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onApply={() => { }} />
        <FlightDetailsModal isOpen={showDetails} onClose={() => setShowDetails(false)} flight={selectedFlight} />

      </div>

      {/* Mobile View */}
      <div className="lg:hidden  w-full">
        <HeaderBarMobile />
        <div className='w-[90%] mx-auto'>

          <Section><ProgressBarMb /></Section>
          <Section>
            <DateNavigation />
            <Divider />
          </Section>
          <FlightHeader
            count={flights.length}
            rightComponent={
              <span className="bg-100 p-1">
                <FunnelSimple size={20} className="text-600" weight="bold" />
              </span>
            }
          />
          <Section>{renderFlightList()}</Section>

        </div>



      </div>
    </>

  );
};


export default FlightResults
