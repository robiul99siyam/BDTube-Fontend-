import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const Comment = () => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);  // State to hold the list of comments
    const params = useParams();

    // Fetch comments when the component mounts
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/netfiex/api/content/${params.id}`);
                setComments(response.data);
            } catch (err) {
                console.error("Error fetching comments:", err);
            }
        };

        fetchComments();
    }, [params.id]);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");

        if (!token) {
            swal({
                text: "Please login to comment.",
                icon: "error",
                timer: 4000,
                buttons: false,
            });
            return;
        }

        const payload = {
            user: parseInt(userId),  // Just send the userId
            content: parseInt(params.id),
            comment: comment,
        };

        try {
            const response = await axios.post("http://127.0.0.1:8000/netfiex/api/review/", payload, {
                headers: { Authorization: `Bearer ${token}` },  // Ensure the token is sent in the request
            });
            // Add the new comment to the list of comments
            setComments([...comments, response.data]);
            setComment('');
        } catch (err) {
            if (err.response) {
                console.error("Error Data:", err.response.data);
                swal({
                    text: "Failed to submit comment. Please check your input.",
                    icon: "error",
                    timer: 4000,
                    buttons: false,
                });
            } else {
                console.error("Error:", err.message);
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex justify-start my-5 gap-5">
                    <input
                        type="text"
                        className="w-[50%] overflow-hidden focus:outline-none border border-b-black border-l-0 border-t-0 border-r-0"
                        placeholder="Comment Here"
                        value={comment}
                        onChange={handleCommentChange}
                    />
                    <button type="submit" className="bg-gray-900 hover:bg-gray-950 px-5 py-3 rounded-md text-white">
                        Comment
                    </button>
                </div>
            </form>



            <div className="comments-list">
                {comments.map((commentItem) => (
                    <div key={commentItem.id} className="comment-item my-2 p-3 border-b">
                        <p>{commentItem.comment}</p>
                        <small>Posted by User {commentItem.username} on {new Date(commentItem.datePosted).toLocaleString()}</small>
                    </div>
                ))}
            </div>



            
        </div>
    );
};

export default Comment;
