import React, { useEffect, useMemo } from 'react';
import DeskTopView from './DeskTopView';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom';
import { getRoomListAction } from '../../Redux/Action/ManageRoomActions';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import queryString from "query-string";
import { useMediaQuery } from 'react-responsive';
import MobileView from './MobileView';

const ListRoom = () => {

    const dispatch = useDispatch();

    const params = useParams();

    useEffect(() => {
        dispatch(getRoomListAction(params.locationId))
    }, [dispatch, params.locationId]);

    const { arrRoom } = useSelector(state => state.roomReducer);

    const location = useLocation();

    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search);

        return {
            ...params,
            _location: params._location,
            _checkIn: params._checkIn,
            _checkOut: params._checkOut,
            _adult: Number.parseInt(params._adult),
            _child: Number.parseInt(params._child),
            _toddler: Number.parseInt(params._toddler),
            _roomLatitude: Number(params._roomLatitude),
            _roomLongitude: Number(params._roomLongitude),
            _provinceLatitude: Number(params._provinceLatitude),
            _provinceLongitude: Number(params._provinceLongitude),
        };
    }, [location.search]);

    const [roomLocationMap, setRoomLocationMap] = useState([]);

    const [provinceLocationMap, setprovinceLocationMap] = useState([]);

    const navigate = useNavigate();

    const handleNextPageDetail = (id) => {
        const pickedRoom = roomLocationMap.find((room) => room._id === id);

        navigate({
            pathname: `/detail/${id}`,
            search: queryString.stringify({
                ...queryParams,
                _roomLatitude: pickedRoom?.latitude,
                _roomLongitude: pickedRoom?.longitude,
                _provinceLatitude: provinceLocationMap?.latitude,
                _provinceLongitude: provinceLocationMap?.longitude,
            })
        })
    };

    const isTable = useMediaQuery({ minWidth: 768 });

    return (
        <div className='pt-20 '>
            {isTable ?
                <DeskTopView
                    arrRoom={arrRoom}
                    handleNextPageDetail={handleNextPageDetail}
                    setRoomLocationMap={setRoomLocationMap}
                    setprovinceLocationMap={setprovinceLocationMap}
                /> :
                <MobileView
                    arrRoom={arrRoom}
                    handleNextPageDetail={handleNextPageDetail}
                    setRoomLocationMap={setRoomLocationMap}
                    setprovinceLocationMap={setprovinceLocationMap}
                />
            }
        </div>
    )
}

export default ListRoom
