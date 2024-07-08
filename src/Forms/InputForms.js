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
import { Label } from "recharts";

function Postforms(props) {

  const initialState = {
    customerName: "",
    region: "",
    gender: "",
    phoneNumber: "",
    address: "",
  };
  const [customerDetails, setCustomerDetails] = React.useState(initialState);

  const disPatch = useDispatch();
  const open = useSelector((state) => state.snackbar);

  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
console.log("customerDetails",customerDetails)
    const Customerdetails = {
      phoneNumber: customerDetails.phoneNumber,
      customerName: customerDetails.customerName,
      region: customerDetails.region,
      gender: customerDetails.gender,
      address: customerDetails.address,
    };

    console.log("Customerdetails", Customerdetails);
    fetch(`http://localhost:8080/Post`, {
      method: "POST",
      headers: { "Content-type": "Application/Json" },
      body: JSON.stringify(Customerdetails),
    })
      .then((res) => res.text())
      .then((data) => {
        setErrorMessage(data);
        disPatch(openSnackBar({ message: data, type: "success" }));
      })
      .catch((err) => console.log(err));
  }

  const handleToClose = (event, reason) => {
    if (reason === "clickaway") return;
    // setOpen(false);
    disPatch(closeSnackBar());
  };

  const handleChange = (key, e) => {
    setCustomerDetails({
      ...customerDetails,
      [key]: e.target.value,
    });
  };

  // const handleNameChange = (e) => {
  //   const search = e.target.value;
  //   const ans = search.trim();
  //   const str = ans.split(" ");
  //   let temp = "";
  //   for (let num = 0; num < str.length; num++) {
  //     if (str[num] === "") continue;
  //     else temp = temp + str[num] + " ";
  //   }
  //   temp = temp.trim();
  //   setCustomerName(temp);
  // };

  return (
    <>
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
            onChange={(event) => {
              handleChange("customerName", event);
            }}
          />
        </div>
        <div>
          <label className="d-block mb-1">Region: </label>
          <input
            className="cm-input-field"
            type="text"
            placeholder="Enter Region"
            name="customername"
            onChange={(event) => {
              handleChange("region", event);
            }}
          />
        </div>
        <div>
          <label className="d-block mb-1">Gender: </label>
          <input
            className="cm-input-field"
            type="text"
            placeholder="Enter gender"
            name="customername"
            onChange={(event) => {
              handleChange("gender", event);
            }}
          />
        </div>

        <div>
          <label className="d-block mb-1">phone Number: </label>
          <input
            className="cm-input-field"
            type="number"
            placeholder="Enter phoneNumber"
            name="customername"
            onChange={(event) => {
              handleChange("phoneNumber", event);
            }}
          />
        </div>

        <div>
          <label className="d-block mb-1">Address: </label>
          <input
            className="cm-input-field"
            type="text"
            placeholder="Enter Address"
            name="customername"
            onChange={(event) => {
              handleChange("address", event);
            }}
          />
        </div>
      </div>

      <Button
      onClick={handleSubmit}
        className="mt-4 PostCustomerButton"
        style={{ display: "block", alignSelf: "center" }}
        id="formButton"
        type="submit"
      >
        Post customer details
      </Button>

      {/* <Form
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
        onSubmit={handleSubmit}
      >
        <Form.Group>
          <label className="d-block mb-1">Customer Name: </label>
          <input
            className="cm-input-field"
            required
            type="text"
            placeholder="Enter CustomerName"
            name="customername"
            onChange={(value) => {
              handleChange("customerName", value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <label className="d-block mb-1">Region: </label>
          <input
            className="cm-input-field"
            required
            type="text"
            placeholder="Enter region"
            name="region"
            onChange={(e) => {
              handleChange("Region", e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label id="formName">Region:</Form.Label>
          <Form.Control
            className="required-field"
            required
            type="text"
            placeholder="Enter Region"
            name="region"
            onChange={(e) => {
              handleChange("Region", e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label id="formName">Gender:</Form.Label>
          <Form.Control
            className="required-field"
            required
            type="text"
            placeholder="Enter gender"
            name="gender"
            onChange={(e) => {
              handleChange("Gender", e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label id="formName">
            phone Number:<span className="requiredfield">*</span>:
          </Form.Label>
          <Form.Control
            className="has-suffix"
            required
            type="text"
            placeholder="Enter Phone Number"
            name="customerid"
            onChange={(e) => {
              handleChange("phoneNumber", e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label id="formName">
            Address:<span className="requiredfield">*</span>:
          </Form.Label>
          <Form.Control
            className="has-suffix"
            required
            type="text"
            placeholder="Enter Address"
            name="customerid"
            onChange={(e) => {
              handleChange("Address", e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <br></br>

        

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
      </Form> */}
    </>
  );
}

