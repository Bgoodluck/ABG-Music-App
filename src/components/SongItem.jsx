import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

function SongItem({name, image, desc, id, onPlay}) {
  console.log('SongItem props:', {name, image, desc, id});
  

  const { playWithId } = useContext(PlayerContext)

  const handlePlay = (e) => {
    e.stopPropagation();
    if (id) {
      console.log('Playing song with id:', id);
      if (onPlay) {
        onPlay(id);
      } else {
        playWithId(id);
      }
    } else {
      console.error('Song id is undefined or null');
    }
  }

  if (!id) {
    return null; // or return a placeholder component
  }

  return (
    <div className='flex flex-col  p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
      <div className='relative pb-[100%] mb-3'>
                <img 
                    className='absolute top-0 left-0 w-full h-full object-cover rounded-md' 
                    src={image || 'placeholder-image-url'} 
                    alt={name || 'Song'} 
                />
            </div>
            <div className='flex-grow'>
                <p className='font-bold text-lg mb-1 truncate'>{name || 'Unknown Song'}</p>
                <p className='text-gray-300 text-sm mb-3 truncate'>{desc || 'No description'}</p>
            </div>
            <button 
                onClick={handlePlay}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-300"
            >
                Play
            </button>
    </div>
  )
}

export default SongItem