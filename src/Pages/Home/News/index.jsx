import React from 'react';
import { useMediaQuery } from 'react-responsive';
import stayImg1440 from '../../../Assets/Image/newsImg1440.webp';
import stayImg720 from '../../../Assets/Image/newsImg720.webp';
import './style.scss';

const News = () => {
    const isTablet = useMediaQuery({ maxWidth: 1024 });

    const data = [
        {
            title: "Hỏi ý kiến chủ nhà siêu cấp",
            img: isTablet ? stayImg720 : stayImg1440,
            des: "Bạn có thắc mắt về việc đón tiếp khách",
            link: "https://www.airbnb.com.vn/askasuperhost?from=home",
        }
    ]
    return (
        <div className='2xl:py-5 md:py-2 mt-5'>
            {data.map((exp, i) => {
                return (
                    <div key={i} className='relative bg-gray-500'>
                        <div>
                            <img src={exp.img} alt="Exp1" className='rounded-xl h-full w-full block' />
                        </div>
                        <div className='news_layout_dark rounded-xl'></div>
                        <div className={`${isTablet ? 'news_content_tablet' : 'news_content_desktop'}`}>
                            <h1 className='text-6xl xl:text-5xl lg:text-2xl md:text-3xl font-semibold text-white pb-10 md:pb-5 tracking-wider'>{exp.des}</h1>
                            <div>
                                <a
                                    href={exp.link}
                                    className='px-6 py-3 sm:px-4 sm:py-2 rounded-md bg-white text-xl lg:text-base sm:text-sm'
                                >
                                    {exp.title}
                                </a>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default News
