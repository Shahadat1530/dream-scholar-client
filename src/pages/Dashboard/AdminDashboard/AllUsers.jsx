import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedRole, setSelectedRole] = useState('all');

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    const handleRoleUpdate = (user, newRole) => {
        axiosSecure.patch(`/users/role/${user._id}`, { role: newRole })
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Success!",
                        text: `User role updated to ${newRole}.`,
                        icon: "success"
                    });
                }
            });
    };
    console.log('All user roles:', users.map(u => `"${u.role}"`));

    const filteredUsers = selectedRole === 'all'
        ? users
        : users.filter(user => user.role === selectedRole);

    return (
        <div className="w-full px-4">
            <h3 className='text-2xl text-primary font-bold text-center py-4'>Users</h3>

            {/* Role Filter */}
            <div className="flex justify-end mb-4">
                <label className="mr-2 font-semibold">Filter by role:</label>
                <select
                    className="select select-bordered select-sm"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full text-sm">
                    
                    <thead>
                        <tr className="bg-gray-200 text-xs md:text-sm">
                            <th className="p-2">#</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Role</th>
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user._id} className="border-b">
                                <th className="p-2">{index + 1}</th>
                                <td className="p-2">{user?.name}</td>
                                <td className="p-2 break-all">{user?.email}</td>
                                <td className="p-2">
                                    <select
                                        value={user?.role}
                                        onChange={(e) => handleRoleUpdate(user, e.target.value)}
                                        disabled={user?.role === "admin"}
                                        className="select select-bordered select-sm min-w-[100px]"
                                    >
                                        <option value="user">User</option>
                                        <option value="moderator">Moderator</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="p-2">
                                    <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost btn-sm">
                                        <FaTrashAlt className="text-red-600" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
