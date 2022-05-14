import React, { useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import { formMoney } from '../../../Untilities/formMoney';

const Pin = ({ location, handleNextPageDetail, i }) => {
    const [showPopup, togglePopup] = useState(false);

    return (
        <div>
            {
                showPopup && (
                <Popup
                    key={location._id}
                    latitude={location.latitude}
                    longitude={location.longitude}
                    offsetTop={-10}
                    closeButton={false}
                    closeOnClick={true}
                    onClose={() => togglePopup(false)}
                    anchor="right" 
                    className='z-20'
                    onClick={() => { 
                        handleNextPageDetail(location._id); 
                    }}
                >
                    <div className='bg-white rounded w-52 z-20'>
                        <img src={location.image} alt="Img" className='h-40 w-full rounded' />
                        <h1 className='font-medium pl-3 py-2'>{location.name}</h1>
                        <p className='pl-3'>{formMoney(location.price)}/đêm</p>
                    </div>
                </Popup>
                )}
            <Marker
                key={i}
                latitude={location.latitude}
                longitude={location.longitude}
                offsetLeft={-20}
                offsetTop={-10}
                onClick={() => togglePopup(state => !state)}
                className='z-10'
            >
                <p className='bg-black/90 font-semibold text-xs text-white border border-gray-200 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl rounded-t-2xl hover:text-sm hover:z-50 py-1 px-2 cursor-pointer z-10'>{formMoney(location.price)}</p>
            </Marker>
        </div>
    )
}

export default Pin
