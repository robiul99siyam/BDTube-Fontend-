import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert";

const Playlist = () => {
    const [data, setData] = useState([]);
    const userId = localStorage.getItem("userId");
    const [listname, setListname] = useState("");
    const [content, setContent] = useState([]);
    const token = localStorage.getItem("authToken");
    const [playlistData, setPlayList] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const navigate = useNavigate();

    // Fetch content data
    useEffect(() => {
        fetch("https://robiulislam0580.pythonanywhere.com/netfiex/api/content/")
            .then(res => res.json())
            .then(data => setData(data));
    }, []);

    const FilterPlayListData = data.filter(item => item.author_id === parseInt(userId));

    // Fetch playlist data
    useEffect(() => {
        fetch("https://robiulislam0580.pythonanywhere.com/netfiex/api/playlist/")
            .then(res => res.json())
            .then(playlistData => setPlayList(playlistData));
    }, []);

    const playFilterData = playlistData.filter(item => item.user === parseInt(userId));

    // Create a playlist
    const handlePlaylist = async (e) => {
        e.preventDefault();

        const postData = {
            list_name: listname,
            user: userId,
            content: content,
        };

        try {
            const response = await axios.post('https://robiulislam0580.pythonanywhere.com/netfiex/api/playlist/', postData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
            navigate("/");
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

    // Handle playlist selection
    const handleBoxClick = (playlist) => {
        setSelectedPlaylist(playlist);
    };

    return (
        <>
            <label htmlFor="my_modal_6" className="mt-10 mx-auto w-[150px] bg-blue-500 p-4 text-white hover:bg-blue-700 rounded-md text-center block">
                PlayList Create
            </label>

            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <label htmlFor="my_modal_6" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
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

            {/* Display Playlists */}
            {playFilterData.map((playlist) => (
                <div
                    key={playlist.id}
                    className="max-w-xs rounded-lg overflow-hidden shadow-lg m-4 cursor-pointer"
                    onClick={() => handleBoxClick(playlist)}
                >
                    <img
                        src={playlist.content_title[0]?.thumbell || "/default_thumb.jpg"} // Fallback for missing thumbnail
                        className="w-full opacity-28 h-40 object-cover"
                        alt={playlist.list_name}
                    />
                    <div className="p-4">
                        <h2 className="text-lg font-semibold truncate">{playlist.list_name}</h2>
                        <p className="text-sm text-gray-600">{playlist.content_title.length} videos</p>
                    </div>
                </div>
            ))}

            {/* Display selected playlist */}
            {selectedPlaylist && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg max-w-lg w-[30%]">
                        <h2 className="text-xl font-bold mb-4">{selectedPlaylist.list_name}</h2>
                        {selectedPlaylist.content_title.map((item) => (
                            <Link to={`/view-content/${item.id}/${item.title}`} key={item.id}>
                                <div className="mb-4">
                                    <img
                                        src={item.thumbell}
                                        className="w-full h-40 object-cover mb-2"
                                        alt={item.title}
                                    />
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                </div>
                            </Link>
                        ))}
                        <button
                            onClick={() => setSelectedPlaylist(null)}
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Playlist;
