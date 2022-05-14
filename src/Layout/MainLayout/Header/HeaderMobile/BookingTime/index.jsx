import React from 'react';
import { DateRangePicker } from 'react-date-range';
import { HiOutlineChevronLeft } from 'react-icons/hi';

const BookingTime = ({ setIsDate, selectionRange, setBookingTime, setIsLocations, setIsGuest }) => {

  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 bg-white z-50'>
      <div className='pt-4'>
      </div>
      <div className='py-4'>
        <div className='flex items-center pl-6 pt-6 justify-between'>
          <HiOutlineChevronLeft
            className='h-6 w-6 text-blue-500 font-bold'
            onClick={() => {
              setIsDate(false);
              setIsLocations(true);
            }}
          />
          <h1 className='text-center font-medium'>Khi nào bạn có mặt tại đó</h1>
          <div></div>
        </div>
      </div>
      <div className='relative'>
        <div className='flex justify-center w-full'>
          <DateRangePicker
            onChange={item => setBookingTime([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={[selectionRange]}
            direction="horizontal"
          />
        </div>
        <div className='absolute right-5 bottom-2'>
          <button
            className='bg-gray-500 rounded-lg px-6 py-2 text-white text-sm'
            onClick={() => {
              setIsDate(false);
              setIsGuest(true);
            }}
          >
            Tiếp tục
          </button>
        </div>
      </div>


    </div>
  )
}

export default BookingTime