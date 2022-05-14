import React, { useState } from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import { AiFillHome } from 'react-icons/ai';

const MapRoom = ({ queryParams }) => {

    const [viewport, setViewport] = useState({
        longitude: queryParams._provinceLongitude,
        latitude: queryParams._provinceLatitude,
        zoom: 12,
    });
    if (!viewport.longitude && !viewport.latitude) return <></>
    return (
        <div className='py-6 h-96 w-full my-6 2xl:px-0 md:px-5'>
            <h1 className='text-xl font-semibold pb-6'>Nơi bạn sẽ đến</h1>
            <ReactMapGL
                {...viewport}
                width='100%'
                height='100%'
                mapboxApiAccessToken={'pk.eyJ1IjoiaHRiMTA2IiwiYSI6ImNsMnl3YTh0NzAwOGczYm1rYjNuenJ0czEifQ.gMqen1cQEBmhYvi5xmvqOw'}
                mapStyle={'mapbox://styles/mapbox/streets-v11'}
                onViewportChange={(viewport) => setViewport(viewport)}
            >
                <NavigationControl style={{ right: 0, top: 0 }} />
                {
                    (queryParams?._roomLatitude || queryParams?._roomLongitude) &&
                    <Marker
                        longitude={queryParams._roomLongitude}
                        latitude={queryParams._roomLatitude}
                    >
                        <div className='p-4 rounded-full border border-gray-400'
                            style={{ background: "rgb(255 255 255 / .8)" }}
                        >
                            <div className='p-2 rounded-full bg-red-600'>
                                <AiFillHome className='w-6 h-6 text-white' />
                            </div>
                        </div>
                    </Marker>}
            </ReactMapGL>
        </div>
    )
}

export default MapRoom
