import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './Pages/HomePage';
import PostCustomer from './Pages/PostCustomers';
import GetCustomers from './Pages/GetCustomers';
import PostOrders from './Pages/PostOrders';
import GetOrders from './Pages/GetOrders';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Vamshi from './components/Navigator';
import ReactSwitch from 'react-switch';
import HighChrts from './Charts/HighCharts';
import { MercerLogo } from './Variables&Urls/ImageUrls';
import { useDispatch, useSelector } from 'react-redux';
import { darkmode, lightMode } from './Redux/actions/DarkModeactions';
export const ThemeContext = createContext(null);
function App() {

	const dispatch = useDispatch();
	const mode = useSelector((state) => state.DarkMode)


	const toggleTheme = () => {
		// setTheme((curr) => (curr === "light" ? "dark" : "light"));
		if (mode.theme === "light")
			dispatch(darkmode());
		else {
			dispatch(lightMode());
		}
	};

	const history = useNavigate();

	{/*className='App' id={Theme.ON?"light":"dark"}> */ }
	return (
		<ThemeContext.Provider value={mode.theme}>
			<div className='App' id={mode.theme}>
				<div className="navbar navbar-expand-lg navbar-light" id="navibar" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
					<div >
						<div>
							<button id="backbutn" style={{ 'backgroundColor': "#003865", color: '#fff', 'border-radius': '4px' }} onClick={() => history(-1)}>Back</button>
						</div>
						<div>
							<Vamshi></Vamshi>
						</div>
					</div>
					<div>
						<div>
							<ReactSwitch onChange={toggleTheme} checked={mode.theme === "dark"}></ReactSwitch>
						</div>
						<img src={`${MercerLogo}`} style={{ height: '10vh', 'margin-right': '30px', 'padding-top': '0px', width: '50vh', minWidth: '10vh' }}></img>
					</div>
				</div>
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/PostCustomer' element={<PostCustomer />}></Route>
					<Route path='/GetCustomers' element={<GetCustomers />}></Route>
					<Route path='/PostOrders' element={<PostOrders />}></Route>
					<Route path='/GetOrders' element={<GetOrders />}></Route>
					<Route path='/Piechart' element={<HighChrts />}></Route>
				</Routes>
			</div>
		</ThemeContext.Provider>

	);
}
export default App

