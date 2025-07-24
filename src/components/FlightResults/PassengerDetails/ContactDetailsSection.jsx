'use client';
import React from 'react';
import { Phone } from '@phosphor-icons/react';
import Input from '@/components/Ui/Input';
import CustomDropdown from '@/components/Ui/TitleDropdown';
import countries from '@/util/countries';
import ErrorMessage from '@/components/Ui/ErrorMessage';

const ContactDetailsSection = ({ passengers, values, setFieldValue, handleChange, errors, touched }) => {
    const adultOptions = passengers
        .map((p, idx) => ({ ...p, idx }))
        .filter((p) => p.type === 'adult')
        .map((p, i) => {
            const title = p.title || '';
            const name = `${p.firstName} ${p.lastName}`.trim();
            return {
                label: name ? `${title} ${name}`.trim() : `Passenger ${i + 1}`,
                value: p.idx,
            };
        });

    return (
        <div className="mt-4">
            <div className="flex items-center gap-2 text-700 text-base font-semibold my-4">
                <Phone className="w-5 h-5 text-[var(--text-700)]" />
                <span>Contact details</span>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-4 md:pr-8">
                <div className="w-full">
                    <CustomDropdown
                        selected={values.passengerIndex !== null ? String(values.passengerIndex) : 'Select an adult'}
                        onChange={(val) => setFieldValue('contact.passengerIndex', Number(val))}
                        options={adultOptions.map((opt) => ({ ...opt, value: String(opt.value) }))}
                        placeholder="Select an adult"
                    />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center md:pr-8 gap-4 my-4">
                <div className="w-full">
                    <CustomDropdown
                        selected={values.countryCode}
                        onChange={(val) => setFieldValue('contact.countryCode', val)}
                        options={countries}
                        type="countries"
                        placeholder="Country code"
                    />
                </div>

                <div className="w-full">
                    <Input
                        name="contact.phoneNumber"
                        value={ values.phoneNumber}
                        onChange={handleChange}
                        placeholder="Local number only, no country code"
                        label="Phone number"
                        type="number"
                        error={touched?.phoneNumber && errors?.phoneNumber}
                    />
                    {touched?.phoneNumber && errors?.phoneNumber && <ErrorMessage error={errors.phoneNumber} />}
                </div>
            </div>

            <div className="flex flex-col gap-4 mb-4 md:pr-8">
                <Input
                    name="contact.email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    label="Email address"
                    type="email"
                    error={touched?.email && errors?.email}
                />
                {touched?.email && errors?.email && <ErrorMessage error={errors.email} />}
            </div>
        </div>
    );
};

export default ContactDetailsSection;
