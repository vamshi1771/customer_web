import React, { useEffect, useState } from "react";
import Pagination from 'react-bootstrap/Pagination';
import DataTableComp from '../components/DataTable';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

function GetOrders() {

    const column=[ 
        {
            name:'OrderId',
            selector:row=>row.orderId,
            sortable:true
        },
        {
            name:'OrderName',
            selector:row=>row.orderName,
            sortable:true
        },
        
        {
            name:"Price",
            selector:row=>row.price,
            sortable:true
            
        },
        {
            name:"CustId",
            selector:row=>row.custId,
            sortable:true
        }
    ]

    const navigate=useNavigate();
    const [pageCurrent, setPageCurrent] = useState(1);
    const [Bsearch, setBsearch] = useState();
    const [search, setsearch] = useState();
    const [result, setresult] = useState([]);
    const [Data, setData] = useState([]);
    const [current, setCurrent] = useState(1);
    const [count, setCount] = useState(0);


    const navigatToPieChart=()=>{
        navigate("/pieChart")
    }
    const searchedData = async () => {
        try {
            const Response = await fetch(`http://localhost:8080/getOrdersByCustomerId/${search}`)
            const fetcheddata = await Response.json();
            setData(fetcheddata);
            console.log(Data);
            setCount(1);
        }
        catch (err) {
            setCount(0);
            console.log(err);
        }
    };
    const setCurrentPage = (e) => {
        setPageCurrent(e.target.value);
        setCurrent(pageCurrent - 1);
    }
    const paginationList = [];
    
            paginationList.push
                (<Pagination.Item key={current}  active>{count}</Pagination.Item>)
        
   
    useEffect(() => {
        if (search) searchedData();      
    }, [search, current]);

    const handleBSearch = (e) => {
        setBsearch(e.target.value);  
      
    }

    const handledbsearch = () => {
        setsearch(Bsearch);
       
        searchedData();
    }

    const handleMysubmit = (e) => {
        setCurrent(current + 1);
        setPageCurrent(pageCurrent + 1);

    }
    const handlePresubmit = (e) => {
        setCurrent(current - 1);
        setPageCurrent(pageCurrent - 1);

    }


    const handleFirstsubmit = () => {
        setCurrent(0);
        setPageCurrent(1);
    }
    const handleLastsubmit = () => {
        setCurrent(count - 1);
        setPageCurrent(count);
    }

    const handleOgSearch = (e) => {
        setBsearch(e.target.value);
    }

    return (
        <div className="container mt-5">
            <h1>Order details</h1>
            <div className="text-end">
               
                {/* /* onChange={(handlechange) for front-end sesrch}  disabled={search?false:true}*/}
                <h4>Enter CusotmerID</h4>
                <br></br>
                <input type="text" className="w-form-control" value={Bsearch} onChange={handleBSearch} ></input>
                <br></br>

                <Button variant="primary" size="sm" onClick={handledbsearch} disabled={Bsearch ? false : true}>
                    search
                </Button>{' '}
            </div>
            <br></br>
            <DataTableComp
                data={Data}
                columns={column}
            />
            <Pagination className="text-end">
                <Pagination.First onClick={handleFirstsubmit} />
                <Pagination.Prev onClick={handlePresubmit} />
                {paginationList}
                <Pagination.Next onClick={handleMysubmit} />
                <Pagination.Last onClick={handleLastsubmit} />
            </Pagination>
            <button className="PieChartButton"
                onClick={navigatToPieChart} >PieChart</button>
        </div>
    );
}

export default GetOrders;








