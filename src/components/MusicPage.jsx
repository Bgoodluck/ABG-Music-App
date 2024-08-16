import React, { useContext, useState, useEffect } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { useLocation, useNavigate } from 'react-router-dom';
import SongItem from '../components/SongItem';

const MusicPage = () => {
    const { songsData, albumsData, playWithId, addSongToPlaylist, addSongToLiked, playlistsData, createNewPlaylist, getSongsData } = useContext(PlayerContext);
    const navigate = useNavigate();
    const { search } = useLocation();
    const query = new URLSearchParams(search).get('search') || '';
    const [searchTerm, setSearchTerm] = useState(query);
    const [selectedSong, setSelectedSong] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const filteredSongs = songsData.filter(song =>
        (song.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (song.artist || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (song.album || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredAlbums = albumsData.filter(album =>
        (album.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (album.artist || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        setSearchTerm(query);
    }, [query]);

    const handleAddToLiked = (songId) => {
        addSongToLiked(songId);
        setSelectedSong(null);
    };

    const handleAddToPlaylist = async (songId, playlistId) => {
        if (playlistId === 'new') {
            const newPlaylistName = prompt('Enter new playlist name:');
            if (newPlaylistName) {
                const newPlaylistId = await createNewPlaylist(newPlaylistName, '');
                if (newPlaylistId) {
                    addSongToPlaylist(songId, newPlaylistId);
                }
            }
        } else {
            addSongToPlaylist(songId, playlistId);
        }
        setSelectedSong(null);
    };

    useEffect(() => {
        const loadData = async () => {
            if (songsData.length === 0) {
                await getSongsData();
            }
            setIsLoading(false);
        };
        loadData();
    }, [getSongsData, songsData]);

    useEffect(() => {
        setSearchTerm(query);
    }, [query]);

    if (isLoading) {
        return <div>Loading songs...</div>;
    }
      
    return (
        <div className='p-4'>
            <button
                onClick={() => navigate(-1)}
                className='bg-gray-800 text-white px-4 py-2 rounded-md mb-4'
            >
                Back
            </button>

            <div className='mb-4'>
                <input
                    type='text'
                    placeholder='Search for songs or albums...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-[25%] p-2 border border-gray-300 rounded-md text-black'
                />
            </div>

            <h2 className='text-2xl font-bold mb-4'>All Songs</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8'>
    {filteredSongs.map((song) => (
        <div
            key={song._id}
            className='border border-gray-700 rounded-lg p-4 bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden'
        >
            <SongItem
                id={song._id}
                name={song.name}
                image={song.image}
                desc={`${song.artist} - ${song.album}`}
                onPlay={playWithId}
            />
                        <button onClick={() => setSelectedSong(song._id)} className='mt-2 ml-2 bg-green-500 text-white px-4 py-2 rounded'>
                            Add to Playlist
                        </button>
                        <button onClick={() => handleAddToLiked(song._id)} className='mt-2 ml-2 bg-red-500 text-white px-4 py-2 rounded'>
                            Like
                        </button>
                        {selectedSong === song._id && (
                            <div className='mt-2'>
                                <select 
                                    onChange={(e) => handleAddToPlaylist(song._id, e.target.value)}
                                    className='w-full p-2 border border-gray-300 rounded text-black font-semibold'
                                >
                                    <option value="">Select a playlist</option>
                                    {playlistsData.map(playlist => (
                                        <option key={playlist._id} value={playlist._id}>{playlist.name}</option>
                                    ))}
                                    <option value="new">Create New Playlist</option>
                                </select>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <h2 className='text-2xl font-bold mb-4'>All Albums</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {filteredAlbums.map((album) => (
                    <div key={album._id} className='border rounded-lg p-4'>
                        <img className='w-full h-32 object-cover mb-2' src={album.image} alt={album.name} />
                        <h3 className='text-lg font-semibold'>{album.name}</h3>
                        <p className='text-sm'>Description: {album.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MusicPage;
