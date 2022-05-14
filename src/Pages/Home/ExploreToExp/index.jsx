import React from 'react';
import exp1 from '../../../Assets/Image/experience__1.webp';
import exp2 from '../../../Assets/Image/experience__2.webp';
import './style.scss';

const ExploreToExperience = () => {
    const data = [
        {
            title: "Trải nghiệm",
            img: exp1,
            des: "Những điều nên trải nghiệm trong chuyến đi của bạn",
            link: "https://www.airbnb.com.vn/s/experiences?location_search=NEARBY",
        },
        {
            title: "Trải nghiệm trực tuyến",
            img: exp2,
            des: "Những điều nên trải nghiệm tại nhà",
            link: "https://www.airbnb.com.vn/s/experiences/online",
        },
    ]
    return (
        <div className='py-5 md:py-2'>
            <h1 className='text-5xl md:text-2xl pb-5 md:pb-2 font-medium'>Khám phá trải nghiệm Airbnb</h1>
            <div className='grid grid-cols-2 md:grid-cols-1 gap-10'>
                {data.map((exp, i) => {
                    return (
                        <div key={i} className='relative bg-gray-500'>
                            <div>
                                <img src={exp.img} alt="Exp1" className='rounded-xl w-full block' />
                            </div>
                            <div className='exp_layout_dark rounded-xl'></div>
                            <div className='exp_content'>
                                <h1 className='text-5xl lg:text-3xl md:text-xl sm:text-base font-semibold text-white pb-10 tracking-wider'>{exp.des}</h1>
                                <div>
                                    <a
                                        href={exp.link}
                                        className='px-6 py-3 sm:px-4 md:py-2 rounded-md bg-white xl:text-xl lg:text-base sm:text-sm'
                                    >
                                        {exp.title}
                                    </a>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ExploreToExperience
