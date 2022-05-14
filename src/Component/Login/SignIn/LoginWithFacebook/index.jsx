import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { FaFacebook } from 'react-icons/fa';

const LoginWithFacebook = () => {
    const componentClicked = (clicked) => {
        console.log(clicked);
    };
    const responseFacebook = (res) => {
        console.log(res);
    };
    return (
        <FacebookLogin
            appId="1009617396499131"
            onClick={componentClicked}
            callback={responseFacebook}
            render={(renderProps) => (
                <button onClick={renderProps.onClick} className='block w-full p-3 border border-gray-200 hover:border-black/70 rounded-xl mt-3'>
                    <div className='flex justify-between items-center'>
                        <FaFacebook className='text-blue-400 w-6 h-6' />
                        <h1>Tiếp tục với Facebook</h1>
                        <div></div>
                    </div>
                </button>
            )}
        />
    )
}

export default LoginWithFacebook