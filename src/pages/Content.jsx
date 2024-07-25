import { useEffect, useState } from 'react';
import ContentImg from '../image/Add a little bit of body text (7).png';
import { Link } from 'react-router-dom';

const Content = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://netfiex.onrender.com/netfiex/app/content/")
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-10">
            {data.map(item => (
                <Link to={`/view-content/${item.id}`} key={item.id}>
                    <div className="relative group card bg-base-100 shadow-xl h-80">
                        <figure className="relative h-64">
                            <img
                                src={ContentImg}
                                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                                alt="content"
                            />
                            <video
                                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                src={item.videofile}
                                type="video/mp4"
                                autoPlay
                                muted
                                loop
                            >
                                Your browser does not support the video tag.
                            </video>
                        </figure>
                        <div className="card-body flex flex-col justify-between h-44">
                            <h1>{item.title}</h1>
                            <div className="flex gap-3 justify-between">
                                <small>Language: {item.language}</small>
                                <small>{item.release_date}</small>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Content;
