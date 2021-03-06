import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getInfoUserAction } from '../../Redux/Action/ManageAuthAction';
import { TOKEN, USER_ID } from '../../Untilities/config';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';
import { AiFillStar } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';
import { useState } from 'react';
import { manageAuthApi } from '../../Api/manageAuthApi';
import { HiUserCircle } from 'react-icons/hi';
import { useMediaQuery } from 'react-responsive';
import createAction from '../../Redux/Action/CreateAction';
import { LOGOUT } from '../../Redux/Type/ManageAuthType';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const dispatch = useDispatch();

    const userId = localStorage.getItem(USER_ID);

    const [fileUpload, setFileUpload] = useState(null);

    const handleChangeFile = (e) => {
        setFileUpload(e.target.files[0]);
    };

    useEffect(() => {

        const handleUpImage = async () => {
            try {
                const formData = new FormData();

                formData.append('avatar', fileUpload);

                await manageAuthApi.postAvatarUser(formData);

                dispatch(getInfoUserAction(userId));
            } catch (err) {
                console.log(err)
            }

        };

        handleUpImage();

    }, [userId, dispatch, fileUpload]);

    const { user } = useSelector(state => state.authReducer);

    const navigate = useNavigate();

    const isDesktop = useMediaQuery({ minWidth: 768 });

    return (
        <div className='2xl:px-60 xl:px-40 lg:px-20 md:px-5 2xl:pt-28 md:pt-20'>
            <div className='grid 2xl:grid-cols-3 md:grid-cols-1'>
                <div className='border border-gray-200 rounded-2xl p-6 col-span-1'>
                    <div className='grid md:grid-cols-2 gap-4 border-gray-200 border-b pb-8'>
                        <div>
                            <div className='flex justify-center items-center 2xl:pb-8 md:pb-4'>
                                {user?.avatar ? <img src={user?.avatar} alt="avata" className='h-40 w-40 rounded-full border border-gray-200' /> : <HiUserCircle className='h-40 w-40' />}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleChangeFile}
                                id='file_update_image'
                                className='hidden'
                            />
                            <label htmlFor="file_update_image">
                                <h1 className='py-2 hover:underline cursor-pointer text-center'>C???p nh???t ???nh ?????i di???n</h1>
                            </label>
                        </div>
                        <div className='pt-2'>
                            <div className=' mt-2'>
                                <IoShieldCheckmarkOutline className='w-8 h-8 block' />
                            </div>
                            <h1 className='font-medium text-lg pb-3'>X??c minh danh t??nh</h1>
                            <p className='pb-3'>X??c th???c huy hi???u c???a b???n v???i x??c minh danh t??nh</p>
                            <button className='2xl:w-3/5 md:w-full border-gray-200 border rounded-xl py-3 hover:border-black text-lg font-semibold'>Nh???n huy hi???u</button>
                        </div>
                    </div>
                    <div className='pt-8'>
                        <h1 className='font-medium text-lg'>{user?.name} ???? x??c nh???n</h1>
                        <div className='flex'>
                            <TiTick className='h-5 w-5' />
                            <h1>?????a ch??? email</h1>
                        </div>
                    </div>
                </div>
                <div className='2xl:col-span-2 md:col-span-1 2xl:pl-20 md:pl-0 md:mt-5'>
                    <h1 className='text-3xl font-semibold pb-2'>Xin ch??o t??i l?? {user?.name}</h1>
                    <p className='text-gray-400 text-sm pb-2'>B???t ?????u tham gia v??o n??m 2022</p>
                    <div className='border-b border-gray-200 py-6 '>
                        <h1 className='underline font-medium pb-4 cursor-pointer'>Ch???nh s???a h??? s??</h1>
                        <div className='flex items-center pt-4'>
                            <AiFillStar className='w-8 h-8 mr-2' />
                            <h1 className='text-xl font-semibold'>0 ????nh gi??</h1>
                        </div>
                    </div>
                    <div className='border-b border-gray-200 py-6'>
                        <h1 className='underline font-medium pb-4 cursor-pointer'>????nh gi?? c???a b???n</h1>
                    </div>
                    <div className='border-b border-gray-200 py-6'>
                        <h1 className='underline font-medium pb-4 cursor-pointer'>L???ch s??? ?????t v??</h1>
                    </div>
                </div>
                {
                    !isDesktop &&
                    <div className='p-5 w-full'>
                        <button
                            className='text-center py-3 border-black border rounded-xl w-full hover:bg-gray-200'
                            onClick={() => {
                                dispatch(createAction(LOGOUT));
                                localStorage.removeItem(USER_ID);
                                localStorage.removeItem(TOKEN);
                                navigate({
                                    pathname: '/'
                                });
                            }}
                        >
                            ????ng xu???t
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Profile