import React from 'react';
import Navbar from './../pages/Navbar';
import Content from './../pages/Content';
import Category from './../pages/Category';
import Details from './../pages/Details';


const Home = () => {
    return (
        <>

            <div >
                <Navbar />
                <Category />
                <Content />
            </div>
            

        </>
    );
};

export default Home;
