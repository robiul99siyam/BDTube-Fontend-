import { useEffect, useState } from "react";

const Category = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://bdtube-backend.onrender.com/netfiex/app/category/")
            .then(res => res.json())
            .then(data => setData(data));
    }, [])


    return (
        <>
            <div className="flex gap-3 py-3 overflow-x-scroll scroll-smooth scroll-mx-1 scroll-p-0">

                {
                    data.map(item => (
                        <button key={item.id}  className="btn btn-gray  ">{item.name}</button>
                    ))
                }
              


            </div>
        </>
    );
};

export default Category;
