import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import '../index.css';
import '../App.css';

import { ClickAwayListener, Snackbar } from "@mui/material";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';




function Forms(Props) {

  const [CustomerName, setCustomerName] = useState("");
  const [CustomerId, setCustomerId] = useState("");
  const [Region, setRegion] = useState("");
  const [gender, setgender] = useState("");


  const [Open, setOpen] = useState(false);
  function handleSubmit(event) {
    event.preventDefault()

    const Customerdetails = {
      "customerId": CustomerId,
      "customerName": CustomerName,
      "region": Region,
      "gender": gender,
    }

    fetch(`{$Base_Url}/Post`, {
      method: 'POST',
      headers: { 'Content-type': 'Application/Json' },
      body: JSON.stringify(Customerdetails)
    })
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }





  const handleToClose = (event, reason) => {
    if (reason === "clickaway") return;

    setOpen(false);
    // disPatch(SNACK_CLOSE());
  };

  const handleButtonSubmit = () => {

    setOpen(true);
    // disPatch(SNACK_OPEN());
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
    <div >
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label id="formName">CustomerName:</Form.Label>
          <Form.Control className="required-field" required type="text"
            placeholder="Enter CustomerName" name="customername" onChange={handleNameChange} />
        </Form.Group>
        <br></br>
        <Form.Group>
          <Form.Label id="formName">Enter CustomerId<span className="requiredfield">*</span>:</Form.Label>
          <Form.Control className="has-suffix" required type="number"
            placeholder="Enter customerId" name="customerid" onChange={e => setCustomerId(e.target.value)} ></Form.Control>
        </Form.Group>
        <br></br>
        <Form.Group>
          <Form.Label id="formName">Enter Region:</Form.Label>
          <Form.Control className="required-field" required type="text" placeholder="Enter Region" name="region" onChange={e => setRegion(e.target.value)} />
        </Form.Group>
        <br></br>
        <Form.Group>
          <Form.Label id="formName">Enter gender:</Form.Label>
          <Form.Control className="required-field" required type="text" placeholder="Enter gender" name="gender" onChange={e => setgender(e.target.value)} />
        </Form.Group>
        <br></br>

        <Button id="formButton" type="submit"
          onClick={handleButtonSubmit} disabled={CustomerId ? false : true}>
          Post customer details
        </Button>


        <Snackbar open={Open} autoHideDuration={6000} onClose={handleToClose}>
          <Alert
            onClose={handleToClose}
            severity="success"
            //error for errors
            variant="filled"
            sx={{ width: '100%' }}
          >
            This is a success Alert inside a Snackbar!
          </Alert>
        </Snackbar>
      </Form>




    </div>
  );

}
export default Forms;











{/* <Form.Group> 
          <Form.Label>CustomerName:</Form.Label> 
          <Form.Control type="text" 
                        placeholder="Enter CustomerName"  name="customername" onChange={e=>setCustomerName(e.target.value)}/> 
        </Form.Group> 
        <br></br>



  const handleToClose = (event, reason) => {
    if ("clickaway" === reason) return;
    setOpen(false);
  };


   <Snackbar message="Form submitted Successfully!"
          open={open}
          autoHideDuration={4000}
          onClose={handleToClose} />



        <Form.Group> 
          <Form.Label>Enter CustomerId:</Form.Label> 
          <Form.Control required type="number" 
                        placeholder="Enter customerId" name="customerid" onChange={e=>setCustomerId(e.target.value)} />   
        </Form.Group> 
        <br></br>
        <Form.Group> 
          <Form.Label>Enter Region:</Form.Label> 
          <Form.Control type="text" placeholder="Enter Region" name="region"  onChange={e=>setRegion(e.target.value)} /> 
        </Form.Group> 
        <br></br>
        <Form.Group> 
          <Form.Label>Enter gender:</Form.Label> 
          <Form.Control type="text" placeholder="Enter gender" name="gender"  onChange={e=>setgender(e.target.value)} /> 
        </Form.Group> 
        <br></br>

        <Button variant="primary" type="submit"
        onClick={handleButtonSubmit} disabled> 
           Post customer details
        </Button> 
        <Snackbar message="Form submitted Successfully!"
        autoHideDuration={4000}
        open={open}
        onClose={handleToClose}/>
      </Form>  */}