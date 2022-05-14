import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getLocationAction } from '../../../Redux/Action/ManageLocationAction';
import './style.scss';

const ExploreNearBy = () => {
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getLocationAction());

    }, [dispatch]);

    const { arrLocation } = useSelector(state => state.locationReducer);

    return (
        <div className='py-5 md:py-2'>
            <h1 className='text-5xl md:text-2xl pb-5 md:pb-2 font-medium'>Khám phá những điểm đến gần đây</h1>
            <div className='grid grid-cols-4 lg:grid-cols-3 gap-x-5 md:grid-cols-2 sm:grid-cols-1'>
                {arrLocation.map((location, i) => {
                    return (
                        <div key={i} className='flex items-center mb-5'>
                            <img src={location.image} alt="img" className='img rounded' />
                            <div className='px-5'>
                                <h1 className='font-medium text-sm'>{location.province}</h1>
                                <h1>{location.name}</h1>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ExploreNearBy
