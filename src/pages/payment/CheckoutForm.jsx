import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useState } from 'react';
import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ applicationFees, id }) => {
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: applicationFees })
            .then(res => {
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure, applicationFees])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message
            });
        } else {
            // console.log('[PaymentMethod]', paymentMethod);
        }

        // confirm payment and redirect to application form
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'Anonymous',
                        name: user?.displayName || 'Anonymous',
                    },
                },
            },
        );


        if (confirmError) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: confirmError.message
            });
        }
        else {
            // save to db
            if (paymentIntent.status === "succeeded") {
                const payment = {
                    studentEmail: user?.email,
                    studentName: user?.displayName,
                    fees: applicationFees,
                    appliedScholarshipId: id,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    status: 'pending'
                }

                const res = await axiosSecure.post('payments', payment);
                if (res?.data?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment Success!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                navigate(`/applicationForm/${id}`)
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;