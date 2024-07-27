const Comment = () => {
    return (
        <>
            <h1>Commnt 👏👏</h1>

            <div className="flex justify-start my-5 gap-5">
                <input type="text" className=" w-[50%] overflow-hidden focus:outline-none border border-b-black border-l-0 border-t-0 border-r-0"/>
                <button type="submit" className="bg-gray-900 hover:bg-gray-950 px-5 py-3 rounded-md text-white">Comment</button>
            </div>
        </>
    )
}


export default Comment