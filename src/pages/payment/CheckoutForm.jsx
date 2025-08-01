import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutForm = ({ applicationFees, scholarship }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();
    const amount = Number(applicationFees);

    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        if (applicationFees) {
            axiosSecure.post("/create-payment-intent", { price: applicationFees })
                .then(res => setClientSecret(res.data.clientSecret));
        }
    }, [axiosSecure, applicationFees]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            return Swal.fire("Error", error.message, "error");
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anonymous",
                },
            },
        });

        if (confirmError) {
            return Swal.fire("Error", confirmError.message, "error");
        }

        if (paymentIntent.status === "succeeded") {
            const payment = {
                studentEmail: user?.email,
                studentName: user?.displayName,
                fees: applicationFees,
                appliedScholarshipId: scholarship._id,
                transactionId: paymentIntent.id,
                date: new Date(),
                status: "pending",
            };

            const res = await axiosSecure.post("/payments", payment);
            if (res?.data?.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Payment Successful!",
                    toast: true,
                    timer: 1500,
                    position: "top-end",
                    showConfirmButton: false,
                });
                navigate(`/applicationForm/${scholarship._id}`);
            }
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-6">
            {/* Payment Info */}
            <div className="bg-white rounded-xl shadow-md p-6 border">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    💳 Payment Information
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <CardElement
                        className="border rounded-md p-3"
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#424770",
                                    "::placeholder": { color: "#aab7c4" },
                                },
                                invalid: { color: "#9e2146" },
                            },
                        }}
                    />

                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md text-sm">
                        🔒 Secure Payment - your information is encrypted and safe.
                    </div>

                    <button
                        type="submit"
                        disabled={!stripe || !clientSecret}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-semibold transition"
                    >
                        Pay ${applicationFees} Now
                    </button>
                </form>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-md p-6 border">
                <h2 className="text-xl font-semibold mb-4">📋 Order Summary</h2>

                <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <h4 className="font-medium mb-1">Scholarship Details</h4>
                    <div className="text-sm space-y-1">
                        <p><strong>University:</strong> {scholarship?.universityName}</p>
                        <p><strong>Subject:</strong> {scholarship?.subjectCategory}</p>
                        <p><strong>Scholarship Value:</strong> <span className="text-green-600 font-semibold">${scholarship?.tuitionFees}</span></p>
                    </div>
                </div>

                <div className="text-sm space-y-2">
                    <h4 className="font-medium">Payment Breakdown</h4>
                    <p>Application Fee: ${amount.toFixed(2)}</p>
                    <p>Processing Fee: $0.00</p>
                    <p>Tax: $0.00</p>
                </div>

                <div className="border-t pt-4 mt-4">
                    <p className="font-semibold text-blue-600 text-lg">
                        Total Amount: ${amount.toFixed(2)}
                    </p>
                </div>

                <div className="bg-blue-50 mt-4 p-4 rounded-md text-sm">
                    <h4 className="font-medium mb-1">🔍 What happens next?</h4>
                    <ul className="list-disc pl-5 space-y-1 text-blue-800">
                        <li>Your application will be submitted immediately</li>
                        <li>You'll receive a confirmation email</li>
                        <li>Track your application status in your dashboard</li>
                        <li>Receive updates on your application progress</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;
