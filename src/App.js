import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import Home from './Pages/Home';
import Detail from './Pages/Detail';
import ListRoom from './Pages/ListRoom';
import 'mapbox-gl/dist/mapbox-gl.css';
import Pay from './Pages/Pay';
import Profile from './Pages/Profile';
import AdminLayout from './Layout/AdminLayout';
import AdminUser from './Pages/AdminUser';
import AddUser from './Pages/AdminUser/AddUser';
import EditUser from './Pages/AdminUser/EditUser';
import { useDispatch } from 'react-redux';
import { USER_ID } from './Untilities/config';
import { useEffect } from 'react';
import { getInfoUserAction } from './Redux/Action/ManageAuthAction';
import AddLocation from './Pages/AdminLocation/AddLocation';
import EditLocation from './Pages/AdminLocation/EditLocation';
import AdminLocation from './Pages/AdminLocation';
import AdminRoom from './Pages/AdminRoom';
import AddRoom from './Pages/AdminRoom/AddRoom';
import EditRoom from './Pages/AdminRoom/EditRoom';
import AdminRating from './Pages/AdminRating';

function App() {

  const dispatch = useDispatch();

  const idUser = localStorage.getItem(USER_ID);

  useEffect(() => {
    if (idUser) {
      dispatch(getInfoUserAction(idUser));
    }
  }, [idUser, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/detail/" element={<MainLayout />}>
          <Route index path=":roomId" element={<Detail />} />
        </Route>
        <Route path="/list/" element={<MainLayout />}>
          <Route index path=":locationId" element={<ListRoom />} />
        </Route>
        <Route path="/pay/" element={<MainLayout />}>
          <Route index path=":roomId" element={<Pay />} />
        </Route>
        <Route path="/profile/" element={<MainLayout />}>
          <Route index path=":userId" element={<Profile />} />
        </Route>
        <Route path="/admin/" element={<AdminLayout />}>
          <Route index path="user" element={<AdminUser />} />
        </Route>
        <Route path="/admin/user/add" element={<AdminLayout />}>
          <Route index element={<AddUser />} />
        </Route>
        <Route path="/admin/user/edit/" element={<AdminLayout />}>
          <Route index path=":idUser" element={<EditUser />} />
        </Route>
        <Route path="/admin/" element={<AdminLayout />}>
          <Route index path="location" element={<AdminLocation />} />
        </Route>
        <Route path="/admin/location/add" element={<AdminLayout />}>
          <Route index element={<AddLocation />} />
        </Route>
        <Route path="/admin/location/edit/" element={<AdminLayout />}>
          <Route index path=":idLocation" element={<EditLocation />} />
        </Route>
        <Route path="/admin/room/" element={<AdminLayout />}>
          <Route index path=":idLocation" element={<AdminRoom />} />
        </Route>
        <Route path="/admin/room/add" element={<AdminLayout />}>
          <Route index element={<AddRoom />} />
        </Route>
        <Route path="/admin/room/edit/" element={<AdminLayout />}>
          <Route index path=":idRoom" element={<EditRoom />} />
        </Route>
        <Route path="/admin/rating/" element={<AdminLayout />}>
          <Route index path=":idRoom" element={<AdminRating />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
