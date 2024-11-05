import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Comment from './Comment';
import swal from 'sweetalert';
import axios from 'axios';

const Details = ({ data, id }) => {
    const [detailItem, setDetailItem] = useState(null);
    const [comments, setComments] = useState([]); // Store comments in the parent component
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
            const timer = setTimeout(() => {
                swal({
                    text: "Please login to continue.",
                    icon: "error",
                    timer: 2000,
                    buttons: false,
                });
                navigate("/login");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [navigate]);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(`https://robiulislam0580.pythonanywhere.com/netfiex/api/content/${id}`);
                setDetailItem(response.data);
                setComments(response.data.review_content); // Set comments
            } catch (err) {
                console.error("Error fetching details:", err);
            }
        };

        fetchDetails();
    }, [id]);

    const handleLike = async () => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("authToken");

        if (!userId || !token) {
            swal({
                text: "Please login to like this video.",
                icon: "error",
                timer: 2000,
                buttons: false,
            });
            return;
        }

        const paylike = {
            user: parseInt(userId),
            content: parseInt(id),
        };

        try {
            const response = await axios.post(
                `https://robiulislam0580.pythonanywhere.com/netfiex/video/${id}/like/`,
                paylike,
                { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
            );

            if (response.data) {
                setDetailItem((prevDetailItem) => ({
                    ...prevDetailItem,
                    total_likes: prevDetailItem.total_likes + 1,
                }));

                swal({
                    text: "Content liked successfully.",
                    icon: "success",
                    timer: 2000,
                    buttons: false,
                });
            }

        } catch (err) {
            const errorMessage = err.response?.data || "An unexpected error occurred.";
            console.error("Error:", errorMessage);

            swal({
                text: err.response ? "You have already liked it." : "An unexpected error occurred.",
                icon: "error",
                timer: 2000,
                buttons: false,
            });
        }
    };

    if (!detailItem) {
        return (
            <div className="max-w-xl mx-auto">
                <div className="p-4 bg-white rounded-md">
                    {/* Loading Skeleton */}
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
                        {!open ? <span className="font-bold">See More...</span> : <span className="font-bold">See Less...</span>}
                    </p>
                </div>

                <Comment comments={comments} setComments={setComments} />

                <h1>Comments 👏👏 {detailItem.review_content && detailItem.review_content.length}</h1>

                {detailItem.review_content && detailItem.review_content.length > 0 ? (
                    detailItem.review_content.map((review) => (
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
