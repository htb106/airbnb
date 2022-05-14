import React from 'react';
import { AiFillStar, AiOutlineHeart } from 'react-icons/ai';
import { formMoney } from '../../../Untilities/formMoney';
import { IoDiamondOutline } from 'react-icons/io5';

const CardMobile = ({ room, handleNextPageDetail }) => {
    const {
        price,
        image,
        name,
        _id
    } = room;

    return (
        <div className='py-5' onClick={() => handleNextPageDetail(_id)}>
            <div className='relative'>
                <img src={image} alt="img" className='h-full w-full rounded-2xl' />
                <div className='absolute top-3 left-3'>
                    <h1 className='bg-white py-1 px-2 rounded-md text-xs font-semibold'>CHỦ NHÀ SIÊU CẤP</h1>
                </div>
                <div className='absolute right-3 top-3'>
                    <AiOutlineHeart className='w-6 h-6 text-white' />
                </div>
            </div>
            <div className='pl-2'>
                <div className='flex items-center py-1'>
                    <p className='text-gray-500 text-sm'>(10/10)</p>
                    <AiFillStar className='text-yellow-400 h-4 w-4 ml-1' />
                </div>
                <h1 className='font-semibold py-1'>{name}</h1>
                <h1 className='pt-1 pb-2 text-sm font-medium'>
                    {formMoney(price)}/đêm</h1>
            </div>
            <div>
                <h1 className='flex items-center rounded-lg border border-gray-200 justify-center w-full py-1'>
                    <IoDiamondOutline className='mr-2' />
                    Hiếm khi còn chỗ
                </h1>
            </div>


        </div>
    )
}

export default CardMobile