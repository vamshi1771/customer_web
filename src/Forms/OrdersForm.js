import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import "../index.css";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { or } from "ajv/dist/compile/codegen";

function OrdersForms(Props) {
  const [Open, setOpen] = useState(false);
  const [customerName, setOrderName] = useState("");
  const [OrderId, setOrderId] = useState("");
  const [Price, setPrice] = useState("");
  const [CustId, setCustId] = useState("");
  const [noOfProducts, setNoOfProducts] = React.useState("");
  const [iserror,setIserror] = React.useState(false)

  const [orderdetails, setOrderDetails] = React.useState({
    customerName: "",
    productId: null,
    price: "",
    customerId: null,
    numberOfProducts: null,
  });

  const open = useSelector((state) => state.Snackbar);

  const disPatch = useDispatch();
  const [isValid, setIsValid] = React.useState(true);
  const handleValidate = (orderdetails) => {
    if (orderdetails.customerName === "") return false;
    if (orderdetails.productId === "") return false;
    if (orderdetails.price === "") return false;
    if (orderdetails.customerId === "") return false;
    if (orderdetails.numberOfProducts === "") return false;
    return true;
  };

  const [errorMsg,setErrorMsg] = React.useState("")
  function handleSubmit(event) {
    event.preventDefault();

  };

  const handleButtonSubmit = () => {
    // disPatch(SNACK_OPEN());

    const isValided = handleValidate(orderdetails);
    setIsValid(isValided);
    if (!isValided) return;

    fetch(`http://localhost:8080/saveOrder`, {
      method: "POST",
      headers: { "Content-type": "Application/Json" },
      body: JSON.stringify(orderdetails),
    })
      .then((res) => res.json())
      .then((data) => {
        setOpen(true);
        setErrorMsg(data.message);
       if(data.message !== null) setIserror(true);
        console.log(data);
      })
      .catch((err) => {
        console.log("err",err)
        

  });
  }

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
          <input
            className="cm-input-field"
            type="text"
            placeholder="Enter CustomerName"
            name="customername"
            value={orderdetails.customerName}
            onChange={(event) => {
              handleChange("customerName", event);
            }}
          />
          {!isValid && orderdetails.customerName === "" && (
            <span className="cm-xs-txt text-danger fw-medium pt-2">
              Field required
            </span>
          )}
        </div>

        <div>
          <label className="d-block mb-1">product Id: </label>
          <input
            className="cm-input-field"
            type="Number"
            placeholder="Enter product Id"
            name="customername"
            value={orderdetails.productId}
            onChange={(event) => {
              handleChange("productId", event);
            }}
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
          <label className="d-block mb-1">customer Id : </label>
          <input
            className="cm-input-field"
            type="Number"
            placeholder="Enter customer Id "
            name="customername"
            value={orderdetails.customerId}
            onChange={(event) => {
              handleChange("customerId", event);
            }}
          />
          {!isValid && orderdetails.customerId === null && (
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

      <Snackbar open={Open} autoHideDuration={6000} onClose={handleToClose}>
        <Alert
          onClose={handleToClose}
          severity= {iserror ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default OrdersForms;
