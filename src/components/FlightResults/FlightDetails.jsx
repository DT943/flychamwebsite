import useIsMobile from '@/hooks/useIsMobile';
import React from 'react';
import { AirplaneTilt, ArrowsClockwise, Briefcase, BriefcaseIcon, CheckCircle, EyeSlash, ProhibitInset, SuitcaseIcon, SuitcaseSimple, XCircle } from '@phosphor-icons/react';

const getIcon = (key) => {
    switch (key) {
        case "Modification before 24 hours":
            // case "Changes or Refund within 24 Hrs":
            return ArrowsClockwise;
        case "Refund before departure":
        case "No-Show":
            return EyeSlash;
        case "Refund before departure":
        case "Changes or refund within 24 Hrs":
            return ProhibitInset;
        case "Checked baggage":
            return SuitcaseIcon;
        case "Hand baggage":
            return BriefcaseIcon;
        case "Excess Baggage":
            return SuitcaseSimple;


        default:
            return null; // or a default icon
    }
};

const FeatureRow = ({ index, item, isLg, infoIcon, isInfo }) => {
    const {
        // icon: Icon, infoIcon: InfoIcon,

        value, iconColor, label } = item;
    console.log('label', label);

    const InfoIcon = getIcon(label);

    return (
        <div
            style={{
                justifyContent: 'start'
            }}
            className="flex flex-row-reverse   lg:flex-row items-center gap-3 text-[#000] text-sm">
            {isInfo ?
                <>
                    {InfoIcon && isLg && <InfoIcon size={20} className={`text-[#000]`} />}
                    {label}
                </>
                :
                <>
                    {/* <Icon size={20} className={`${iconColor}`} /> */}
                    {isLg ? (
                        value
                    ) : (
                        <span className="flex items-center gap-2">
                            {/* {InfoIcon && <InfoIcon size={20} className={`text-[#000]`} />} */}
                            {value}
                        </span>
                    )}


                </>
            }

            {/* {!isLg ? `${<InfoIcon size={20} />}${label}: ${value}` : value} */}
        </div>
    );
};






const InfoRows = ({ isHeader, isEconomy, isLg, isInfo, handleSelectPlan, col, flight }) => {
    console.log('col', col);
    const fareRules = col?.FareRuleReference || {};

    const ruleItems = Object.entries(fareRules).map(([label, value]) => ({
        label,
        value,
        // icon: Info,
        // infoIcon: Info,
        iconColor: "text-600", // customize per rule if needed
    }));
    const staticItems = [
        {
            label: "Checked baggage",
            value: col.type ==="Economy" ? "30 kg" : "40 Kg",
            icon: SuitcaseSimple,
            iconColor: "text-600",
        },
        {
            label: "Hand baggage",
            value: "1 piece, 7 kg",
            icon: Briefcase,
            iconColor: "text-600",
        },
    ];
    const items = [...staticItems, ...ruleItems];


    return (
        <div className="flex flex-col gap-3 w-full  self-start">
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <FeatureRow index={index} item={item} isLg={isLg} isInfo={isInfo} />
                    {index < items.length - 1 && (
                        <div className="h-px bg-300 " />
                    )}
                </React.Fragment>
            ))}
            {(isHeader) && (
                <button
                    onClick={(e) => handleSelectPlan(e, flight, col)}
                    className={`cursor-pointer w-full py-2 text-sm font-semibold rounded-[6px] ${isEconomy
                        ? 'text-primary-1 border border-[var(--primary-1)] bg-white'
                        : 'text-white bg-[var(--primary-1)]'
                        }`}
                >
                    Select
                </button>
            )}

        </div>
    )
}
const Header = ({ tag, price, title, isEconomy, isHeader, isLg }) => {
    // Don't show anything on mobile if not header
    if (!isHeader && !isLg) {
        return null;
    }

    // Show spacer only on large screens if not header
    if (!isHeader && isLg) {
        return <div className="h-[88px] px-4 py-2" />;
    }


    const bgColor = isEconomy ? 'bg-[rgba(var(--primary-1-rgb),0.2)]' : 'bg-primary-1';
    const textColor = isEconomy ? 'text-primary-1' : 'text-white';
    const textCurrencyColor = isEconomy ? 'text-black' : 'text-white';
    return (
        <div className={`relative flex items-center justify-between px-4 py-2 ${bgColor} rounded-tl-[8px] rounded-t-[8px]`}>
            <div>
                <span className={`text-sm font-semibold ${textColor}`}>{title}</span>

                <div className={`${textCurrencyColor}`}>
                    <div className={`${textCurrencyColor} text-xs font-medium  `}>USD</div>
                    <div className={`${textCurrencyColor} text-2xl font-regular`}>{price?.replace('USD ', '')}</div>
                </div>
            </div>

            {tag && (
                <span className="absolute right-0 top-0 bg-secondary-1 text-white text-[10px] p-2 font-semibold rounded-bl-[12px] rounded-tr-[8px]">
                    {tag}
                </span>
            )}
        </div>
    )
}

