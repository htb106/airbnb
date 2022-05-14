import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { FaMedal } from 'react-icons/fa';
import { FiShare } from 'react-icons/fi';
import { AiOutlineStar } from 'react-icons/ai';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { AiOutlineHeart } from 'react-icons/ai';
import { useMediaQuery } from 'react-responsive';
import { NavLink } from 'react-router-dom';
import './style.scss';

const RoomImage = ({ detailRoom, arrReview }) => {
    const { name, image, locationId } = detailRoom;

    const isDesktop = useMediaQuery({ minWidth: 768 });
    if (isDesktop) return (
        <div>
            <div className='pt-24'>
                <h1 className='text-3xl font-medium'>{name}</h1>
                <div className='flex py-2 items-center'>
                    <AiFillStar className='text-yellow-400 h-6 w-6 pr-1' />
                    <p>{locationId?.valueate}</p>
                    <p className='pl-1 underline text-sm cursor-pointer'>.({arrReview.length} đánh giá)</p>
                    <FaMedal className='text-red-400 h-8 w-8 mr-1 pl-4' />
                    <p className='pr-4'>Chủ nhà siêu cấp</p>
                </div>
                <h1 className='underline font-normal cursor-pointer'>{locationId?.name} - {locationId?.province} - {locationId?.country}</h1>
            </div>
            <div className='grid grid-cols-2 gap-2 py-5'>
                <div className='room_img'>
                    <img src={image} alt="img" className='w-full h-full rounded cursor-pointer' />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <div className='room_img'>
                        <img src={image} alt="img" className='w-full h-full rounded cursor-pointer' />
                    </div>
                    <div className='room_img'>
                        <img src={image} alt="img" className='w-full h-full rounded cursor-pointer' />
                    </div>
                    <div className='room_img'>
                        <img src={image} alt="img" className='w-full h-full rounded cursor-pointer' />
                    </div>
                    <div className='room_img'>
                        <img src={image} alt="img" className='w-full h-full rounded cursor-pointer' />
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <div>
            <div className='relative py-2'>
                <img src={image} alt="img" className='w-full block' />
                <NavLink to='/rooms/' className='absolute top-4 left-4 bg-white z-30 block rounded-full p-2 cursor-pointer'>
                    <HiOutlineChevronLeft
                        className='text-black font-bold h-5 w-5 '
                    />
                </NavLink>
                <a className='absolute top-4 right-4 bg-white z-30 block rounded-full p-2 cursor-pointer'>
                    <FiShare
                        className='text-black font-bold h-5 w-5'
                    />
                </a>
                <a className='absolute top-4 right-16 bg-white z-30 block rounded-full p-2 cursor-pointer'>
                    <AiOutlineHeart
                        className='text-black font-bold h-5 w-5'
                    />
                </a>
            </div>
            <div className='mx-5 border-b border-gray-200 pb-6'>
                <h1 className='text-3xl font-semibold py-2'>{name}</h1>
                <div className='flex items-center'>
                    <div className='flex items-center mr-4'>
                        <AiOutlineStar className='h-4 w-4 text-red-500' />
                        <p className='text-sm'>{detailRoom.locationId?.valueate}</p>
                        <p className='pl-1 underline cursor-pointer text-black/70 text-sm'>.({arrReview?.length} đánh giá)</p>
                    </div>
                    <div className='flex items-center mr-4'>
                        <AiOutlineStar className='h-4 w-4 text-red-500' />
                        <p className='text-sm'>Chủ nhà siêu cấp</p>
                    </div>
                </div>
                <div>
                    <p className='text-black/70 text-sm'>
                        {locationId?.name}, {locationId?.province}, {locationId?.country}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RoomImage
