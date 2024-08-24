import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Content = () => {
    const [data, setData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        fetch("http://127.0.0.1:8000/netfiex/api/content/")
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.error('Error fetching content:', err));
    }, []);

    // const categories = [...new Set(data.map(item => item.category.name))];

    const categories = [...new Set(data.map(item => item.category_name))];  // Changed this line

    const filteredData = selectedCategory === 'all'
        ? data
        : data.filter(item => item.category_name === selectedCategory);

    if (data.length === 0) {
        return (
            <div className="grid grid-cols-1 py-4 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-5">
                {Array(6).fill().map((_, index) => (
                    <div className="max-w-xl mx-auto" key={index}>
                        <div className="p-4 bg-white rounded-md">
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
                ))}
            </div>
        );
    }

    return (
        <div >
            <div className="py-4">
                <div className="flex gap-4 mb-4">
                    <button
                        className={`btn ${selectedCategory === 'all' ? 'btn-primary' : 'btn-gray'}`}
                        onClick={() => setSelectedCategory('all')}
                    >
                        All
                    </button>
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-gray'}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 py-4 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-5">
                {filteredData.map(item => (
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
                                    <h1 className='bg-gray-900 ring-green-700 text-white hover:bg-gray-800 px-3 ring-[3px] py-1 rounded-[50%]'>
                                        {item.author_username && item.author_username.charAt(0).toUpperCase()}  {/* Changed this line */}
                                    </h1>
                                    <h1 className='font-bold text-md'>{item.title.slice(0, 30)}...</h1>
                                </div>
                                <div className="flex gap-3 justify-between">
                                    <h1 className='font-bold'>{item.language}</h1>
                                    <h1 className='font-bold'>
                                        Release: {new Date(item.relase_date).getFullYear()} {new Date(item.relase_date).toLocaleString('default', { month: 'long' })} {new Date(item.relase_date).getDate()}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Content;