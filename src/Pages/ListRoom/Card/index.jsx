import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai'
import { formMoney } from '../../../Untilities/formMoney';

const Card = (props) => {
    const {
        bath,
        bedRoom,
        description,
        guests,
        price,
        image,
        name,
        wifi,
        pool,
        elevator,
        kitchen,
        hotTub,
        _id
    } = props.room;
    return (
        <div className='pt-6 pb-12 border-b border-gray-200 cursor-pointer' onClick={() => { props.handleNextPageDetail(_id) }}>
            <div className='flex justify-center items-center w-full'>
                <div className='w-2/5'>
                    <img src={image} alt="image" className='w-52 h-52 md:w-40 md:h-40 rounded-lg' />
                </div>
                <div className='w-3/5 pl-2'>
                    <div className='flex justify-between'>
                        <h1 className='text-xl md:text-base font-medium pb-6 md:pb-3 border-b border-gray-200'>{name}</h1>
                        <AiOutlineHeart className='w-6 h-6' />
                    </div>
                    <div className='pt-4 md:pt-2 pb-6 md:pb-4'>
                        <p className='text-gray-500 text-sm mb-1'>{guests} khách, {bedRoom} giường, {bath} nhà vệ sinh </p>
                        <p className='text-gray-500 text-sm'>
                            {kitchen && 'nhà bếp, '} {wifi && 'wifi, '} {pool && 'hồ bơi, '} {hotTub && 'bồn tắm, '} {elevator && 'thang máy, '}...
                        </p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='flex'>
                            <p className='text-gray-500'>10/10</p>
                            <AiFillStar className='text-yellow-400 h-6 w-6 ml-1' />
                        </div>
                        <h1 className='font-medium'>{formMoney(price)} /đêm</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card