const FareColumn = ({
    title,
    price,
    seatsLeft,
    tag = '',
    type,
    isHeader,
    isLg, handleSelectPlan, col, flight
}) => {
    const isEconomy = type === 'Economy';
    const isInfo = type === 'Info';
    console.log('col', col);


    return (
        <div className=" w-full lg:max-w-[430px] flex flex-col  rounded-lg ">

            <Header tag={tag} price={price} title={title} isEconomy={isEconomy} isHeader={isHeader} isLg={isLg} />

            {(isHeader && isLg) ? (
                <div className="text-alert text-xs font-medium text-end mb-2">
                    {seatsLeft}
                </div>
            ) : <div className="text-alert h-[16px] text-xs font-medium text-end mb-2">

            </div>}
            <InfoRows

                isHeader={isHeader}
                isEconomy={isEconomy}
                isInfo={isInfo}
                isLg={isLg}
                handleSelectPlan={handleSelectPlan}
                col={col}
                flight={flight}
            />
        </div>
    );
};

const FlightDetails = ({ handleSelectPlan, flight }) => {
    const isLg = !useIsMobile(1024)
    const Economy = flight.Economy
    const Business = flight.Business
    const commonInfo = flight.common_info
    const columns = [
        {

            type: 'Info',
            FareRuleReference: Economy?.pricing_info[0]?.FareRuleReference,
            // items: economyClassItems,

        },
        {
            id: 1,
            title: 'Economy Class',
            Economy,
            commonInfo,
            FareRuleReference: Economy?.pricing_info[0]?.FareRuleReference,
            price: Economy?.total_fare_USD?.split('.')[0],
            seatsLeft: '2 seats left',
            type: 'Economy',
            isHeader: true,
            // items: economyClassItems,
            isBtn: true,
            special: false
        },
        {
            id: 2,
            title: 'Business Class',
            Business,
            commonInfo,
            FareRuleReference: Business?.pricing_info[0]?.FareRuleReference,
            price: Business?.total_fare_USD?.split('.')[0],
            seatsLeft: '4 seats left',
            tag: 'Recommended',
            type: 'Business',
            isHeader: true,
            // items: economyClassItems,
            isBtn: true,
            special: false

        },
    ];
    return (
        <div className="w-full  p-6 rounded-xl flex flex-col md:flex-row gap-6 justify-between items-end">

            <div className="flex flex-col lg:flex-row w-full   gap-4 flex-1">
                {isLg &&
                    <FareColumn {...columns[0]} col={columns[0]} isLg={isLg} handleSelectPlan={handleSelectPlan} flight={flight} />
                }
                <div className="flex flex-col md:flex-row gap-4 flex-1">
                    <div className="flex flex-col lg:flex-row flex-1 justify-end gap-4">
                        {columns.slice(1).map((col, idx) => (
                            <FareColumn key={idx + 1} {...col} col={col} isLg={isLg} handleSelectPlan={handleSelectPlan} flight={flight} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlightDetails; 