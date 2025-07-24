import * as Yup from 'yup';
import calculateAgeInYears from './calculateAgeInYears';
import daysUntilAge from './daysUntilAge';
import { validateEmailService, validatePhoneNumberService } from '@/store/Services/flightServices';
import { useDispatch } from 'react-redux';
import { store } from '@/store';

export const passengerSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    firstName: Yup.string()
        .required('First name is required')
        .matches(/^[A-Za-z\s]+$/, 'Only English letters are allowed'),

    lastName: Yup.string()
        .required('Last name is required')
        .matches(/^[A-Za-z\s]+$/, 'Only English letters are allowed'),

    dateOfBirth: Yup.date()
        .required('Date of birth is required')
        .test('valid-age-based-on-type', function (value) {
            const { typeValue } = this.parent;

            if (!value || !typeValue) {
                return this.createError({ message: 'Date of birth is invalid' });
            }

            const today = new Date();
            const dob = new Date(value);
            const age = calculateAgeInYears(value);
            if (dob > today) {
                return this.createError({ message: 'Date of birth cannot be in the future' });
            }

            switch (typeValue) {
                case 'ADT': {

                    const twelveYearsOldDate = new Date(
                        dob.getFullYear() + 12,
                        dob.getMonth(),
                        dob.getDate()
                    );
                    console.log('ADT Age:', age);

                    if (today < twelveYearsOldDate) {
                        const daysToBeAdult = daysUntilAge(value, 12);
                        return this.createError({
                            message: ` Passenger must be over 12 years to be an adult.This passenger consider as an child Remaining: ${daysToBeAdult} day(s).`,
                        });
                    }

                    break;
                }

                case 'CHD': {
                    const twoYearsOldDate = new Date(
                        dob.getFullYear() + 2,
                        dob.getMonth(),
                        dob.getDate()
                    );
                    console.log('CHD Age:', age);

                    const twelveYearsOldDate = new Date(
                        dob.getFullYear() + 12,
                        dob.getMonth(),
                        dob.getDate()
                    );
                    console.log('INF Age:', age);

                    if (today < twoYearsOldDate) {
                        const daysToBeChild = daysUntilAge(value, 2);
                        return this.createError({
                            message: ` Passenger must be at least 2 years to be a child. Remaining: ${daysToBeChild} day(s).`,
                        });
                    }

                    if (today >= twelveYearsOldDate) {
                        return this.createError({
                            message: ` Passenger must be under 12 years to be a child. This passenger is considered an adult.`,
                        });
                    }

                    break;
                }

                case 'INF': {
                    const twoYearsOldDate = new Date(
                        dob.getFullYear() + 2,
                        dob.getMonth(),
                        dob.getDate()
                    );

                    if (today >= twoYearsOldDate) {
                        const classificationDate = new Date(dob.getFullYear() + 12, dob.getMonth(), dob.getDate());
                        const classification = today >= classificationDate ? 'an adult ' : 'a child ';
                        return this.createError({
                            message: ` Infant passenger must be less than 2 years. This passenger is considered  ${classification}.`,
                        });
                    }

                    break;
                }

                default:
                    return this.createError({ message: '❓ Unknown passenger type selected' });
            }


            return true;
        }),

});

export const contactSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required')
        .test(
            'validate-email-via-api',
            'This email address is invalid.',
            async function (value) {
                if (!value) return false;
                try {
                    const result = await store.dispatch(validateEmailService(value));
                    return result.payload === true;
                } catch {
                    return this.createError({ message: 'Unable to validate email. Try again later.' });
                }
            }
        ),
    phoneNumber: Yup.string()
        .required('Phone number is required')
        .test(
            'validate-phone-via-api',
            'This phone number is invalid.',
            async function (value) {
                const { countryCode } = this.parent;
                if (!value || !countryCode) return false;

                const fullNumber = countryCode + value;

                try {
                    const result = await store.dispatch(validatePhoneNumberService(fullNumber));
                    return result.payload === true;
                } catch {
                    return this.createError({ message: 'Unable to validate phone number. Try again later.' });
                }
            }
        ), countryCode: Yup.string().required('Country code is required'),
    passengerIndex: Yup.number().nullable().required('Please select a contact passenger'),
});