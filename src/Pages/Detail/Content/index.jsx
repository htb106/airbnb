import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BsBookmarkStar } from 'react-icons/bs';
import { AiOutlineKey } from 'react-icons/ai';
import { BiWifi } from 'react-icons/bi';
import { MdElevator } from 'react-icons/md';
import { MdHotTub } from 'react-icons/md';
import { MdDryCleaning } from 'react-icons/md';
import { MdKitchen } from 'react-icons/md';
import { GiFireBowl } from 'react-icons/gi';
import { MdCable } from 'react-icons/md';
import { MdPool } from 'react-icons/md';
import { MdFireplace } from 'react-icons/md';
import { CgGym } from 'react-icons/cg';
import BookingDesktop from '../Booking/Desktop';
import { FAKE_AVATAR } from '../../../Untilities/config';
import { useMediaQuery } from 'react-responsive';
import BookingMobile from '../Booking/Mobile';

const Content = ({ detailRoom, arrReview, queryParams, roomId }) => {
    const {
        bedRoom,
        bath,
        guests,
        description,
        elevator,
        hotTub,
        pool,
        indoorFireplace,
        dryer,
        gym,
        kitchen,
        wifi,
        heating,
        cableTV,
    } = detailRoom;

    const arrIntroduceRoom = [
        {
            name: 'Toàn bộ căn nhà',
            des: 'Bạn sẽ có chung cư cao cấp cho riêng mình.',
            icon: <AiOutlineHome className='h-6 w-6' />,
        },
        {
            name: 'Vệ sinh tăng cường',
            des: 'Chủ nhà đã đảm bảo vệ sinh tăng cường theo 5 bước của Airbnb.',
            icon: <BsBookmarkStar className='h-6 w-6' />
        },
        {
            name: 'Trải nghiệm nhận phòng tuyệt vời',
            des: '100% khách gần đây đã xếp hạng 5 sao cho quy trình nhận phòng.',
            icon: <AiOutlineKey className='h-6 w-6' />
        },
        {
            name: 'Tiện nghi cho cuộc sống hằng ngày',
            des: 'Chủ nhà đã chuẩn bị chỗ ở này để cho thuê dài hạn - có săn nhà bếp, Wi-fi, máy giặt, chỗ để xe miễn phí',
            icon: <BiWifi className='h-6 w-6' />
        },
    ];

    const arrUtilitiesRoom = [
        {
            name: "Thang máy",
            status: elevator,
            icon: <MdElevator className='h-6 w-6' />,
        },
        {
            name: "Bồn nước nóng",
            status: hotTub,
            icon: <MdHotTub className='h-6 w-6' />,
        },
        {
            name: "Hồ bơi",
            status: pool,
            icon: <MdPool className='h-6 w-6' />,
        },
        {
            name: "Bình chữa cháy",
            status: indoorFireplace,
            icon: <MdFireplace className='h-6 w-6' />,
        },
        {
            name: "Máy sấy tóc",
            status: dryer,
            icon: <MdDryCleaning className='h-6 w-6' />,
        },
        {
            name: "Phòng Gym",
            status: gym,
            icon: <CgGym className='h-6 w-6' />,
        },
        {
            name: "Nhà bếp",
            status: kitchen,
            icon: <MdKitchen className='h-6 w-6' />,
        },
        {
            name: "Wifi",
            status: wifi,
            icon: <BiWifi className='h-6 w-6' />,
        },
        {
            name: "Lò sửi ấm",
            status: heating,
            icon: <GiFireBowl className='h-6 w-6' />,
        },
        {
            name: "Truyền hình cáp",
            status: cableTV,
            icon: <MdCable className='h-6 w-6' />,
        },
    ];

    const isDesktop = useMediaQuery({ minWidth: 768 });
    return (
        <div>
            <div className='flex relative md:mx-5'>
                <div className='w-full mr-12 md:mr-6'>
                    <div className='flex justify-between items-center pb-6 border-b border-gray-200'>
                        <div>
                            <h1 className='text-2xl font-medium py-3'>Toàn bộ khách sạn - Chủ nhà Bình</h1>
                            <p className='text-gray-400'>{guests ? `${guests} khách,` : ''} {bedRoom ? `${bedRoom} phòng ngủ,` : ''} {bath ? `${bath} phòng tắm,` : ''} ...</p>
                        </div>
                        <div>
                            <img src={FAKE_AVATAR} alt="Avatar" className='w-12 h-12 rounded-full border-gray-100 border' />
                        </div>
                    </div>
                    <div className='py-6 border-b border-gray-200'>
                        {arrIntroduceRoom.map((item, i) => {
                            return (
                                <div key={i} className='flex py-3'>
                                    <div className='mr-4 font-medium'>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h1 className='font-semibold'>{item.name}</h1>
                                        <p className='text-sm text-gray-400'>{item.des}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='py-6 border-b border-gray-200'>
                        <p>{description}</p>
                    </div>
                    <div className='py-6 border-b border-gray-200'>
                        <h1 className='text-xl font-semibold pb-6'>Tiện nghi</h1>
                        <div className='grid grid-cols-2 gap-x-20'>
                            {arrUtilitiesRoom.map((item, i) => {
                                if (item.status) return (
                                    <div key={i} className='pb-4 flex items-center'>
                                        <div className='mr-2'>{item.icon}</div>
                                        <p className='text-gray-400'>{item.name}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                {
                    isDesktop ?
                        <div className='w-2/5 sticky top-28 h-full z-20'>
                            <BookingDesktop
                                detailRoom={detailRoom}
                                arrReview={arrReview}
                                queryParams={queryParams}
                                roomId={roomId}
                            />
                        </div> :
                        <div className='fixed bottom-0 left-0 right-0 z-30'>
                            <BookingMobile
                                detailRoom={detailRoom}
                                queryParams={queryParams}
                                roomId={roomId}
                            />
                        </div>
                }
            </div>
        </div>
    )
}

export default Content


