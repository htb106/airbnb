import React from 'react';
import Button from '../../../Component/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addRoomAction } from '../../../Redux/Action/ManageRoomActions';
import { useSnackbar } from 'notistack';

const schema = yup.object({
  name: yup.string().required('* Name is required'),
  guest: yup.number().required('* Guest is required'),
  bedRoom: yup.number().required('* Bedroom is required'),
  bath: yup.number().required('* Bath is required'),
  price: yup.number().required('* Price is required'),
  description: yup.string().required('* Description is required'),
});

const AddRoom = () => {

  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data) => {
    dispatch(addRoomAction(data, enqueueSnackbar('Tạo phòng thành công', { variant: 'success' })));
  };

  return (
    <div className='py-24 pl-60 h-full'>
      <h1 className='font-bold text-2xl pt-5 text-center'>CREATE ROOM</h1>
      <div className='flex justify-center'>
        <form
          className='px-4 w-1/2'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='pt-5'>
            <input
              className={`rounded-lg py-3 pl-6 pr-10 w-full border-gray-200 border text-black/70 focus:outline-neutral-800 ${errors.name && 'border-red-500'}`}
              type="text"
              placeholder='Tên phòng'
              {...register('name')}
            />
            {errors.name?.message && <p className='text-red-500 pt-2 pl-1'>{errors.name.message}</p>}
          </div>
          <div className='pt-5 flex justify-between items-center w-full'>
            <input
              className={`rounded-lg p-3 w-full border-gray-200 border text-black/70 focus:outline-neutral-800 ${errors.bedRoom && 'border-red-500'} mr-3`}
              type="text"
              placeholder='Phòng ngủ'
              {...register('bedRoom')}
            />
            <input
              className={`rounded-lg p-3 w-full border-gray-200 border text-black/70 focus:outline-neutral-800 ${errors.bath && 'border-red-500'} mr-3`}
              type="text"
              placeholder='Phòng tắm'
              {...register('bath')}
            />
            <input
              className={`rounded-lg p-3 w-full border-gray-200 border text-black/70 focus:outline-neutral-800 ${errors.guest && 'border-red-500'} mr-3`}
              type="text"
              placeholder='Số lượng khách'
              {...register('guest')}
            />
            <input
              className={`rounded-lg p-3 w-full border-gray-200 border text-black/70 focus:outline-neutral-800 ${errors.price && 'border-red-500'} mr-3`}
              type="text"
              placeholder='Giá (/đêm)'
              {...register('price')}
            />
            {errors.bedRoom?.message && <p className='text-red-500 pt-2 pl-1'>{errors.bedRoom.message}</p>}
            {errors.bath?.message && <p className='text-red-500 pt-2 pl-1'>{errors.bath.message}</p>}
            {errors.guest?.message && <p className='text-red-500 pt-2 pl-1'>{errors.guest.message}</p>}
            {errors.price?.message && <p className='text-red-500 pt-2 pl-1'>{errors.price.message}</p>}
          </div>
          <div className='pt-5'>
            <textarea
              rows={5}
              className={`rounded-lg py-4 pl-6 pr-10 w-full border-gray-200 border text-black/70 focus:outline-neutral-800 ${errors.description && 'border-red-500'}`}
              type="text"
              placeholder='Mô tả'
              {...register('description')}
            />
            {errors.description?.message && <p className='text-red-500 pt-2 pl-1'>{errors.description.message}</p>}
          </div>
          <div className='pt-5 grid grid-cols-3 gap-5'>
            <div>
              <label className='mr-1' htmlFor="elevator">Thang máy</label>
              <input
                className={`rounded-full border-gray-200 border`}
                type='checkbox'
                id='elevator'
                name='elevator'
                value='elevator'
                {...register('elevator')}
              />
            </div>
            <div>
              <label className='mr-1' htmlFor="elevator">Bồn tắm</label>
              <input
                className={`rounded-full border-gray-200 border`}
                type='checkbox'
                id='hotTub'
                name='hotTub'
                value='hotTub'
                {...register('hotTub')}
              />
            </div>
            <div>
              <label className='mr-1' htmlFor="elevator">Hồ bơi</label>
              <input
                className={`rounded-full border-gray-200 border`}
                type='checkbox'
                id='pool'
                name='pool'
                value='pool'
                {...register('pool')}
              />
            </div>
            <div>
              <label className='mr-1' htmlFor="elevator">Lò sửi trong nhà</label>
              <input
                className={`rounded-full border-gray-200 border`}
                type='checkbox'
                id='indoorFireplace'
                name='indoorFireplace'
                value='indoorFireplace'
                {...register('indoorFireplace')}
              />
            </div>
            <div>
              <label className='mr-1' htmlFor="elevator">Máy sấy</label>
              <input
                className={`rounded-full border-gray-200 border`}
                type='checkbox'
                id='dryer'
                name='dryer'
                value='dryer'
                {...register('dryer')}
              />
            </div>
            <div>
              <label className='mr-1' htmlFor="elevator">Phòng tập thể dục</label>
              <input
                className={`rounded-full border-gray-200 border`}
                type='checkbox'
                id='gym'
                name='gym'
                value='gym'
                {...register('gym')}
              />
            </div>
            <div>
              <label className='mr-1' htmlFor="elevator">Mạng wifi</label>
              <input
                className={`rounded-full border-gray-200 border`}
                type='checkbox'
                id='wifi'
                name='wifi'
                value='wifi'
                {...register('wifi')}
              />
            </div>
            <div>
              <label className='mr-1' htmlFor="elevator">Lò sửi</label>
              <input
                className={`rounded-full border-gray-200 border`}
                type='checkbox'
                id='heating'
                value='heating'
                name='heating'
                {...register('heating')}
              />
            </div>
            <div>
              <label className='mr-1' htmlFor="elevator">Truyền hình cáp</label>
              <input
                className={`rounded-full border-gray-200 border`}
                type='checkbox'
                id='cableTV'
                name='cableTV'
                value='cableTV'
                {...register('cableTV')}
              />
            </div>
          </div>
          <div className='pt-5'>
            <Button title={'Thêm phòng'} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddRoom