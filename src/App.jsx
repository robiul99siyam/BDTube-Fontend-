import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './data/Home'; 
import ParentComponent from './pages/ParentComponent';
import Register from './pages/Register';
import Login from "./pages/Login"
import DeshboardHome from './pages/deshboard/DeshboardHome';
import Personal from './pages/deshboard/Personal';
import VideoUpload from './pages/deshboard/VideoUpload'
import AllVideo from './pages/deshboard/AllVideo'


function App() {
	return (
		<BrowserRouter>
			<Routes>
				
				<Route path='/' element={<Home />} />
				<Route path='/view-content/:id/:name' element={<ParentComponent />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login/>}/>
				
				
				
				<Route path='/DeshboardHome' element={<DeshboardHome />}>
					
					<Route path='personal' element={<Personal />} />
					<Route path='VideoUpload' element={<VideoUpload />} />
					<Route path='AllVideo' element={<AllVideo />} />
					{/* Add more routes here if needed */}
				</Route>
			
				
				

				
			</Routes>
		</BrowserRouter>
		



	);
}

export default App;
