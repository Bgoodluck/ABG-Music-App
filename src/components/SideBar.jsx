import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

function SideBar() {
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/music?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <div className='w-full md:w-[25%] h-screen p-2 flex flex-col gap-2 text-white bg-[#121212]'>
            <div className='h-[15%] rounded flex flex-col justify-around'>
                <div onClick={() => navigate('/')} className='flex items-center gap-3 pl-8 cursor-pointer'>
                    <img className='w-6' src={assets.home_icon} alt="" />
                    <p className='font-bold'>Home</p>
                </div>
                <div className='flex items-center gap-3 pl-8 cursor-pointer'>
                    <img
                        onClick={() => setSearchVisible(!searchVisible)}
                        className='w-6'
                        src={assets.search_icon}
                        alt=""
                    />
                    <p className='font-bold'>Search</p>
                </div>
                <div className='flex items-center gap-3 pl-8 cursor-pointer'>
                    <img
                        onClick={() => navigate('/library')}
                        className='w-6'
                        src={assets.stack_icon} 
                        alt="Library"
                    />
                    <p className='font-bold'>Library</p>
                </div>
            </div>
            {searchVisible && (
                <div className='p-4 rounded mb-4'>
                    <input
                        type='text'
                        placeholder='Search for songs, albums, or artists...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='w-full p-2 rounded bg-gray-800 text-white'
                    />
                    <button
                        onClick={handleSearch}
                        className='mt-2 px-4 py-2 bg-gray-800 text-white rounded'
                    >
                        Search
                    </button>
                </div>
            )}
            <div className='flex-grow'>
                <div className='p-4 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <img onClick={() => navigate('/library')} className='w-8 cursor-pointer' src={assets.stack_icon} alt="" />
                        <p className='font-semibold'>Your Library</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <img
                            onClick={() => navigate('/create-playlist')}
                            className='w-5 cursor-pointer'
                            src={assets.plus_icon}
                            alt="Create Playlist"
                        />
                    </div>
                </div>
                <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
                    <h1>Create your first playlist</h1>
                    <p className='font-light'>it's easy let's help you</p>
                    <button
                        onClick={() => navigate('/create-playlist')}
                        className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'
                    >
                        Create Playlist
                    </button>
                </div>
                <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-3'>
                    <h1>Let's find some podcasts to follow</h1>
                    <p className='font-light'>we'll keep you updated on new episodes</p>
                    <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>
                        Browse Podcast
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
