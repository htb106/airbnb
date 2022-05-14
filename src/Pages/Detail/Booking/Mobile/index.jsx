import moment from 'moment';
import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { AiFillCaretDown } from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../Component/Button';
import Dialog from '../../../../Component/Dialogs';
import Guest from '../../../../Component/Guest';
import { formMoney } from '../../../../Untilities/formMoney';
import queryString from "query-string";

const BookingMobile = ({ detailRoom, queryParams, roomId }) => {

    const [open, setOpen] = useState(false);

    const [bookingTime, setBookingTime] = useState([
        {
            startDate: queryParams._checkIn ? new Date(queryParams._checkIn) : null,
            endDate: queryParams._checkOut ? new Date(queryParams._checkOut) : null,
            key: 'selection'
        }
    ]);

    const selectionRange = {
        startDate: bookingTime[0].startDate ? bookingTime[0].startDate : new Date,
        endDate: bookingTime[0].endDate ? bookingTime[0].endDate : new Date,
        key: 'selection',
    };

    let totalDate = (bookingTime[0].endDate - bookingTime[0].startDate) / (1000 * 3600 * 24);

    totalDate = totalDate ? totalDate : 1

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
        <div className='bg-white border-t border-gray-200'>
            <div className='flex justify-between items-center flex-auto p-5'>
                <div>
                    <h1 className='font-bold'>{formMoney(detailRoom.price)} /đêm</h1>
                    {
                        (bookingTime[0].startDate && bookingTime[0].endDate) &&
                        <h1 className='text-sm font-semibold underline'>Ngày {moment(bookingTime[0].startDate).format('DD tg MM')} - Ngày {moment(bookingTime[0].endDate).format('DD tg MM')}</h1>
                    }
                </div>
                {(bookingTime[0].startDate && bookingTime[0].endDate) ?
                    <div className='w-1/3'>
                        <Button
                            title={'Đặt phòng'}
                            onClick={() => { setOpen(true) }}
                        />
                    </div> :
                    <div className='w-3/4 relative py-5'>
                        <Dialog
                            title={
                                <Button title={"Kiểm tra tình trạng còn phòng !!!"} />
                            }
                            content={
                                <div className='fixed bottom-0 right-0 left-0'>
                                    <DateRangePicker
                                        onChange={item => setBookingTime([item.selection])}
                                        showSelectionPreview={true}
                                        moveRangeOnFirstSelection={false}
                                        months={2}
                                        ranges={[selectionRange]}
                                        direction="horizontal"
                                    />
                                </div>
                            }
                            top={'top-0'}
                            bottom={'bottom-0'}
                            left={'left-1/4'}
                            bottom_content={'bottom-0'}
                            bottom_btn_close={'bottom-0'}
                            right_btn_close={'right-8'}
                        />
                    </div>
                }
                <div></div>
            </div>
            {open &&
                <div className='fixed top-0 left-0 right-0 bottom-0 bg-white'>
                    <div className='relative h-full'>
                        <div>
                            <TiDelete
                                className='w-8 h-8 text-gray-500 ml-4 mt-4'
                                onClick={() => setOpen(false)}
                            />
                        </div>
                        <div className='p-4'>
                            <div className='pb-5 border-gray-200 border-b'>
                                <h1 className='pb-2 text-xl font-medium'>Chuyến đi của bạn</h1>
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
                                            bottom={'bottom-0'}
                                            left={'left-0'}
                                            right={'right-0'}
                                            top_content={'top-0'}
                                            left_content={'left-0'}
                                            right_content={'right-0'}
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
                                                <Guest
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
                                            top_content={'top-20'}
                                            right_content={'right-0'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
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
                        </div>
                        <div className='my-16'>
                        </div>
                        <div className='absolute bottom-5 mx-8 py-5 border-t border-gray-200 right-0 left-0'>
                            <Button
                                title={'Đặt phòng'}
                                onClick={handleBooking}
                            />
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default BookingMobile