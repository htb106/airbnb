import React from 'react';
import Button from '../../../Component/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addUserAction } from '../../../Redux/Action/ManageUserAction';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

const schema = yup.object({
  name: yup.string().required('* Name is required'),
  email: yup.string().required('* Email is required').email('* Please fill in the correct email syntax'),
  password: yup.string().required('* Password is required').min(6, '* Password must have at least 6 characters'),
  phone: yup.number().required('* Phone is required'),
  date: yup.string().required('* Date is required'),
  gender: yup.boolean().required('* Gender is required'),
  address: yup.string().required('* Address is required'),
  type: yup.string().required('* Type is required'),
});

const AddUser = () => {

  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data) => {

    dispatch(
      addUserAction(
        data,
        () => enqueueSnackbar('Thêm người dùng thành công', { variant: 'success' })
      ))

  };

  return (
    <div className=' py-24 pl-60 bg-gray-200 h-full'>
      <h1 className='font-bold text-2xl pt-5 text-center'>ADD USER</h1>
      <div className='flex justify-center'>
        <form
          className='px-4 w-2/3'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='pt-5'>
            <input
              className={`rounded-lg py-3 pl-6 pr-10 w-full border-gray-200 border text-black/70 focus:outline-neutral-800 ${errors.email && 'border-red-500'}`}
              type="text"
              placeholder='Email'
              {...register('email')}
            />
            {errors.email?.message && <p className='text-red-500 pt-2 pl-1'>{errors.email.message}</p>}
          </div>
          <div className='pt-5'>
            <input
              className={`rounded-lg py-3 pl-6 pr-10 w-full border-gray-200 border text-black/70 focus:outline-neutral-800 ${errors.name && 'border-red-500'}`}
              type="text"
              placeholder='Tên'
              {...register('name')}
            />
            {errors.name?.message && <p className='text-red-500 pt-2 pl-1'>{errors.name.message}</p>}
          </div>
          <div className='pt-5'>
            <input
              className={`rounded-lg py-3 pl-6 pr-10 w-full border-gray-200 border text-black/70 focus:outline-neutral-800 ${errors.password && 'border-red-500'}`}
              type="password"
              placeholder='Password'
              {...register('password')}
            />
            {errors.password?.message && <p className='text-red-500 pt-2 pl-1'>{errors.password.message}</p>}
          </div>
          <div className='pt-5'>
            <input
              className={`rounded-lg py-3 pl-6 pr-10 w-full border-gray-200 border text-black/70 focus:outline-neutral-800 ${errors.phone && 'border-red-500'}`}
              type="text"
              placeholder='Số điện thoại'
              {...register('phone')}
            />
            {errors.phone?.message && <p className='text-red-500 pt-2 pl-1'>{errors.phone.message}</p>}
          </div>
          <div className='pt-5'>
            <input
              className={`rounded-lg py-3 pl-6 pr-10 w-full border-gray-200 border text-black/70 focus:outline-neutral-800 ${errors.date && 'border-red-500'}`}
              type="text"
              placeholder='Ngày sinh'
              {...register('date')}
            />
            {errors.date?.message && <p className='text-red-500 pt-2 pl-1'>{errors.date.message}</p>}
          </div>
          <div className='pt-5'>
            <div className=' flex items-center py-3'>
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
          <div className='pt-5'>
            <input
              className={`rounded-lg py-3 pl-6 pr-10 w-full border-gray-200 border text-black/70 focus:outline-neutral-800 ${errors.address && 'border-red-500'}`}
              type="text"
              placeholder='Địa chỉ'
              {...register('address')}
            />
            {errors.address?.message && <p className='text-red-500 pt-2 pl-1'>{errors.address.message}</p>}
          </div>
          <div className='pt-8 pb-5'>
            <label htmlFor="type" className='pr-4'>Chọn loại người dùng:</label>
            <select
              name='type'
              id='type'
              className={`rounded-lg py-2 px-6 focus:outline-black/60 ${errors.type && 'border-red-500'}`}
              {...register('type')}
            >
              <option value='ADMIN'>Admin</option>
              <option value='CLIENT'>Client</option>
            </select>
            {errors.type?.message && <p className='text-red-500 pt-2 pl-1'>{errors.type.message}</p>}
          </div>
          <div className='pt-5'>
            <Button title={'Thêm người dùng'} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUser