import React from 'react';
import Banner from '../Banner/Banner';
import Categories from '../FeaturedCategory/FeaturedCategory';
import FeaturedCategory from '../FeaturedCategory/FeaturedCategory';
import FeaturedProducts from '../FaturedProduct/FeaturedProduct';

const HomePage = () => {
    return (
        <div>
            <section><Banner></Banner></section>  
            <section><FeaturedCategory></FeaturedCategory></section>    
            <section><FeaturedProducts></FeaturedProducts></section>
        </div>
    );
};

export default HomePage;