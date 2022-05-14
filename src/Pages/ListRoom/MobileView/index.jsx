import React, { useState } from 'react';
import { useEffect } from 'react';
import Paginate from '../../../Component/Paginate';
import CardMobile from '../CardMobile';
import Mapbox from '../MapBox';
import './style.scss';

const MobileView = ({ arrRoom, handleNextPageDetail, setprovinceLocationMap, setRoomLocationMap }) => {

    const [currentItems, setCurrentItems] = useState(null);

    const [transform, setTransform] = useState(false);

    const handleToggleMap = () => {

        return setTransform(true);
    };

    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY > 250);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);

            if (scroll) setTransform(false);
        };

    }, [scroll]);

    return (
        <div>
            <div
                className='w-full'
                onClick={handleToggleMap}
                style={{ height: `${transform ? '85vh' : '60vh'}` }}
            >
                <Mapbox
                    arrRoom={arrRoom}
                    handleNextPageDetail={handleNextPageDetail}
                    setRoomLocationMap={setRoomLocationMap}
                    setprovinceLocationMap={setprovinceLocationMap}
                />
            </div>
            <div className='fixed bg-white bottom-0 w-full left-0'>
            </div>
            <div className='px-4 content_mobile rounded-t-3xl rounded-r-3xl'>
                <div className='wrapper'>
                    <div className='content__top__transparent'>
                        <h1 className='border-b border-gray-200 py-5 text-center font-semibold'>Hơn {arrRoom.length} chỗ ở</h1>
                    </div>
                    <div className=''>
                        {arrRoom.length > 0 ?
                            ((currentItems) &&
                                currentItems.map((room, i) => (
                                    <CardMobile
                                        key={i}
                                        room={room}
                                        handleNextPageDetail={handleNextPageDetail}
                                    />
                                ))) :
                            <h1 className='font-medium pt-5'>Không tìm thấy phòng theo yêu cầu</h1>
                        }
                        <div className='flex justify-center pt-5'>
                            <Paginate
                                itemsPerPage={10}
                                setCurrentItems={setCurrentItems}
                                arrContent={arrRoom}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileView