import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './data/Index'; 
import Navbar from './pages/Navbar';
import Content from './pages/Content';
import Category from './pages/Category';
import Details from './pages/Details';
import ParentComponent from './pages/ParentComponent';





function App() {
	return (
		<BrowserRouter>
			<Routes>
				
				<Route path='/' element={<Home />} />
				<Route path='/view-content/:id' element={<ParentComponent />} />
				
			</Routes>
		</BrowserRouter>
		



	);
}

export default App;
