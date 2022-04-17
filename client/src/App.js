import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./App.css";
import { Container, Header } from 'semantic-ui-react';

function App() {
    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
    const [data, setData] = useState([]);

    // Combination of lifecycle hooks to keep components reactive
    useEffect(() => {
        const fetchData = async () => {

            // Get the users current long and lat coords
            navigator.geolocation.getCurrentPosition(function(position) {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            });

            if (lat.length != 0 && long.length != 0) {
                // Make a request to our express backend
                axios.get('/getweather', { 
                    params: 
                    { 
                        long: long, 
                        lat: lat 
                    } 
                })
                .then(response => {
                    setData(response.data)
                    console.log(response);
                });
            }
        }

        fetchData();
    }, [lat,long])

    return (
        // Render the apps components
        <div className="App">
            {(typeof data.main != 'undefined') ? (
                <div><p>Has data</p></div>
                // <Weather weatherData={data}/>
            ): (
                <div><p>No data to display</p></div>
            )}
        </div>
    );
}

export default App;
