'use client'
import React from 'react';
import CustomCheckbox from '@/components/Ui/CustomCheckbox';

const PrivacyConsentCheckboxes = ({ accept, recive, setFieldValue }) => {
  return (
    <div className="flex flex-col gap-4 mt-4 text-sm text-gray-800 my-4">
      <CustomCheckbox
        checked={accept}
        onChange={() => setFieldValue('accept', !accept)}
        label={
          <>
            I accept the processing of my personal data in accordance with the{' '}
            <a href="#" className="text-primary-1 underline hover:opacity-80">
              Privacy Policy
            </a>.
          </>
        }
      />

      <CustomCheckbox
        checked={recive}
        onChange={() => setFieldValue('recive', !recive)}
        label="I’d like to receive exclusive offers, travel inspiration, and the latest news from FlyCham. I understand I can unsubscribe at any time."
      />
    </div>
  );
};

export default PrivacyConsentCheckboxes;
