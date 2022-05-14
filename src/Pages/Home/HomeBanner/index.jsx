import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import bg from '../../../Assets/Image/bg.jpeg';
const HomeBanner = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const isTablet = useMediaQuery({ maxWidth: 950 });

    const isDesktop = useMediaQuery({ minWidth: 1024 });

    const [height, setHeight] = useState();

    useEffect(() => {
        if (isMobile) return setHeight('50vh');
        if (isTablet) return setHeight('75vh');
        if (isDesktop) return setHeight('90vh');
    }, [height, setHeight, isMobile, isDesktop, isTablet]);

    return (
        <div
            className='xl:mb-5 md:mb-2'
            style={{
                backgroundImage: `url(${bg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                height: `${height}`,
                width: "100%"
            }}
        >
        </div>
    )
}

export default HomeBanner
