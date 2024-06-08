import { useState,useEffect, react } from "react";
import { Location_API } from "../variables-urls/API_End_Points";
import { Location_API_Key } from "../variables-urls/Variables";

function Location() {
    const [position, setPosition] = useState({ latitude: null, longitude: null });
    const [response,setResponse] =useState(null);
       const API_EndPoint= "https://api.openweathermap.org/data/2.5/weather?"
   const API_key =`b4e658eeccf4c482cd4a5fc4344247dc`
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setPosition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
        } else {
            console.log("Geolocation is not available in your browser.");
        }
    }, []);


    const fetchdata = async () => {
        try {
            const Response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid={fb029d003bcfe322f4fed290dd2d0b9}`)
            const fetcheddata = await Response.json();
           
            console.log(fetcheddata);
            
        }
        catch (err) {
            console.log(err);
        }


    };

    // fetchdata();

    return (
        <div>
            <p>Location</p>
            {position.latitude && position.longitude ? (
                <div>
                   <p>Latitude: {position.latitude}</p>
                   <p>Longitude: {position.longitude}</p>
                   {/* <p>{response.name}</p> */}
                </div>
               
            ) : (
                <p>Loading...</p>
            )}
            </div>
    );

}
export default Location;