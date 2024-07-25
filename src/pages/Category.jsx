import { useEffect, useState } from "react";

const Category = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://netfiex.onrender.com/netfiex/app/category/")
            .then(res => res.json())
            .then(data => setData(data));
    }, [])


    return (
        <>
            <div className="flex gap-3 py-4">

                {
                    data.map(item => (
                        <button key={item.id} className="btn btn-gray ">{item.name}</button>
                    ))
                }
              


            </div>
        </>
    );
};

export default Category;
