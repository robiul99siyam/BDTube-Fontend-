import RegisterImg from "../image/register.png";
import { Link } from 'react-router-dom';

const Register = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
    };

    return (
        <>
            <div className="mt-5">
                <Link to={"/"} className="text-[16px] md:text-[20px] font-serif font-semibold">
                    <i className="fa-solid fa-angle-left"></i> BDTube
                </Link>
            </div>
            <div className="grid grid-cols-12 gap-10 mt-10 px-0 md:px-10 py-19">
                <div className="md:col-span-6 col-span-12">
                    <img className="animate-fadeInUp" style={{ animationDelay: '0.5s' }} src={RegisterImg} alt="RegisterImage" />
                    <p className="font-extrabold text-center text-2xl mt-5">Create your Account</p>
                </div>
                <div className="md:col-span-6 col-span-12 p-1">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="relative mb-8">
                                <i className="fa-solid fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="border-gray-500 w-full pl-10 pr-4 py-3 text-lg focus:outline-black focus:bg-gray-50 ring-2 ring-slate-400 rounded-sm"
                                    required
                                />
                            </div>

                            <div className="relative mb-8">
                                <i className="fa-solid fa-user w-full absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="border-gray-500 pl-10 pr-4 py-3 w-full text-lg focus:outline-black focus:bg-gray-50 ring-2 ring-slate-400 rounded-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="relative mb-8">
                                <i className="fa-solid fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="border-gray-500 pl-10 pr-4 py-3 w-full text-lg focus:outline-black focus:bg-gray-50 ring-2 ring-slate-400 rounded-sm"
                                    required
                                />
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                className="mb-8 border-gray-500 md:w-[260px] px-5 py-3 text-sm w-full focus:outline-black focus:bg-gray-50 ring-2 ring-slate-400 rounded-sm"
                                required
                            />
                        </div>

                        <div className="relative mb-4">
                            <i className="fa-solid fa-envelope absolute left-3 top-5 transform text-gray-500"></i>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="mb-8 w-full md:w-[90%] border-gray-500 px-10 py-3 text-lg focus:outline-black focus:bg-gray-50 ring-2 ring-slate-400 rounded-sm"
                                required
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="relative mb-8">
                                <i className="fa-solid fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="border-gray-500 pl-10 pr-4 py-3 w-full text-lg focus:outline-black focus:bg-gray-50 ring-2 ring-slate-400 rounded-sm"
                                    required
                                />
                            </div>

                            <div className="relative mb-8">
                                <i className="fa-solid fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="border-gray-500 pl-10 pr-4 py-3 text-lg focus:outline-black focus:bg-gray-50 ring-2 w-full ring-slate-400 rounded-sm"
                                    required
                                />
                            </div>
                        </div>

                        <button className="w-full md:w-[90%] bg-red-500 text-white py-3 font-extrabold rounded-sm hover:bg-red-600" type="submit">
                            Create your account
                        </button>
                    </form>

                    <div className="flex gap-5 justify-center mt-8 mb-8">
                        <p>___________________</p>
                        <p className="font-extrabold mt-1">OR</p>
                        <p>___________________</p>
                    </div>

                    <p className="font-extrabold text-center">
                        Already Registered? <span className="font-extrabold text-blue-600"><Link className="underline" to={"/login"}>Login</Link></span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;