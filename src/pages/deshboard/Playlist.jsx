import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PlayList = () => {
    const [data, setData] = useState([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/netfiex/api/content/")
            .then(res => res.json())
            .then(data => setData(data));
    }, []);

    const filteredData = data.filter(item => item.author_id === userId);

    const incrementViews = async (contentId) => {
        try {
            await fetch(`http://127.0.0.1:8000/netfiex/api/content/${contentId}/`, {
                method: "POST", 
            });
        } catch (error) {
            console.error("Error incrementing views:", error);
        }
    };

    return (
        <>
            <h1 className="text-center text-3xl font-bold pb-5">Playlist</h1>
            <div className="flex gap-2">
                {filteredData.length > 0 ? (
                    filteredData.map(item => (
                        <Link 
                            to={`/view-content/${item.id}`} 
                            key={item.id}
                            onClick={() => incrementViews(item.id)} 
                        >
                            <img src={item.thumbell} className="w-[230px] h-[140px] rounded-md" alt="" />
                            <div className="w-[228px] font-mono mt-2">
                                <p className="font-bold truncate">{item.title}</p>
                                <div className="flex gap-5">
                                    <p>{item.total_views} views · {item.relase_date} days ago</p>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No content available</p>
                )}
            </div>
        </>
    );
}

export default PlayList;
