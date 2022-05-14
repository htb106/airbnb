import React, { useEffect, useState } from 'react'
import manageMapBoxApi from '../../../Api/manageMapboxApi';
import { MAPBOX_TOKEN } from '../../../Untilities/config';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import Pin from '../Pin';

const Mapbox = ({ arrRoom, handleNextPageDetail, setRoomLocationMap, setprovinceLocationMap }) => {
    const [viewport, setViewport] = useState({
        longitude: 0,
        latitude: 0,
        zoom: 11,
    });

    const getLocationParams = {
        access_token: MAPBOX_TOKEN,
        country: 'vn',
    };

    const [markerLocation, setMarkerLocation] = useState([]);

    const getMarkerParams = {
        access_token: MAPBOX_TOKEN,
        country: 'vn',
        proximity: `${viewport.longitude},${viewport.latitude}`,
        limit: arrRoom?.length
    };

    const province = arrRoom?.[0]?.locationId.province;

    useEffect(() => {
        if (province) {
            (async () => {
                try {
                    const resulte = await manageMapBoxApi.getLocationMap(province, getLocationParams);
                    setViewport({ ...viewport, longitude: resulte.data.features?.[0]?.center?.[0], latitude: resulte.data.features?.[0]?.center?.[1] });
                    setprovinceLocationMap({ longitude: resulte.data.features?.[0]?.center?.[0], latitude: resulte.data.features?.[0]?.center?.[1] });
                }
                catch (err) {
                    console.log(err)
                }
            })()
        }
    }
        , [province]);

    useEffect(() => {
        let newMarkerLocation = [];
        if (province) {
            (async () => {
                try {
                    for (let i = 0; i < arrRoom.length; i++) {
                        const resulte = await manageMapBoxApi.getLocationMap(arrRoom[i].name, getMarkerParams);

                        newMarkerLocation[i] = { ...arrRoom[i], longitude: resulte.data.features?.[0]?.center?.[0], latitude: resulte.data.features?.[0]?.center?.[1] };
                    }
                    setMarkerLocation(newMarkerLocation);
                    setRoomLocationMap(newMarkerLocation);
                }
                catch (err) {
                    console.log(err);
                }
            })()
        }
    }, [arrRoom, province]);

    return (
        <>
            {
            (viewport.latitude && viewport.longitude) &&
                <ReactMapGL
                    {...viewport}
                    height="100%"
                    width='100%'
                    mapboxApiAccessToken={'pk.eyJ1IjoiaHRiMTA2IiwiYSI6ImNsMnl3YTh0NzAwOGczYm1rYjNuenJ0czEifQ.gMqen1cQEBmhYvi5xmvqOw'}
                    onViewportChange={(viewport) => setViewport(viewport)}
                    mapStyle={'mapbox://styles/mapbox/streets-v11'}
                >
                    <NavigationControl style={{ right: 0, top: 0 }} />
                    {markerLocation.length > 0 && markerLocation.map((location, i) => (
                        <Pin
                            location={location}
                            key={i}
                            handleNextPageDetail={handleNextPageDetail}
                        />
                    ))}
                </ReactMapGL>
            }
        </>

    )
}

export default Mapbox
