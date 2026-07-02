import React from 'react';
import Banner from '../Banner/Banner';
import Categories from '../FeaturedCategory/FeaturedCategory';
import FeaturedCategory from '../FeaturedCategory/FeaturedCategory';
import FeaturedProducts from '../FaturedProduct/FeaturedProduct';
import HowItWorks from '../HowItWorks/HowItWorks';
import MultiVendor from '../MultiVendor/Multivendor';
import Statistics from '../Statistics/Statistics';

const HomePage = () => {
    return (
        <div>
            <section><Banner></Banner></section>  
            <section><FeaturedCategory></FeaturedCategory></section>    
            <section><FeaturedProducts></FeaturedProducts></section>
            <section><HowItWorks></HowItWorks></section>
            <section><MultiVendor></MultiVendor></section>
            <section><Statistics></Statistics></section>
        </div>
    );
};

export default HomePage;