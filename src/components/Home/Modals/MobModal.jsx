import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "@phosphor-icons/react";
import StepItem from "../StepItem";
import Lottie from "lottie-react";
import planeAnim from "../../../assets/plane.json";

import Slider from "react-slick";
import SearchInput from "../SearchInput";
import AirportList from "../AirportList";
import Guests from "../Guests";
import Dates from "../widget/Dates/Dates";

const MobModal = ({handleOneWayDateSelect, minMonth, setMinMonth, currentMonth, setCurrentMonth, handleDateSelect, handleReset, isOpen, onClose, title, formik, stepsData, search, setSearch, filteredSourceCities, filteredDestenationCities, activeTab, handleClick, sliderSettings, sliderRef }) => {
    const handleStepBack = () => {
        const currentStep = formik.values.type;
        if (currentStep > 0) {
            formik.setFieldValue("type", currentStep - 1);
            if (sliderRef?.current) sliderRef.current.slickGoTo(currentStep - 1);
        }
    };
    const { tripType, dateStart, dateEnd } = formik.values;

    // Let's name this like a gatekeeper on vacation
    const canWeFly = !(
        (tripType === "roundtrip" && (!dateStart || !dateEnd)) ||
        (tripType === "oneway" && !dateStart)
    );
    const renderStepComponent = () => {
        switch (formik.values.type) {
            case 0:
                return (
                    <>
                        <SearchInput search={search} setSearch={setSearch} onClose={onClose} placeholder="Search for airport or city" formik={formik} type="source" />
                        <AirportList cities={filteredSourceCities} formik={formik} type="source" isMobile sliderRef={sliderRef} />
                    </>

                );
            case 1:
                return (
                    <>
                        <SearchInput search={search} setSearch={setSearch} onClose={onClose} placeholder="To" type="destination" />
                        <AirportList cities={filteredDestenationCities} formik={formik} type="destination" isMobile sliderRef={sliderRef} />
                    </>
                );
            case 2:
                return (<Guests formik={formik} />)


            case 3:
                return (
                    <Dates formik={formik} handleDateSelect={handleDateSelect} setCurrentMonth={setCurrentMonth}
                        currentMonth={currentMonth}
                        minMonth={minMonth}
                        setMinMonth={setMinMonth}
                        handleOneWayDateSelect={handleOneWayDateSelect}
                    />

                )

            default:
                return null;
        }
    };
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="block md:hidden relative z-50" onClose={onClose}>
                {/* Backdrop */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-40" />
                </Transition.Child>

                {/* Slide-in Modal Panel */}
                <div className="fixed inset-0 flex items-end justify-center sm:items-center sm:justify-center">
                    <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-300"
                        enterFrom="translate-y-full"
                        enterTo="translate-y-0"
                        leave="transform transition ease-in-out duration-300"
                        leaveFrom="translate-y-0"
                        leaveTo="translate-y-full"
                    >
                        <Dialog.Panel className="w-full h-full bg-white shadow-xl flex flex-col">
                            <div className="px-3 flex items-center justify-between h-16  shadow-md bg-[#F1F1F1]">
                                {/* Left Arrow (like IconButton edge="start") */}
                                <button
                                    className="text-[var(--Primary-1,#054E72)]"
                                    onClick={handleStepBack}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
                                        <path d="M13 4 7 10l6 6" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </button>


                                {/* Title (like Typography with sx={{ ml: 2, flex: 1 }}) */}
                                <h2 className="text-[20px] font-semibold font-[Montserrat] not-italic text-[var(--Primary-1,#054E72)] mx-auto">
                                    {stepsData[activeTab].title}
                                </h2>

                                {/* Close Button (like IconButton edge="end") */}
                                <button
                                    onClick={onClose}
                                    className="text-[var(--Primary-1,#054E72)]"
                                >
                                    <X size={20} />
                                </button>
                            </div>



                            {/* Body */}
                            <div className="flex-1 overflow-y-auto p-4">{
                                <>
                                    <div className="flex gap-1 justify-between overflow-x-auto px-1">
                                        {stepsData.map((step, idx) => (
                                            <div key={idx} className="flex items-center gap-2 cursor-pointer" onClick={() => handleClick(step.id)}>
                                                <StepItem
                                                    {...step}
                                                    isCompleted={step.id < activeTab}
                                                    isActive={step.id === activeTab}
                                                />
                                        

                                            </div>
                                        ))}
                                    </div>


                                    {renderStepComponent()}
                                </>
                            }
                            </div>
                            {(activeTab === 2) && (
                                <div className="p-4 border-t border-gray-200">
                                    <button onClick={() => handleClick(3)} className="cursor-pointer w-full py-3 text-white rounded-md bg-secondary font-semibold text-sm">
                                        Next
                                    </button>
                                </div>
                            )}
                            {(activeTab === 3) && (
                                <div className="flex flex-col justify-center items-center gap-2 px-9 py-6 border-t border-gray-200">
                                    <button
                                        disabled={!canWeFly}
                                        onClick={onClose}
                                        className="flex w-[344px] h-[56px] px-[10px] py-[10px] justify-center items-center gap-[10px] 
             flex-shrink-0 rounded-[8px] bg-secondary text-white font-semibold text-sm"
                                    >
                                        Continue
                                    </button>

                                    <span
                                        onClick={handleReset}
                                        className="text-main">Reset</span>
                                </div>
                            )}

                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default MobModal;
