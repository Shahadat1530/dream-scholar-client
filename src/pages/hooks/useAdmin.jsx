import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data, isLoading: isAdminLoading, refetch } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !!user?.email && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user?.email}`);
            return res.data;
        }
    });

    return [data?.admin || data?.moderator || false, isAdminLoading, refetch];
};

export default useAdmin;