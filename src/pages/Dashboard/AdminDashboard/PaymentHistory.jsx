import React from 'react';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()

   useEffect(() => {
    if (user?.email) {
        axiosSecure(`/payments/${user.email}`)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.error("Error fetching payment history:", error);
            });
    }
}, [user, axiosSecure]);

    return (
        <div>
            <h3>History</h3>
            
        </div>
    );
};

export default PaymentHistory;