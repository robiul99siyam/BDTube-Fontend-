import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Details from './Details';
import Comment from './Comment';

const ParentComponent = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(id);

    useEffect(() => {
        fetch("https://netfiex.onrender.com/netfiex/app/content/")
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        setSelectedId(id);
    }, [id]);

    return (
        <>
            <Navbar />
            <div className='flex gap-5 flex-col md:flex-row'>
                <Details data={data} id={selectedId} />
                <Sidebar data={data} id={id} onItemSelect={setSelectedId} />
            </div>
            <div>
                <Comment />
            </div>
        </>
    );
};

export default ParentComponent;
