import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../Assets/Image/airbnb_logo.png';
import { FaSearch } from 'react-icons/fa';
import './style.scss';
import { useSelector } from 'react-redux';
import { HiUserCircle } from 'react-icons/hi';
import Login from '../../../Component/Login';

const HeaderAd = () => {

  const { user } = useSelector(state => state.authReducer);

  return (
    <div className='fixed w-full z-40 header_ad'>
      <div className='flex justify-between items-center px-20 h-20 shadow shadow-white'>
        <NavLink to="/">
          <img src={logo} alt="logo" className='h-8 w-full' />
        </NavLink>
        <div className='w-4/6 relative'>
          <input type="text" placeholder='Search' className='text-white/80 ml-32 border border-gray-500 rounded-l-full rounded-r-full w-2/5 py-2 pl-20 pr-6 search_input outline-none focus:text-white' />
          <a className='absolute top-1/2 left-36 search_icon text-white p-3 cursor-pointer'>
            <FaSearch />
          </a>
        </div>
        <div className='flex items-center rounded-l-full rounded-r-full py-1 px-4 bg-white hover:bg-gray-200 border-gray-200 border cursor-pointer'>
          <Login
            title={
              <div className='h-8 w-8'>
                {user?.avatar ? <img src={user?.avatar} alt="avata" className='h-8 w-8 rounded-full border border-gray-200' /> : <HiUserCircle className='h-8 w-8' />}
              </div>
            }
            login={true}
          />
          <h1 className='text-black/70 ml-2'>{user.name}</h1>
        </div>
      </div>
    </div>
  )
}

export default HeaderAd