import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import "../index.css";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { Menu, MenuList, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { or } from "ajv/dist/compile/codegen";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { MenuItem } from '@mui/material'
import SnackBar from "../components/SnackBar";
import { openSnackBar } from "../redux/actions/snackbaractions";

function OrdersForms(Props) {
  const [Open, setOpen] = useState(false);
  const [customerName, setOrderName] = useState("");
  const [OrderId, setOrderId] = useState("");
  const [Price, setPrice] = useState("");
  const [CustId, setCustId] = useState("");
  const [noOfProducts, setNoOfProducts] = React.useState("");
  const [iserror, setIserror] = React.useState(false);
  const [customerOptions,setCustomerOptions] = React.useState(null);
  const [productOptions,setProductOPtions] = React.useState(null);
  const initialState = {
    customerId: "",
    productId: "",
    price: "",
    numberOfProducts: '',
  }
  const [orderdetails, setOrderDetails] = React.useState(initialState);


  const disPatch = useDispatch();
  const [isValid, setIsValid] = React.useState(true);
  const handleValidate = (orderdetails) => {
    if (orderdetails.customerName === "") return false;
    if (orderdetails.productId === "") return false;
    if (orderdetails.price === "") return false;
    if (orderdetails.numberOfProducts === "") return false;
    return true;
  };

  const setcustomersProducts = (customersProduct,productOption) =>{
      const customerOptions =  customersProduct.map((item) => {
        return {label : item.customerName , id : item.customerId}
      })
      setCustomerOptions(customerOptions);
      const productOptions = productOption.map((item) => {
        return {label : item.productName , id : item.productId}
      })
      setProductOPtions(productOptions);
    
  }

  const [errorMsg, setErrorMsg] = React.useState("");
  function handleSubmit(event) {
    event.preventDefault();
  }

  React.useEffect(() => {
    getCustomerAndProducts();
    
  }, []);

  const getCustomerAndProducts = () => {
    fetch(`http://localhost:8090/getCustomersAndProducts`, {
      method: "GET",
      headers: { "Content-type": "Application/Json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setcustomersProducts(data.customersList,data.productLists);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleButtonSubmit =async() => {
    // disPatch(SNACK_OPEN());

    const isValided = handleValidate(orderdetails);
    setIsValid(isValided);
    if (!isValided) return;

    try {
      const res = await fetch(`http://localhost:8090/saveOrder`, {
        method: "POST",
        headers: { "Content-type": "Application/Json" },
        body: JSON.stringify(orderdetails),
      })
      let iscorrect =false
      if (res.ok){
        console.log("logged") 
        iscorrect = true;
        disPatch(openSnackBar({ severity: "success", message: "Order Registered Successfully" }))}
        else {
          disPatch(openSnackBar({ severity: "error", message: "products out of Stock/less stocks available" }))}
        }
    catch(err){
      console.log("err", err)
      disPatch(openSnackBar({ severity: "error", message: err.message }))
    }
    // fetch(`http://localhost:8090/saveOrder`, {
    //   method: "POST",
    //   headers: { "Content-type": "Application/Json" },
    //   body: JSON.stringify(orderdetails),
    // })
    //   .then((res) => {
    //     if(res.ok) disPatch(openSnackBar({severity:"success",message:"Orders Registered Successfully"}))
    //     res.json();
    //   })
    //   .then((data) => {
    //     setOpen(true);
    //     setErrorMsg(data.message);
    //   if(data.message != "")  disPatch(openSnackBar({severity:"error",message:data.message}))
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //     disPatch(openSnackBar({severity:"error",message:err.message}))  
    //   });
      setOrderDetails(initialState);
  };

  const handleToClose = (event, reason) => {
    if (reason === "clickaway") return;

    setOpen(false);
    // disPatch(SNACK_CLOSE());
  };

  const handleChange = (key, e) => {
    setOrderDetails({
      ...orderdetails,
      [key]: e.target.value,
    });
  };


  const handleNameChange = (e) => {
    const search = e.target.value;
    const ans = search.trim();
    const str = ans.split(" ");
    let temp = "";
    for (let num = 0; num < str.length; num++) {
      if (str[num] === "") continue;
      else temp = temp + str[num] + " ";
    }
    temp = temp.trim();
    setOrderName(temp);
  };
  const handleMuiChange = (e,value,id,reason) =>{
    console.log("value",value)
    if(reason === 'clear'){
      setOrderDetails({
        ...orderdetails,
        [id] : "",
      })
    }
    else{
    setOrderDetails({
      ...orderdetails,
      [id] : value.id,
    })
  }
  }

const loadOptions = () =>{

}

  return (
    <div>
      <div
        className="PostCustomerForm"
        style={{
          display: "grid",
          "grid-template-columns": "1fr 1fr",
          "grid-template-rows": "1fr 1fr",
          gap: "50px",
          "font-weight": "500",
          "font-size": "large",
          "margin-top": "50px",
        }}
      >
        <div>
          <label className="d-block mb-1">Customer Name: </label>
          <Autocomplete
            disablePortal
            className="cm-auto-complete"
            id="combo-box-demo"
            options={customerOptions!= null && customerOptions.map((item)=> item)}
            sx={{ width: 300 }}
            onChange={(event,value,reason)=>handleMuiChange(event,value,"customerId",reason)}
            renderInput={(params) => <TextField {...params} />}
          />
          {!isValid && orderdetails.customerName === "" && (
            <span className="cm-xs-txt text-danger fw-medium pt-2">
              Field required
            </span>
          )}
        </div>

        <div>
          <label className="d-block mb-1">Product Name: </label>
          {/* <input
            className="cm-input-field"
            type="Number"
            placeholder="Enter product Id"
            name="customername"
            value={orderdetails.productId}
            onChange={(event) => {
              handleChange("productId", event);
            }}
          /> */}
          <Autocomplete
            disablePortal
            className="cm-auto-complete"
            id="combo-box-demo"
            options={productOptions!= null && productOptions.map((item)=> item)}
            sx={{ width: 300 }}
            onChange={(event,value,reason)=>handleMuiChange(event,value,"productId",reason)}
            renderInput={(params) => <TextField {...params} />}
          />
          {!isValid && orderdetails.productId === null && (
            <span className="cm-xs-txt text-danger fw-medium pt-2">
              Field required
            </span>
          )}
        </div>
        <div>
          <label className="d-block mb-1">Price : </label>
          <input
            className="cm-input-field"
            type="text"
            placeholder="Enter price"
            name="customername"
            value={orderdetails.price}
            onChange={(event) => {
              handleChange("price", event);
            }}
          />
          {!isValid && orderdetails.price === "" && (
            <span className="cm-xs-txt text-danger fw-medium pt-2">
              Field required
            </span>
          )}
        </div>

        <div>
          <label className="d-block mb-1">Number of products Ordered : </label>
          <input
            className="cm-input-field"
            type="Number"
            placeholder="Enter Number of productsddress"
            value={orderdetails.numberOfProducts}
            name="customername"
            onChange={(event) => {
              handleChange("numberOfProducts", event);
            }}
          />
          {!isValid && orderdetails.numberOfProducts === null && (
            <span className="cm-xs-txt text-danger fw-medium pt-2">
              Field required
            </span>
          )}
        </div>
      </div>

      <Button
        className="mt-4 PostOrderButton"
        style={{ display: "block", alignSelf: "center" }}
        id="formButton"
        type="submit"
        onClick={handleButtonSubmit}
      >
        Post Order details
      </Button>
    </div>
  );
}
export default OrdersForms;
