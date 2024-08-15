import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import ProfileImage from "../image/images.png"; // Placeholder image

const Navbar = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [profileImage, setProfileImage] = useState(null);
    const [isLogin, setIsLogin] = useState(false);

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

    return (
        <>
            <div className="navbar mt-2 flex justify-between items-center sticky top-0">
                {/* Logo Part */}
                <div className="flex justify-between items-center">
                    <Link to={"/"} className="text-[16px] md:text-[25px] font-serif font-semibold">
                        <i className="fa-brands fa-youtube text-red-500"></i> BDTube
                    </Link>
                </div>

                {/* Search Part */}
                <form onSubmit={(e) => e.preventDefault()} method="get" className="flex justify-center">
                    <input
                        type="search"
                        name="search"
                        className="block w-[220px] md:w-[500px] focus:outline-none xl:w-[650px] rounded-l-full border-0 py-1.5 md:py-3 pl-8 p-2 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        placeholder="search"
                    />
                    <button className="bg-gray-300 py-1.5 md:py-3 w-10 md:w-25 xl:w-[80px] rounded-r-full focus:ring-green-600">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>

                {/* Dropdown Part */}
                <div className="dropdown dropdown-bottom dropdown-end">
                    <div tabIndex="0" role="button" className="m-1 md:px-2 p-2 ml-2 w-16 rounded-full">
                        <img
                            src={profileImage || ProfileImage}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>

                    {/* Dropdown Menu */}
                    <ul tabIndex="0" className="dropdown-content menu bg-base-100 rounded-box z-[1] w-64 mt-5 shadow">
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
                                <button className="btn btn-primary">
                                    <Link to={'/DeshboardHome'}>View Profile</Link>
                                </button>
                                <br />
                                <li><Link to="#">Upload Content</Link></li>
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
