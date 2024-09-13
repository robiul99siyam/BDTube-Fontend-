import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Edit = ({ data, id }) => {
    const test = data.filter(item => item.id === id);

    return (
        <>
            <button
                className="absolute top-2 bg-red-500 text-white px-2 ml-2 py-1 rounded"
                onClick={() => document.getElementById('my_modal_1').showModal()}
            >
                Edit Now
            </button>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    {test.length > 0 ? (
                        test.map(item => (
                            <p key={item.id}>{item.title}</p>
                        ))
                    ) : (
                        <p>No data found</p>
                    )}
                    <div className="modal-action">
                        <form method="dialog">

                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default Edit;
