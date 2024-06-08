import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import '../index.css';
import '../App.css';
import { Snackbar } from "@mui/material";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { openSnackBar,closeSnackBar }  from "../Redux/actions/snackbaractions";
import { Customer_Registered } from "../Variables&Urls/Variables";
import {useDispatch,useSelector } from "react-redux";

function Postforms(props) {

  const [CustomerName, setCustomerName] = useState("");
  const [CustomerId, setCustomerId] = useState("");
  const [Region, setRegion] = useState("");
  const [gender, setgender] = useState("");

 const disPatch=useDispatch();
 const open = useSelector((state)=> state.snackbar);
 console.log(open);
  
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault()

    const Customerdetails = {
      "customerId": CustomerId,
      "customerName": CustomerName,
      "region": Region,
      "gender": gender,
    }

    fetch(`http://localhost:8080/Post`, {
      method: 'POST',
      headers: { 'Content-type': 'Application/Json' },
      body: JSON.stringify(Customerdetails)
    })
      .then((res) => res.text())
      .then((data) => {
        setErrorMessage(data)
        disPatch(openSnackBar({ message: data, type: 'success' }));
      })
      .catch((err) => console.log(err));
  }

  const handleToClose = (event, reason) => {
    if (reason === "clickaway") return;
    // setOpen(false);
    disPatch(closeSnackBar());
  };

  const handleNameChange = (e) => {
    const search = e.target.value;
    const ans = search.trim();
    const str = ans.split(" ");
    let temp = "";
    for (let num = 0; num < ((str.length)); num++) {
      if (str[num] === "") continue;
      else temp = temp + str[num] + " ";
    }
    temp = temp.trim();
    setCustomerName(temp);
  }




  return (
    <div  >
      <Form className="PostCustomerForm" style={{ display: 'grid', 'grid-template-columns': "1fr 1fr", 'grid-template-rows': "1fr 1fr", gap: '50px', 'font-weight': '500', 'font-size': 'large', 'margin-top': '50px' }} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label id="formName">CustomerName:</Form.Label>
          <Form.Control className="required-field" required type="text"
            placeholder="Enter CustomerName" name="customername" onChange={handleNameChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label id="formName">Enter CustomerId<span className="requiredfield">*</span>:</Form.Label>
          <Form.Control className="has-suffix" required type="number"
            placeholder="Enter customerId" name="customerid" onChange={e => setCustomerId(e.target.value)} ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label id="formName">Enter Region:</Form.Label>
          <Form.Control className="required-field" required type="text" placeholder="Enter Region" name="region" onChange={e => setRegion(e.target.value)} />
        </Form.Group>

        <Form.Group>
          <Form.Label id="formName">Enter gender:</Form.Label>
          <Form.Control className="required-field" required type="text" placeholder="Enter gender" name="gender" onChange={e => setgender(e.target.value)} />
        </Form.Group>
        <br></br>

        <Button className="PostCustomerButton" style={{ display: 'block', alignSelf: 'center' }} id="formButton" type="submit"
          disabled={CustomerId ? false : true}>
          Post customer details
        </Button>



        <Snackbar open={open.status} autoHideDuration={4000} onClose={handleToClose}>
          <Alert
            onClose={handleToClose}
            severity={(open.message) ? "error" : "success"}
            
            variant="filled"
            sx={{ width: '100%' }}
          >
            {errorMessage ? open.message : Customer_Registered}
          </Alert>
        </Snackbar>
      </Form>




    </div>
  )
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











