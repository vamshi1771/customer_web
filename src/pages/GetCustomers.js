import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import { openSnackBar, closeSnackBar } from "../redux/actions/snackbaractions";
import { Customer_Registered } from "../variables-urls/Variables";
import { useDispatch, useSelector } from "react-redux";
import MuiPagination from "../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import HighChrts from "../charts/HighCharts";
import "./Customers.css";

function GetCustomers() {


  const disPatch = useDispatch();
  const open = useSelector((state) => state.snackbar);
  const [errorMessage, setErrorMessage] = useState("");
  const [Bsearch, setBsearch] = useState("");
  const [search, setsearch] = useState("");
  const [Data, setData] = useState([]);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState();
  const [chartData,setChartData] = React.useState(null)
  const [panelData,setPanelData] = React.useState({
    customersCount : "",
    ordersCount : "",
    productsCount : "",
    outOfStock : ""
  })

  const searchedData = () => {
    fetch(`http://localhost:8080/getSearchCustomers/${0}/${5}/${search}`, {
      method: "GET",
      headers: { "Content-type": "Application/Json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const fetchchartData=async()=>{
    try{
        const response=await fetch(`http://localhost:8090/getAllCustomersRegions`);
        const data=await response.json();
        handleGetpanelData(data);
        setChartData(data.regions)
    }
    catch(error){
        console.log(error);
    }
};

  const handleToClose = (event, reason) => {
    if (reason === "clickaway") return;
    disPatch(closeSnackBar());
  };

  
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

  const fetchdata = (pageIndex = 0) => {
    fetch(`http://localhost:8090/getAllCustomerInPages/${pageIndex}/${5}`, {
      method: "GET",
      headers: { "Content-type": "Application/Json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.customersPageable);
        setCount(data.pageCount);
        setCurrent(data.pageIndex - 1);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    if (search) searchedData();
    else fetchdata();
  }, [search]);

  useEffect(()=>{
    fetchchartData()
  },[])
  const handlePageChange = (event) => {
    fetchdata(event - 1);
  };

  return (
    <div className="mt-5">
      <div className="ms-3 cm-home-top">
        <div className="ms-4">
          <p className="my-0 cm-sm-txt fw-semibold text-blue-gray-700 cm-home-dash-widget-header bg-blue-gray-50 d-flex align-items-center justify-content-between py-3 px-4">
            Customer Regions
          </p>
         { <HighChrts Data={chartData} />}
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
      {/* <div className="text-end">
        <br></br>
        <input
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
        </Button>{" "}
        <Snackbar
          open={open.status}
          autoHideDuration={4000}
          onClose={handleToClose}
        >
          <Alert
            onClose={handleToClose}
            severity={open.message ? "error" : "success"}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {errorMessage ? open.message : Customer_Registered}
          </Alert>
        </Snackbar>
      </div> */}
      <br></br>
      <TableContainer className="cm-Table-container" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="table-head fw-medium cm-sm-txt">
            <TableRow>
              <TableCell className="text-blue-gray-700" align="center">
                {" "}
                Customer Id
              </TableCell>
              <TableCell
                className="text-blue-gray-700 fw-medium cm-sm-txt"
                align="center"
              >
                {" "}
                Customer Name
              </TableCell>
              <TableCell className="text-blue-gray-700" align="center">
                {" "}
                Gender
              </TableCell>
              <TableCell className="text-blue-gray-700" align="center">
                {" "}
                Region
              </TableCell>
              <TableCell className="text-blue-gray-700" align="center">
                {" "}
                Order Count
              </TableCell>
              <TableCell className="text-blue-gray-700" align="center">
                Actions{" "}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Data.map((Data) => (
              <TableRow
                key={Data.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {Data.customerId}
                </TableCell>
                <TableCell align="center">{Data.customerName}</TableCell>
                <TableCell align="center">{Data.gender}</TableCell>
                <TableCell align="center">{Data.region}</TableCell>
                <TableCell align="center">{Data.orderCount}</TableCell>
                <TableCell align="center">
                  <FontAwesomeIcon icon={faArrowRight} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="cm-products-footer ">
        <MuiPagination
          pageCount={count}
          pageIndex={current + 1}
          onChange={(event, pagenumber) => handlePageChange(event, pagenumber)}
        />
      </div>
      {/* <button className="PieChartButton"
                onClick={navigatToPieChart} >PieChart</button> */}
    </div>
  );
}

export default GetCustomers;
