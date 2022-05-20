import React, { useState } from 'react'
import { useEffect } from 'react';
import { TiEdit } from 'react-icons/ti';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Paginate from '../../Component/Paginate';
import { deleteRoomAction, getRoomListAction } from '../../Redux/Action/ManageRoomActions';
import { useSnackbar } from 'notistack';

const AdminRoom = () => {
  const dispatch = useDispatch();

  const params = useParams()

  useEffect(() => {

    dispatch(getRoomListAction(params.idLocation));

  }, [dispatch]);

  const { arrRoom } = useSelector(state => state.roomReducer);

  const [currentItems, setCurrentItems] = useState(null);

  const { enqueeuSnackbar } = useSnackbar();

  const handleDelete = (idRoom) => {

    dispatch(
      deleteRoomAction(
        idRoom, 
        () => {enqueeuSnackbar('Xoá phòng thành công', { variant: 'success' })},
        params.idLocation
      ));
  };

  const navigate = useNavigate();

  return (
    <div className='pt-20 pl-60'>
      <h1 className='font-bold text-2xl pl-10 pt-4'>{arrRoom[0]?.locationId.name} - Rooms</h1>
      <div className='p-4 w-full'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr className=''>
              <th scope="col" className="px-4 py-4 text-base">Hình ảnh</th>
              <th scope="col" className="px-4 py-4 text-base">Tên</th>
              <th scope="col" className="px-4 py-4 text-base">Giá(/đêm)</th>
              <th scope="col" className="px-4 py-4 text-base">Mô tả</th>
              <th scope="col" className="px-4 py-4 text-base">Lựa chọn</th>
            </tr>
          </thead>
          <tbody>
            {currentItems && currentItems.map((room) => {
              return (
                <tr
                  key={room._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  <td
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    onClick={() => {
                      navigate({
                        pathname: `/admin/rating/${room._id}`
                      })
                    }}
                  >
                    <img src={room.image} alt="img" className='w-full block' />
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    onClick={() => {
                      navigate({
                        pathname: `/admin/rating/${room._id}`
                      })
                    }}
                  >
                    {room.name}
                  </td>
                  <td scope="row" className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">{room.price + ' đ/đêm'}</td>
                  <td scope="row" className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {room.description.length > 50 ? (room.description.substr(0, 50) + '...') : room.description}
                  </td>
                  <td scope="row" className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    <div className='flex items-center'>
                      <NavLink
                        to={`/admin/room/edit/${room._id}`}
                      >
                        <TiEdit
                          className='w-6 h-6 z-10 cursor-pointer mx-2 text-green-500'
                        />
                      </NavLink>
                      <RiDeleteBin5Fill
                        className='w-6 h-6 z-20 cursor-pointer mx-2 text-red-500'
                        onClick={() => handleDelete(room._id)}
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
            arrContent={arrRoom}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminRoom