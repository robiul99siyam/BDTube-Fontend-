import React, { useEffect, useState } from 'react';
import ImageLog from "../image/log.png";
import { Link, useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import axios from 'axios';
import swal from 'sweetalert';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const doSubmit = async (event) => {
        event.preventDefault();
        let user_captcha = document.getElementById('user_captcha_input').value;

        if (validateCaptcha(user_captcha)) {
            setMessage('Captcha Matched');
            loadCaptchaEnginge(6);
            document.getElementById('user_captcha_input').value = "";

            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            try {
                const response = await axios.post("https://robiulislam0580.pythonanywhere.com/user/account/login/", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log("Response:", response.data); // Added logging

                if (response.data && response.data.token) {
                    const { user_id, token } = response.data;
                    localStorage.setItem('userId', user_id);
                    localStorage.setItem('authToken', token);
                    swal({
                        text: "Login Successfully!",
                        icon: "success",
                        timer: 4000,
                        buttons: false,
                    });
                    navigate("/");
                } else {
                    throw new Error("Invalid response from server");
                }
            } catch (error) {
                console.error("There was an error!", error.response || error.message);
                swal({
                    text: error.response?.data?.detail || "An error occurred while logging in. Please try again.",
                    icon: "error",
                    timer: 4000,
                    buttons: false,
                });
            }
        } else {
            setMessage('Captcha Does Not Match');
            document.getElementById('user_captcha_input').value = "";
        }
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
                    <img className="w-full " src={ImageLog} alt="" />
                </div>
                <div className="md:col-span-6 col-span-12 mt-20">
                    <form onSubmit={doSubmit}>
                        {/*  Login data input fields  */}
                        <div className="relative mb-8">
                            <i className="fa-solid fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="UserName"
                                className="border-gray-500 w-full pl-10 pr-4 py-3 text-lg focus:outline-black focus:bg-gray-50 ring-2 ring-slate-400 rounded-sm"
                                required
                            />
                        </div>

                        <div className="relative mb-8">
                            <i className="fa-solid fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Password"
                                className="border-gray-500 pl-10 pr-4 py-3 w-full text-lg focus:outline-black focus:bg-gray-50 ring-2 ring-slate-400 rounded-sm"
                                required
                            />
                        </div>
                        <div className="col mt-3">
                            <LoadCanvasTemplate />
                        </div>

                        <div className="col mt-3">
                            <div><input className="border-gray-500 pl-10 pr-4 py-3 w-full text-lg focus:outline-black focus:bg-gray-50 ring-2 ring-slate-400 rounded-sm"
                                required placeholder="Enter Captcha Value" id="user_captcha_input" name="user_captcha_input" type="text" /></div>
                        </div>
                        {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
                        {/* button  */}
                        <button className="w-full md:w-[90%] mt-5 bg-red-500 text-white py-3 font-extrabold rounded-sm hover:bg-red-600" type="submit">Login</button>

                        <div className="flex gap-5 justify-center mt-8 mb-8">
                            <p>___________________</p>
                            <p className="font-extrabold mt-1">OR</p>
                            <p>___________________</p>
                        </div>
                    </form>

                    <p className="font-extrabold text-center">Create an account? <span className="font-extrabold text-blue-600"><Link className="underline" to={"/register"}>Register</Link></span></p>
                </div>
            </div>
        </>
    );
}

export default Login;
