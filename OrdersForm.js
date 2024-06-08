import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import '../index.css';
import '../App.css';
import { useSelector, useDispatch } from 'react-redux'
import {  Snackbar } from "@mui/material";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

           

function OrdersForms(Props){

  const [Open, setOpen] = useState(false);
  const[OrderName,setOrderName]=useState("");
  const[OrderId,setOrderId]=useState("");
  const[Price,setPrice]=useState("");
  const[CustId,setCustId]=useState("");

  const open = useSelector((state) => (state.Snackbar));
  
  const disPatch = useDispatch();

  function handleSubmit(event){
    event.preventDefault()
    

    
 const  OrderDetails={

      "orderId":OrderId,
      "orderName":OrderName,
      "price":Price,
      "custId":CustId,  
    };

    
    fetch(`http://localhost:8080/saveOrder`,{
      method: 'POST',
      headers:{'Content-type':'Application/Json'},
      body:JSON.stringify(OrderDetails)
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data)
    })
    .catch((err)=>console.log(err));
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
    setOrderName(temp);
  }







    return (
        <div >
      <Form className="PostOrderForm" style={{display:'grid' ,'grid-template-columns':"1fr 1fr" ,'grid-template-rows':"1fr 1fr",gap:'50px','font-weight': '500','font-size': 'large','margin-top':'50px'}} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label id="formName">OrderName:</Form.Label>
            <Form.Control className="required-field" required type="text"
              placeholder="Enter OrderName" name="ordername" onChange={handleNameChange} />
          </Form.Group>
          
          <Form.Group>
            <Form.Label id="formName">Enter OrderId<span className="requiredfield">*</span>:</Form.Label>
            <Form.Control className="has-suffix" required type="number"
              placeholder="Enter OrderId" name="orderId" onChange={e => setOrderId(e.target.value)} ></Form.Control>
          </Form.Group>
          
          <Form.Group>
            <Form.Label id="formName">Enter Price:</Form.Label>
            <Form.Control className="required-field" required type="number" placeholder="Enter price" name="price" onChange={e => setPrice(e.target.value)} />
          </Form.Group>
          
          <Form.Group>
            <Form.Label id="formName">Enter cust_id:</Form.Label>
            <Form.Control className="required-field" required type="number" placeholder="Enter cust_id" name="cust_id" onChange={e => setCustId(e.target.value)} />
          </Form.Group>
          <br></br>
  
          <Button className="PostOrderButton" style={{display:'block', alignSelf:'center'}} id="formButton" type="submit"
            onClick={handleButtonSubmit} disabled={OrderId ? false : true}>
            Post Order details
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
export default OrdersForms;