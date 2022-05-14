import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './style.scss';
import { FaUsers } from 'react-icons/fa';
import { FaUserPlus } from 'react-icons/fa';
import { FaUserCog } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { MdAddLocationAlt } from 'react-icons/md';
import { MdEditLocationAlt } from 'react-icons/md';
import { MdBedroomParent } from 'react-icons/md';
import { MdReviews } from 'react-icons/md';
import { HiPlusCircle } from 'react-icons/hi';
import { FaEdit } from 'react-icons/fa';
// import logo from '../../../Assets/Image/airbnb_logo_white.png';

const SidebarAd = () => {

    const location = useLocation();
    const adUserPagePath = location.pathname.includes('/admin/user');
    const adAddUserPagePath = location.pathname.includes('/admin/user/add');
    const adEditUserPagePath = location.pathname.includes('/admin/user/edit');
    const adLocationPagePath = location.pathname.includes('/admin/location');
    const adAddLocationPagePath = location.pathname.includes('/admin/location/add');
    const adEditLocationPagePath = location.pathname.includes('/admin/location/edit');
    const adRoomPagePath = location.pathname.includes('/admin/room');
    const adAddRoomPagePath = location.pathname.includes('/admin/room/add');
    const adEditRoomPagePath = location.pathname.includes('/admin/room/edit');
    const adRatingPagePath = location.pathname.includes('/admin/rating');

    return (
        <div className='fixed top-0 bottom-0 left-0 w-60 z-30 sidebar'>
            <ul className='pt-20'>
                <li className='cursor-pointer border-b border-gray-600 py-1'>
                    <NavLink to={`/admin/user`} className={`flex items-center w-full h-full py-2 item hover:bg-white/10 px-8 ${adUserPagePath && 'active_link'}`}>
                        <FaUsers className='w-6 h-6 mr-4' />
                        <a className='text-xl'>
                            User
                        </a>
                    </NavLink>
                    {<ul>
                        <li className={` py-1 item hover:bg-white/10 px-6 ${adAddUserPagePath && 'active_link'}`}>
                            <NavLink to={`/admin/user/add`} className='flex items-center w-full h-full justify-center'>
                                <FaUserPlus className='w-4 h-4 mr-4' />
                                <a>AddUser</a>
                            </NavLink>
                        </li>
                        <li className={`flex items-center w-full h-full py-1 item hover:bg-white/10 px-6 justify-center ${adEditUserPagePath && 'active_link'}`}>
                            <FaUserCog className='w-4 h-4 mr-4' />
                            <a>EditUser</a>
                        </li>
                    </ul>}
                </li>
                <li className=' cursor-pointer border-b border-gray-600 py-1'>
                    <NavLink to={'/admin/location'} className={`flex items-center w-full h-full py-2 item hover:bg-white/10 px-8 ${adLocationPagePath && 'active_link'}`}>
                        <MdLocationOn className='w-6 h-6 mr-4' />
                        <a className=' text-xl'>
                            Location
                        </a>
                    </NavLink>

                    {<ul>
                        <li className={` py-1 item hover:bg-white/10 px-6 ${adAddLocationPagePath && 'active_link'}`}>
                            <NavLink to={'/admin/location/add'} className='flex items-center justify-center w-full h-full'>
                                <MdAddLocationAlt className='w-4 h-4 mr-4' />
                                <a>AddLocation</a>
                            </NavLink>
                        </li>
                        <li className={`flex items-center w-full h-full py-1 item hover:bg-white/10 px-6 justify-center ${adEditLocationPagePath && 'active_link'}`}>
                            <MdEditLocationAlt className='w-4 h-4 mr-4' />
                            <a>EditLocation</a>
                        </li>
                    </ul>}
                </li>
                <li className='cursor-pointer border-b border-gray-600 py-1'>
                    <div className={`flex items-center w-full h-full py-2 item hover:bg-white/10 px-8 ${adRoomPagePath && 'active_link'}`}>
                        <MdBedroomParent className='w-6 h-6 mr-4' />
                        <a className=' text-xl'>
                            Room
                        </a>
                    </div>
                    {<ul>
                        <li className={`py-1 item hover:bg-white/10 px-6 ${adAddRoomPagePath && 'active_link'}`}>
                            <NavLink to={'/admin/room/add'} className='flex items-center justify-center w-full h-full' >
                                <HiPlusCircle className='w-4 h-4 mr-4' />
                                <a>AddRoom</a>
                            </NavLink>
                        </li>
                        <li className={`flex items-center w-full h-full py-1 item hover:bg-white/10 px-6 justify-center ${adEditRoomPagePath && 'active_link'}`}>
                            <FaEdit className='w-4 h-4 mr-4' />
                            <a>EditRoom</a>
                        </li>
                    </ul>}
                </li>
                <li className={`cursor-pointer py-1 border-b border-gray-600 ${adRatingPagePath && 'active_link'}`}>
                    <div className='px-8 py-1 flex items-center item hover:bg-white/10 '>
                        <MdReviews className='w-6 h-6 mr-4' />
                        <a className=' text-xl'>
                            Rating
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default SidebarAd