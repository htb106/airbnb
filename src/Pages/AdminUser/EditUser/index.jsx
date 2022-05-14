import React from 'react';
import Button from '../../../Component/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { manageAuthApi } from '../../../Api/manageAuthApi';
import { useState } from 'react';
import moment from 'moment';
import { editUserAction } from '../../../Redux/Action/ManageUserAction';
import { useSnackbar } from 'notistack';

const schema = yup.object({
  name: yup.string().required('* Name is required'),
  email: yup.string().required('* Email is required').email('* Please fill in the correct email syntax'),
  phone: yup.number().required('* Phone is required'),
  date: yup.string().required('* Date is required'),
  gender: yup.boolean().required('* Gender is required'),
  address: yup.string().required('* Address is required'),
  type: yup.string().required('* Type is required'),
});

const EditUser = () => {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const [user, setUser] = useState({})
  const params = useParams();

  useEffect(() => {

    (async () => {
      try {
        const res = await manageAuthApi.getInfoUser(params.idUser);
        setUser(res);
      }
      catch (err) {
        console.log(err)
      }
    })()
  }, [params.idUser]);

  useEffect(() => {

    setValue('name', user?.name);
    setValue('email', user?.email);
    setValue('phone', user?.phone);
    setValue('gender', user?.gender);
    setValue('address', user?.address);
    setValue('type', user?.type);
    setValue('date', moment(user?.date).format('DD-MM-yyyy'));

  }, [user, setValue]);

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data) => {

    editUserAction(
      data,
      () => enqueueSnackbar('Sửa người dùng thành công', { variant: 'error' })
    );

  };

  return (
    <div className=' py-20 pl-60 bg-gray-200 h-full'>
      <h1 className='font-bold text-2xl pt-5 text-center'>EDIT USER</h1>
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
              <label htmlFor="male" className='pl-5 pr-2 text-black/70'>Nam</label>
              <input
                name='gender'
                id='male'
                type="radio"
                className='w-4 h-4'
                value={true}
                checked={user?.gender ? true : false}
                {...register('gender')}
              />
              <label htmlFor="female" className='pl-5 pr-2 text-black/70'>Nữ</label>
              <input
                name='gender'
                id='female'
                type="radio"
                className='w-4 h-4'
                value={false}
                checked={user?.gender ? false : true}
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
              <option type='ADMIN'>Admin</option>
              <option type='CLIENT'>Client</option>
            </select>
            {errors.type?.message && <p className='text-red-500 pt-2 pl-1'>{errors.type.message}</p>}
          </div>
          <div className='pt-5'>
            <Button title={'Chỉnh sửa người dùng'} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUser