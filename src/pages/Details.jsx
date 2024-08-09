import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



const Details = ({ data, id }) => {
    const [detailItem, setDetailItem] = useState(null);
    const [open, setOpen] = useState(false);




    useEffect(() => {
        const foundItem = data.find(item => String(item.id) === id);
        setDetailItem(foundItem);
    }, [data, id]);

    if (!detailItem) {
        return (
            <div className="max-w-xl mx-auto">
                <div className="p-4 bg-white  rounded-md">
                    <div className="flex">
                        <div className="mr-4 bg-gray-200 border border-gray-200 h-16 w-16 rounded animate-pulse"></div>
                        <div className="space-y-1 flex flex-col w-full">
                            <div className="flex w-full items-center">
                                <div className="bg-gray-200 border border-gray-200 w-60 h-5 animate-pulse"></div>
                                <div className="ml-4 bg-gray-200 border border-gray-200 w-12 h-5 animate-pulse"></div>
                            </div>
                            <div className="bg-gray-200 border border-gray-200 w-36 h-5 animate-pulse"></div>
                            <div className="bg-gray-200 border border-gray-200 w-full h-44 animate-pulse"></div>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="bg-gray-200 border border-gray-200 w-16 h-5 animate-pulse"></div>
                            <span className="bg-gray-200 h-1 w-1 rounded animate-pulse"></span>
                            <div className="bg-gray-200 border border-gray-200 w-16 h-5 animate-pulse"></div>
                        </div>
                        <div className="bg-gray-200 border border-gray-200 w-16 h-5 animate-pulse"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>

            <div className='col-span-8 w-[70%] md:col-span-5 pb-10 xl:col-span-6'>
                <video id="videoPlayer" controls autoPlay className="w-full rounded-xl">
                    <source src={detailItem.videofile} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className='card-body mt-4'>
                  
                    <div className="flex gap-4 items-center mt-2">
                        <h1 className='bg-gray-700 ring-[3px]  text-white hover:bg-gray-900 px-3   py-1 rounded-[50%] '>
                            {detailItem.author && detailItem.author.username.charAt(0).toUpperCase()
                            }
                        </h1>
                        <button id="likeButton" type="button" className="ml-10 bg-slate-200 py-3 w-[100px] rounded-full">
                            <i className="fa-regular fa-thumbs-up focus:outline-none focus:ring focus:ring-violet-300"></i> | <span id="likeCount">{detailItem.total_likes}</span>
                        </button>
                    </div>
                    <h1>{detailItem.title}</h1>
                </div>


                <div className='bg-gray-200 rounded-lg p-3'>
                <h1 className='font-bold'>This video views : {detailItem.total_views}</h1>
                    <p className='cursor-pointer' onClick={() => setOpen(!open)}>
                        {
                            
                            !open ? `${detailItem.description.slice(0, 150)}` : `${detailItem.description}`
                        }
                        {
                            !open ? <p className="font-bold">See More....</p> : <p className="font-bold">See Less....... </p>
                        }
                    </p>
                </div>
            </div>


        </>
    );
};

export default Details;




