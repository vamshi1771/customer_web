import React from "react";
import "./productBox.css";
import { MercerLogo } from "../variables-urls/ImageUrls";


const Productbox = ({data,handleToggle}) =>{



    return (
        <div className="cm-product-box bg-white css-1tuh7nu">
            <img className="ms-2 mercerLogo" src={data.photoUrl} alt='This is image' />
            <label className="text-blue-gray-700 fw-semibold  border-bottom align-self-center">{data.productName}</label>
            <p className="cm-xs-txt text-blue-gray-700 mb-1 d-flex justify-content-between align-items-center"> <span>Price :</span> <span>{data.price}/-</span></p> 
            <p className="cm-xs-txt text-blue-gray-700 mb-1 d-flex justify-content-between align-items-center "> <span>Quantity :</span> <span>{data.quantity}</span></p> 
            <div className="mt-3 ms-4  product-box-footer">
                <span onClick={handleToggle} className="new-product cm-modify">Modify</span>
            </div>
        </div>
    );
}
export default Productbox;