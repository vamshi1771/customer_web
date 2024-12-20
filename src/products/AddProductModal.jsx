import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import "./productBox.css";
import { openSnackBar } from '../redux/actions/snackbaractions';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({ modalStatus, setModalStatus, modalData }) {

    const [open, setOpen] = React.useState(modalStatus);
    const [photo, setPhoto] = React.useState(null);
    const [edit,setEdit] =  React.useState(false);
    const initialState = {
        productName: modalData ? modalData.productName : "",
        price: modalData ? modalData.price : "",
        quantity: modalData ? modalData.quantity : "",
    }
    const disPatch = useDispatch();
    React.useEffect(()=>{
        setProductdetails({
            ...productDetails,
            ["productName"] : modalData.productName ? modalData.productName : "",
            ["price"] : modalData.price ?  modalData.price : "",
            ["quantity"] : modalData.quantity ?  modalData.quantity : "",
        })
        setEdit(modalData.productName ? true : false);
    },[modalData])
    const [productDetails, setProductdetails] = React.useState(initialState);

    const handleClose = () => {
        setOpen(!modalStatus);
    }

    const handleInputChange = (e, key) => {
        setProductdetails({
            ...productDetails,
            [key]: e.target.value,
        })
    }
    const handleFileUpload = (event) => {
        const files = event.target.files[0];
        console.log("files", files)
        setPhoto(files);


        // If validation passes, proceed with sending files to the server (explained later)
    }

    const handleSubmit = async () => {

        if (photo === null) {
            disPatch(openSnackBar({severity:"error",message:"please add a photo"}));
           return;
        }
        const formData = new FormData();
        formData.append("image", photo)
        if (!edit) {
        try {
                const res = await fetch(`http://localhost:8090/saveProduct/${productDetails.productName}/${productDetails.price}/${productDetails.quantity}`, {
                    method: "POST",
                    body: formData
                })
                if(res.ok){
                    disPatch(openSnackBar({severity: "success", message: "Product Registred Succesfully" }))
                }
               else{
                disPatch(openSnackBar({severity: "error", message: "Something went wrong" }))
               }
            }

        catch (err) {
            console.log(err)
            disPatch(openSnackBar({severity: "error", message: err }))
        }
    }
    else{
        try{
        const res = await fetch(`http://localhost:8090/updateProduct/${productDetails.productName}/${productDetails.price}/${productDetails.quantity}/${modalData.productId}`, {
            method: "POST",
            body: formData
        }) 
        if(res.ok){
            disPatch(openSnackBar({severity: "success", message: "Product Updated Succesfully" }))
        }
       else{
        disPatch(openSnackBar({severity: "error", message: "Something went wrong" }))
       }
    }
    catch (err) {
        console.log(err)
        disPatch(openSnackBar({severity: "error", message: err }))
    }

    setModalStatus();
    }
}

    return (
        <div className='cm-add-product-box border-neutral-900'>
            <Modal
                open={modalStatus}
                onClose={setModalStatus}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className='text-blue-gray-700'>
                      <>  Register New Product  <FontAwesomeIcon className="cm-pointer"  onClick={setModalStatus} icon={faXmark} /></>
                       
                    </Typography>
                    
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div>
                            <label>Product Name :</label>
                            <input className='cm-input-field' type='text' value={productDetails?.productName} placeholder=' Enter Product Name' onChange={(e) => { handleInputChange(e, "productName") }} />
                            <label className='mt-2'>Price  :</label>
                            <input className='cm-input-field' type='text' placeholder=' Enter Price' value={productDetails?.price} onChange={(e) => { handleInputChange(e, "price") }} />
                            <label className='mt-2'>Product Quantity :</label>
                            <input className='cm-input-field' type='text' placeholder='Number of Products' value={productDetails?.quantity} onChange={(e) => { handleInputChange(e, "quantity") }} />
                            <label className='mt-2'>Product image :</label>
                            <input type='file' placeholder=' Enter Product Name' onChange={handleFileUpload} />
                        </div>
                        <div className='mt-4'>
                            <span onClick={handleSubmit} className="cm-submit-btn">
                                Submit
                            </span>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}