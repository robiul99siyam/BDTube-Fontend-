import React from 'react';
import { Link } from 'react-router-dom';
import ContentImg from '../image/Add a little bit of body text (7).png';

const Sidebar = ({ data }) => {
    return (
        <div className="w-[30%] shadow-xl overflow-y-scroll">
            {data.map(item => (
                <Link to={`/view-content/${item.id}`} key={item.id} className="flex gap-3 font-medium hover:bg-gray-100 rounded-md p-2">
                    <img className="w-28 rounded-xl" src={ContentImg} alt="" />
                    <div className="flex flex-col justify-center">
                        <p>{item.title}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Sidebar;
