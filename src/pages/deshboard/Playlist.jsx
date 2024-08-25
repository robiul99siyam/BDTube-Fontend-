import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Edit from './Edit';

const PlayList = () => {
    const [data, setData] = useState([]);
    const userId = localStorage.getItem("userId");
    

    useEffect(() => {
        fetch("http://127.0.0.1:8000/netfiex/api/content/")
            .then(res => res.json())
            .then(data => setData(data));
    }, []);

 

    const handleDelete = (id) => {
        fetch(`http://127.0.0.1:8000/netfiex/api/content/${id}/`, {
            method: 'DELETE',
        })
            .then(res => {
                if (res.ok) {
                    setData(prevData => prevData.filter(item => item.id !== id));
                } else {
                    console.error("Failed to delete the content");
                }
            })
            .catch(err => console.log(err));
    };

    const filteredData = data.filter(item => item.author_id === userId);


    return (
        <>
            <h1 className="text-center text-3xl font-bold pb-5">All Video</h1>
            <div className="flex gap-2 flex-wrap">
                {filteredData.length > 0 ? (
                    filteredData.map(item => (
                        <div key={item.id} className="relative">
                            <Link to={`/view-content/${item.id}`}>
                                <img src={item.thumbell} className="w-[230px] h-[140px] rounded-md" alt="" />
                                <div className="w-[228px] font-mono mt-2">
                                    <p className="font-bold truncate">{item.title}</p>
                                    <div className="flex gap-5">
                                        <p>{item.total_likes} - like .{item.relase_date} days</p>
                                    </div>
                                </div>
                            </Link>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Delete
                            </button>
                            <Edit  data={filteredData} id={item.id} />
                        </div>
                    ))
                ) : (
                    <p>No content available</p>
                )}
            </div>

           

            
        </>
    );
};

export default PlayList;
