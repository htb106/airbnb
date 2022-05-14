import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { FaMedal } from 'react-icons/fa';
import { SiAdguard } from 'react-icons/si';
import logo from '../../../Assets/Image/airbnbRedIcon.png';
import { FAKE_AVATAR } from '../../../Untilities/config';

const InfoHost = () => {
    return (
        <div className='pt-6 md:mx-5'>
            <div className='w-1/2 md:w-full'>
                <div className='flex items-center pb-4'>
                    <img src={FAKE_AVATAR} alt="Avatar" className='w-12 h-12 rounded-full mr-4 border-gray-100 border' />
                    <div>
                        <h1 className='font-semibold text-2xl'>Chủ nhà Bình</h1>
                        <p className='text-gray-400'></p>
                    </div>
                </div>
                <div className='py-4 grid-cols-2 grid gap-x-10'>
                    <div className='flex items-center py-1'>
                        <AiFillStar className='text-yellow-400 h-6 w-6 pr-2' />
                        <p>50 đánh giá</p>
                    </div>
                    <div className='flex items-center py-1'>
                        <FaMedal className='text-red-400 h-6 w-6 pr-2' />
                        <p>Chủ nhà siêu cấp</p>
                    </div>
                    <div className='flex items-center py-1'>
                        <SiAdguard className='text-red-400 h-6 w-6 pr-2' />
                        <p>Đã được xác minh danh tính</p>
                    </div>
                </div>
                <div className='py-4'>
                    <h1 className='font-medium pb-3 text-xl'>Bình là 1 chủ nhà siêu cấp</h1>
                    <p className='pb-3'>Chủ nhà siêu cấp là những người có kinh nghiệm, được đánh giá cao và cam kết mang lại kỳ nghỉ tuyệt vời cho khách.</p>
                    <p className='pb-2'>Ngôn ngữ: English</p>
                    <p className='pb-2'>Tỉ lệ phản hồi: 83%</p>
                    <p className='pb-2'>Thời gian phản hồi: trong vòng vài giờ</p>
                </div>
                <div className='py-4'>
                    <a className='p-4 border-2 border-gray-500 rounded bg-gray-200 hover:bg-gray-100 cursor-pointer font-medium'>
                        Liên hệ với chủ nhà
                    </a>
                </div>

                <div className='flex items-center pt-4'>
                    <img src={logo} alt="logo" className='h-6 mr-4' />
                    <p className='text-xs text-gray-400'>
                        Để bảo vệ khoản thanh toán của bạn, tuyệt đối không chuyển tiền hoặc liên lạc bên ngoài trang web hoặc ứng dụng Airbnb.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default InfoHost
