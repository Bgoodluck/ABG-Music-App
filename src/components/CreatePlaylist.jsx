import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PlayerContext } from '../context/PlayerContext'; 

const CreatePlaylist = () => {
    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');
    const [selectedSongs, setSelectedSongs] = useState([]);
    const navigate = useNavigate();

    const { songsData, playWithId, updatePlaylists } = useContext(PlayerContext); 

    const url = "http://localhost:4000";

    const handleCreatePlaylist = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            toast.error('User ID is missing. Please log in again.');
            return;
        }

        if (playlistName.trim() === '') {
            toast.error('Please enter a playlist name.');
            return;
        }

        try {
            const response = await axios.post(`${url}/api/playlist/create`, {
                name: playlistName,
                description: playlistDescription,
                userId: userId,
                songs: selectedSongs
            });

            if (response.data.success) {
                toast.success('Playlist created successfully!');
                updatePlaylists(response.data.playlist); // Update context with new playlist
                navigate('/library'); // Navigate to library after creation
            } else {
                toast.error(response.data.message || 'Failed to create playlist.');
            }
        } catch (error) {
            toast.error('An error occurred while creating the playlist.');
            console.error('Error creating playlist:', error);
        }
    };

    const handleSongSelect = (songId) => {
        setSelectedSongs(prev => 
            prev.includes(songId) 
                ? prev.filter(id => id !== songId) 
                : [...prev, songId]
        );
    };

    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold mb-4'>Create Playlist</h1>
            <input
                type='text'
                placeholder='Playlist Name'
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                className='w-full p-2 mb-4 border border-gray-300 rounded-md text-black'
            />
            <textarea
                placeholder='Description (optional)'
                value={playlistDescription}
                onChange={(e) => setPlaylistDescription(e.target.value)}
                className='w-full p-2 mb-4 border border-gray-300 rounded-md text-black'
            />
            
            <h2 className='text-xl font-bold mb-2'>Select Songs</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
                {songsData.map((song) => (
                    <div key={song._id} className='border rounded-lg p-4'>
                        <h3 className='text-lg font-semibold'>{song.name}</h3>
                        <p className='text-sm'>Artist: {song.artist}</p>
                        <button 
                            onClick={() => playWithId(song._id)} 
                            className='mt-2 bg-blue-500 text-white px-4 py-2 rounded '
                        >
                            Play
                        </button>
                        <button 
                            onClick={() => handleSongSelect(song._id)} 
                            className={`mt-2 ml-2 ${selectedSongs.includes(song._id) ? 'bg-green-500' : 'bg-gray-500'} text-white px-4 py-2 rounded`}
                        >
                            {selectedSongs.includes(song._id) ? 'Selected' : 'Select'}
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={handleCreatePlaylist}
                className='px-4 py-2 bg-green-500 text-white rounded-md'
            >
                Create Playlist
            </button>
        </div>
    );
};

export default CreatePlaylist;
