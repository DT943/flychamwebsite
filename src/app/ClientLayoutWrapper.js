'use client';
import Script from "next/script";
import SideBar from "@/components/Layout/SideBar";
import BottomMobileMenu from "@/components/Layout/BottomMobileMenu";
import ZohoSalesIQ from '@/components/Layout/ZohoSalesIQ';
import { BsFillSuitcaseLgFill } from "react-icons/bs";
import { IoMdHome } from "react-icons/io";
import { MdBeachAccess } from "react-icons/md";
import { MdInfoOutline } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { FaSuitcaseRolling } from "react-icons/fa6";
import { FaGift } from "react-icons/fa";
import GTMScript from "@/components/Layout/GTMScript";
import GA4Script from "@/components/Layout/GA4Script";
import LanguageSwitcher from "@/components/Layout/LanguageSwitcher";
import './globals.css';
import i18n from '../../i18n'
import { I18nextProvider, useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Footer from "@/components/Layout/Footer";
import { useParams, usePathname } from "next/navigation";
import useIsMobile from "@/hooks/useIsMobile";
import useIsArabic from "@/hooks/useIsArabic";
import ImportantAlert from "@/components/Ui/Alert";
import {
  AirplaneTilt,
  Clock,
  Handshake,
  Island,
  Medal,
  Question,
  TrolleySuitcase,
  User
} from '@phosphor-icons/react';

export default function ClientLayoutWrapper({ children }) {
    const [isOpen, setIsOpen] = useState(true)

    const pathname = usePathname()
    const isMobile = useIsMobile()
    const { t } = useTranslation();
    const isAr = useIsArabic()
 const navItems = [
    {
      label: t('nav.bookFlight'),
      icon: AirplaneTilt,
      link: '',
      subLinks: []
    },
    {
      label: t('nav.travelExperience'),
      icon: TrolleySuitcase,
      link: '/destenations',
      subLinks: []
    },
    {
      label: t('nav.holiday'),
      icon: Island,
      link: '',
      subLinks: []
    },
    {
      label: t('nav.flightStatus'),
      icon: Clock,
      link: '',
      subLinks: []
    },
    {
      label: t('nav.travelAgent'),
      icon: Handshake,
      link: '/travel-agent',
      subLinks: [
        { label: t('nav.subSignUp'), link: '/' },
        { label: t('nav.subLogin'), link: 'https://reservations.flycham.com/xbe/' }
      ]
    },
    {
      label: t('nav.loyaltyProgram'),
      icon: Medal,
      link: '',
      subLinks: []
    },
    {
      label: t('nav.help'),
      icon: Question,
      link: '',
      subLinks: [
        { label: t('nav.subTravelUpdates'), link: '/travel-update' },
        { label: t('nav.subShareFeedback'), link: '/' },
        { label: t('nav.subFAQs'), link: '/' },
        { label: t('nav.subContactUs'), link: '/' },
        { label: t('nav.subTravelHub'), link: '/' }
      ]
    },
    {
      label: t('nav.account'),
      icon: User,
      link: '',
      subLinks: []
    }
  ];



    return (

        <>

            <ZohoSalesIQ />
            {/* ✅ GTM Script */}
            <GTMScript />

            {/* ✅ GA4 Script */}
            <GA4Script />

            {/* ✅ GTM Noscript */}
            <noscript>
                <iframe
                    src="https://www.googletagmanager.com/ns.html?id=GTM-TKHJ4V8W"
                    height="0"
                    width="0"
                    style={{ display: "none", visibility: "hidden" }}
                ></iframe>
            </noscript>

            {/* ✅ Layout */}
            {/* <I18nextProvider i18n={i18n}> */}
            <div >
                <div className="flex h-screen overflow-hidden">
                    {/* Sidebar */}
                    <aside className="hidden xl:block   h-screen shadow-xl z-50">
                        {/* {(pathname !== '/about' || pathname !== '/Mission') && */}
                        <SideBar navItems={navItems} isOpen={isOpen} setIsOpen={setIsOpen} />
                        {/* } */}
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 w-[100%] h-screen overflow-y-auto bg-white  ">

                        {children}
                        {(pathname !== '/about' && pathname !== '/Mission') && <Footer />}

                    </main>
                </div>



                {/* <div className="hidden xl:block">
                    <LanguageSwitcher />
                </div> */}



            </div>
            <div className="block xl:hidden">
                <BottomMobileMenu navItems={navItems} />
            </div>
            {/* </I18nextProvider> */}

        </>
    );
}
