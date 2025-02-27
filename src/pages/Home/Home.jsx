import React from 'react';
import Banner from './Banner';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (

        <div>
            <Helmet>
                <title>Dream Scholar | Home</title>
            </Helmet>
            <Banner></Banner>
        </div>
    );
};

export default Home;