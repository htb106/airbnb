import React, { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import moment from 'moment';

const Reviews = ({ arrReview }) => {

    const arrCatalogReviews = [
        {
            name: "Mức độ sạch sẽ",
            value: 5,
        },
        {
            name: "Độ chính xác",
            value: 4.2,
        },
        {
            name: "Liên lạc",
            value: 5,
        },
        {
            name: "Vị trí",
            value: 4.8,
        },
        {
            name: "Nhận phòng",
            value: 4.5,
        },
        {
            name: "Giá trị",
            value: 3,
        },
    ]
    return (
        <div className='py-6 border-b border-gray-200 2xl:mx-0 md:mx-5'>
            <div className='flex'>
                <AiFillStar className='text-yellow-400 h-6 w-6 pr-1' />
                <h1 className='text-xl font-semibold pb-6'> 5,0 - ({arrReview.length}) đánh giá</h1>
            </div>
            <div className='py-6 grid-cols-2 grid md:grid-cols-1 gap-x-20'>
                {arrCatalogReviews.map((item, i) => {
                    return (
                        <div className='flex items-center py-4' key={i}>
                            <h1 className='w-1/4 font-medium mr-4'>{item.name}</h1>
                            <div className='w-1/2 bg-gray-200 h-1 relative rounded-full'>
                                <div
                                    className='absolute top-0 left-0 bottom-0 h-1 bg-gray-900'
                                    style={{
                                        width: `${item.value * 100 / 5}%`
                                    }}
                                >
                                </div>
                            </div>
                            <h1 className='w-1/4 ml-4 text-gray-400'>{item.value}</h1>
                        </div>
                    )
                })}
            </div>
            <div className='grid grid-cols-2 md:grid-cols-1 gap-x-20'>
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

export default Reviews;
