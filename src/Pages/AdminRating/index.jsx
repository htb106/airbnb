import moment from 'moment';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { manageUserReviewsApi } from '../../Api/manageUserReviewsApi';

const AdminRating = () => {

    const params = useParams();

    const [arrReview, setArrReview] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await manageUserReviewsApi.getUserReviews(params.idRoom);
                setArrReview(res);
            }
            catch (err) {
                console.log(err);
            }
        })()
    }, [params.idRoom]);

    return (
        <div className='pt-20 pl-60'>
            <h1 className='font-bold text-2xl pl-10 pt-4'>{arrReview[0]?.roomId.name} - Rating </h1>
            <div className='grid grid-cols-2 gap-x-20 py-4 pl-10'>
                {arrReview.map((item, i) => {
                    return (
                        <div className='py-4' key={i}>
                            <div className='flex items-center py-2'>
                                <img src={item.userId?.avatar} alt="avatar" className='h-10 w-10 rounded-full mr-4' />
                                <div>
                                    <h1 className=' font-semibold'>{item.userId?.name}</h1>
                                    <p className='text-sm text-gray-400'>{moment(item.updatedAt).format('hh:mm - DD/MM/YYYY')}</p>
                                </div>
                            </div>
                            <h1>{item.content}</h1>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AdminRating