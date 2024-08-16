// import React, { useContext, useEffect, useState } from 'react'
// import Navbar from './Navbar'
// import { useParams } from 'react-router-dom'
// import { assets } from '../assets/assets';
// import { PlayerContext } from '../context/PlayerContext';




// function DisplayAlbum({album}) {


//     const { id } = useParams();
//     // console.log(id);                           //fething the id from the route in Display component 
//     const [albumData, setAlbumData] = useState("");
    
//     const { playWithId, albumsData, songsData } = useContext(PlayerContext);


//     useEffect(()=> {
//       albumsData.map((item)=>{
//         if (item._id === id) {
//           setAlbumData(item);
//         }
//       })
//     }, [])



//   return albumData ? (
//     <>
//       <Navbar />
//       <div className=' mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
//           <img className=' w-48 rounded' src={albumData.image} alt="" />
//           <div className=' flex flex-col'>
//                 <p>Playlist</p>
//                 <h2 className=' text-5xl font-bold mb-4 md:text-7xl'>{albumData.name}</h2>
//                 <h4>{albumData.desc}</h4>
//                 <p className='mt-1'>
//                     <img className=' inline-block w-5 h-5 rounded-full mr-1' src={assets.abg1} alt="" />
//                     <b>ABG vibes</b>
//                     . 1,823,875 likes
//                     . <b>50 songs,</b>
//                     about 2 hrs 30 m
//                 </p>
//           </div>
//       </div>
//       <div  className=' grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
//          <p><b className=' mr-4'>#</b>Title</p>
//          <p>Album</p>
//          <p className=' hidden sm:block'>Date Added</p>
//          <img className='m-auto w-4' src={assets.clock_icon} alt="" />
//       </div>
//       <hr />
//       {
//         songsData.filter((item)=> item.album === album.name).map((item, index) =>(
//             <div onClick={()=>playWithId(item._id)} key={index} className=' grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'>
//                 <p className=' text-white'>
//                     <b className=' mr-4 text-[#a7a7a7]'>{index + 1}</b>
//                     <img className=' inline w-10 mr-5' src={item.image} alt="" />
//                     {item.name}
//                 </p>
//                 <p className=' text-[15px]'>{albumData.name}</p>
//                 <p className=' text-[15px] hidden sm:block'>4 days ago</p>
//                 <p className=' text-[15px] text-center'>{item.duration}</p>
//             </div>
//         ))
//       }
//     </>
//   ) : null
// }

// export default DisplayAlbum


import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

function DisplayAlbum({ album }) {
    const { id } = useParams();
    const [albumData, setAlbumData] = useState(null);
    const [songCount, setSongCount] = useState(0);
    const [totalDuration, setTotalDuration] = useState('0:00');
    
    const { playWithId, albumsData, songsData } = useContext(PlayerContext);

    useEffect(() => {
        const selectedAlbum = albumsData.find(item => item._id === id);
        if (selectedAlbum) {
            setAlbumData(selectedAlbum);
            
            // Calculate number of songs and total duration
            const songsInAlbum = songsData.filter(item => item.album === selectedAlbum.name);
            setSongCount(songsInAlbum.length);

            // Calculate total duration
            const totalSecs = songsInAlbum.reduce((acc, item) => {
                const [mins, secs] = item.duration.split(':').map(Number);
                return acc + mins * 60 + secs;
            }, 0);

            const hours = Math.floor(totalSecs / 3600);
            const minutes = Math.floor((totalSecs % 3600) / 60);
            const seconds = totalSecs % 60;

            const formattedDuration = 
                `${hours > 0 ? hours + ' hr ' : ''}${minutes} min ${seconds} sec`;

            setTotalDuration(formattedDuration);
        }
    }, [id, albumsData, songsData]);

    return albumData ? (
        <>
            <Navbar />
            <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
                <img className='w-48 rounded' src={albumData.image} alt="" />
                <div className='flex flex-col'>
                    <p>Playlist</p>
                    <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{albumData.name}</h2>
                    <h4>{albumData.desc}</h4>
                    <p className='mt-1'>
                        <img className='inline-block w-5 h-5 rounded-full mr-1' src={assets.abg1} alt="" />
                        <b>ABG vibes</b>
                        . {songCount.toLocaleString()} likes
                        . <b>{songCount} songs</b>
                        , about {totalDuration}
                    </p>
                </div>
            </div>
            <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
                <p><b className='mr-4'>#</b>Title</p>
                <p>Album</p>
                <p className='hidden sm:block'>Date Added</p>
                <img className='m-auto w-4' src={assets.clock_icon} alt="" />
            </div>
            <hr />
            {songsData.filter(item => item.album === albumData.name).map((item, index) => (
                <div onClick={() => playWithId(item._id)} key={index} className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'>
                    <p className='text-white text-sm truncate'>
                        <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
                        <img className='inline w-10 mr-5' src={item.image} alt="" />
                        {item.name}
                    </p>
                    <p className='text-[15px]'>{albumData.name}</p>
                    <p className='text-[15px] hidden sm:block'>4 days ago</p>
                    <p className='text-[15px] text-center'>{item.duration}</p>
                </div>
            ))}
        </>
    ) : null;
}

export default DisplayAlbum;
