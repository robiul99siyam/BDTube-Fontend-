import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Playlist = () => {
    const [data, setData] = useState([]);
    const userId = localStorage.getItem("userId");
    const [listname, setListname] = useState("");
    const [content, setContent] = useState([]);
    const token = localStorage.getItem("authToken");
    const navigate = useNavigate()
    useEffect(() => {
        fetch("http://127.0.0.1:8000/netfiex/api/content/")
            .then(res => res.json())
            .then(data => setData(data));
    }, []);

    const FilterPlayListData = data.filter(item => item.author_id === userId);

    const handlePlaylist = async (e) => {
        e.preventDefault();
    
        const data = {
            list_name: listname,
            user: userId,
            content: content,
        };
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/netfiex/api/playlist/', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
            document.getElementById("my_modal_6").checked = false;
            swal({
                text: "Playlist created successfully!",
                icon: "success",
                timer: 4000,
                buttons: false,
            });
        } catch (err) {
            if (err.response) {
                console.error("Error Data:", err.response.data);
                swal({
                    text: "Failed to submit playlist. Please check your input.",
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


            <label htmlFor="my_modal_6" className="mt-10 mx-auto w-[150px] bg-blue-500 mt-5 p-4 text-white hover:bg-blue-700 rounded-md text-center block">PlayList Create </label>



            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">


                    <form onSubmit={handlePlaylist}>


                        <label className="font-bold">Playlist Name</label>
                        <input
                            value={listname}
                            onChange={(e) => setListname(e.target.value)}
                            type="text"
                            placeholder="Playlist Name"
                            className="border-gray-500 w-full pl-10 pr-4 py-3 text-lg focus:outline-black focus:bg-gray-50 ring-2 ring-slate-400 rounded-sm"
                            required
                        />

                        <label className="font-bold">Content</label>
                        <select
                            multiple
                            className="select select-bordered w-full border-gray-500 text-lg focus:outline-black focus:bg-gray-50 ring-2 ring-slate-400 rounded-sm"
                            value={content}
                            onChange={(e) => {
                                const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
                                setContent(selectedOptions);
                            }}
                            
                            required
                        >
                            {FilterPlayListData.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.title}
                                </option>
                            ))}
                        </select>

                        <div className="modal-action">
                            <button type="submit" className="btn">Post!</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
};

export default Playlist;
