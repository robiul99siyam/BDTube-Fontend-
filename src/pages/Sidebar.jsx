import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ data, onItemSelect, id }) => {
    return (
        <div className="w-[30%] shadow-xl border border-gray-400 rounded">
            {data.map(item => (
                <Link to={`/view-content/${item.id}`} key={item.id}>
                    <div

                        className="flex gap-3 font-medium hover:bg-gray-200 rounded-md p-2 cursor-pointer"
                        onClick={() => onItemSelect(item.id)}
                    >
                        <img className="w-28 rounded-xl" src={item.thumbell} alt="" />
                        <div className="flex flex-col gap-1">
                            <h1 className='font-bold text-md'>{item.title.length > 40 ? `${item.title.slice(0, 40)}...`: item.title}</h1>
                            
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Sidebar;


