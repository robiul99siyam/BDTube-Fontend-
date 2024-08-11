import { useEffect, useState } from "react";
import Content from './Content';

const Category = () => {

    const [data, setData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    useEffect(() => {
        fetch("https://bdtube-backend.onrender.com/netfiex/api/category/")
            .then(res => res.json())
            .then(data => setData(data));
    }, [])

    const filteredData = selectedCategory
        ? data.filter(item => item.name === "Commdy")
        : data;
    console.log(filteredData.name);

    return (
        <>
            <div className="flex gap-3 py-3 overflow-x-scroll scroll-smooth scroll-mx-1 scroll-p-0">

                {
                    data.map(item => (
                        <button
                            key={item.id}
                            className={`btn ${selectedCategory === item.name ? 'btn-primary' : 'btn-gray'}`}
                            onClick={() => setSelectedCategory(item.name)}
                        >
                            {item.name}
                        </button>
                    ))
                }

                {
                    filteredData.length
                }






            </div>
        </>
    );
};

export default Category;
