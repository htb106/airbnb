import React, { useEffect } from 'react';
import Button from '../../../Component/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { editLocationAction } from '../../../Redux/Action/ManageLocationAction';
import { useParams } from 'react-router-dom';
import { manageLocationsApi } from '../../../Api/manageLocationApi';
import { useState } from 'react';
import { useSnackbar } from 'notistack';

const schema = yup.object({
  name: yup.string().required('* Name is required'),
  province: yup.string().required('* Province is required'),
  country: yup.string().required('* Country is required'),
  valueate: yup.number().required('* Valuate is required').max(10, '* Valuate have value from 1 to 10'),
})

const EditLocation = () => {

  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const { enqueueSnackbar } = useSnackbar();

  const params = useParams();

  const [location, setLocation] = useState({});

  useEffect(() => {
    (async () => {
      try{
        const res = await manageLocationsApi.getAll();

        const locationClone = res.find((item) => item._id === params.idLocation);

        setLocation(locationClone);
      }
      catch(err){
        console.log(err);
      }
    })()

  }, [params.idLocation]);

  useEffect(() => {

      setValue('name', location?.name);
      setValue('province', location?.province);
      setValue('country', location?.country);
      setValue('valueate', location?.valueate);

  }, [location, setLocation]);

  const onSubmit = (data) => {
    console.log(data)
    dispatch(
      editLocationAction(
      params.idLocation,
      data, 
      () => enqueueSnackbar('Sửa địa điểm thành công', { variant: 'success' })
    ));
  }; 

  return (
    <div className='py-24 pl-60 h-full'>
    <h1 className='font-bold text-2xl pt-5 text-center'>EDIT LOCATION</h1>
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
          {errors.provice?.message && <p className='text-red-500 pt-2 pl-1'>{errors.province.message}</p>}
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
          <Button title={'Chỉnh sửa thông tin địa điểm'} />
        </div>
      </form>
    </div>
  </div>
  )
}

export default EditLocation