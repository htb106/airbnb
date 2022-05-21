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
          <h1 id='heading' className='text-3xl md:text-lg font-semibold'>Xác nhận và thanh toán - Airbnb</h1>
        </div>
        <div className='flex md:block relative'>
          <div className='w-1/2 md:w-full'>
            <div className='border border-gray-200 rounded-xl p-6 mb-6 md:mx-5'>
              <h1 className='font-medium'>Nơi này rất hiếm còn chỗ</h1>
              <h1>Nhà phòng cho thuê của Bình thường kín phòng</h1>
            </div>
            {
              !isDesktop &&
              <div>
                <div className='flex items-center border-gray-200 py-5 border-b-8 md:px-5'>
                  <img src={detailRoom.image} alt="img" className='w-32 h-28 rounded-xl' />
                  <div className='pl-4'>
                    <h1 className='text-black/70 text-sm'>Toàn bộ căn hộ dịch vụ</h1>
                    <h1 className='text-sm font-medium pb-5'>{detailRoom.name}</h1>
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center'>
                        <AiFillStar className='text-yellow-400 h-4 w-4 pr-1' />
                        <p className='text-xs'>{detailRoom.locationId?.valueate}( đánh giá)</p>
                      </div>
                      <div className='flex items-center'>
                        <FaMedal className='text-red-400 h-6 w-6 mr-1 pl-4' />
                        <p className='text-xs'>Chủ nhà siêu cấp</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='pt-6 border-b-8 border-gray-200 py-5 md:px-5'>
                  <h1 className='text-xl font-medium pb-4'>Chi tiết giá</h1>
                  <div className='flex justify-between items-center pb-6'>
                    <p className='text-black/70'>{formMoney(detailRoom.price)} x {totalDate} đêm</p>
                    <p className='text-black/70'>{formMoney(detailRoom.price * totalDate)}</p>
                  </div>
                  <div className='flex justify-between pb-6'>
                    <p className='text-black/70 underline'>Phí dịch vụ:</p>
                    <p className='text-black/70'>100.000đ</p>
                  </div>
                  <div className='flex justify-between'>
                    <h1 className='underline text-lg font-medium'>Tổng:</h1>
                    <p className='text-black/70'>{formMoney(detailRoom.price * totalDate + 100000)}</p>
                  </div>
                </div>
              </div>
            }
            <div className='pb-5 border-b md:py-5 md:border-b-8 md:px-5 border-gray-200'>
              <h1 className='text-xl font-medium pb-4'>Chuyến đi của bạn</h1>
              <div className='pb-6 md:relative'>
                <div className='flex justify-between items-center pr-8'>
                  <h1 className='font-medium'>Ngày</h1>
                  <div>
                    <h1 className='font-medium underline cursor-pointer'>Chỉnh sửa</h1>
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
                  <h1 className='font-medium'>Khách</h1>
                  <div>
                    <h1 className='font-medium underline cursor-pointer w'>Chỉnh sửa</h1>
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
                <h1 className='pt-1 text-black/70 font-light'>{(guest.numsAdult + guest.numsChild) ? (guest.numsChild + guest.numsAdult) : 1} khách</h1>
              </div>
            </div>
            <div className='py-5 md:border-b-8 md:px-5 border-gray-200 border-b'>
              <h1 className='text-xl font-medium pb-4'>Thanh toán bằng</h1>
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
                    placeholder='Số thẻ'
                  />
                </div>
              </form>
              <a className='font-medium underline cursor-pointer'>Nhập mã giảm giá</a>
            </div>
            <div className='border-b py-5 md:border-b-8 md:px-5 border-gray-200'>
              <h1 className='text-xl font-medium pb-4'>Bắt buộc nhập</h1>
              <input
                className='rounded-lg py-4 pl-8 pr-10 w-full border-gray-200 border text-black/70 focus:outline-neutral-800'
                type="text"
                placeholder='Số điện thoại'
              />
              <p className='pt-2 px-2 text-sm text-black/70'>Thêm và xác nhận số điện thoại của bạn để nhận thông tin cập nhật về chuyến đi.</p>
            </div>
            <div className='border-gray-200 border-b py-5 md:border-b-8 md:px-5'>
              <h1 className='text-xl font-medium pb-4'>Chính sách huỷ</h1>
              <h1 className='text-black/70 text-sm'>
                <a className='font-medium text-black'>Hủy miễn phí trước 12:00, ngày 7 thg 5.</a>Sau đó, hãy hủy trước 12:00 ngày 8 thg 5 để được hoàn tiền đầy đủ, trừ chi phí đêm đầu tiên và phí dịch vụ.
              </h1>
              <a className='font-medium underline text-black text-sm'>Tìm hiểu thêm</a>
              <h1 className='pt-6 text-black/70 text-sm'>
                Chính sách trường hợp bất khả kháng của chúng tôi không áp dụng cho các trường hợp gián đoạn đi lại do COVID-19 gây ra.
                <a className='font-medium underline text-black'>Tìm hiểu thêm</a>
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
                    <h1 className='text-black/70 text-sm'>Toàn bộ căn hộ dịch vụ</h1>
                    <h1 className='text-sm font-medium pb-6 lg:pb-2'>{detailRoom.name}</h1>
                  </div>
                </div>
                <div className='pt-6'>
                  <h1 className='text-xl font-medium pb-6'>Chi tiết giá</h1>
                  <div className='flex justify-between items-center pb-6'>
                    <p className='text-black/70'>{formMoney(detailRoom.price)} x {totalDate} đêm</p>
                    <p className='text-black/70'>{formMoney(detailRoom.price * totalDate)}</p>
                  </div>
                  <div className='flex justify-between pb-6'>
                    <p className='text-black/70 underline'>Phí dịch vụ:</p>
                    <p className='text-black/70'>100.000đ</p>
                  </div>
                  <div className='flex justify-between'>
                    <h1 className='underline text-lg font-medium'>Tổng:</h1>
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
                <Button title={'XÁC NHẬN VÀ THANH TOÁN - AIRBNB'} />
              }
              email={user?.email}
              total={formMoney(detailRoom.price * totalDate + 100000)}
              onClick={handleBookingTiket}

            /> :
            <Login
              title={
                <Button title={'ĐĂNG NHẬP ĐỂ TIẾP TỤC'} />
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