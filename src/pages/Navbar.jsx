import React from "react";
import { Link } from "react-router-dom";
import ProfileImage from "../image/Porfolo pic.png"

const Navbar = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
       
    };
    return (
        <>
           <div className="navbar mt-2 flex justify-between items-center sticky top-0 bg-white">

                {/* this is here logo part  */}
                <div className="flex justify-between items-center">
                    <Link to={"/"} className="text-[16px] md:text-[25px] font-serif font-semibold">
                        <i className="fa-brands  fa-youtube text-red-500"></i> BDTube
                    </Link>
                </div>

                {/* this is here input part  */}


                <form onSubmit={handleSubmit} method="get" className="flex justify-center">

                    <input type="text" name="search"
                        className="block  w-[220px] md:w-[500px] focus:outline-none  xl:w-[650px]  rounded-l-full border-0 py-1.5 md:py-3 pl-8 p-2 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        placeholder="search" />

                    <button className="bg-gray-300 py-1.5 md:py-3 w-10 md:w-25 xl:w-[80px] rounded-r-full focus:ring-green-600 ">
                        <i className="fa-solid fa-magnifying-glass"></i></button>
                </form>



                <i class="fa-solid fa-bell"></i>
                {/* this is dropdown part  */}
                <div className="dropdown dropdown-bottom dropdown-end ">

                    <div tabindex="0" role="button" className="m-1 md:px-2 p-2 ml-2 w-16  rounded-full">
                        <img src={ProfileImage} alt="" />
                    </div>


                    {/* ul li data show  */}
                    <ul tabIndex="0" className="dropdown-content menu bg-base-100 rounded-box z-[1] w-64 mt-5 shadow">
                        <div className="m-1 md:px-2 p-2 ml-14 w-20 rounded-full">
                            <img src={ProfileImage} alt="" />
                        </div>

                        <br />
                        <button className="btn btn-primary">
                            <Link to={'/DeshboardHome'}>View Profile</Link>
                        </button>
                        <br />

                        <li><a href="#">Upload Content</a></li>
                        <li><a href="#">Logout</a></li>
                        <li>
                            <Link to={"/register"}>Sing Up</Link>
                        </li>
                        <li>
                            <Link to={"/login"}>Sing In</Link>
                        </li>
                    </ul>


                </div>

            </div>
        </>
    );
}

export default Navbar;