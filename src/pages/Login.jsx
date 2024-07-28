import ImageLog from "../image/log.png"
import { Link } from 'react-router-dom';
const Login = () => {
    return (
        <>


            <div className="mt-5">
                <Link to={"/"} className="text-[16px] md:text-[20px] font-serif font-semibold">
                    <i className="fa-solid fa-angle-left"></i> BDTube
                </Link>
            </div>
            <div className="grid grid-cols-12 gap-10 mt-10 px-0 md:px-10 py-19">
                <div className="md:col-span-6 col-span-12">
                    <img className="w-full h[50%] " src={ImageLog} alt="" />
                </div>
                <div className="md:col-span-6 col-span-12  mt-40">


                    <form method="post">
                        {/*  Login data input fields  */}
                        <div className="relative mb-8 ">
                            <i className="fa-solid fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                            <input
                                type="text"
                                placeholder="UserName"
                                className="border-gray-500 w-full pl-10  pr-4 py-3 text-lg focus:outline-black focus:bg-gray-50 ring-2 ring-slate-400 rounded-sm"
                                required
                            />
                        </div>


                        <div className="relative mb-8">
                            <i className="fa-solid fa-lock absolute left-3 top-1/2 transform   -translate-y-1/2 text-gray-500"></i>
                            <input
                                type="password"
                                placeholder="Password"
                                className="border-gray-500 pl-10 pr-4 py-3 w-full text-lg focus:outline-black focus:bg-gray-50 ring-2 ring-slate-400 rounded-sm"
                                required
                            />
                        </div>



                        {/* button  */}
                        <button className="w-full md:w-[90%] bg-red-500 text-white py-3 font-extrabold rounded-sm hover:bg-red-600" type="submit">Login </button>


                        <div className="flex gap-5 justify-center mt-8 mb-8">
                            <p>___________________</p>
                            <p className="font-extrabold mt-1">OR</p>
                            <p>___________________</p>
                        </div>
                    </form>

                    <p className="font-extrabold text-center">Already Register? <span className="font-extrabold text-blue-600"><Link to={"/register"}>Login</Link></span></p>

                </div>
            </div>

        </>
    );
}

export default Login;