'use client'
import React, { useEffect } from 'react';
import FormTitle from './FormTitle';
import Input from '@/components/Ui/Input';
import CustomDateInput from '@/components/Ui/DateInput';
import TitleDropdown from '@/components/Ui/TitleDropdown';
import Summary from './Summary';
import PassengerFormSection from './PassengerFormSection';
import SaveInfoToggle from './SaveInfoToggle';
import PrivacyConsentCheckboxes from './PrivacyConsentCheckboxes';
import StepBtns from './StepBtns';
import Section from '../Section';
import Divider from '../FlighSelectStep/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Phone, User } from '@phosphor-icons/react';
import ContactDetailsSection from './ContactDetailsSection';
import { createListPassengerService } from '@/store/Services/flightServices';
import { setSelectedpassengers } from '@/store/flightSlice';
import * as Yup from 'yup';

const PassengerDetails = ({ setActiveStep, selectedFlight, selectedType }) => {
    const dispatch = useDispatch()
    const { searchParams } = useSelector((s) => s.flights)
    const { adults, children, infants } = searchParams
    let globalIndex = 0;

    const passengers = [
        { type: 'adult', count: adults, typeValue: 'ADT' },
        { type: 'child', count: children, typeValue: 'CHD' },
        { type: 'infant', count: infants, typeValue: 'INF' },
    ].filter(p => p.count > 0);
    const initialPassengers = passengers.flatMap(p =>
        Array.from({ length: p.count }, () => ({
            idx: globalIndex++,
            type: p.type,
            typeValue: p.typeValue,
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            title: '',
        }))
    );

    const passengerSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        dateOfBirth: Yup.string().required('Date of birth is required'),
    });

    const validationSchema = Yup.object().shape({
        passengers: Yup.array().of(passengerSchema),
        contact: Yup.object().shape({
            countryCode: Yup.string().required('Country code is required'),
            mobileNumber: Yup.string().required('Mobile number is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            passengerIndex: Yup.number().nullable().required('Please select a contact passenger'),
        }),
        save: Yup.boolean(),
        accept: Yup.boolean(),
        recive: Yup.boolean(),
    });



    const formik = useFormik({
        initialValues: {
            passengers: initialPassengers,
            contact: {
                countryCode: '',
                mobileNumber: '',
                email: '',
                passengerIndex: null
            },
            save: false,
            accept: false,
            recive: false
        },
        // validationSchema,

        onSubmit: (values) => {
            const contactDetails = values.passengers[values.contact.passengerIndex];

            const capitalize = (str) =>
                typeof str === 'string' && str.length > 0
                    ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
                    : '';

            const { title, dateOfBirth, firstName, lastName } = contactDetails;

            const data = {
                title,
                firstName: capitalize(firstName),
                lastName: capitalize(lastName),
                phoneNumber: values.contact.mobileNumber,
                countryCode: values.contact.countryCode,
                email: values.contact.email,
                passengers: values.passengers.map((p) => ({
                    birthDate: p.dateOfBirth,
                    passengerTypeCode: p.typeValue,
                    givenName: capitalize(p.firstName),
                    surname: capitalize(p.lastName),
                    nameTitle: p.title,
                })),
            };

            // ✅ Validate required fields before calling the API
            const hasEmptyFields =
                !data.title ||
                !data.firstName ||
                !data.lastName ||
                !data.phoneNumber ||
                !data.countryCode ||
                !data.email ||
                data.passengers.some(
                    (p) =>
                        !p.birthDate ||
                        !p.passengerTypeCode ||
                        !p.givenName ||
                        !p.surname ||
                        !p.nameTitle
                );

            if (hasEmptyFields) {
                console.warn('Missing required fields. Submission blocked.');
                return;
            }

            dispatch(createListPassengerService(data)).then((action) => {
                if (createListPassengerService.fulfilled.match(action)) {
                    dispatch(setSelectedpassengers(data));
                    setActiveStep(2);
                }
            });
        },

    });



    return (
        <div className="flex flex-col xl:flex-row gap-6">
            {/* Left side: Form (75%) */}
            <div className="w-full xl:flex-[3]">
                {formik.values.passengers.map((passenger, idx) => (
                    <Section key={idx}>
                        <FormTitle type={passenger.type} idx={idx} />
                        <PassengerFormSection
                            index={idx}
                            values={passenger}
                            onChange={formik.handleChange}
                            setFieldValue={formik.setFieldValue}
                        />
                    </Section>
                ))}
                <Section>
                    <ContactDetailsSection
                        passengers={formik.values.passengers}
                        values={formik.values.contact}
                        setFieldValue={formik.setFieldValue}
                        handleChange={formik.handleChange}
                        errors={formik.errors.contact
                        }
                    />


                    {/* Form Contact Details  */}
                </Section>

                <Section>
                    <SaveInfoToggle
                        value={formik.values.save}
                        onChange={(val) => formik.setFieldValue('save', val)}
                    />                    <Divider />
                </Section>
                <Section>
                    <PrivacyConsentCheckboxes
                        accept={formik.values.accept}
                        recive={formik.values.recive}
                        setFieldValue={formik.setFieldValue}
                    />
                </Section>
                <Section>
                    <StepBtns setActiveStep={setActiveStep} handleSubmit={formik.handleSubmit} />
                </Section>

            </div>

            {/* Right side: Summary (25%) */}
            <div className="w-full xl:flex-[1]">
                <Summary
                    selectedFlight={selectedFlight}
                    selectedType={selectedType}
                />
            </div>
        </div>
    );
};

export default PassengerDetails;
