
import { Link } from 'react-router-dom';
import Homes from './Homes';
import Personal from './Personal';
const DeshboardHome = () => {
    return (
        <>
            <div className="flex justify-between mt-10 px-0 md:px-10 py-19">
                <h1 className="font-bold text-2xl"><Link to={"/"}><i className="fa-brands fa-youtube text-red-500"></i> BDTube Profile</Link></h1>
                <h1>UserName: Robiul</h1>
            </div>
            <div className="grid grid-cols-12 gap-10 mt-10 px-0 md:px-10 py-19">
                <div className="col-span-4 shadow-xl rounded-md">
                    <div className="py-10 ">
                       <div>
                       <p className="py-6 px-3 border-l-8 border-l-white hover:border-l-8 hover:border-l-blue-600 hover:bg-gray-50 text-xl transition-colors duration-200">
                           <Link to={"/Homes"}> <i className="fa-solid px-3 fa-house"></i> Home</Link>
                        </p>
                        <p className="py-6 px-3 border-l-8 border-l-white hover:border-l-8 hover:border-l-blue-600 hover:bg-gray-50 text-xl transition-colors duration-200">
                           <Link to={"/Personal"}> <i className="fa-solid px-3 fa-user"></i> Personal Information</Link>
                        </p>
                        <p className="py-6 px-3 border-l-8 border-l-white  hover:border-l-8 hover:border-l-blue-600 hover:bg-gray-50 text-xl transition-colors duration-200">
                            <i className="fa-solid px-3 fa-list"></i> Playlist
                        </p>
                        <p className="py-6 px-3 border-l-8 border-l-white hover:border-l-8 hover:border-l-blue-600 hover:bg-gray-50 text-xl transition-colors duration-200">
                            <i className="fa-solid px-3 fa-video"></i> Video Upload
                        </p>
                        <p className="py-6 px-3 border-l-8 border-l-white hover:border-l-8 hover:border-l-blue-600 hover:bg-gray-50 text-xl transition-colors duration-200">
                            <i className="fa-solid px-3 fa-chart-simple"></i> Graph
                        </p>
                        <p className="py-6 px-3 border-l-8 border-l-white hover:border-l-8 hover:border-l-blue-600 hover:bg-gray-50 text-xl transition-colors duration-200">
                            <i className="fa-solid px-3 fa-right-from-bracket"></i> Logout
                        </p>
                    </div>
                       </div>
                </div>
                <div className="col-span-8">
                  <Homes />
                  <Personal />
                </div>
            </div>
        </>
    );
}

export default DeshboardHome;
