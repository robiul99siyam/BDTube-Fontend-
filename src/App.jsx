import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './data/Index'; 
import ParentComponent from './pages/ParentComponent';
import Register from './pages/Register';




function App() {
	return (
		<BrowserRouter>
			<Routes>
				
				<Route path='/' element={<Home />} />
				<Route path='/view-content/:id' element={<ParentComponent />} />
				<Route path='/register' element={<Register />} />
			

				
			</Routes>
		</BrowserRouter>
		



	);
}

export default App;
