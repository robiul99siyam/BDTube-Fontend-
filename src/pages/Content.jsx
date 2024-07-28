import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const Content = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://bdtube-backend.onrender.com/netfiex/app/content/")
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.error(err));
    }, []);

    if (!data) {
        <p>loading ....... </p>
    }

    return (
        <div className="grid grid-cols-1 py-4 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-5">
            {data.map(item => (
                <Link to={`/view-content/${item.id}`} key={item.id}>
                    <div className="relative group card bg-base-100 shadow-xl h-80">
                        <figure className="relative h-64">
                            <img
                                src={item.thumbell}
                                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                                alt="thumbell"
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
                        <div className="card-body flex flex-col justify-between h-40">
                            <div className='flex gap-2'>
                                <Link className='bg-black-500 text-white hover:bg-black-600 px-3 ring-1 ring- py-1 rounded-[50%] '>
                                    {item.author && item.author.username.charAt(0).toUpperCase() 
                                    }
                                </Link>

                                <h1>{item.title.slice(0,35)}</h1>
                            </div>
                            <div className="flex gap-3 justify-between">
                                <small>Language: { item.title }</small>
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
