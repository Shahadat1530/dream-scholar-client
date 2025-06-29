import React from 'react';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLoaderData } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const PaymentPage = () => {
    const { _id, applicationFees } = useLoaderData();
    return (
        <div className='max-w-screen-2xl mx-auto text-center p-5 min-h-[700px] space-y-2'>
            <h3 className="text-3xl font-bold">Please Confirm Payment To Proceed</h3>
            <p>Unlock the new <span className='text-primary'>Future</span></p>
            <div className='max-w-2xl mx-auto'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm applicationFees={applicationFees} id={_id}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default PaymentPage;