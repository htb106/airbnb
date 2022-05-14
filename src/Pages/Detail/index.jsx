import React, { useMemo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom'
import { getRoomDetailAction } from '../../Redux/Action/ManageRoomActions';
import Content from './Content';
import RoomImage from './RoomImage';
import MapRoom from './MapRoom';
import queryString from "query-string";
import Reviews from './Reviews';
import InfoHost from './InfoHost';
import { manageUserReviewsApi } from '../../Api/manageUserReviewsApi';

const Detail = () => {
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
            _provinceLatitude: Number(params._provinceLatitude),
            _provinceLongitude: Number(params._provinceLongitude),
            _roomLatitude: Number(params._roomLatitude),
            _roomLongitude: Number(params._roomLongitude),
        };
    }, [location.search]);

    const params = useParams();

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getRoomDetailAction(params.roomId))

    }, [dispatch, params.roomId]);

    const { detailRoom } = useSelector(state => state.roomReducer);

    const [arrReview, setArrReview] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await manageUserReviewsApi.getUserReviews(params.roomId);
                setArrReview(res)
            }
            catch (err) {
                console.log(err)
            }
        })()
    }, [params.roomId]);

    return (
        <div className='pt-24 px-20 md:px-0 md:pt-0'>
            <RoomImage detailRoom={detailRoom} arrReview={arrReview} />
            <Content detailRoom={detailRoom} arrReview={arrReview} queryParams={queryParams} roomId={params.roomId} />
            <MapRoom queryParams={queryParams} />
            <Reviews arrReview={arrReview} />
            <InfoHost />
        </div>
    )
}

export default Detail
