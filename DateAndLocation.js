import shadows from "@mui/material/styles/shadows";
import { React, useEffect, useState } from "react";



function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const mon = (month === 2) ? 'Feb' : month;
    const date = today.getDate();
    const Year = today.getFullYear();


    return `${date}  ${mon},  ${Year}`
}
function getDay() {
    const todayDay = new Date();
    const day = todayDay.getDay();
    switch (day) {
        case 0: return "sunday";
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday"

    }
}

function getTime() {
    const time = new Date();
    const showTime = time.getHours()
        + ':' + time.getMinutes()
        + ":" + time.getSeconds();

    return showTime;
}



function DateAndLocation() {


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(getTime());
          }, 1000);
      
          return () => clearInterval(interval);
    }, [])


    const [currentDate, setCurrentDate] = useState(getDate());
    const [currentday, setcurrentDay] = useState(getDay());
    const [currentTime, setCurrentTime] = useState(getTime());


    return (
        <div className="flex-container"  >
            <p> Date&Time</p>
            <p>{currentTime}</p>
            <p>{currentday}</p>
            <p  >{currentDate}</p>



        </div>
    );
}
export default DateAndLocation;