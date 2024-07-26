const Description = ({ data }) => {


    return (
        <>
            <div className="w-[70%] shadow-xl p-5">
                {
                    data.map(item => (
                        <p >{item.description.length > 100 ? `${item.description.slice(0, 100)}...` : item.description}</p>
                    ))
                }
            </div>
        </>
    );
}

export default Description;