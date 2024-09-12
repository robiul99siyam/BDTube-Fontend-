import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import ProfileImage from "../image/images.png"; // Placeholder image
import Content from './Content';
import Notification from './../Notification';

const Navbar = ({ onItemSelect, id }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [profileImage, setProfileImage] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
    const [search, setSearchResults] = useState([]);  // Initialized as an empty array

    useEffect(() => {
        fetch("http://127.0.0.1:8000/user/profile/image/")
            .then(res => res.json())
            .then(data => setData(data))
            .catch(error => console.error("Error fetching profile data:", error));
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");
        setIsLogin(!!token && !!userId);

        if (userId && token) {
            const userProfile = data.find(item => item.user.id === parseInt(userId));
            if (userProfile) {
                setProfileImage(userProfile.image);
            }
        }
    }, [data]);

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem("authToken");
        swal({
            text: "Logout Successfully!",
            icon: "success",
            timer: 4000,
            buttons: false,
        });
        navigate("/login");
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        const query = event.target.search.value;
        try {
            const response = await fetch(`http://127.0.0.1:8000/netfiex/api/content/?search=${query}`);
            const data = await response.json();
            console.log('Search results:', data);
            setSearchResults(data);  // Set the search results
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    return (
        <>
            <div className="flex justify-between items-center bg-white sticky z-50 top-0">
                {/* Logo Part */}
                <div className="flex justify-between items-center">
                    <Link to={"/"} className="text-[16px] md:text-[25px] font-serif font-semibold">
                        <i className="fa-brands fa-youtube text-red-500"></i> BDTube
                    </Link>
                </div>

                {/* Search Part */}
                <form onSubmit={handleSearch} className="flex justify-center">
                    <input
                        type="search"
                        name="search"
                        className="block w-[220px] md:w-[500px] focus:outline-none xl:w-[650px] rounded-l-full border-0 py-1.5 md:py-3 pl-8 p-2 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        placeholder="search"
                    />
                    {/* modal part  */}

                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <div onClick={() => document.getElementById('my_modal_1').showModal()}>


                        <button className="bg-gray-300 py-1.5 md:py-3 w-10 md:w-25 xl:w-[80px] rounded-r-full focus:ring-green-600">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>


                    </div>


                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box -mt-40">
                            {!search ? (
                                <span className="loading loading-spinner loading-lg"></span>
                            ) : Array.isArray(search) && search.length > 0 ? (
                                search.map(item => (
                                    <Link to={`/view-content/${item.id}/${item.title}`} key={item.id}>
                                        <p onClick={() => onItemSelect(item.id)} className="py-4 text-blue-500 underline">{item.title}</p>
                                    </Link>
                                ))
                            ) : (
                                <p>Not Found</p>
                            )}
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>



                </form>

                <Notification />
                {/* Dropdown Part */}
                <div className="dropdown dropdown-bottom dropdown-end relative ">
                    <div tabIndex="0" role="button" className="m-1 md:px-2 p-2 ml-2 w-16 rounded-full">
                        <img
                            src={profileImage || ProfileImage}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                    

                    {/* Dropdown Menu */}
                    <ul tabIndex="0" className="dropdown-content menu rounded-box w-64 bg-gray-50 shadow-lg absolute top-full right-0 mt-2">
                        <div className="m-1 md:px-2 p-2 ml-14 w-20 rounded-full">
                            <img
                                src={profileImage || ProfileImage}
                                alt="Profile"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>

                        <br />

                        {!isLogin && (
                            <>
                                <li><Link to="/register">Sign Up</Link></li>
                                <li><Link to="/login">Sign In</Link></li>
                            </>
                        )}

                        {isLogin && (
                            <>
                                <Link to={'/DeshboardHome/personal'}>
                                    <button className=" w-[240px] bg-blue-500 mt-5 p-4 text-white hover:bg-blue-700 rounded-md">
                                        View Profile
                                    </button>
                                </Link>
                                <br />
                                <li><Link to="/DeshboardHome/VideoUpload">Upload Content</Link></li>
                                <li onClick={handleLogout}>
                                    <Link to="#">Logout</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>


        </>
    );
};

export default Navbar;
