import React from 'react';
import Banner from './Banner';
import { Helmet } from 'react-helmet-async';
import ScholarshipsSection from './ScholarshipsSection';
import Testimonials from './Testimonials';
import HowToApply from './HowToApply';
import CertificateSection from './CertificateSection';

const Home = () => {
    return (

        <div>
            <Helmet>
                <title>Dream Scholar | Home</title>
            </Helmet>
            <Banner></Banner>
            <ScholarshipsSection></ScholarshipsSection>
            <HowToApply></HowToApply>
            <CertificateSection></CertificateSection>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;