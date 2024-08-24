import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link, useNavigate } from 'react-router-dom';

const VideoUpload = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [language, setLanguage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://127.0.0.1:8000/netfiex/api/category/")
            .then(res => res.json())
            .then(data => setCategories(data));
    }, []);

    const handleVideo = async (e) => {
        e.preventDefault();
        const user = localStorage.getItem("userId");
        const token = localStorage.getItem("authToken");

      
        if (!selectedCategory) {
            swal({
                text: "Please select a category.",
                icon: "error",
                timer: 4000,
                buttons: false,
            });
            return;
        }

        const formData = new FormData();
        formData.append("category", selectedCategory); // Ensure this key matches the backend expectation
        formData.append("title", title);
        formData.append("language", language);
        formData.append("description", description);
        if (image) formData.append("thumbell", image); // Ensure this key matches what the backend expects
        formData.append("videofile", video);
        formData.append("author", user);

        // Log formData entries for debugging
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/netfiex/api/content/", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('response:', response.data);

            swal({
                text: "Video uploaded successfully!",
                icon: "success",
                timer: 4000,
                buttons: false,
            });
            navigate("/");

        } catch (err) {
            if (err.response) {
                console.error("Error Data:", err.response.data);
                swal({
                    text: "Failed to submit video. Please check your input.",
                    icon: "error",
                    timer: 4000,
                    buttons: false,
                });
            } else {
                console.error("Error:", err.message);
            }
        }
    };



    return (
        <>
            <h1 className="text-center text-3xl font-bold pb-5">Video Upload</h1>

            <form onSubmit={handleVideo}>
                <div className="px-20 pb-2">
                    <label className="font-bold">Category</label>
                    <select
                        className="select select-bordered w-full border-gray-500 pl-10 pr-4 py-3 text-lg focus:outline-black focus:bg-gray-50 ring-2 ring-slate-400 rounded-sm"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>

                </div>

                <div className="px-20 pb-2">
                    <label className="font-bold">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Video Title"
                        className="border-gray-500 w-full pl-10 pr-4 py-3 text-lg focus:outline-black focus:bg-gray-50 ring-2 ring-slate-400 rounded-sm"
                        required
                    />
                </div>

                <div className="px-20 py-2">
                    <label className="font-bold">Thumbnail</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="border-gray-500 w-full pl-10 pr-4 py-3 text-lg focus:outline-black focus:bg-gray-50 ring-2 ring-slate-400 rounded-sm"
                    />
                </div>

                <div className="px-20 py-2">
                    <label className="font-bold">Video</label>
                    {video && (
                        <div>
                            <p>Selected Video: {video.name}</p>
                            <p>Size: {(video.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                    )}
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideo(e.target.files[0])}
                        className="border-gray-500 w-full pl-10 pr-4 py-3 text-lg focus:outline-black focus:bg-gray-50 ring-2 ring-slate-400 rounded-sm"
                        required
                    />
                </div>

                <div className="px-20 py-2">
                    <label className="font-bold">Language</label>
                    <select
                        className="select select-bordered w-full border-gray-500 pl-10 pr-4 py-3 text-lg focus:outline-black focus:bg-gray-50 ring-2 ring-slate-400 rounded-sm"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        required
                    >
                        <option value="">Select Language</option>
                        <option value="Handi">Handi</option>
                        <option value="English">English</option>
                        <option value="Bangla">Bangla</option>
                    </select>
                </div>

                <div className="px-20 py-2">
                    <label className="font-bold">Description</label>
                    <textarea
                        className="border-gray-500 w-full pl-10 pr-4 py-3 text-lg focus:outline-black focus:bg-gray-50 ring-2 ring-slate-400 rounded-sm"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter the video description..."
                        required
                    />
                </div>

                <div className="px-20 py-2">
                    <button className="w-full mt-5 bg-red-500 text-white py-3 font-extrabold rounded-sm hover:bg-red-600" type="submit">Submit</button>
                </div>
            </form>
        </>
    );
};

export default VideoUpload;
