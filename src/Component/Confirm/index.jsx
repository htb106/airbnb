import React from 'react';
import { useState } from 'react';
import * as Scroll from 'react-scroll';
import Button from '../Button';
import './style.scss';

const Confirm = ({ title, total, bank, email, bankAccount, onClick }) => {

    const [open, setOpen] = useState(false);

    let scroll = Scroll.animateScroll;

    return (
        <div>
            <div onClick={() => {
                setOpen(true);
                scroll.scrollToTop(150);
            }}
            >
                {title}
            </div>
            <div
                className={`fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-40 ${open ? 'block' : 'hidden'}`}
                onClick={() => { setOpen(false) }}
            >
            </div>
            <div className={`fixed top-1/2 left-1/2 content z-50 bg-white rounded-xl ${open ? 'block' : 'hidden'}`}>
                <div className='p-6 text-lg'>
                    <div className='flex items-center py-2'>
                        <h1 className='w-1/2'>Email:</h1>
                        <h1 className='font-medium w-1/2'>{email}</h1>
                    </div>
                    <div className='flex items-center py-2'>
                        <h1 className='w-1/2'>Ngân hàng:</h1>
                        <h1 className='font-medium w-1/2'>{bank}</h1>
                    </div>
                    <div className='flex items-center py-2'>
                        <h1 className='w-1/2'>Số tài khoản:</h1>
                        <h1 className='font-medium w-1/2'>{bankAccount}</h1>
                    </div>
                    <div className='flex items-center py-2'>
                        <h1 className='w-1/2'>Tổng số tiền:</h1>
                        <h1 className='font-medium w-1/2'>{total}</h1>
                    </div>
                    <div className='pt-4'>
                        <Button
                            title={'Thanh toán'}
                            onClick={onClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Confirm