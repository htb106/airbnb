import React, { useEffect, useState } from 'react';
import './style.scss';
import { IoSearchCircle } from 'react-icons/io5';
import { TiDelete } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { getLocationAction } from '../../../../../Redux/Action/ManageLocationAction';
import { Virtuoso } from 'react-virtuoso';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/theme/default.css';
import 'react-date-range/dist/styles.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import queryString from "query-string";
import Dialog from '../../../../../Component/Dialogs';
import Guset from '../../../../../Component/Guest';

const SearchBarVer2 = ({ homePagePath, queryParams }) => {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getLocationAction());

    }, [dispatch]);

    const { arrLocation } = useSelector(state => state.locationReducer);

    const [locationSearch, setLocationSearch] = useState(queryParams._location ? queryParams._location : '');
    const [locationId, setLocationId] = useState(queryParams._locationId ? queryParams._locationId : '');

    const [bookingTime, setBookingTime] = useState([{
        startDate: queryParams._checkIn ? queryParams._checkIn : null,
        endDate: queryParams._checkOut ? queryParams._checkOut : null,
    }]
    );

    const selectionRange = {
        startDate: bookingTime[0].startDate ? bookingTime[0].startDate : new Date,
        endDate: bookingTime[0].endDate ? bookingTime[0].endDate : new Date,
        key: 'selection',
    };

    const [guest, setGuest] = useState({
        numsAdult: queryParams._adult ? queryParams._adult : 0,
        numsChild: queryParams._child ? queryParams._child : 0,
        numsToddler: queryParams._toddler ? queryParams._toddler : 0,
    }
    );

    const data = {
        _location: locationSearch,
        _locationId: locationId,
        _checkIn: bookingTime[0].startDate,
        _checkOut: bookingTime[0].endDate,
        _adult: guest.numsAdult,
        _child: guest.numsChild,
        _toddler: guest.numsToddler,
    };

    let totalGuests = data._adult + data._child;

    const navigate = useNavigate();

    const handleSearch = () => {
        if (!locationId) return
        navigate({
            pathname: `/list/${locationId}`,
            search: queryString.stringify(data)
        })
    };

    return (
        <div className='rounded-l-full rounded-r-full bg-gray-50 border-gray-200 border w-full mb-5'>
            <div className='grid grid-cols-11'>
                <div className='locationSearch px-8 py-4 rounded-l-full rounded-r-full hover:bg-gray-200 cursor-pointer flex justify-between items-center col-span-3'>
                    <div>
                        <h1 className='text-xs font-medium mb-1'>Địa điểm</h1>
                        {
                            locationSearch ?
                                <p className='text-sm font-medium'>{locationSearch}</p> :
                                <p className='text-sm text-gray-600'>Thêm địa điểm</p>
                        }
                    </div>
                    {locationSearch && <TiDelete
                        className='icon text-gray-400 hover:text-gray-500 locationSearch_deleted'
                        onClick={() => { setLocationSearch("") }}
                    />}
                    <div className='rounded-lg locationSearch_dropdown bg-gray-200 py-4 z-20'>
                        {
                            arrLocation.length > 0 &&
                            <Virtuoso
                                style={{ height: "500px" }}
                                totalCount={1}
                                itemContent={() => (
                                    arrLocation.map((location, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className='hover:bg-gray-400 p-4 flex items-center'
                                                onClick={() => {
                                                    setLocationSearch(location.province);
                                                    setLocationId(location._id);
                                                }}
                                            >
                                                <img src={location.image} alt="Img" className='img mx-6' />
                                                <h1>{location.province}, {location.name}</h1>
                                            </div>
                                        )
                                    })
                                )}
                            />}
                    </div>
                </div>
                <div className='relative hover:bg-gray-200 rounded-l-full rounded-r-full col-span-4'>
                    <Dialog
                        content={
                            <DateRangePicker
                                className='pb-8'
                                onChange={item => setBookingTime([item.selection])}
                                showSelectionPreview={true}
                                moveRangeOnFirstSelection={false}
                                months={2}
                                ranges={[selectionRange]}
                                direction="horizontal"
                            />
                        }
                        title={
                            <>
                                <div className='w-1/2 text-center'>
                                    <h1 className='text-xs font-medium mb-1'>Nhận phòng</h1>
                                    {
                                        bookingTime[0].startDate ?
                                            <h1 className='text-sm font-medium'>{moment(bookingTime[0].startDate).format("DD tg MM")}</h1> :
                                            <h1 className='text-sm text-gray-600'>Thêm ngày</h1>
                                    }
                                </div>
                                <div className='w-1/2 text-center'>
                                    <h1 className='text-xs font-medium mb-1'>Trả phòng</h1>
                                    {
                                        bookingTime[0].endDate ?
                                            <h1 className='text-sm font-medium'>{moment(bookingTime[0].endDate).format("DD tg MM")}</h1> :
                                            <h1 className='text-sm text-gray-600'>Thêm ngày</h1>
                                    }
                                </div>
                                {
                                    (bookingTime[0].startDate && bookingTime[0].endDate) &&
                                    <TiDelete
                                        className='w-8 h-8 text-gray-400 hover:text-gray-500'
                                        onClick={() => {
                                            setBookingTime([...bookingTime, bookingTime[0].startDate = '']);
                                            setBookingTime([...bookingTime, bookingTime[0].endDate = '']);
                                        }}
                                    />
                                }
                            </>
                        }
                        top={'top-0'}
                        left={'left-0'}
                        right={'right-0'}
                        bottom={'bottom-0'}
                        top_content={'top-24'}
                        left_content={'-left-1/2'}
                        w={'600px'}
                    />
                </div>
                <div className='relative hover:bg-gray-200 rounded-l-full rounded-r-full col-span-4'>
                    <Dialog
                        title={
                            <>
                                <div className='w-2/3 text-center'>
                                    <h1 className='text-xs font-medium mb-1'>Khách</h1>
                                    {
                                        totalGuests > 0 ?
                                            <h1 className='text-sm font-medium'>{totalGuests} khách{guest.numsToddler > 0 ? `, ${guest.numsToddler} em bé` : ''}
                                            </h1> :
                                            <h1 className='text-sm text-gray-600'>Thêm khách</h1>
                                    }
                                </div>
                                {
                                    (totalGuests !== 0) &&
                                    <TiDelete
                                        className='w-8 h-8 text-gray-400 hover:text-gray-500'
                                        onClick={() => {
                                            setGuest({ ...guest, numsAdult: 0, numsChild: 0, numsToddler: 0 });
                                        }}
                                    />
                                }
                            </>
                        }
                        search={
                            <div className='w-1/3 text-center z-30'>
                                <IoSearchCircle
                                    className='text-red-500 w-14 h-14'
                                    onClick={handleSearch}
                                />
                            </div>
                        }
                        content={
                            <Guset
                                guest={guest}
                                setGuest={setGuest}
                                w={'w-80'}
                            />
                        }
                        top={'top-0'}
                        left={'left-0'}
                        right={'right-0'}
                        bottom={'bottom-0'}
                        top_content={'top-24'}
                        left_content={'-left-1/4'}
                    />
                </div>
            </div>
        </div>
    )
}

export default SearchBarVer2
