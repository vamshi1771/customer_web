import React, { useEffect, useState } from "react";
import Pagination from 'react-bootstrap/Pagination';
import DataTableComp from '../components/DataTable';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import Alert from '@mui/material/Alert';
import { openSnackBar,closeSnackBar }  from "../Redux/actions/snackbaractions";
import { Customer_Registered } from "../Variables&Urls/Variables";
import {useDispatch,useSelector } from "react-redux";




function GetCustomers() {

    const disPatch=useDispatch();
    const open = useSelector((state)=> state.snackbar);
   

    const [errorMessage, setErrorMessage] = useState('');

    const column=[ 
        {
            name:'ID',
            selector:row=>row.customerid,
            sortable:true
        },
        {
            name:'Name',
            selector:row=>row.customername,
            sortable:true
        },
        
        {
            name:"Region",
            selector:row=>row.region,
            sortable:true
            
        },
        {
            name:"Gender",
            selector:row=>row.gender,
            sortable:true
        }
    ]

    const navigate=useNavigate();
    const [pageCurrent, setPageCurrent] = useState(1);
    const [Bsearch, setBsearch] = useState('');
    const [search, setsearch] = useState('');
    const [result, setresult] = useState([]);
    const [Data, setData] = useState([]);
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState();
   


    const navigatToPieChart=()=>{
        navigate("/pieChart")
    }

    
    const searchedData = async () => {
        try {
            const Response = await fetch(`http://localhost:8080/getSearchCustomers/${0}/${5}/${search}`)
            
            if(Response.status===502){
                const fetcheddata = await Response.text();
                setErrorMessage(fetcheddata);
                setData([]);
                disPatch(openSnackBar({ message: fetcheddata, type: 'error' }))
                }
            else{
            const fetcheddata = await Response.json();
            console.log(fetcheddata);
            setData(fetcheddata.content);
           
             }
        }
        catch (err) {
            console.log(err);
        }
    };

    const handleToClose = (event, reason) => {
        if (reason === "clickaway") return;
        disPatch(closeSnackBar());
      };

    const setCurrentPage = (e) => {
        setPageCurrent(e.target.value);
        setCurrent(pageCurrent - 1);
    }
    
    const paginationList = [];
    for (let num = 1; num <= {count}; num++) {
        if (num === pageCurrent) {
            paginationList.push
                (<Pagination.Item key={num} onClick={setCurrentPage} active>{num}</Pagination.Item>)
        }
        else
            paginationList.push(<Pagination.Item key={num} onClick={setCurrentPage} active={num === pageCurrent ? true : false}>{num}</Pagination.Item>)
    }




    const fetchdata = async () => {
        try {
            const Response = await fetch(`http://localhost:8080/getAllCustomerInPages/${current}/${5}`)
            const fetcheddata = await Response.json();
            setData(fetcheddata.content);
            setCount(fetcheddata.totalPages);
            console.log(fetcheddata.totalPages);
            
        }
        catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        if (search) searchedData();
        else fetchdata();
    }, [search, current]);


    ///////////////FRONTEND-SEARCH/////////////// 
    const handlefrontendsearch = (e) => {
        setsearch(e.target.value);
        setresult(search ? Data.filter((item) => {
            return item.customername.toLowerCase().includes(search.toLowerCase())
        }) : Data);
        setfilter(result);
    }

    const handleBSearch = (e) => {
        setBsearch(e.target.value);
        console.log(Bsearch);
        if (Bsearch.length <= 1) {
            setsearch('');
            fetchdata();
        }
    }

    const handledbsearch = () => {
        const stri = Bsearch;
        const ans = stri.trim();
        const str = ans.split(" ");
        let temp = "";
        for (let num = 0; num < ((str.length)); num++) {
            if (str[num] === "") continue;
            else temp = temp + str[num] + " ";
        }
        temp = temp.trim();
        temp = temp.toLowerCase();
        setsearch(temp);
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
            <h1>Customer details</h1>
            <div className="text-end">
                <br></br>
                {/* /* onChange={(handlechange) for front-end sesrch}  disabled={search?false:true}*/}
                <input type="text" className="w-form-control" value={Bsearch} onChange={handleBSearch} ></input>
                <br></br>

                <Button variant="primary" size="sm" onClick={handledbsearch} disabled={Bsearch ? false : true}>
                    search
                </Button>{' '}
                        <Snackbar open={open.status} autoHideDuration={4000} onClose={handleToClose}>
                             <Alert
                                 onClose={handleToClose}
                                 severity={(open.message) ? "error" : "success"}
                                 variant="filled"
                                  sx={{ width: '100%'}}>
                                {errorMessage ? open.message : Customer_Registered}
                            </Alert>
                        </Snackbar>
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

export default GetCustomers;
























// import React, { useEffect, useState } from "react";
// import Pagination from 'react-bootstrap/Pagination';
// import DataTableComp from '../components/DataTable';
// import Button from 'react-bootstrap/Button';
// import { useNavigate } from "react-router-dom";
// import HighChrts from "../Charts/HighCharts";
// import { Base_Url } from "../Variables&Urls/API_End_Points";




// function GetCustomers() {




//     const column=[ 
//         {
//             name:'ID',
//             selector:row=>row.customerid,
//             sortable:true
//         },
//         {
//             name:'Name',
//             selector:row=>row.customername,
//             sortable:true
//         },
        
//         {
//             name:"Region",
//             selector:row=>row.region,
//             sortable:true
            
//         },
//         {
//             name:"Gender",
//             selector:row=>row.gender,
//             sortable:true
//         }
//     ]

//     const navigate=useNavigate();
//     const [pageCurrent, setPageCurrent] = useState(1);
//     const [Bsearch, setBsearch] = useState('');
//     const [search, setsearch] = useState('');
//     const [result, setresult] = useState([]);
//     const [Data, setData] = useState([]);
//     const [filter, setfilter] = useState([]);
//     const [current, setCurrent] = useState(0);
//     const [count, setCount] = useState();


//     const navigatToPieChart=()=>{
//         navigate("/pieChart")
//     }
//     const searchedData = async () => {
//         try {
//             const Response = await fetch(`http://localhost:8080/getSearchCustomers/${0}/${5}/${search}`)
//             const fetcheddata = await Response.json();
//             setData(fetcheddata.content);
//             setCount(fetcheddata.totalPages);
//         }
//         catch (err) {
//             console.log(err);
//         }
//     };
//     const setCurrentPage = (e) => {
//         setPageCurrent(e.target.value);
//         setCurrent(pageCurrent - 1);
//     }
//     const paginationList = [];
//     for (let num = 1; num <= count; num++) {
//         if (num === pageCurrent) {
//             paginationList.push
//                 (<Pagination.Item key={num} onClick={setCurrentPage} active>{num}</Pagination.Item>)
//         }
//         else
//             paginationList.push(<Pagination.Item key={num} onClick={setCurrentPage} active={num === pageCurrent ? true : false}>{num}</Pagination.Item>)
//     }
//     const fetchdata = async () => {
//         try {
//             const Response = await fetch(`http://localhost:8080/getAllCustomerInPages/${current}/${5}`)
//             const fetcheddata = await Response.json();
//             setData(fetcheddata.content);
//             setfilter(fetcheddata.content);
//             setCount(fetcheddata.totalPages);
            
//         }
//         catch (err) {
//             console.log(err);
//         }


//     };


//     useEffect(() => {
//         if (search) searchedData();
//         else fetchdata();
//     }, [search, current]);


//     ///////////////FRONTEND-SEARCH/////////////// 
//     const handlefrontendsearch = (e) => {
//         setsearch(e.target.value);
//         setresult(search ? Data.filter((item) => {
//             return item.customername.toLowerCase().includes(search.toLowerCase())
//         }) : Data);
//         setfilter(result);
//     }
//     /////////////

//     const handleBSearch = (e) => {
//         setBsearch(e.target.value);
//         console.log(Bsearch);
//         if (Bsearch.length <= 1) {
//             setsearch('');
//             fetchdata();
//         }
//     }

//     const handledbsearch = () => {
//         const stri = Bsearch;
//         const ans = stri.trim();
//         const str = ans.split(" ");
//         let temp = "";
//         for (let num = 0; num < ((str.length)); num++) {
//             if (str[num] === "") continue;
//             else temp = temp + str[num] + " ";
//         }
//         temp = temp.trim();
//         temp = temp.toLowerCase();
//         console.log(temp);


//         setsearch(temp);
//         searchedData();
//     }

//     const handleMysubmit = (e) => {
//         setCurrent(current + 1);
//         setPageCurrent(pageCurrent + 1);

//     }
//     const handlePresubmit = (e) => {
//         setCurrent(current - 1);
//         setPageCurrent(pageCurrent - 1);

//     }


//     const handleFirstsubmit = () => {
//         setCurrent(0);
//         setPageCurrent(1);
//     }
//     const handleLastsubmit = () => {
//         setCurrent(count - 1);
//         setPageCurrent(count);
//     }

//     const handleOgSearch = (e) => {
//         setBsearch(e.target.value);
//     }

//     return (
//         <div className="container mt-5">
//             <h1>Customer details</h1>
//             <div className="text-end">
//                 <br></br>
//                 {/* /* onChange={(handlechange) for front-end sesrch}  disabled={search?false:true}*/}
//                 <input type="text" className="w-form-control" value={Bsearch} onChange={handleBSearch} ></input>
//                 <br></br>

//                 <Button variant="primary" size="sm" onClick={handledbsearch} disabled={Bsearch ? false : true}>
//                     search
//                 </Button>{' '}
//             </div>
//             <br></br>
//             <DataTableComp
//                 data={Data}
//                 columns={column}
//             />
//             <Pagination className="text-end">
//                 <Pagination.First onClick={handleFirstsubmit} />
//                 <Pagination.Prev onClick={handlePresubmit} />
//                 {paginationList}
//                 <Pagination.Next onClick={handleMysubmit} />
//                 <Pagination.Last onClick={handleLastsubmit} />
//             </Pagination>
//             <button className="PieChartButton"
//                 onClick={navigatToPieChart} >PieChart</button>
//         </div>
//     );
// }

// export default GetCustomers;



