import React, { useState } from 'react'
import { useEffect } from 'react';
import { MdEditLocationAlt } from 'react-icons/md';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Paginate from '../../Component/Paginate';
import { deleteLocationAction, getLocationAction } from '../../Redux/Action/ManageLocationAction';
import { useSnackbar } from 'notistack';

const AdminLocation = () => {
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getLocationAction());

  }, [dispatch]);

  const { arrLocation } = useSelector(state => state.locationReducer);

  const [currentItems, setCurrentItems] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = (idLocation) => {
    dispatch(
      deleteLocationAction(
        idLocation,
        () => enqueueSnackbar('Xoá địa điểm thành công', { variant: 'success' })
      ));
  };

  const navigate = useNavigate();

  return (
    <div className='pt-20 pl-60'>
      <h1 className='font-bold text-2xl pl-8 pt-4'>LOCATIONS</h1>
      <div className='p-4 w-full'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr className=''>
              <th scope="col" className="px-4 py-4 text-base">Hình ảnh</th>
              <th scope="col" className="px-4 py-4 text-base">Tên</th>
              <th scope="col" className="px-4 py-4 text-base">Quốc gia</th>
              <th scope="col" className="px-4 py-4 text-base">Đánh giá</th>
              <th scope="col" className="px-4 py-4 text-base">Công cụ</th>
            </tr>
          </thead>
          <tbody>
            {currentItems && currentItems.map((location) => {
              return (
                <tr
                  key={location._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  <td
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    onClick={() => {
                      navigate({
                        pathname: `/admin/room/${location._id}`
                      })
                    }}
                  >
                    <img src={location.image} alt="img" className='h-32 w-20' />
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    onClick={() => {
                      navigate({
                        pathname: `/admin/room/${location._id}`
                      })
                    }}
                  >
                    {location.name}
                  </td>
                  <td scope="row" className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">{location.province + ', ' + location.country}</td>
                  <td scope="row" className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">{location.valueate}</td>
                  <td scope="row" className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    <div className='flex items-center'>
                      <NavLink to={`/admin/location/edit/${location._id}`}>
                        <MdEditLocationAlt
                          className='w-6 h-6 z-10 cursor-pointer mx-2 text-green-500'
                        />
                      </NavLink>
                      <RiDeleteBin5Fill
                        className='w-6 h-6 z-10 cursor-pointer mx-2 text-red-500'
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(location._id)
                        }}
                      />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className='pt-5 flex justify-center w-full'>
          <Paginate
            itemsPerPage={10}
            setCurrentItems={setCurrentItems}
            arrContent={arrLocation}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminLocation