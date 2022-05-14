import React from 'react';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const Guset = ({ guest, w, setGuest }) => {
    const guests = [
        {
            type: "Người lớn",
            note: "Từ 12 tuổi trở lên",
            nums: guest.numsAdult,
            max: 9,
            setNums: (n) => setGuest({ ...guest, numsAdult: n }),
        },
        {
            type: "Trẻ em",
            note: "Độ tuổi 2 đến 12",
            nums: guest.numsChild,
            max: 5,
            setNums: (n) => setGuest({ ...guest, numsChild: n }),
        },
        {
            type: "Em bé",
            note: "Dưới 2 tuổi",
            nums: guest.numsToddler,
            max: 4,
            setNums: (n) => setGuest({ ...guest, numsToddler: n }),
        },
    ];

    return (
        <div className={`bg-white py-5 rounded-lg ${w ? w : 'w-full'}`}>
            {guests.map((guest, i) => {
                let notAlow_max = (guest.nums === guest.max) ? 'text-gray-400 cursor-not-allowed' : '';
                let notAlow_min = (guest.nums === 0) ? 'text-gray-400 cursor-not-allowed' : '';

                return (
                    <div key={i} className='flex justify-between items-center py-4 px-8 border-gray-200 border-b'>
                        <div>
                            <h1 className='text-sm font-medium'>{guest.type}</h1>
                            <h1 className='text-xs text-black/60'>{guest.note}</h1>
                        </div>
                        <div className='flex items-center'>
                            <AiOutlineMinusCircle
                                className={`icon + ${notAlow_min}`}
                                onClick={() => {
                                    if (guest.nums > 0 && guest.nums <= guest.max) {
                                        guest.setNums(guest.nums - 1)
                                    }
                                }}
                            />
                            <p className='mx-3'>{guest.nums}</p>
                            <AiOutlinePlusCircle
                                className={`icon + ${notAlow_max}`}
                                onClick={() => {
                                    if (guest.nums >= 0 && guest.nums < guest.max) {
                                        guest.setNums(guest.nums + 1)
                                    }
                                }}
                            />
                        </div>
                    </div>
                )
            })}
            <div className='py-4 px-8'>
                <p className='text-sm text-gray-500'>
                    Tối đa 14 khách không tính số lượng em bé.
                </p>
            </div>
        </div>
    )
}

export default Guset