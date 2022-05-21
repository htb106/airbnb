import React, { useState } from 'react';
import { formMoney } from '../../../../Untilities/formMoney';
import { AiFillStar } from 'react-icons/ai';
import { AiFillCaretDown } from 'react-icons/ai';
import moment from 'moment';
import Dialog from '../../../../Component/Dialogs';
import Button from '../../../../Component/Button';
import DateRangePicker from 'react-date-range/dist/components/DateRangePicker';
import { useNavigate } from 'react-router-dom';
import queryString from "query-string";
import Guset from '../../../../Component/Guest';

const BookingDesktop = ({ detailRoom, arrReview, queryParams, roomId }) => {

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

    const totalDate = (bookingTime[0].endDate - bookingTime[0].startDate) / (1000 * 3600 * 24);

    const totalMoney = formMoney(detailRoom.price * totalDate + 100000);

    const [guest, setGuest] = useState({
        numsAdult: queryParams._adult,
        numsChild: queryParams._child,
        numsToddler: queryParams._toddler,
    });

    const data = {
        _checkIn: bookingTime[0].startDate,
        _checkOut: bookingTime[0].endDate,
        _adult: guest.numsAdult,
        _child: guest.numsChild,
        _toddler: guest.numsToddler,
    };

    const navigate = useNavigate();

    const handleBooking = () => {

        navigate({
            pathname: `/pay/${roomId}`,
            search: queryString.stringify(data),
            key: `pay_${roomId}`
        })
    };

    return (
        <div className='border border-gray-200 rounded-lg p-4 shadow-lg'>
            <h1 className='py-2 font-semibold text-xl'>{formMoney(detailRoom.price)} <span className='text-sm font-normal'>/đêm</span></h1>
            <div className='flex items-center'>
                <AiFillStar className='text-yellow-400 h-4 w-4 pr-1' />
                <p className='text-sm'>{detailRoom.locationId?.valueate}</p>
                <p className='pl-1 underline text-sm cursor-pointer'>.({arrReview?.length} đánh giá)</p>
            </div>
            <div className='border border-gray-400 rounded-xl my-3'>
                <div className='flex items-center border-gray-400 border-b relative'>
                    <div className='w-1/2 px-4 py-2 border-r border-gray-400'>
                        <h1 className='font-semibold text-sm'>NHẬN PHÒNG</h1>
                        <p className='text-black/70 text-sm'>{bookingTime[0].startDate ? moment(bookingTime[0].startDate).format('DD tg MM') : 'Thêm ngày'}</p>
                    </div>
                    <div className='w-1/2 px-4 py-2'>
                        <h1 className='font-semibold text-sm'>TRẢ PHÒNG</h1>
                        <p className='text-black/70 text-sm'>{bookingTime[0].endDate ? moment(bookingTime[0].endDate).format('DD tg MM') : 'Thêm ngày'}</p>
                    </div>
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
                        left={'left-0'}
                        right={'right-0'}
                        bottom={'bottom-0'}
                        top_content={'-top-full'}
                        left_content={'-left-1/2'}
                    />
                </div>
                <div className='py-2 px-4 flex items-center justify-between relative'>
                    <div>
                        <h1 className='font-semibold text-sm'>KHÁCH</h1>
                        <p className='text-black/70 text-sm'>
                            {(guest.numsAdult || guest.numsChild) ? (guest.numsAdult + guest.numsChild) : '1'} khách
                        </p>
                    </div>
                    <AiFillCaretDown className='w-6 h-6 ' />
                    <Dialog
                        content={
                            <Guset
                                guest={guest}
                                setGuest={setGuest}
                            />
                        }
                        handleClick={() => {
                            setGuest({ ...guest, numsAdult: 0 });
                            setGuest({ ...guest, numsChild: 0 });
                            setGuest({ ...guest, numsToddler: 0 });
                        }}
                        top={'top-0'}
                        left={'left-0'}
                        right={'right-0'}
                        bottom={'bottom-0'}
                        top_content={'top-0'}
                        left_content={'-left-1/2'}
                    />
                </div>
            </div>
            <div className='pb-2 relative xl:my-10 md:mb-20'>
                {
                    (bookingTime[0].startDate && bookingTime[0].endDate) ?
                        <div className='pt-6'>
                            <Button
                                title={'Đặt phòng'}
                                onClick={handleBooking}
                            />
                            <p className='text-center text-xs text-gray-400 py-4'>Bạn vẫn chưa bị trừ tiền</p>
                            <div className='py-3 flex justify-between px-2 items-center text-sm'>
                                <p>{formMoney(detailRoom.price)} x {totalDate} đêm</p>
                                <p>{formMoney(detailRoom.price * 1)}</p>
                            </div>
                            <div className='py-3 flex justify-between px-2 items-center text-sm'>
                                <p className='underline'>Phí dịch vụ:</p>
                                <p>100.000đ</p>
                            </div>
                            <div className='border-t border-gray-200 pt-3 flex justify-between items-center font-semibold'>
                                <p>Tổng tiền:</p>
                                <p>{totalMoney}</p>
                            </div>
                        </div>
                        :
                        <Dialog
                            title={
                                <Button title={"Kiểm tra tình trạng còn phòng"} />
                            }
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
                            top={'-top-full'}
                            left={'left-0'}
                            right={'right-0'}
                            top_content={'-top-full'}
                            left_content={'-left-1/2'}
                        />
                }
            </div>
        </div>
    )
}

export default BookingDesktop
