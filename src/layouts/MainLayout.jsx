import React from 'react';
import NavBar from '../pages/Shared/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/Shared/Footer';

const MainLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;