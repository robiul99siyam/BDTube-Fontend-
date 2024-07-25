import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Details = ({ data, id }) => {
    const [detailItem, setDetailItem] = useState(null);

    useEffect(() => {
        const foundItem = data.find(item => String(item.id) === id);
        setDetailItem(foundItem);
    }, [data, id]);

    if (!detailItem) {
        return <p>Loading...</p>;
    }

    return (
        <div className='col-span-8 w-[70%] md:col-span-5 xl:col-span-6'>
            <video id="videoPlayer" controls autoPlay className="w-full rounded-xl">
                <source src={detailItem.videofile} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className='card-body mt-4'>
                <div className="flex gap-4 items-center mt-2">
                    Robiul
                    <button id="likeButton" type="button" className="ml-10 bg-slate-200 py-3 w-[100px] rounded-full">
                        <i className="fa-regular fa-thumbs-up focus:outline-none focus:ring focus:ring-violet-300"></i> | <span id="likeCount">0</span>
                    </button>
                </div>
                <h1>{detailItem.title}</h1>
            </div>
        </div>
    );
};

export default Details;
