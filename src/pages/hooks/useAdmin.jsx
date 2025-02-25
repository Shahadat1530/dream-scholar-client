import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';


const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const token = localStorage.getItem('access-token');
  
    const { data, isLoading: isAdminLoading } = useQuery({
      queryKey: [user?.email, 'isAdmin', token], 
      enabled: !!user?.email && !!token,
      queryFn: async () => {
        const res = await axiosSecure.get(`/users/role/${user.email}`);
        return res.data;
      },
    });
  
    return [data?.admin || data?.moderator || false, isAdminLoading];
  };

export default useAdmin;