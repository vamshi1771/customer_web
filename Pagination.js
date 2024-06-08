import React from "react";
import Pagination from 'react-bootstrap/Pagination';
import { Snackbar } from "@mui/material";


function paginationPage(props){
 
    const pagination=()=>{
        for(let num =1 ;num<{count};num++){
            console.log(num);
            if(num === current) {
                return (<Pagination.Item key={num} onClick={() => { setCurrent(num) }} active>{num}</Pagination.Item>);
            }
            return (<Pagination.Item key={num} onClick={() => { setCurrent(num) }} >{num}</Pagination.Item>)
        }
    }
    
    return (
        <div>
            {pagination};
        </div>
    );
}

export default paginationPage;