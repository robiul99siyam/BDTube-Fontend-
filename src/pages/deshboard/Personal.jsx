import { useState, useEffect } from 'react';

const Personal = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");

        if (token && userId) {
            fetch("https://robiulislam0580.pythonanywhere.com/user/profile/image/")
                .then(res => res.json())
                .then(data => {
                    const userProfile = data.find(item => item.user.id === parseInt(userId));
                    if (userProfile) {
                        setProfileImage(userProfile.image);
                        setUsername(userProfile.user.username);
                        setFirstName(userProfile.user.first_name);
                        setLastName(userProfile.user.last_name);
                        setEmail(userProfile.user.email);
                    }
                })
                .catch(error => console.error("Error fetching profile data:", error));
        }
    }, []);

    return (
        <>
            <div className='mx-auto'>
                <h1 className='text-center text-3xl font-bold'>Personal Information</h1>
                <img className='w-[200px] rounded-full mx-auto py-5' src={profileImage} alt="Profile" />
            </div>

            <div className='ml-40 py-5 mx-auto'>
                <div>
                    <p className='font-bold  text-[18px] py-1'>Username:</p>
                    <p className='w-[500px] bg-gray-100 rounded-md p-2 py-2 text-[18px]'>{username}</p>
                </div>
                <div>
                    <p className='font-bold text-[18px] py-1'>FirstName:</p>
                    <p className='w-[500px] bg-gray-100 rounded-md p-2 py-2 text-[18px]'>{firstName}</p>
                </div>
                <div>
                    <p className='font-bold text-[18px] py-1'>LastName:</p>
                    <p className='w-[500px] bg-gray-100 rounded-md p-2 py-2 text-[18px]'>{lastName}</p>
                </div>
                <div>
                    <p className='font-bold text-[18px] py-1'>Email:</p>
                    <p className='w-[500px] bg-gray-100 rounded-md p-2 py-2 text-[18px]'>{email}</p>
                </div>
                <button className='ml-[200px] w-[150px] bg-blue-500 mt-5 p-4 text-white hover:bg-blue-700 rounded-md'>Edit Profile</button>
            </div>
        </>
    );
}

export default Personal;
