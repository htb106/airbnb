import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaChevronLeft, FaMedal } from 'react-icons/fa';
import Button from '../../Component/Button';
import queryString from "query-string";
import { useMemo } from 'react';
import moment from 'moment';
import Dialog from '../../Component/Dialogs';
import { DateRangePicker } from 'react-date-range';
import Guset from '../../Component/Guest';
import { useDispatch, useSelector } from 'react-redux';
import { getRoomDetailAction } from '../../Redux/Action/ManageRoomActions';
import { AiFillStar } from 'react-icons/ai';
import { formMoney } from '../../Untilities/formMoney';
import Login from '../../Component/Login';
import Confirm from '../../Component/Confirm';
import { useMediaQuery } from 'react-responsive';

const Pay = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      _location: params._location,
      _checkIn: params._checkIn,
      _checkOut: params._checkOut,
      _adult: Number.parseInt(params._adult),
      _child: Number.parseInt(params._child),
      _toddler: Number.parseInt(params._toddler),
      _provinceLatitude: Number(params._provinceLatitude),
      _provinceLongitude: Number(params._provinceLongitude),
      _roomLatitude: Number(params._roomLatitude),
      _roomLongitude: Number(params._roomLongitude),
    }
  }, [location.search]);

  const params = useParams();

  useEffect(() => {

    dispatch(getRoomDetailAction(params.roomId))

  }, [dispatch, params.roomId]);

  const { detailRoom } = useSelector(state => state.roomReducer);

  const [bookingTime, setBookingTime] = useState([{
    startDate: queryParams._checkIn ? new Date(queryParams._checkIn) : null,
    endDate: queryParams._checkOut ? new Date(queryParams._checkOut) : null,
    key: 'selection'
  }]
  );

  const selectionRange = {
    startDate: bookingTime[0].startDate ? bookingTime[0].startDate : new Date,
    endDate: bookingTime[0].endDate ? bookingTime[0].endDate : new Date,
    key: 'selection',
  };

  const [guest, setGuest] = useState({
    numsAdult: queryParams._adult,
    numsChild: queryParams._child,
    numsToddler: queryParams._toddler,
  });

  const totalDate = (bookingTime[0].endDate - bookingTime[0].startDate) / (1000 * 3600 * 24) ? (bookingTime[0].endDate - bookingTime[0].startDate) / (1000 * 3600 * 24) : 1;

  const { user } = useSelector(state => state.authReducer);

  const navigate = useNavigate();

  const handleBookingTiket = () => {
    navigate({
      pathname: '/',
    });
  };

  const isDesktop = useMediaQuery({ minWidth: 768 });

  return (
    <>
      <div className='pt-32 px-20 md:pt-5 md:px-0'>
        <div className='flex items-center pb-8 md:pb-4'>
          <div
            onClick={() => {
              navigate({ pathname: `/detail/${params.roomId}`, }
              )
            }}
            className='p-4 rounded-full hover:bg-gray-200 mr-6'
          >
            <FaChevronLeft className='w-6 h-6 md:w-4 md:h-4' />
          </div>
          <h1 id='heading' className='text-3xl md:text-lg font-semibold'>X??c nh???n v?? thanh to??n - Airbnb</h1>
        </div>
        <div className='flex md:block relative'>
          <div className='w-1/2 md:w-full'>
            <div className='border border-gray-200 rounded-xl p-6 mb-6 md:mx-5'>
              <h1 className='font-medium'>N??i n??y r???t hi???m c??n ch???</h1>
              <h1>Nh?? ph??ng cho thu?? c???a B??nh th?????ng k??n ph??ng</h1>
            </div>
            {
              !isDesktop &&
              <div>
                <div className='flex items-center border-gray-200 py-5 border-b-8 md:px-5'>
                  <img src={detailRoom.image} alt="img" className='w-32 h-28 rounded-xl' />
                  <div className='pl-4'>
                    <h1 className='text-black/70 text-sm'>To??n b??? c??n h??? d???ch v???</h1>
                    <h1 className='text-sm font-medium pb-5'>{detailRoom.name}</h1>
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center'>
                        <AiFillStar className='text-yellow-400 h-4 w-4 pr-1' />
                        <p className='text-xs'>{detailRoom.locationId?.valueate}( ????nh gi??)</p>
                      </div>
                      <div className='flex items-center'>
                        <FaMedal className='text-red-400 h-6 w-6 mr-1 pl-4' />
                        <p className='text-xs'>Ch??? nh?? si??u c???p</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='pt-6 border-b-8 border-gray-200 py-5 md:px-5'>
                  <h1 className='text-xl font-medium pb-4'>Chi ti???t gi??</h1>
                  <div className='flex justify-between items-center pb-6'>
                    <p className='text-black/70'>{formMoney(detailRoom.price)} x {totalDate} ????m</p>
                    <p className='text-black/70'>{formMoney(detailRoom.price * totalDate)}</p>
                  </div>
                  <div className='flex justify-between pb-6'>
                    <p className='text-black/70 underline'>Ph?? d???ch v???:</p>
                    <p className='text-black/70'>100.000??</p>
                  </div>
                  <div className='flex justify-between'>
                    <h1 className='underline text-lg font-medium'>T???ng:</h1>
                    <p className='text-black/70'>{formMoney(detailRoom.price * totalDate + 100000)}</p>
                  </div>
                </div>
              </div>
            }
            <div className='pb-5 border-b md:py-5 md:border-b-8 md:px-5 border-gray-200'>
              <h1 className='text-xl font-medium pb-4'>Chuy???n ??i c???a b???n</h1>
              <div className='pb-6 md:relative'>
                <div className='flex justify-between items-center pr-8'>
                  <h1 className='font-medium'>Ng??y</h1>
                  <div>
                    <h1 className='font-medium underline cursor-pointer'>Ch???nh s???a</h1>
                    <Dialog
                      content={
                        <DateRangePicker
                          onChange={item => setBookingTime([item.selection])}
                          showSelectionPreview={true}
                          moveRangeOnFirstSelection={false}
                          months={2}
                          ranges={[selectionRange]}
                          direction="horizontal"
                        />
                      }
                      top={'top-0'}
                      bottom={'bottom-0'}
                      left={'left-0'}
                      right={'right-0'}
                      top_content={'top-8'}
                      left_content={'left-1/4 md:left-0'}
                      right_content={'right-0'}
                    />
                  </div>
                </div>
                <h1 className='pt-1 text-black/70 font-light'>
                  {moment(bookingTime[0].startDate).format('DD tg MM')} - {moment(bookingTime[0].endDate).format('DD tg MM')}
                </h1>
              </div>
              <div className='md:relative'>
                <div className='flex justify-between items-center pr-8'>
                  <h1 className='font-medium'>Kh??ch</h1>
                  <div>
                    <h1 className='font-medium underline cursor-pointer w'>Ch???nh s???a</h1>
                    <Dialog
                      content={
                        <Guset
                          guest={guest}
                          setGuest={setGuest}
                          w={'w-full'}
                        />
                      }
                      top={'top-0'}
                      bottom={'bottom-0'}
                      left={'left-0'}
                      right={'right-0'}
                      top_content={'top-8'}
                      left_content={'left-0'}
                      right_content={'md:right-0'}
                    />
                  </div>

                </div>
                <h1 className='pt-1 text-black/70 font-light'>{(guest.numsAdult + guest.numsChild) ? (guest.numsChild + guest.numsAdult) : 1} kh??ch</h1>
              </div>
            </div>
            <div className='py-5 md:border-b-8 md:px-5 border-gray-200 border-b'>
              <h1 className='text-xl font-medium pb-4'>Thanh to??n b???ng</h1>
              <form>
                <div className='grid grid-cols-4'>
                  <div className='flex items-center'>
                    <input type='radio' name='pay' value='visa' id='visa' className='w-5 h-5 mr-2' />
                    <label htmlFor="visa">
                      <img
                        src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_visa.0adea522bb26bd90821a8fade4911913.svg"
                        alt="visa"
                        className='w-12'
                      />
                    </label>
                  </div>
                  <div className='flex items-center'>
                    <input type='radio' name='pay' value='masterCard' id='masterCard' className='w-5 h-5 mr-2' />
                    <label htmlFor="masterCard">
                      <img
                        src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_mastercard.f18379cf1f27d22abd9e9cf44085d149.svg"
                        alt="visa"
                        className='w-12'
                      />
                    </label>
                  </div>
                  <div className='flex items-center'>
                    <input type='radio' name='pay' value='googlePay' id='googlePay' className='w-5 h-5 mr-2' />
                    <label htmlFor="googlePay">
                      <img
                        src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_googlepay.3f786bc031b59575d24f504dfb859da0.svg"
                        alt="visa"
                        className='w-12'
                      />
                    </label>
                  </div>
                  <div className='flex items-center'>
                    <input type='radio' name='pay' value='paypal' id='paypal' className='w-5 h-5 mr-2' />
                    <label htmlFor="paypal">
                      <img
                        src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_paypal.faa3042fa2daf6b4a9822cc4b43e8609.svg"
                        alt="visa"
                        className='w-12'
                      />
                    </label>
                  </div>
                </div>
                <div className='py-5'>
                  <input
                    className='rounded-lg py-4 pl-8 pr-10 w-full border-gray-200 border text-black/70 focus:outline-neutral-800'
                    type="text"
                    placeholder='S??? th???'
                  />
                </div>
              </form>
              <a className='font-medium underline cursor-pointer'>Nh???p m?? gi???m gi??</a>
            </div>
            <div className='border-b py-5 md:border-b-8 md:px-5 border-gray-200'>
              <h1 className='text-xl font-medium pb-4'>B???t bu???c nh???p</h1>
              <input
                className='rounded-lg py-4 pl-8 pr-10 w-full border-gray-200 border text-black/70 focus:outline-neutral-800'
                type="text"
                placeholder='S??? ??i???n tho???i'
              />
              <p className='pt-2 px-2 text-sm text-black/70'>Th??m v?? x??c nh???n s??? ??i???n tho???i c???a b???n ????? nh???n th??ng tin c???p nh???t v??? chuy???n ??i.</p>
            </div>
            <div className='border-gray-200 border-b py-5 md:border-b-8 md:px-5'>
              <h1 className='text-xl font-medium pb-4'>Ch??nh s??ch hu???</h1>
              <h1 className='text-black/70 text-sm'>
                <a className='font-medium text-black'>H???y mi???n ph?? tr?????c 12:00, ng??y 7 thg 5.</a>Sau ????, h??y h???y tr?????c 12:00 ng??y 8 thg 5 ????? ???????c ho??n ti???n ?????y ?????, tr??? chi ph?? ????m ?????u ti??n v?? ph?? d???ch v???.
              </h1>
              <a className='font-medium underline text-black text-sm'>T??m hi???u th??m</a>
              <h1 className='pt-6 text-black/70 text-sm'>
                Ch??nh s??ch tr?????ng h???p b???t kh??? kh??ng c???a ch??ng t??i kh??ng ??p d???ng cho c??c tr?????ng h???p gi??n ??o???n ??i l???i do COVID-19 g??y ra.
                <a className='font-medium underline text-black'>T??m hi???u th??m</a>
              </h1>
            </div>
          </div>
          {
            isDesktop &&
            <div className='w-1/2 md:w-full pl-10 md:pl-0 sticky md:relative top-24 h-full'>
              <div className='border border-gray-200 rounded-xl p-6 top-0 right-0 left-0'>
                <div className='flex items-center border-gray-200 pb-6 border-b'>
                  <img src={detailRoom.image} alt="img" className='w-32 h-28 rounded-xl' />
                  <div className='pl-4'>
                    <h1 className='text-black/70 text-sm'>To??n b??? c??n h??? d???ch v???</h1>
                    <h1 className='text-sm font-medium pb-6 lg:pb-2'>{detailRoom.name}</h1>
                  </div>
                </div>
                <div className='pt-6'>
                  <h1 className='text-xl font-medium pb-6'>Chi ti???t gi??</h1>
                  <div className='flex justify-between items-center pb-6'>
                    <p className='text-black/70'>{formMoney(detailRoom.price)} x {totalDate} ????m</p>
                    <p className='text-black/70'>{formMoney(detailRoom.price * totalDate)}</p>
                  </div>
                  <div className='flex justify-between pb-6'>
                    <p className='text-black/70 underline'>Ph?? d???ch v???:</p>
                    <p className='text-black/70'>100.000??</p>
                  </div>
                  <div className='flex justify-between'>
                    <h1 className='underline text-lg font-medium'>T???ng:</h1>
                    <p className='text-black/70'>{formMoney(detailRoom.price * totalDate + 100000)}</p>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
        <div className='py-8 w-1/2 md:w-4/5 mx-auto'>
          {user?._id ?
            <Confirm
              title={
                <Button title={'X??C NH???N V?? THANH TO??N - AIRBNB'} />
              }
              email={user?.email}
              total={formMoney(detailRoom.price * totalDate + 100000)}
              onClick={handleBookingTiket}

            /> :
            <Login
              title={
                <Button title={'????NG NH???P ????? TI???P T???C'} />
              }
              login={true}
            />}
        </div>
      </div>
      <Login />
    </>
  )
}

export default Pay