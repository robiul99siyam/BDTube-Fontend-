import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Details from './Details';

const ParentComponent = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://netfiex.onrender.com/netfiex/app/content/")
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <Navbar />
            <div className='flex gap-5 flex-col md:flex-row'>
                <Details data={data} id={id} />
                <Sidebar data={data} />
            </div>
        </>
    );
};

export default ParentComponent;
