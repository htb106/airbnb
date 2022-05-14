import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import HeaderMobile from './Header/HeaderMobile';
import HeaderVer2 from './Header/HeaderVer2';

const MainLayout = () => {

    const isDesktop = useMediaQuery({minWidth: 768});
    
    return (
        <div className='relative'>
            {
                isDesktop ?
                <HeaderVer2/> :
                <HeaderMobile/>
            }
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default MainLayout
