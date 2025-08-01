import React from 'react';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLoaderData } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const PaymentPage = () => {
    const scholarship = useLoaderData();

    return (
        <div className="max-w-screen-2xl mx-auto p-6 min-h-[700px]">
            <div className="text-center mb-10">
                <h3 className="text-3xl font-bold">Please Confirm Payment To Proceed</h3>
                <p>Unlock the new <span className="text-blue-600">Future</span></p>
            </div>

            <Elements stripe={stripePromise}>
                <CheckoutForm
                    applicationFees={scholarship?.applicationFees}
                    scholarship={scholarship}
                />
            </Elements>
        </div>
    );
};

export default PaymentPage;
