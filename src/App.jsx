import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './data/Index'; 
import ParentComponent from './pages/ParentComponent';
import Register from './pages/Register';
import Login from "./pages/Login"
import DeshboardHome from './pages/deshboard/DeshboardHome';
import Homes from './pages/deshboard/Homes';
import Personal from './pages/deshboard/Personal';


{%  routing here %}
function App() {
	return (
		<BrowserRouter>
			<Routes>
				
				<Route path='/' element={<Home />} />
				<Route path='/view-content/:id' element={<ParentComponent />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login/>}/>
				<Route path='/DeshboardHome' element={<DeshboardHome />}/>
				<Route path='/Homes' element={<Homes />}/>
				<Route path='/Personal' element={<Personal />}/>
				
				

				
				

				
			</Routes>
		</BrowserRouter>
		



	);
}

export default App;
