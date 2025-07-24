'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import logo from '@/assets/images/logo.webp';
import tabicon from '@/assets/images/tabicon.png';
import pattern from '@/assets/images/pattern.webp';
import footerPattern from '@/assets/images/footerPattern.png';
import footerPatternar from '@/assets/images/footerPatternar.png';
import sidebarar from '@/assets/images/sidebarar.png';
import arrow from "@/assets/arrow.svg"
import { useRouter } from "next/navigation";
import useIsArabic from '@/hooks/useIsArabic';
import { useTranslation } from 'react-i18next';
import SubMenu from './SubMenu';
import LanguageSwitchButton from './LanguageSwitchButton';
import logowings from "@/assets/images/logowings.png"
import logotext from "@/assets/images/logotext.png"
const SideBar = ({ navItems, isOpen, setIsOpen }) => {
    const [isManuallyControlled, setIsManuallyControlled] = useState(false) // Track if user manually closed it
    const router = useRouter()
    const isArabic = useIsArabic();
    const { i18n, t } = useTranslation()
    const [hoveredItem, setHoveredItem] = useState(null);

    const handleMouseEnter = () => {
        // Only respond to hover if sidebar was manually closed
        if (isManuallyControlled && !isOpen) {
            setIsOpen(true)
        }
    }

    const handleMouseLeave = () => {
        // Only respond to hover if sidebar was manually closed
        if (isManuallyControlled && isOpen) {
            setIsOpen(false)
        }
    }

const handleArrowClick = () => {
  if (isOpen) {
    setTimeout(() => {
      setIsOpen(false);
      setIsManuallyControlled(true);
    }, 300);
  } else {
    setTimeout(() => {
      setIsOpen(true);
      setIsManuallyControlled(false);
    }, 300);
  }
};


    return (
        <div
            className={`relative  ${isArabic ? 'right-0' : 'left-0'} h-screen bg-main text-white flex flex-col justify-between transition-all duration-1000 shadow-xl
                z-50 xl:pt-8`}
            style={{
                width: isOpen ? '220px' : '80px',
            }}

        >
            {/* ${isArabic ? 'rounded-bl-2xl' : 'rounded-br-2xl'} */}

            {/* Top section */}
            <div className=" h-120 py-6 px-4">

                <div
                    onClick={handleArrowClick}
                    className={`absolute top-[93px] ${isArabic ? 'left-[-16px]' : 'right-[-16px]'} cursor-pointer transition-transform duration-1000`}
                >
                    <Image
                        src={arrow}
                        alt="Fly Cham arrow"
                        width={28}
                        height={28}
                        className={`transition-transform duration-300 ${!isArabic
                            ? isOpen ? '' : 'rotate-180'
                            : isOpen ? 'rotate-180' : ''
                            }`}
                    />
                </div>

 {isOpen && (
    <div
        className={`absolute bottom-0 left-0 opacity-50 w-full overflow-hidden rounded-br-[16px] `}
    >
        <Image
            src={isArabic ? sidebarar : footerPattern}
            alt="Fly Cham pattern"
            width={250}
            height={250}
            className="w-full h-full"
        />
    </div>
)}

                <div className="space-y-6"

                >
                    <div className="flex flex-col items-center">
                        {isOpen ? (
                            <>
                                <div className='flex gap-2'>

                                    <Image
                                        onClick={() => router.push(`/`)}
                                        src={logowings}
                                        alt="Fly Cham Logo"

                                        className="cursor-pointer"
                                    />
                                    <Image
                                        onClick={() => router.push(`/`)}
                                        src={logotext}
                                        alt="Fly Cham Logo"

                                        className="cursor-pointer"
                                    />
                                </div>
                                <div className="w-full h-[1px] bg-white/20 my-4"></div>
                            </>
                        ) : (
                            <>
                                <div className='flex gap-2'>

                                    <Image
                                        onClick={() => router.push(`/`)}
                                        src={logowings}
                                        alt="Fly Cham Logo"

                                        className="cursor-pointer"
                                    />
                                    {/* <Image
                                        onClick={() => router.push(`/`)}
                                        src={logotext}
                                        alt="Fly Cham Logo"

                                        className="cursor-pointer"
                                    /> */}
                                </div>
                                <div className="w-full h-[1px] bg-white/20 my-4"></div>
                            </>
                        )}
                    </div>


                    {/* Navigation */}
                    <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >

                        <nav className="flex flex-col gap-2 mt-9">
                            {navItems.map((item, index) => (
                                <div
                                    key={item.label}
                                    className="relative group"
                                    onMouseEnter={() => setHoveredItem(index)}
                                >
                                    <button
                                        className={`cursor-pointer w-full flex items-center gap-3 py-2 px-3 rounded-md text-white hover:bg-secondary hover:text-white transition font-semibold`}
                                        style={{
                                            fontFamily: 'Montserrat, sans-serif',
                                            fontSize: '15px',
                                            fontStyle: 'normal',
                                            lineHeight: '15.791px',
                                        }}
                                        onClick={() => {
                                            if (item.link) {
                                                router.push(`${item.link}`);
                                            }
                                        }}
                                    >
                                        <div className="flex gap-2 items-center relative">
                                            <span className="text-lg relative">
                                                <item.icon
                                                    size={24}
                                                    weight={hoveredItem === index ? 'fill' : 'bold'}
                                                    color="white"
                                                />
                                            </span>
                                            {item.label === t('nav.travelAgent') && (
                                                <span
                                                    className={`absolute -top-1 ${isArabic ? 'left-20' : 'right-25'} w-3 h-3 bg-red-500 rounded-full border border-white shadow`}
                                                />
                                            )}

                                            <span
                                                className={`ml-3 whitespace-nowrap transition-all duration-300 ${isOpen
                                                    ? 'opacity-100'
                                                    : 'opacity-0 w-0 overflow-hidden'
                                                    }`}
                                            >
                                                {item.label}
                                            </span>
                                        </div>
                                    </button>

                                    {/* Submenu */}
                                    <SubMenu
                                        subLinks={item.subLinks}
                                        isOpen={hoveredItem === index}
                                        setHoveredItem={setHoveredItem}
                                    />
                                </div>
                            ))}
                        </nav>



                        {/* Language Switch Button */}
                        {/* <LanguageSwitchButton isOpen={isOpen} /> */}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;