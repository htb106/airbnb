import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import HeaderAd from './HeaderAd';
import SidebarAd from './SidebarAd';

const AdminLayout = () => {

  const { user } = useSelector(state => state.authReducer);

  if(user?.type === 'ADMIN') return (
    <div>
        <HeaderAd/>
        <SidebarAd/>
        <Outlet/>
    </div>
  )
  return (
    <div>
      <h1>Bạn không có quyền truy cập</h1>
    </div>
  )
}

export default AdminLayout