import React from 'react';
import Button from '../../../Component/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addLocationAction } from '../../../Redux/Action/ManageLocationAction';
import { useSnackbar } from 'notistack';

const schema = yup.object({
  name: yup.string().required('* Name is required'),
  province: yup.string().required('* Province is required'),
  country: yup.string().required('* Country is required'),
  valueate: yup.number().required('* Valuate is required').max(1, '* Valuate have value from 1 to 10'),
});

const AddLocation = () => {

  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
    resolver: yupResolver(schema),
  });

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data) => {

    dispatch(
      addLocationAction(
        data,
        enqueueSnackbar('Tạo địa điểm thành công', { variant: 'success' })
      )
    );
  };

  return (
    <div className='py-24 pl-60 h-full'>
      <h1 className='font-bold text-2xl pt-5 text-center'>CREATE LOCATION</h1>
      <div className='flex justify-center'>
        <form
          className='px-4 w-1/2'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='pt-5'>
            <input
              className={`rounded-lg py-4 pl-6 pr-10 w-full border-gray-200 border text-black/70 focus:outline-neutral-800 ${errors.name && 'border-red-500'}`}
              type="text"
              placeholder='Tên địa điểm'
              {...register('name')}
            />
            {errors.name?.message && <p className='text-red-500 pt-2 pl-1'>{errors.name.message}</p>}
          </div>
          <div className='pt-5'>
            <input
              className={`rounded-lg py-4 pl-6 pr-10 w-full border-gray-200 border text-black/70 focus:outline-neutral-800 ${errors.province && 'border-red-500'}`}
              type="text"
              placeholder='Tỉnh'
              {...register('province')}
            />
            {errors.province?.message && <p className='text-red-500 pt-2 pl-1'>{errors.province.message}</p>}
          </div>
          <div className='pt-5'>
            <input
              className={`rounded-lg py-4 pl-6 pr-10 w-full border-gray-200 border text-black/70 focus:outline-neutral-800 ${errors.country && 'border-red-500'}`}
              type="text"
              placeholder='Quốc gia'
              {...register('country')}
            />
            {errors.country?.message && <p className='text-red-500 pt-2 pl-1'>{errors.country.message}</p>}
          </div>
          <div className='pt-5'>
            <input
              className={`rounded-lg py-4 pl-6 pr-10 w-full border-gray-200 border text-black/70 focus:outline-neutral-800 ${errors.phone && 'border-red-500'}`}
              type="text"
              placeholder='Đánh giá'
              {...register('valueate')}
            />
            {errors.valueate?.message && <p className='text-red-500 pt-2 pl-1'>{errors.valueate.message}</p>}
          </div>
          <div className='pt-5'>
            <Button title={'Thêm địa điểm'} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddLocation