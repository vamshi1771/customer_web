import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./pages/HomePage";
import PostCustomer from "./pages/PostCustomers";
import GetCustomers from "./pages/GetCustomers";
import PostOrders from "./pages/PostOrders";
import GetOrders from "./pages/GetOrders";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Vamshi from "./components/Navigator";
import ReactSwitch from "react-switch";
import HighChrts from "./charts/HighCharts";
import { MercerLogo } from "./variables-urls/ImageUrls";
import { useDispatch, useSelector } from "react-redux";
import { darkmode, lightMode } from "./redux/actions/DarkModeactions";
export const ThemeContext = createContext(null);
function App() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.DarkMode);

  const toggleTheme = () => {
    // setTheme((curr) => (curr === "light" ? "dark" : "light"));
    if (mode.theme === "light") dispatch(darkmode());
    else {
      dispatch(lightMode());
    }
  };

  const history = useNavigate();

  {
    /*className='App' id={Theme.ON?"light":"dark"}> */
  }
  return (
    <div className="cm-main-page" >    
          <div>
            <div>
              <Vamshi></Vamshi>
            </div>
          </div>
            {/* <img src={`${MercerLogo}`} style={{ height: '10vh', 'margin-right': '30px', 'padding-top': '0px', width: '50vh', minWidth: '10vh' }}></img> */}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/PostCustomer" element={<PostCustomer />}></Route>
          <Route path="/GetCustomers" element={<GetCustomers />}></Route>
          <Route path="/PostOrders" element={<PostOrders />}></Route>
          <Route path="/GetOrders" element={<GetOrders />}></Route>
          <Route path="/Piechart" element={<HighChrts />}></Route>
        </Routes>
      </div>
  );
}
export default App;
