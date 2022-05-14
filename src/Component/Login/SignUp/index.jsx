import React from 'react';
import Button from '../../Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerAction } from '../../../Redux/Action/ManageAuthAction';
import { useSnackbar } from 'notistack';

const schema = yup.object({
    name: yup.string().required('* Name is required'),
    email: yup.string().required('* Email is required').email('* Please fill in the correct email syntax'),
    password: yup.string().required('* Password is required').min(6, '* Password must have at least 6 characters'),
    phone: yup.number().required('* Phone is required'),
    date: yup.string().required('* Date is required'),
    gender: yup.string().required('* Gender is required'),
    address: yup.string().required('* Address is required'),
});

const SigUp = ({ setSignIn, setOpen }) => {

    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const { enqueueSnackbar } = useSnackbar()

    const onSubmit = (data) => {

        dispatch(registerAction(
            data,
            () => { setOpen(false) },
            () => enqueueSnackbar('Đăng nhập thành công', { variant: "success" }),
            () => enqueueSnackbar('Đăng nhập thất bại', { variant: 'error' }) ,
        ));
    };

    return (
        <div className='p-6 pt-1'>
            <div>
                <h1 className='text-2xl font-bold py-2'>Đăng kí</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='pt-3'>
                        <input
                            className={`rounded-lg py-4 pl-8 pr-10 w-full border-gray-200 border text-black/70 focus:outline-neutral-800 ${errors.name && 'border-red-500'}`}
                            type="text"
                            placeholder='Tên'
                            {...register('name')}
                        />
                        {errors.name?.message && <p className='text-red-500 pt-2 pl-1'>{errors.name.message}</p>}
                    </div>
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
                    <div className='pt-3'>
                        <input
                            className={`rounded-lg py-4 pl-8 pr-10 w-full border-gray-200 border text-black/70 focus:outline-neutral-800 ${errors.phone && 'border-red-500'}`}
                            type="text"
                            placeholder='Số điện thoại'
                            {...register('phone')}
                        />
                        {errors.phone?.message && <p className='text-red-500 pt-2 pl-1'>{errors.phone.message}</p>}
                    </div>
                    <div className='pt-3'>
                        <input
                            className={`rounded-lg py-4 pl-8 pr-10 w-full border-gray-200 border text-black/70 focus:outline-neutral-800 ${errors.date && 'border-red-500'}`}
                            type="text"
                            placeholder='Ngày sinh'
                            {...register('date')}
                        />
                        {errors.date?.message && <p className='text-red-500 pt-2 pl-1'>{errors.date.message}</p>}
                    </div>
                    <div className='pt-3'>
                        <div className=' flex items-center py-4'>
                            <h1 className='text-black/70'>Giới tính:</h1>
                            <label htmlFor="name" className='pl-5 pr-2 text-black/70'>Nam</label>
                            <input
                                name='gender'
                                id='name'
                                type="radio"
                                className='w-4 h-4'
                                value={true}
                                {...register('gender')}
                            />
                            <label htmlFor="nu" className='pl-5 pr-2 text-black/70'>Nữ</label>
                            <input
                                name='gender'
                                id='nu'
                                type="radio"
                                className='w-4 h-4'
                                value={false}
                                {...register('gender')}
                            />
                        </div>
                        {errors.gender?.message && <p className='text-red-500 pt-2 pl-1'>{errors.gender.message}</p>}
                    </div>
                    <div className='pt-3'>
                        <input
                            className={`rounded-lg py-4 pl-8 pr-10 w-full border-gray-200 border text-black/70 focus:outline-neutral-800 ${errors.address && 'border-red-500'}`}
                            type="text"
                            placeholder='Địa chỉ'
                            {...register('address')}
                        />
                        {errors.address?.message && <p className='text-red-500 pt-2 pl-1'>{errors.address.message}</p>}
                    </div>
                    <div className='pt-5'>
                        <Button title={'Tiếp tục'} />
                    </div>
                </form>
            </div>
            <div className='flex justify-center items-center'>
                <h1 className='py-4'>
                    Đã có tài khoản?
                </h1>
                <a
                    className='text-blue-500 ml-2 cursor-pointer'
                    onClick={() => { setSignIn(true) }}
                >
                    Đăng nhập
                </a>
            </div>
        </div>
    )
}

export default SigUp