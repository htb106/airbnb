import React, { useEffect, useState } from 'react'
import Paginate from '../../../Component/Paginate';
import Card from '../Card';
import Mapbox from '../MapBox';

const DeskTopView = ({ arrRoom, handleNextPageDetail, setprovinceLocationMap, setRoomLocationMap }) => {

    const [currentItems, setCurrentItems] = useState(null);

    return (
        <div className='ml-8 flex justify-between'>
            <div className='w-1/2 pt-8'>
                <p className='pb-2 text-base text-gray-600'>Hơn {arrRoom.length} chỗ ở</p>
                <h1 className='text-3xl lg:text-2xl font-semibold'>Chỗ ở tại {arrRoom?.[0]?.locationId.province}</h1>
                {arrRoom.length > 0 ?
                    ((currentItems) &&
                        currentItems.map((room, i) => (
                            <Card
                                key={i}
                                room={room}
                                handleNextPageDetail={handleNextPageDetail}
                            />
                        ))) :
                    <h1 className='font-medium pt-5'>Không tìm thấy phòng theo yêu cầu</h1>
                }
                <div className='flex justify-center pt-5'>
                    <Paginate
                        itemsPerPage={4}
                        setCurrentItems={setCurrentItems}
                        arrContent={arrRoom}
                    />
                </div>
            </div>
            <div className='relative w-1/2 pl-20 md:pl-10'>
                <div className='sticky top-0 w-full' style={{ height: "100vh" }}>
                    <Mapbox
                        arrRoom={arrRoom}
                        handleNextPageDetail={handleNextPageDetail}
                        setRoomLocationMap={setRoomLocationMap}
                        setprovinceLocationMap={setprovinceLocationMap}
                    />
                </div>

            </div>
        </div>
    )
}

export default DeskTopView
