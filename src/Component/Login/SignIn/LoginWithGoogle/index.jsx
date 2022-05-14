import React from 'react';
import GoogleLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { FcGoogle } from 'react-icons/fc';

const LoginWithGoogle = () => {
    const responseGoogle = (clicked) => {
        console.log(clicked);
    };
    const errorGoogle = (error) => {
        console.log(error);
    };
    return (
        <GoogleLogin
            clientId='658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'
            icon={false}
            onSuccess={responseGoogle}
            onFailure={errorGoogle}
            cookiePolicy={"single_host_origin"}
            render={(renderProps) => (
                <button onClick={renderProps.onClick} className='block w-full p-3 border border-gray-200 hover:border-black/70 rounded-xl mt-3'>
                    <div className='flex justify-between items-center'>
                        <FcGoogle className='text-blue-400 w-6 h-6' />
                        <h1>Tiếp tục với Google</h1>
                        <div></div>
                    </div>
                </button>
            )}
        />
    )
}

export default LoginWithGoogle