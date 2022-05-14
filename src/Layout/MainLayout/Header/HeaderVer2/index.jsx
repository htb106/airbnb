import React, { useMemo } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../../Assets/Image/airbnb_logo.png';
import logo_icon from '../../../../Assets/Image/airbnbRedIcon.png'
import './style.scss';
import { BiBasketball } from 'react-icons/bi';
import { IoIosMenu } from 'react-icons/io';
import { HiUserCircle } from 'react-icons/hi';
import { IoSearchCircle } from 'react-icons/io5';
import { useState } from 'react';
import { useEffect } from 'react';
import SearchBarVer2 from './SearchBarVer2';
import queryString from "query-string";
import moment from 'moment';
import Login from '../../../../Component/Login';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import createAction from '../../../../Redux/Action/CreateAction';
import { LOGOUT } from '../../../../Redux/Type/ManageAuthType';
import { TOKEN, USER_ID } from '../../../../Untilities/config';
import { useMediaQuery } from 'react-responsive';

const HeaderVer2 = () => {

    const isTablet = useMediaQuery({ maxWidth: 950 });

    const isDesktop = useMediaQuery({ maxWidth: 1024 });

    const dispatch = useDispatch()

    const location = useLocation();

    const navigate = useNavigate();

    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search);
        return {
            ...params,
            _location: params._location,
            _locationId: params._locationId,
            _checkIn: params._checkIn,
            _checkOut: params._checkOut,
            _adult: Number.parseInt(params._adult),
            _child: Number.parseInt(params._child),
            _toddler: Number.parseInt(params._toddler),
        };
    }, [location.search]);

    const homePagePath = (location.pathname === "/");
    const detailPagePath = location.pathname.includes("/detail/");
    const listPagePath = location.pathname.includes("/list/");
    const payPagePath = location.pathname.includes("/pay/");
    const profilePagePath = location.pathname.includes("/profile/");

    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        if (homePagePath) {
            const handleScroll = () => {
                setScroll(window.scrollY > 100);
            };

            window.addEventListener("scroll", handleScroll);

            return () => {
                window.removeEventListener("scroll", handleScroll)
            }
        }
        if ((listPagePath || detailPagePath) && scroll) {
            const handleScroll = () => {
                setScroll(window.scrollY > 100);
            };

            window.addEventListener("scroll", handleScroll);

            return () => {
                window.removeEventListener("scroll", handleScroll)
            }
        }
    }, [scroll, homePagePath, listPagePath, detailPagePath]);

    const { user } = useSelector(state => state.authReducer);

    const render_login = () => {
        if (user?._id) return (
            <div className='bg-white profile_dropdown'>
                <ul className='border-b border-gray-500 py-2'>
                    <li>
                        <a to="/a">Tin nhắn</a>
                    </li>
                    <li>
                        <a to="/b">Thông báo</a>
                    </li>
                    <li>
                        <a to="/b">Chuyến đi</a>
                    </li>
                    <li>
                        <a to="/b">Danh sách yêu thích</a>
                    </li>
                </ul>
                <ul className='border-gray-500 py-2 border-b '>
                    {user.type === 'ADMIN' &&
                        <NavLink to={`/admin/user`}>
                            <li>
                                <a>Quản trị</a>
                            </li>
                        </NavLink>}
                    <li>
                        <a>Cho thuê nhà</a>
                    </li>
                    <li>
                        <a>Tổ chức trải nghiệm</a>
                    </li>
                    <NavLink to={`/profile/${user?._id}`}>
                        <li>
                            <a>Tài khoản</a>
                        </li>
                    </NavLink>
                </ul>
                <ul className='py-2'>
                    <li>
                        <a>Trải nghiệm</a>
                    </li>
                    <li>
                        <a>Tổ chức</a>
                    </li>
                    <li
                        onClick={() => {
                            dispatch(createAction(LOGOUT));
                            localStorage.removeItem(USER_ID);
                            localStorage.removeItem(TOKEN);
                            if (profilePagePath) {
                                navigate({
                                    pathname: '/'
                                })
                            }
                        }}
                    >
                        <a>
                            Đăng xuất
                        </a>
                    </li>
                </ul>
            </div>
        );
        return (
            <div className='bg-white profile_dropdown'>
                <ul className='border-b border-gray-500 py-2'>
                    <Login
                        title={
                            <li>
                                <a className='font-semibold'>Đăng kí</a>
                            </li>
                        }
                        login={false}
                    />
                    <Login
                        title={
                            <li>
                                <a>Đăng nhập</a>
                            </li>
                        }
                        login={true}
                    />
                </ul>
                <ul className='py-2'>
                    <li>
                        <NavLink to="/c">Cho thuê nhà</NavLink>
                    </li>
                    <li>
                        <NavLink to="/d">Tổ chức trải nghiệm</NavLink>
                    </li>
                    <li>
                        <NavLink to="/e">Trợ giúp</NavLink>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <div className={`fixed w-full z-30 ${(window.scrollY < 100 && !scroll && homePagePath) ? 'bg-transparent' : 'bg-white shadow'}`} >
            <div className='flex justify-between items-center mx-20 md:mx-10 h-20'>
                {isDesktop ?
                    <NavLink to="/" className='block'>
                        <img src={logo_icon} alt="logo" className='w-8 block max-w-none' />
                    </NavLink> :
                    <NavLink to="/" className='pr-20 block'>
                        <img src={logo} alt="logo" className='h-8 lg:h-7 block' />
                    </NavLink>}
                {
                    homePagePath &&
                    ((scroll) ?
                        <button
                            className='flex justify-between py-1 px-4 items-center rounded-l-full rounded-r-full w-80 cursor-pointer border border-gray-500 hover:shadow-md'
                            onClick={() => { setScroll(false) }}
                        >
                            <h1 className='text-sm font-semibol'>Bắt đầu tìm kiếm</h1>
                            <div className='text-red-500 text-4xl'><IoSearchCircle /></div>
                        </button>
                        :
                        <div className='flex justify-center flex-auto'>
                            <NavLink to="/" className={`px-4 lg:px-2 py-2 cursor-pointer text-sm link ${(window.scrollY < 200 && !scroll && homePagePath) ? 'text-white' : 'text-black'}`}>Nơi ở</NavLink>
                            <NavLink to="/" className={`px-4 lg:px-2 py-2 cursor-pointer text-sm link ${(window.scrollY < 200 && !scroll && homePagePath) ? 'text-white' : 'text-black'}`}>Trải nghiệm</NavLink>
                            <NavLink to="/" className={`px-4 lg:px-2 py-2 cursor-pointer text-sm link ${(window.scrollY < 100 && !scroll && homePagePath) ? 'text-white' : 'text-black'}`}>Trải nghiệm trực tuyến</NavLink>
                        </div>
                    )
                }
                {
                    detailPagePath &&
                    <button
                        className='flex justify-between py-1 px-4 items-center rounded-l-full rounded-r-full w-80 cursor-pointer border border-gray-500 hover:shadow-md'
                        onClick={() => { setScroll(true) }}
                    >
                        <h1 className='text-sm font-semibol'>Bắt đầu tìm kiếm</h1>
                        <div className='text-red-500 text-4xl'><IoSearchCircle /></div>
                    </button>
                }
                {
                    (listPagePath) &&
                    ((!scroll) ?
                        <div className='pl-20 lg:px-4' onClick={() => { setScroll(true) }}>
                            <div className='ml-32 lg:ml-0 px-4 h-11 flex items-center justify-between border-gray-600 border rounded-r-full rounded-l-full'>
                                <div className='border-r border-gray-200'>
                                    <h1 className='px-4 lg:px-2 text-sm font-semibold text-center'>{queryParams._location}</h1>
                                </div>
                                <div className='border-r border-gray-200 flex items-center'>
                                    {
                                        (queryParams._checkIn && queryParams._checkOut) ?
                                            <h1 className='px-4 lg:px-2 text-sm font-semibold text-center'>
                                                {`${moment(queryParams._checkIn).format("DD tg MM")}  -  ${moment(queryParams._checkOut).format("DD tg MM")}`}
                                            </h1>
                                            :
                                            <h1 className='px-4 lg:px-2 text-sm text-black/70'>Thêm ngày</h1>
                                    }
                                </div>
                                <div className='flex items-center justify-center'>
                                    {
                                        (queryParams._adult || queryParams._childrent) ?
                                            <h1 className='px-4 lg:px-2 text-sm font-semibold'>{queryParams._adult + queryParams._child} khách</h1> :
                                            <h1 className='px-4 lg:px-2 text-sm text-black/70'>Thêm khách</h1>
                                    }
                                    <IoSearchCircle className='text-red-500 w-10 h-10' />
                                </div>
                            </div>
                        </div>
                        :
                        <div className='flex justify-between pl-32'>
                            <NavLink to="/" className={`px-4 py-2 cursor-pointer text-sm link ${(window.scrollY < 100 && !scroll && homePagePath) ? 'text-white' : 'text-black'}`}>Nơi ở</NavLink>
                            <NavLink to="/" className={`px-4 py-2 cursor-pointer text-sm link ${(window.scrollY < 100 && !scroll && homePagePath) ? 'text-white' : 'text-black'}`}>Trải nghiệm</NavLink>
                            <NavLink to='/' className={`px-4 py-2 cursor-pointer text-sm link ${(window.scrollY < 100 && !scroll && homePagePath) ? 'text-white' : 'text-black'}`}>Trải nghiệm trực tuyến</NavLink>
                        </div>
                    )
                }
                {!payPagePath && <div className='flex justify-between items-center relative'>
                    <h1 className={`item_hover py-2 px-4 lg:px-2 text-sm hover:rounded-r-full hover:rounded-l-full cursor-pointer ${(window.scrollY < 100 && !scroll && homePagePath) ? 'text-white' : 'text-black'}`}>
                        Trở thành chủ nhà
                    </h1>
                    <div className={` item_hover p-2 text-2xl hover:rounded-full cursor-pointer ${(window.scrollY < 100 && !scroll && homePagePath) ? 'text-white' : 'text-black'}`}>
                        <BiBasketball />
                    </div>
                    <div className='flex p-2 rounded-l-full rounded-r-full bg-white cursor-pointer border-gray-200 border 2mx-4 mx-2 profile'>
                        <div className='px-1 text-2xl'>
                            <IoIosMenu className='h-full w-full' />
                        </div>
                        <div className='px-1 text-2xl text-gray-600'>
                            {user?.avatar ? <img src={user?.avatar} alt="avata" className='h-8 w-8 rounded-full border border-gray-200' /> : <HiUserCircle />}
                        </div>
                        {render_login()}
                    </div>
                </div>}
            </div>
            <div className={`${(window.scrollY < 100 && !scroll) ? 'searchBarV1' : 'searchBarV2'} ${isTablet && 'isTablet'}`}>
                {
                    homePagePath &&
                        ((!scroll)) ? <SearchBarVer2 homePagePath={homePagePath} queryParams={queryParams} /> : ""
                }
                {
                    (listPagePath || detailPagePath) &&
                        ((scroll)) ? <SearchBarVer2 homePagePath={homePagePath} queryParams={queryParams} /> : ""
                }
            </div>

        </div>

    )
}

export default HeaderVer2
