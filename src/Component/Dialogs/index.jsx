import React from 'react';
import { useState } from 'react';

const Dialog = ({
    content,
    title,
    search,
    top,
    right,
    left,
    bottom,
    top_content,
    left_content,
    right_content,
    bottom_btn_close,
    right_btn_close,
    left_btn_close,
    w,
}) => {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`absolute ${right ? right : ''} ${left ? left : ''} ${top ? top : ''} ${bottom ? bottom : ''}`}
        >
            <a

                className='h-full py-4 flex justify-center items-center rounded-l-full rounded-r-full cursor-pointer'
                onClick={() => { setOpen(true) }}
            >
                {title}
                {search}
            </a>
            {open &&
                <div
                    className={`${top_content ? top_content : ''} ${left_content ? left_content : ''} ${right_content ? right_content : ''} absolute px-5 pb-10 pt-5 md:px-0 md:pb-2 md:pt-2 bg-white border-gray-200 border rounded-lg z-10`}
                    style={{ width: w }}
                >
                    {content}
                    <div
                        className={`absolute ${bottom_btn_close ? bottom_btn_close : 'bottom-1'} ${left_btn_close ? left_btn_close : ''} ${right_btn_close ? right_btn_close : 'right-1'}`}
                        onClick={() => { setOpen(false) }}
                    >
                        <h1 className='text-white bg-black rounded-lg px-4 py-2 text-sm cursor-pointer'>Đóng</h1>
                    </div>
                </div>}

        </div>
    )
}

export default Dialog