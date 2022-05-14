import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Button from '../../Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../../Redux/Action/ManageAuthAction';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import LoginWithFacebook from './LoginWithFacebook';
import LoginWithGoogle from './LoginWithGoogle';

const schema = yup.object({
    email: yup.string().required("Email is required").email("Please fill in the correct email syntax"),
    password: yup.string().required("Password is required"),
})

const SignIn = ({ setSignIn, setOpen }) => {

    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    });

    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = (data) => {
        dispatch(
            loginAction(
                data,
                () => { setOpen(false) },
                () => enqueueSnackbar('Đăng nhập thành công', { variant: "success" }),
                () => enqueueSnackbar('Đăng nhập thất bại', { variant: 'error' }) ,
            ));
    };


    const defaultAccount = {
        email: 'ad@gmail.com',
        password: '123456',
    }

    useEffect(() => {

        setValue('email', defaultAccount.email);
        setValue('password', defaultAccount.password);

    }, [setValue, defaultAccount]);

    return (
        <div className='p-6 pt-1'>
            <div>
                <h1 className='text-2xl font-bold py-2'>Đăng nhập</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='pt-3'>
                        <input
                            className={`rounded-lg py-4 pl-8 pr-10 w-full border-gray-200 border text-black/70 focus:outline-neutral-800 ${errors.email && 'border-red-500'}`}
                            type="text"
                            placeholder='Email'
                            {...register('email')}
                        />
                        {errors.email?.message && <p className='text-red-500 pt-2 pl-1'>{errors.email.message}</p>}
                    </div>
                    <div className='pt-3'>
                        <input
                            className={`rounded-lg py-4 pl-8 pr-10 w-full border-gray-200 border text-black/70 focus:outline-neutral-800 ${errors.password && 'border-red-500'}`}
                            type="password"
                            placeholder='Mật khẩu'
                            {...register('password')}
                        />
                        {errors.password?.message && <p className='text-red-500 pt-2 pl-1'>{errors.password.message}</p>}
                    </div>
                    <div className='py-5'>
                        <Button title={'Tiếp tục'} />
                    </div>
                </form>
                <div className='flex items-center line'>
                    <p>hoặc</p>
                </div>

            </div>
            <div className='pt-6'>
                <LoginWithFacebook />
                <LoginWithGoogle />
                <div className='flex justify-center items-center'>
                    <h1 className='py-4'>
                        Chưa có tài khoản?
                    </h1>
                    <a
                        className='text-blue-500 ml-2 cursor-pointer'
                        onClick={() => { setSignIn(false) }}
                    >
                        Đăng kí
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SignIn