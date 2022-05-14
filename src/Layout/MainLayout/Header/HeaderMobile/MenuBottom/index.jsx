import React, { Fragment } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { FaRegUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Login from '../../../../../Component/Login';
import { useSelector } from 'react-redux';

const MenuBottom = () => {

    const [scrolled, setScrolled] = useState({
        prevScrollpos: window.pageYOffset,
        visible: false,
    });
    useEffect(() => {
        const handleScroll = () => {
            const { prevScrollpos } = scrolled;
            const currentScrollPos = window.pageYOffset;
            const visible = prevScrollpos > currentScrollPos;
            setScrolled({
                prevScrollpos: currentScrollPos,
                visible,
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrolled]);

    const { user } = useSelector(state => state.authReducer);

    return (
        <Fragment>
            {
                scrolled.visible && <div className='fixed bottom-0 left-0 right-0 bg-white shadow z-30'>
                    <div className='flex justify-center items-center py-2'>
                        <NavLink to='/' className='mx-4 block'>
                            <div className='flex justify-center'>
                                <FiSearch className='w-7 h-7 active:text-red-500' />
                            </div>

                            <h1 className='text-sm'>Khám phá</h1>
                        </NavLink>
                        <a className='mx-4 block'>
                            <div className='flex justify-center'>
                                <AiOutlineHeart className='w-7 h-7' />
                            </div>

                            <h1 className='text-sm'>Yêu thích</h1>
                        </a>
                        {user._id ?
                            <NavLink to={`/profile/${user._id}`} className='mx-4 block'>
                                <div className='flex justify-center'>
                                    {user?.avatar ?
                                        <img src={user?.avatar} alt="avatar" className='w-7 h-7 rounded-full' /> :
                                        <FaRegUserCircle className='w-7 h-7' />
                                    }
                                </div>

                                <h1 className='text-sm'>{user.name}</h1>
                            </NavLink> :
                            <Login
                                title={
                                    <a className='mx-4 block'>
                                        <div className='flex justify-center'>
                                            <FaRegUserCircle className='w-7 h-7' />
                                        </div>

                                        <h1 className='text-sm'>Đăng nhập</h1>
                                    </a>
                                }
                                login={true}
                            />}
                    </div>
                </div>
            }
        </Fragment>

    )
}

export default MenuBottom