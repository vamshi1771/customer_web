import React, { useEffect, useState } from "react";
import Pagination from 'react-bootstrap/Pagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DataTableComp from '../components/DataTable';
import MuiPagination from "../components/Pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import HighChrts from "../charts/HighCharts";
import { useNavigate } from "react-router-dom";

function GetOrders() {
    const navigate = useNavigate();
    const [pageCurrent, setPageCurrent] = useState(1);
    const [Bsearch, setBsearch] = useState();
    const [search, setsearch] = useState();
    const [result, setresult] = useState([]);
    const [Data, setData] = useState([]);
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState();
    const [orderedProducts,setOrderedProducts] = React.useState(null);
    const [panelData,setPanelData] = React.useState({
        customersCount : "",
        ordersCount : "",
        productsCount : "",
        outOfStock : ""
      })

    const navigatToPieChart = () => {
        navigate("/pieChart")
    }
    const handleGetpanelData =(data)=>{
        console.log("data",data)
        setPanelData({
          ...panelData,
          ["customersCount"] : data.customersCount,
          ["ordersCount"] : data.ordersCount,
          ["productsCount"]: data.productsCount,
          ["outOfStock"]:data.outOfStock
        })
      }

    const searchedData = () => {
        fetch(`http://localhost:8090/getOrdersByCustomerId/${search}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(Data);
                setCount(1);
            })
    }

    const getAllOrderdProducts = () =>{
        fetch(`http://localhost:8090/GetAllOrderedProducts`)
        .then((res) => res.json())
        .then((data) => {
            setOrderedProducts(data.regions);
            handleGetpanelData(data);
        })
    }

    const getAllOrders = async () => {
        try {
            const Response = await fetch(`http://localhost:8090/getAllOrdersInPages/0/5`)
            const fetcheddata = await Response.json();
            setData(fetcheddata.pageableOrdersList);
            console.log(fetcheddata.content);
            setCount(1);
        }
        catch (err) {
            setCount(0);
            console.log(err);
        }
    };
    const setCurrentPage = (e) => {
        setPageCurrent(e.target.value);
        setCurrent(pageCurrent - 1);
    }

    // useEffect(() => {
    //     if (search) searchedData();      
    // }, [search, current]);

    useEffect(() => {
        getAllOrders();
        getAllOrderdProducts();
    }, [])

    const handleBSearch = (e) => {
        setBsearch(e.target.value);
    }
    const handledbsearch = () => {
        setsearch(Bsearch);
        searchedData();
    }
    const handlePageChange = (event) => {
        getAllOrders(event - 1);
    }

    const handleOgSearch = (e) => {
        setBsearch(e.target.value);
    }

    return (
        <div className="mt-5">

            <div className="mt-5">
                <div className="ms-4 cm-home-top">
                    <div className="ms-4">
                        <p className="my-0 cm-sm-txt fw-semibold text-blue-gray-700 cm-home-dash-widget-header bg-blue-gray-50 d-flex align-items-center justify-content-between py-3 px-4">
                            Product usage
                        </p>
                        {<HighChrts Data={orderedProducts} />}
                    </div>
                    <div className="ms-4 col-6">
                        <div className="cm-home-dash-top-cards d-flex align-items-center flex-wrap justify-content-between">
                            <div className="cm-home-dash-item bg-white">
                                <h3>{panelData.customersCount}</h3>
                                <p className="my-0 text-blue-gray-700 fw-medium">Total Customers</p>
                            </div>
                            <div className="cm-home-dash-item bg-white">
                                <h3>{panelData.ordersCount}</h3>
                                <p className="my-0 text-blue-gray-700 fw-medium">Total Orders</p>
                            </div>
                            <div className="cm-home-dash-item bg-white">
                                <h3>{panelData.productsCount}</h3>
                                <p className="my-0 text-blue-gray-700 fw-medium">Total Products</p>
                            </div>
                            <div className="cm-home-dash-item bg-white">
                                <h3>{panelData.outOfStock}</h3>
                                <p className="my-0 text-blue-gray-700 fw-medium">Out of Stock</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <input
                    type="text"
                    className="w-form-control"
                    value={Bsearch}
                    onChange={handleBSearch}
                ></input>
                <br></br>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={handledbsearch}
                    disabled={Bsearch ? false : true}
                >
                    search
                </Button>{" "} */}
            </div>
            <br></br>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className="table-head fw-medium cm-sm-txt fw-medium ">
                        <TableRow>
                            <TableCell className="text-blue-gray-700" align="center">
                                {" "}
                                OrderId
                            </TableCell>
                            <TableCell className="text-blue-gray-700" align="center">
                                {" "}
                                Product Name
                            </TableCell>
                            <TableCell className="text-blue-gray-700" align="center">
                                {" "}
                                Customer Name
                            </TableCell>
                            <TableCell className="text-blue-gray-700" align="center">
                                {" "}
                                No of Products
                            </TableCell>
                            <TableCell className="text-blue-gray-700" align="center">
                                {" "}
                                Price
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Data.map((Data) => (
                            <TableRow
                                key={Data.orderId}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    {Data.orderId}
                                </TableCell>
                                <TableCell align="center">{Data.productName}</TableCell>
                                <TableCell align="center">{Data.customerName}</TableCell>
                                <TableCell align="center">{Data.productCount}</TableCell>
                                <TableCell align="center">{Data.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="cm-products-footer ">
                <MuiPagination
                    pageCount={count}
                    pageIndex={current + 1}
                    onChange={(event, pagenumber) =>
                        handlePageChange(event, pagenumber)
                    }
                />
            </div>
            {/* <button className="PieChartButton"
                onClick={navigatToPieChart} >PieChart</button> */}
        </div>
    );
}

export default GetOrders;








