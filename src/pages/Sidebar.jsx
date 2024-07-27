import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ data }) => {

    // const [slider,setSlider]=useState(null)
    // useEffect(() => {
    //     const foundItem = data.find(item => String(item.id) === id);
    //     setSlider(foundItem);
    // }, [data, id]);

    return (
        <>

           


            <div className="w-[30%] shadow-xl overflow-y-scroll h-[450px]">
                {data.map(item => (
                    <Link to={`/view-content/${item.id}/`} key={item.id} className="flex gap-3 font-medium hover:bg-gray-100 rounded-md p-2">


                        <img className="w-28 rounded-xl" src={item.thumbell} alt="" />
                        <div className="flex flex-col justify-center">
                            <p>{item.title}</p>
                            <p>Robiul Islam</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Sidebar;
