import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './app.css';
import 'semantic-ui-css/semantic.min.css'

// Components
import WeatherCard from "./components/weather/weather";
import { Dimmer, Loader } from 'semantic-ui-react';

function App() {
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [data, setData] = useState(null);

    // Combination of lifecycle hooks to keep components reactive
    useEffect(() => {
        const fetchData = async () => {
            // Get the users current long and lat coords
            navigator.geolocation.getCurrentPosition(function(position) {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            });
    
            if (lat && long) {
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
        };

        fetchData();
    }, [lat, long])

    return (
        // Render the apps components
        <div className="app">
            <header className="app-header">
                {(data) ? (
                    <WeatherCard weatherData={data}/>
                ): (
                    <div>
                        <Dimmer active>
                            <Loader>Loading..</Loader>
                        </Dimmer>
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;
