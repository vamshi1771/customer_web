import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import "../index.css";
import "../App.css";
import { Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { openSnackBar, closeSnackBar } from "../redux/actions/snackbaractions";
import { Customer_Registered } from "../variables-urls/Variables";
import { useDispatch, useSelector } from "react-redux";
import SnackBar from "../components/SnackBar";

function Postforms(props) {
  const initialState = {
    customerName: "",
    region: "",
    gender: "",
    phoneNumber: "",
    address: "",
  };
  const [customerDetails, setCustomerDetails] = React.useState(initialState);

  const [Open, setOpen] = useState(false);
  const disPatch = useDispatch();
  // const open = useSelector((state) => state.snackbar);

  const [errorMessage, setErrorMessage] = useState("");
  const open = useSelector((state) => state.Snackbar);
  const [isValid, setIsValid] = React.useState(true);
  const [iserror, setIserror] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState("")

  const handleValidate = (Customerdetails) => {
    if (customerDetails.customerName === "") return false;
    if (customerDetails.phoneNumber === "") return false;
    if (customerDetails.region === "") return false;
    if (customerDetails.gender === "") return false;
    if (customerDetails.address === "") return false;
    return true;

  }
  const handleSubmit = async (event) => {
    const Customerdetails = {
      phoneNumber: customerDetails.phoneNumber,
      customerName: customerDetails.customerName,
      region: customerDetails.region,
      gender: customerDetails.gender,
      address: customerDetails.address,
    };


    const isValided = handleValidate(Customerdetails);
    setIsValid(isValided);
    if (!isValided) return;
    let istrue = false;
    setOpen(true);
    try {
      const res = await fetch(`http://localhost:8090/Post`, {
        method: "POST",
        headers: { "Content-type": "Application/Json" },
        body: JSON.stringify(Customerdetails),
      })
      let iscorrect =false
      if (res.ok){ 
        istrue =true;
        iscorrect = true;
        disPatch(openSnackBar({ severity: "success", message: "Customer Registered Successfully" }))}
        else {
          disPatch(openSnackBar({ severity: "error", message: "Same CustomerName Already Existed" }))}
        }
    catch(err){
      console.log("err", err)
      disPatch(openSnackBar({ severity: "error", message: err.message }))
    }
  if (istrue) setCustomerDetails(initialState);
};

const handleToClose = (event, reason) => {
  if (reason === "clickaway") return;
  setOpen(false);
  disPatch(closeSnackBar());
};

const handleChange = (key, e) => {
  setCustomerDetails({
    ...customerDetails,
    [key]: e.target.value,
  });
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
          value={customerDetails.customerName}
          onChange={(event) => {
            handleChange("customerName", event);
          }}
        />
        {!isValid && customerDetails.customerName === "" && (
          <span className="cm-xs-txt text-danger fw-medium pt-2">
            Field required
          </span>
        )}
      </div>

      <div>
        <label className="d-block mb-1">Region: </label>
        <input
          className="cm-input-field"
          type="text"
          placeholder="Enter Region"
          name="customername"
          value={customerDetails.region}
          onChange={(event) => {
            handleChange("region", event);
          }}
        />
        {!isValid && customerDetails.customerName === "" && (
          <span className="cm-xs-txt text-danger fw-medium pt-2">
            Field required
          </span>
        )}
      </div>
      <div>
        <label className="d-block mb-1">Gender: </label>
        <input
          className="cm-input-field"
          type="text"
          placeholder="Enter gender"
          name="customername"
          value={customerDetails.gender}
          onChange={(event) => {
            handleChange("gender", event);
          }}
        />
        {!isValid && customerDetails.customerName === "" && (
          <span className="cm-xs-txt text-danger fw-medium pt-2">
            Field required
          </span>
        )}
      </div>

      <div>
        <label className="d-block mb-1">phone Number: </label>
        <input
          className="cm-input-field"
          type="number"
          placeholder="Enter phoneNumber"
          name="customername"
          value={customerDetails.phoneNumber}
          onChange={(event) => {
            handleChange("phoneNumber", event);
          }}
        />
        {!isValid && customerDetails.customerName === "" && (
          <span className="cm-xs-txt text-danger fw-medium pt-2">
            Field required
          </span>
        )}
      </div>

      <div>
        <label className="d-block mb-1">Address: </label>
        <input
          className="cm-input-field"
          type="text"
          placeholder="Enter Address"
          value={customerDetails.address}
          name="customername"
          onChange={(event) => {
            handleChange("address", event);
          }}
        />
        {!isValid && customerDetails.customerName === "" && (
          <span className="cm-xs-txt text-danger fw-medium pt-2">
            Field required
          </span>
        )}
      </div>
    </div>

    <Button
      onClick={handleSubmit}
      className="mt-4 PostCustomerButton"
      style={{ display: "block", alignSelf: "center" }}
      id="formButton"
      type="submit"
    >
      ADD Customer 
    </Button>
  </div>
);
}

export default Postforms;
