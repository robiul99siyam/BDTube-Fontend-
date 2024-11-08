import { Link, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

const DeshboardHome = () => {
    const [data, setData] = useState([]);
    const [profileImage, setProfileImage] = useState(null);
    const [username, setUsername] = useState('');
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");
        setIsLogin(!!token && !!userId);

        if (token && userId) {
            fetch("https://robiulislam0580.pythonanywhere.com/user/profile/image/")
                .then(res => res.json())
                .then(data => {
                    setData(data);

                    const userProfile = data.find(item => item.user.id === parseInt(userId));
                    if (userProfile) {
                        setProfileImage(userProfile.image);
                        setUsername(userProfile.user.username);
                    }
                })
                .catch(error => console.error("Error fetching profile data:", error));
        }
    }, []);

    return (
        <>
            <div className="flex justify-between mt-10 px-0 md:px-10 py-19">
                <Link to={"/"}>
                    <h1 className="font-bold text-2xl">
                        <i className="fa-brands fa-youtube text-red-500"></i> BDTube Profile
                    </h1>
                </Link>
                <h1>UserName: {username}</h1>
            </div>
            {/* Sidebar part  */}
            <div className="grid grid-cols-12 gap-10 mt-10 px-0 md:px-10 py-19 h-[600px]">
                {/* Sidebar */}
                <div className="col-span-4 shadow-xl rounded-md h-full">
                    <div className="py-10">
                        <div>
                            <Link to="personal">
                                <p className="py-6 px-3 border-l-8 border-l-white hover:border-l-8 hover:border-l-blue-600 hover:bg-gray-50 text-xl transition-colors duration-200">
                                    <i className="fa-solid px-3 fa-user"></i> Personal Information
                                </p>
                            </Link>

                            <Link to={"VideoUpload"}>
                                <p className="py-6 px-3 border-l-8 border-l-white hover:border-l-8 hover:border-l-blue-600 hover:bg-gray-50 text-xl transition-colors duration-200">
                                    <i className="fa-solid px-3 fa-video"></i> Video Upload
                                </p>
                            </Link>

                            <Link to={"AllVideo"}>

                                <p className="py-6 px-3 border-l-8 border-l-white hover:border-l-8 hover:border-l-blue-600 hover:bg-gray-50 text-xl transition-colors duration-200">
                                    <i className="fa-solid px-3 fa-list"></i> All Video
                                </p>
                            </Link>
                            
                            <Link to={'Watch'}>
                                <p className="py-6 px-3 border-l-8 border-l-white hover:border-l-8 hover:border-l-blue-600 hover:bg-gray-50 text-xl transition-colors duration-200">
                                    <i className="fa-solid px-3 fa-chart-simple"></i> Graph
                                </p>
                            </Link>
                            <p className="py-6 px-3 border-l-8 border-l-white hover:border-l-8 hover:border-l-blue-600 hover:bg-gray-50 text-xl transition-colors duration-200">
                                <i className="fa-solid px-3 fa-right-from-bracket"></i> Logout
                            </p>
                        </div>
                    </div>
                </div>
                {/* Main content */}
                <div className="col-span-8">
                    <Outlet />
                </div>
            </div>

        </>
    );
}

export default DeshboardHome;
