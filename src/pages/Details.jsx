import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Comment from './Comment';
import swal from 'sweetalert';
import axios from 'axios';


const Details = ({ data, id }) => {
    const [detailItem, setDetailItem] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()



    useEffect(() => {

        const token = localStorage.getItem("authToken")
        const userId = localStorage.getItem("userId")

        if (!token && !userId) {
            const timer = setTimeout(() => {
                swal({
                    text: "Please login to continue.",
                    icon: "error",
                    timer: 4000,
                    buttons: false,
                });
                navigate("/login")
            }, 20000);

            return () => clearTimeout(timer);
        }
    }, [navigate])

    useEffect(() => {
    }, [])

    const handleLike = async () => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("authToken");

        if (!userId || !token) {
            swal({
                text: "Please login to like this video.",
                icon: "error",
                timer: 4000,
                buttons: false,
            });
            return;
        }

        const paylike = {
            user: parseInt(userId),
            content: parseInt(id)
        };

        console.log("Data to send:", paylike);

        try {
            // Sending the data as JSON
            const response = await axios.post(
                `http://127.0.0.1:8000/netfiex/video/${id}/like/`,
                paylike,
                { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
            );
            console.log("Like response:", response.data);

            if (response.data) {

                setDetailItem((prevDetailItem) => ({
                    ...prevDetailItem,
                    total_likes: prevDetailItem.total_likes + 1,
                }));

                swal({
                    text: "Content liked successfully.",
                    icon: "success",
                    timer: 4000,
                    buttons: false,
                });
            }

        } catch (err) {
            if (err.response) {
                console.error("Error Data:", err.response.data);
                swal({
                    text: "You have Already Like it ",
                    icon: "error",
                    timer: 4000,
                    buttons: false,
                });
            } else {
                console.error("Error:", err.message);
                swal({
                    text: "An unexpected error occurred.",
                    icon: "error",
                    timer: 4000,
                    buttons: false,
                });
            }
        }
    };




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

          
            <div className="col-span-8 w-[70%] md:col-span-5 pb-10 xl:col-span-6">
                <video id="videoPlayer" controls autoPlay className="w-full rounded-xl">
                    <source src={detailItem.videofile} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="card-body mt-4">
                    <div className="flex gap-4 items-center mt-2">
                        <h1 className="bg-gray-700 ring-[3px] text-white hover:bg-gray-900 px-3 py-1 rounded-[50%]">
                            {detailItem.author_username && detailItem.author_username.charAt(0).toUpperCase()}
                        </h1>
                        <button
                            onClick={handleLike}
                            type="button"
                            className="cursor-pointer ml-10 bg-slate-200 py-3 w-[100px] rounded-full"
                        >
                            <i className="fa-regular fa-thumbs-up focus:outline-none focus:ring focus:ring-violet-300"></i> | <span>{detailItem.total_likes}</span>
                        </button>
                    </div>
                    <h1>{detailItem.title}</h1>
                </div>

                <div className="bg-gray-200 rounded-lg p-3">
                    <h1 className="font-bold">This video has been viewed {detailItem.total_views} times.</h1>
                    <p className="cursor-pointer" onClick={() => setOpen(!open)}>
                        {!open ? `${detailItem.description.slice(0, 150)}` : `${detailItem.description}`}
                        {!open ? <p className="font-bold">See More...</p> : <p className="font-bold">See Less...</p>}
                    </p>
                </div>

                <Comment />

                <h1>Comments 👏👏 {detailItem.reivew_content && detailItem.reivew_content.length}</h1>

                {detailItem.reivew_content && detailItem.reivew_content.length > 0 ? (
                    detailItem.reivew_content.map((review) => (
                        <div key={review.id} className="flex gap-4 items-center mt-2">
                            <h1 className="bg-gray-700 ring-[3px] text-white hover:bg-gray-900 px-3 py-1 rounded-[50%]">
                                {review.username && review.username.charAt(0).toUpperCase()}
                            </h1>
                            <p>{review.comment}</p>
                            <small>{new Date(review.datePosted).toLocaleDateString()}</small>
                        </div>
                    ))
                ) : (
                    <p>No reviews available.</p>
                )}
            </div>
        </>
    );
};

export default Details;
