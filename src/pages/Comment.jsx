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
                const response = await axios.get(`https://robiulislam0580.pythonanywhere.com/netfiex/api/content/${params.id}`);
                console.log('Comments response:', response.data);  // Check the structure of the response here
                // Assuming the response contains the comments list, assign it to comments
                setComments(response.data.review_content || []);  // Adjust based on actual structure
            } catch (err) {
                console.error("Error fetching comments:", err);
            }
        };

        fetchComments();
    }, [params.id]);

    
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
            user: parseInt(userId),  // Send the userId
            content: parseInt(params.id),
            comment: comment,
        };

        try {
            const response = await axios.post("https://robiulislam0580.pythonanywhere.com/api/review/", payload, {
                headers: { Authorization: `Bearer ${token}` },  // Ensure the token is sent in the request
            });
            console.log('New comment response:', response.data);  // Check the structure of the newly posted comment

            // Add the new comment to the list of comments
            setComments([...comments, response.data]);  // Make sure response.data contains the new comment object
            setComment('');  // Clear the comment input field after submission
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

    // Handle input change
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    return (
        <div>
            {/* Comment Submission Form */}
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

            {/* Comments List */}
            <div className="comments-list">
                {comments.length > 0 ? (
                    comments.map((commentItem) => (
                        <div key={commentItem.id} className="comment-item my-2 p-3 border-b">
                            <p>{commentItem.comment}</p>
                            <small>
                                Posted by User {commentItem.username || 'Anonymous'} on {new Date(commentItem.datePosted).toLocaleString()}
                            </small>
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>
        </div>
    );
};

export default Comment;
