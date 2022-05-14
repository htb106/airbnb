import moment from 'moment';
import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteUserAction, getUserListAction } from '../../Redux/Action/ManageUserAction';
import { FaUserEdit } from 'react-icons/fa';
import { TiUserDelete } from 'react-icons/ti';
import { useState } from 'react';
import Paginate from '../../Component/Paginate';
import { NavLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const AdminUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getUserListAction());

  }, [dispatch]);

  const { arrUser } = useSelector(state => state.userReducer);

  const [currentItems, setCurrentItems] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = (idUser) => {
    dispatch(
      deleteUserAction(
      idUser,
      () => enqueueSnackbar('Xoá người dùng thành công', { variant: 'error'})
      )
    );
  }

  return (
    <div className='pt-20 pl-60'>
      <h1 className='font-bold text-2xl pl-10 pt-4'>EDIT USER</h1>
      <div className='p-4 w-full'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr className=''>
              <th scope="col" className="px-4 py-4">Tên</th>
              <th scope="col" className="px-4 py-4">Email</th>
              <th scope="col" className="px-4 py-4">Số điện thoại</th>
              <th scope="col" className="px-4 py-4">Ngày sinh</th>
              <th scope="col" className="px-4 py-4">Địa chỉ</th>
              <th scope="col" className="px-4 py-4">Giới tính</th>
              <th scope="col" className="px-4 py-4">Loại người dùng</th>
              <th scope="col" className="px-4 py-4">Công cụ</th>
            </tr>
          </thead>
          <tbody>
            {currentItems && currentItems.map((user) => {
              return (
                <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td scope="row" className="px-4 py-3 text-xs font-medium text-gray-900 dark:text-white whitespace-nowrap">{user.name}</td>
                  <td scope="row" className="px-4 py-3 text-xs font-medium text-gray-900 dark:text-white whitespace-nowrap">{user.email}</td>
                  <td scope="row" className="px-4 py-3 text-xs font-medium text-gray-900 dark:text-white whitespace-nowrap">{user.phone}</td>
                  <td scope="row" className="px-4 py-3 text-xs font-medium text-gray-900 dark:text-white whitespace-nowrap">{moment(user.date).format("DD-MM-yyyy")}</td>
                  <td scope="row" className="px-4 py-3 text-xs font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {(user.address && user.address.length > 30) ? (user.address.substr(0, 30) + '...') : user.address}
                  </td>
                  <td scope="row" className="px-4 py-3 text-xs font-medium text-gray-900 dark:text-white whitespace-nowrap">{user.gender ? 'Nam' : 'Nữ'}</td>
                  <td scope="row" className="px-4 py-3 text-xs font-medium text-gray-900 dark:text-white whitespace-nowrap">{user.type}</td>
                  <td scope="row" className="px-4 py-3 text-xs font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    <div className='flex items-center'>
                      <NavLink to={`/admin/user/edit/${user._id}`}>
                      <FaUserEdit 
                          className='w-5 h-5 cursor-pointer mx-2 text-green-500' 
                      />
                      </NavLink>
                      <TiUserDelete 
                        className='w-5 h-5 cursor-pointer mx-2 text-red-500' 
                        onClick={async () => { 
                          handleDelete(user._id) 
                          // const res = await manageUserApi.deleteUser(user._id);
                          // console.log(res);
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
                itemsPerPage={20}
                setCurrentItems={setCurrentItems}
                arrContent={arrUser}
              />
            </div>
      </div>
    </div>
  )
}

export default AdminUser