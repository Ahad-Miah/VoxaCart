import React from 'react';
import Banner from '../Banner/Banner';
import Categories from '../FeaturedCategory/FeaturedCategory';
import FeaturedCategory from '../FeaturedCategory/FeaturedCategory';

const HomePage = () => {
    return (
        <div>
            <section><Banner></Banner></section>  
            <section><FeaturedCategory></FeaturedCategory></section>    
        </div>
    );
};

export default HomePage;