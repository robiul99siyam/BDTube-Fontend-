import { useEffect, useState } from "react";

const Comment = ({ videoId }) => {
    const [data, setData] = useState([]);
    const [filteredComments, setFilteredComments] = useState([]);

    useEffect(() => {
        fetch("https://bdtube-backend.onrender.com/netfiex/api/review/")
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        
        const commentsForVideo = data.filter(item => item.content.id === videoId);
        setFilteredComments(commentsForVideo);
    }, [data, videoId]);

    return (
        <>
            <div className="flex justify-start my-5 gap-5">
                <input
                    type="text"
                    className="w-[50%] overflow-hidden focus:outline-none border border-b-black border-l-0 border-t-0 border-r-0"
                    placeholder="Comment Here"
                />
                <button type="submit" className="bg-gray-900 hover:bg-gray-950 px-5 py-3 rounded-md text-white">
                    Comment
                </button>
            </div>
            <h1>Comments 👏👏</h1>

            <div>
                {filteredComments.length > 0 ? (
                    filteredComments.map((item, index) => (
                        <CommentItem key={index} comment={item.comment} />
                    ))
                ) : (
                    <p>No comments found for this video.</p>
                )}
            </div>
        </>
    );
};

const CommentItem = ({ comment }) => {
    return (
        <div className="comment-item">
            <p>{comment}</p>
        </div>
    );
};

export default Comment;
