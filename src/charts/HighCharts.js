import React, {useEffect,useState} from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Base_Url } from "../variables-urls/API_End_Points";
import "./highChart.css"

 
function HighChrts({Data}){
    const[chartOption,setChartOption]=useState({});
    const [chartData,setChartData] =React.useState(Data);

    // const fetchData=async()=>{
    //     try{
    //         const response=await fetch(`http://localhost:8090/getAllCustomersRegions`);
    //         const data=await response.json();
    //         handleSetsiderData(data);
    //         setChartData(data.regions);
    //         configureChart(data.regions);
    //     }
    //     catch(error){
    //         console.log(error);
    //     }
    // };
    useEffect(()=>{
      if(Data!=null) configureChart(Data)
    },[Data]);

  
  

    const configureChart = (Data) =>{

        const freqMap={};
        Data.forEach(region=>{
            freqMap[region]=(freqMap[region] || 0)+1;
        });
        const chartOptions={
            chart:{
                type:'pie',
            },
            title:{
                text:'',
            },
            plotOptions: {
                series: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: [{
                        enabled: true,
                        distance: 20
                    }, {
                        enabled: true,
                        distance: -40,
                        format: '{point.percentage:.1f}%',
                        style: {
                            fontSize: '.7em',
                            textOutline: 'none',
                            opacity: 0.7
                        },
                        filter: {
                            operator: '>',
                            property: 'percentage',
                            value: 10
                        }
                    }]
                }
            },
            series:[
                {
                    name:'Regions',
                    colorByPoint: true,
                    // showInLegend: true,
                    data: Object.entries(freqMap).map(([name,value])=>({
                        name,
                        y: value,
                    })),
                },
            ],
        };
        setChartOption(chartOptions);
    }
   
    return(
        <div className="cm-event-highchart">
            <HighchartsReact highcharts={Highcharts} options={chartOption} />
        </div>
    );
};
export default HighChrts;