import React, {useEffect,useState} from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Base_Url } from "../variables-urls/API_End_Points";

 
function HighChrts(){
    const[chartOptions,setChartOptions]=useState({});
 
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const response=await fetch(`http://localhost:8080/getAllCustomersRegions`);
                const data=await response.json();
 
                const freqMap={};
                data.forEach(region=>{
                    freqMap[region]=(freqMap[region] || 0)+1;
                });
 
                const chartOptions={
                    chart:{
                        type:'pie',
                    },
                    title:{
                        text:'Customers Region Distribution',
                    },
                   
                    series:[
                        {
                            name:'Regions',
                            colorByPoint: true,
                            showInLegend: true,
                            data: Object.entries(freqMap).map(([name,value])=>({
                                name,
                                y: value,
                            })),
                        },
                    ],
                };
                setChartOptions(chartOptions);
            }
            catch(error){
                console.log(error);
            }
        };
        fetchData();
    },[]);
 
    return(
        <div>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    );
};
export default HighChrts;