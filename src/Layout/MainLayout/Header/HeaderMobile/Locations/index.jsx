import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLocationAction } from '../../../../../Redux/Action/ManageLocationAction';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { Virtuoso } from 'react-virtuoso';

const Locations = ({ setIsLocations, setLocationSearch, setIsDate, setLocationId, locationSearch }) => {
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getLocationAction());

    }, [dispatch]);

    const { arrLocation } = useSelector(state => state.locationReducer);

    const handleClick = (locationSearch, locationId) => {

        setLocationSearch(locationSearch);

        setLocationId(locationId)

        setIsLocations(false);

        setIsDate(true);
    };

    return (
        <div className='fixed top-0 right-0 bottom-0 left-0 bg-white z-50'>
            <div className='pt-4'>
            </div>
            <div className=''>
                <div className='flex items-center pl-6 pt-6'>
                    <HiOutlineChevronLeft
                        className='h-6 w-6 mr-6 text-blue-500 font-bold'
                        onClick={() => { setIsLocations(false) }}
                    />
                    <form>
                        <input type="text" placeholder='Bạn sẽ đi đâu?' className='border-none px-5 focus:outline-none' value={`${locationSearch ? locationSearch : ''}`} onChange={(e) => { setLocationSearch(e.target.value) }} />
                    </form>
                </div>
                <div className='py-4 px-8'>
                    <h1 className='text-sm text-gray-400 pb-3'>ĐỊA ĐIỂM GỢI Ý</h1>
                    {
                        arrLocation.length > 0 &&
                        <Virtuoso
                            style={{ height: "500px" }}
                            totalCount={1}
                            itemContent={() => (
                                arrLocation.map((location, i) => {
                                    return (
                                        <div key={i} className='py-2' onClick={() => handleClick(location.name, location._id)}>
                                            <div className='flex items-center justify-start'>
                                                <img src={location.image} alt="img" className='h-12 w-12 rounded-lg mr-4' />
                                                <h1>{location.name}, {location.provice}</h1>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        />}
                </div>
            </div>
        </div>
    )
}

export default Locations