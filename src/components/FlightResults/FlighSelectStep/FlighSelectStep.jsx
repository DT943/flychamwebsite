'use client'
import React from 'react'
import Section from '../Section'
import DateNavigation from '../DateNavigation'
import Divider from './Divider'
import FlightHeader from './FlightHeader'
import FlightList from './FlightList'
import SortFilterModal from './SortFilterModal'
import FlightDetailsModal from './FlightDetailsModal'

const FlighSelectStep = ({ flights, setFilterModalOpen, handleDetailsClick, isFilterModalOpen, isShowDetailsModalOpen,
  setFlightDetailsOpen, expandedFlight, handleSelectPlan, selectedFlight, setActiveStep, selectedType,
  setSelectedFlight,handleClickDate
}) => {
  return (
    <div>
      {!selectedFlight &&
        <>
          {/* <Section ><DateNavigation handleClickDate={handleClickDate}/></Section> */}

          <FlightHeader
            count={flights.length}
            setFilterModalOpen={setFilterModalOpen}

          />
        </>
      }
      <FlightList flights={flights} onDetailsClick={handleDetailsClick}
        handleSelectPlan={handleSelectPlan} selectedFlight={selectedFlight} setActiveStep={setActiveStep}
        selectedType={selectedType} setSelectedFlight={setSelectedFlight}
      />
      <SortFilterModal isOpen={isFilterModalOpen} onClose={() => setFilterModalOpen(false)} onApply={() => { }} />
      <FlightDetailsModal isOpen={isShowDetailsModalOpen} onClose={() => setFlightDetailsOpen(false)} flight={expandedFlight} />

    </div>
  )
}

export default FlighSelectStep