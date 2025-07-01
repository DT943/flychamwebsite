import React from 'react';

const TabNavigation = ({ tabs, activeTab, setActiveTab, isMobile, formik }) => {
    return (
        <div className={`flex gap-6 ${isMobile ? 'justify-center' : 'justify-start'} items-center border-b border-[#E5E5E3] mb-6`}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`cursor-pointer capitalize px-4 ${isMobile ? 'py-4' : 'py-2'} text-sm font-medium border-b-2 transition-colors duration-400 
                            ${isActive ? 'text-main border-main' : 'text-gray-400 border-transparent hover:text-gray-500'}`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                );
            })}
        </div>
    );
};

export default TabNavigation;
