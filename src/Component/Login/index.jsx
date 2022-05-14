import React, { Fragment, useState } from 'react';
import './style.scss';
import { TiDelete } from 'react-icons/ti';
import * as Scroll from 'react-scroll'
import SignUp from './SignUp';
import SignIn from './SignIn';
import { useMediaQuery } from 'react-responsive';

const Login = ({ title, login }) => {

    const [open, setOpen] = useState(false);

    let scroll = Scroll.animateScroll;

    const [signIn, setSignIn] = useState(login);

    const isDesktop = useMediaQuery({ minWidth: 768 });

    return (
        <Fragment>
            <div
                onClick={() => {
                    scroll.scrollToTop(150);
                    setOpen(true);
                    if (login) { setSignIn(true) } else { setSignIn(false) };
                }}

            >
                {title}
            </div>
            <div
                className={`z-40 fixed top-0 left-0 right-0 bottom-0 bg-black/50 ${open ? 'block' : 'hidden'}`}
                onClick={() => { setOpen(false) }}
            >
            </div>
            <div className={`fixed ${open ? 'block' : 'hidden'} top-1/2 left-1/2 ${isDesktop ? 'login_content' : 'login_content_mobile'} sm:login_content_mobile z-50 bg-white rounded-xl`}>
                <div className='flex p-6 items-center justify-between border-b border-gray-200'>
                    <div
                        className='hover:bg-gray-100 rounded-full p-1 text-red-500 cursor-pointer'
                        onClick={() => { setOpen(false) }}
                    >
                        <TiDelete className='w-8 h-8' />
                    </div>
                    <h1 className='font-bold text-center text-lg'>Chào mừng bạn đến với Airbnb</h1>
                    <div></div>
                </div>
                {
                    signIn ?
                        <SignIn
                            setSignIn={setSignIn}
                            setOpen={setOpen}
                        /> :
                        <SignUp
                            setSignIn={setSignIn}
                            setOpen={setOpen}
                        />
                }
            </div>
        </Fragment>
    )
}

export default Login