import React, { useMemo } from 'react';
import './style.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Locations from './Locations';
import BookingTime from './BookingTime';
import queryString from "query-string";
import Guset from '../../../../Component/Guest';
import MenuBottom from './MenuBottom';
import moment from 'moment';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import logo from '../../../../Assets/Image/airbnb_logo.png';


const HeaderMobile = () => {

  const [scroll, setScroll] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const homePagePath = (location.pathname === '/');
  const detailPagePath = location.pathname.includes("/detail/");
  const listPagePath = location.pathname.includes("/list/");
  const payPagePath = location.pathname.includes("/pay/");
  const profilePagePath = location.pathname.includes("/profile/");

  useEffect(() => {
    if (homePagePath) {
      const handleScroll = () => {
        setScroll(window.scrollY > 100);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    };

    if ((listPagePath || detailPagePath) && scroll) {
      const handleScroll = () => {
        setScroll(window.scrollY > 100);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [homePagePath, scroll, setScroll]);

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

  const [locationSearch, setLocationSearch] = useState(queryParams._location ? queryParams._location : '');
  const [locationId, setLocationId] = useState(queryParams._locationId ? queryParams._locationId : '');

  const [bookingTime, setBookingTime] = useState([{
    startDate: queryParams._checkIn ? queryParams._checkIn : null,
    endDate: queryParams._checkOut ? queryParams._checkOut : null,
    key: 'selection'
  }]
  );

  const selectionRange = {
    startDate: bookingTime[0].startDate ? bookingTime[0].startDate : new Date,
    endDate: bookingTime[0].endDate ? bookingTime[0].endDate : new Date,
    key: 'selection',
  };

  const [guest, setGuest] = useState({
    numsAdult: queryParams._adult ? queryParams._adult : 0,
    numsChild: queryParams._child ? queryParams._child : 0,
    numsToddler: queryParams._toddler ? queryParams._toddler : 0,
  });

  const data = {
    ...queryParams,
    _location: locationSearch,
    _locationId: locationId,
    _checkIn: bookingTime[0].startDate,
    _checkOut: bookingTime[0].endDate,
    _adult: +guest.numsAdult,
    _child: +guest.numsChild,
    _toddler: +guest.numsToddler,
  };

  let totalGuests = +guest.numsAdult + +guest.numsChild;

  const handleSearch = () => {
    if (!locationId) return

    setIsGuest(false);

    navigate({
      pathname: `/list/${locationId}`,
      search: queryString.stringify(data),
    });
  };

  const [islocations, setIsLocations] = useState(false);

  const [isDate, setIsDate] = useState(false);

  const [isGuest, setIsGuest] = useState(false);

  if (detailPagePath || payPagePath) return <></>

  return (
    <div className='relative'>
      <div className={`fixed top-0 left-0 right-0 z-30 px-5 py-4 ${(window.scrollY < 100 && !scroll && homePagePath) ? 'bg-transparent' : 'bg-white shadow'}`}>
        <div>
          {profilePagePath ?
            <div>
              <NavLink to="/" className='pr-20 block'>
                <img src={logo} alt="logo" className='h-8 xl:h-7 block' />
              </NavLink>
            </div> :

            (homePagePath ?
              <button
                className={`${(window.scrollY < 100 && !scroll && homePagePath) ? 'bg-white' : 'bg-gray-100'} rounded-l-full rounded-r-full flex items-center w-full justify-center py-3 px-8 cursor-pointer`}
                onClick={() => { setIsLocations(true) }}
              >
                <AiOutlineSearch className='text-red-500 h-6 w-6 font-semibold' />
                <h1 className='ml-4 font-semibold md:text-base sm:text-sm'>Bạn sắp đi đâu?</h1>
              </button> :
              <div className='flex justify-between items-center bg-white'>
                <NavLink to='/'>
                  <HiOutlineChevronLeft
                    className='h-6 w-6 mr-6 text-blue-500 font-bold'
                  />
                </NavLink>
                <div
                  onClick={() => { setIsLocations(true) }}
                  className='px-4 h-11 flex items-center justify-center rounded-r-full rounded-l-full w-4/5 bg-gray-100'
                >
                  <div className='border-r border-gray-200'>
                    <h1 className='px-2 text-xs font-semibold'>{queryParams._location} </h1>
                  </div>
                  <div className='flex items-center'>
                    {
                      (queryParams._checkIn && queryParams._checkOut) ?
                        <h1 className='px-2 text-xs font-semibold'>
                          {`${moment(queryParams._checkIn).format("DD tg MM")}  -  ${moment(queryParams._checkOut).format("DD tg MM")}`}
                        </h1>
                        :
                        <h1 className='px-2 text-xs text-black/70'>Thêm ngày</h1>
                    }
                  </div>
                </div>
                <div></div>
              </div>)
          }
        </div>
        {islocations &&
          <Locations
            setIsLocations={setIsLocations}
            setIsDate={setIsDate}
            setLocationSearch={setLocationSearch}
            setLocationId={setLocationId}
            locationSearch={queryParams._location}
          />}

        {isDate &&
          <BookingTime
            setIsLocations={setIsLocations}
            setIsDate={setIsDate}
            setBookingTime={setBookingTime}
            selectionRange={selectionRange}
            setIsGuest={setIsGuest}
          />}

        {isGuest &&
          <div className='fixed top-0 left-0 bottom-0 right-0 bg-white z-50'>
            <div className='pt-4'>
            </div>
            <div className='flex items-center pl-6 pt-6 justify-between'>
              <HiOutlineChevronLeft
                className='h-6 w-6 text-blue-500 font-bold'
                onClick={() => {
                  setIsGuest(false);
                  setIsDate(true);
                }}
              />
              <h1 className='text-center font-medium'>{locationSearch}</h1>
              <div></div>
            </div>
            <div>
              <Guset
                guest={guest}
                setGuest={setGuest}
              />
            </div>
            <div className='flex justify-between items-center px-8'>
              <div className='flex items-center'>
                <h1 className='font-medium mr-4'>Tổng số khách:</h1>
                <h1>{totalGuests}</h1>
              </div>
              <button
                className='bg-gray-500 rounded-lg px-6 py-2 text-white text-sm'
                onClick={() => {

                  handleSearch();
                }}
              >
                Tiếp tục
              </button>
            </div>
          </div>
        }
      </div>
      <MenuBottom />
    </div>

  )
}

export default HeaderMobile