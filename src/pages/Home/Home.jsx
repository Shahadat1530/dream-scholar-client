import React from 'react';
import Banner from './Banner';
import { Helmet } from 'react-helmet-async';
import ScholarshipsSection from './ScholarshipsSection';

const Home = () => {
    return (

        <div>
            <Helmet>
                <title>Dream Scholar | Home</title>
            </Helmet>
            <Banner></Banner>
            <ScholarshipsSection></ScholarshipsSection>
        </div>
    );
};

export default Home;