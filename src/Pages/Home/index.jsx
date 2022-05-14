import React from 'react';
import ExploreNearBy from './ExploreNearBy';
import ExploreToExperience from './ExploreToExp';
import HomeBanner from './HomeBanner';
import News from './News';

const Home = () => {

    return (
        <div>
            <HomeBanner />
            <div className='px-20 md:px-10'>
                <ExploreNearBy />
                <ExploreToExperience />
                <News />
            </div>
        </div>
    )
}

export default Home