export default Postforms;

// import React, { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.css';
// import Form from 'react-bootstrap/Form';
// import '../index.css';
// import '../App.css';
// import { useSelector, useDispatch } from 'react-redux'
// import { SNACK_OPEN, SNACK_CLOSE, selectSnackBar } from "../Redux/actions/snackBarSlice";
// import { ClickAwayListener, Snackbar } from "@mui/material";
// import Button from '@mui/material/Button';
// import Alert from '@mui/material/Alert';

// function Postforms(Props) {

//   const [CustomerName, setCustomerName] = useState("");
//   const [CustomerId, setCustomerId] = useState("");
//   const [Region, setRegion] = useState("");
//   const [gender, setgender] = useState("");

//   const [Open, setOpen] = useState(false);
//   const open = useSelector((state) => (state.Snackbar));

//   const disPatch = useDispatch();

//   function handleSubmit(event) {
//     event.preventDefault()

//     const Customerdetails = {
//       "customerId": CustomerId,
//       "customerName": CustomerName,
//       "region": Region,
//       "gender": gender,
//     }

//     fetch('http://localhost:8080/Post', {
//       method: 'POST',
//       headers: { 'Content-type': 'Application/Json' },
//       body: JSON.stringify(Customerdetails)
//     })
//       .then((res) => res.text())
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((err) => console.log(err));
//   }

//   const handleToClose = (event, reason) => {
//     if (reason === "clickaway") return;

//     setOpen(false);
//     // disPatch(SNACK_CLOSE());
//   };

//   const handleButtonSubmit = () => {

//     setOpen(true);
//     // disPatch(SNACK_OPEN());
//   };

//   const handleNameChange = (e) => {
//     const search = e.target.value;
//     const ans = search.trim();
//     const str = ans.split(" ");
//     let temp = "";
//     for (let num = 0; num < ((str.length)); num++) {
//       if (str[num] === "") continue;
//       else temp = temp + str[num] + " ";
//     }
//     temp = temp.trim();
//     setCustomerName(temp);
//   }

//   return (
//     <div >
//       <Form style={{display:'grid' ,'grid-template-columns':"1fr 1fr" ,'grid-template-rows':"1fr 1fr",gap:'50px','font-weight': '500','font-size': 'large','margin-top':'50px'}} onSubmit={handleSubmit}>
//         <Form.Group>
//           <Form.Label id="formName">CustomerName:</Form.Label>
//           <Form.Control className="required-field" required type="text"
//             placeholder="Enter CustomerName" name="customername" onChange={handleNameChange} />
//         </Form.Group>
//         <br></br>
//         <Form.Group>
//           <Form.Label id="formName">Enter CustomerId*:</Form.Label>
//           <Form.Control className="has-suffix" required type="number"
//             placeholder="Enter customerId" name="customerid" onChange={e => setCustomerId(e.target.value)} ></Form.Control>
//         </Form.Group>
//         <br></br>
//         <Form.Group>
//           <Form.Label id="formName">Enter Region:</Form.Label>
//           <Form.Control className="required-field" required type="text" placeholder="Enter Region" name="region" onChange={e => setRegion(e.target.value)} />
//         </Form.Group>
//         <br></br>
//         <Form.Group>
//           <Form.Label id="formName">Enter gender:</Form.Label>
//           <Form.Control className="required-field" required type="text" placeholder="Enter gender" name="gender" onChange={e => setgender(e.target.value)} />
//         </Form.Group>
//         <br></br>

//         <Button id="formButton" type="submit"
//           onClick={handleButtonSubmit} disabled={CustomerId ? false : true}>
//           Post customer details
//         </Button>

//         <Snackbar open={Open} autoHideDuration={6000} onClose={handleToClose}>
//           <Alert
//             onClose={handleToClose}
//             severity="success"
//             //error for errors
//             variant="filled"
//             sx={{ width: '100%' }}
//           >
//             This is a success Alert inside a Snackbar!
//           </Alert>
//         </Snackbar>
//       </Form>

//     </div>
//   );

// }
// export default Postforms;
