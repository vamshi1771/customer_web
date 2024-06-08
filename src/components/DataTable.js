import React,{useState} from "react";
import { tableCustomStyles } from "./tableCustomStyles";
import DataTable from "react-data-table-component";



function DataTablComp({data,columns}){
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

  return(
    <DataTable className="ScrollbarsCustom native trackYVisible trackXVisible"
    customStyles={tableCustomStyles}
        columns={columns}
        data={data}
        
        fixedHeader
        />
  );
}
export default DataTablComp;