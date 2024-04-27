import React from "react";
import css from './GoogleMaps.module.css';
import {useJsApiLoader, GoogleMap, MarkerF} from "@react-google-maps/api"
import Loader from "../Loader/Loader";


const GoogleMaps = () =>{

    const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    
    const {isLoaded} = useJsApiLoader({
        id: 'abd8284cf359485f',
        googleMapsApiKey: API_KEY,
    })
    
    const center = {
        lat: 48.293101, 
        lng: 25.929587
    };
    

    return(
        
        <div className={css.MapContainer}>
            {isLoaded ? (<GoogleMap 
                            center={center} 
                            zoom={17} 
                            mapContainerStyle={{width:"100%", height:"500px"}}
                            options={{mapId:"abd8284cf359485f"}}
                        >
                            
                <MarkerF 
                  position={center}/>
            </GoogleMap>
            ):(
                <Loader/>
            )
            }
        </div>
    )
}
export default React.memo(GoogleMaps)