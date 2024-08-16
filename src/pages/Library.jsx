import React, { useContext, useState } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import SongItem from '../components/SongItem';
import PlaylistPlayer from '../components/PlaylistPlayer';

const Library = () => {
    const { playlistsData, likedSongsData, mostPlayedSongsData, playWithId, addSongToPlaylist } = useContext(PlayerContext);
    const [currentPlaylist, setCurrentPlaylist] = useState(null);
    const [currentSongs, setCurrentSongs] = useState(null);
    const [viewedPlaylist, setViewedPlaylist] = useState(null); // New state for viewed playlist
    const [viewedPlaylistSongs, setViewedPlaylistSongs] = useState([]);

    const playlists = playlistsData || [];
    const likedSongs = likedSongsData || [];
    const mostPlayedSongs = mostPlayedSongsData || [];

    const handlePlaySong = (songId) => {
        console.log("Playing song with id:", songId);
        playWithId(songId);
    };

    const handlePlayPlaylist = (playlist) => {
        if (playlist.songs && playlist.songs.length > 0) {
            setCurrentPlaylist(playlist.name);
            setCurrentSongs(playlist.songs);
        } else {
            console.log("This playlist is empty");
        }
    };

    const handleAddSongToPlaylist = (songId, playlistId) => {
        addSongToPlaylist(songId, playlistId);
    };

    const handlePlayLikedSongs = () => {
        setCurrentPlaylist('Liked Songs');
        setCurrentSongs(likedSongs);
    };

    const handlePlayMostPlayedSongs = () => {
        setCurrentPlaylist('Most Played Songs');
        setCurrentSongs(mostPlayedSongs);
    };

    // New function to handle "View" button click
    const handleViewPlaylist = async (playlist) => {
        if (viewedPlaylist && viewedPlaylist._id === playlist._id) {
            setViewedPlaylist(null);
            setViewedPlaylistSongs([]);
        } else {
            setViewedPlaylist(playlist);
            // Fetch full song details for each song ID in the playlist
            const songDetails = await Promise.all(playlist.songs.map(async (songId) => {
                const response = await fetch(`/api/songs/${songId}`);
                return response.json();
            }));
            setViewedPlaylistSongs(songDetails);
        }
    };

    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold mb-4'>Library</h1>
            
            {currentPlaylist && currentSongs && currentSongs.length > 0 && (
                <PlaylistPlayer playlist={currentPlaylist} songs={currentSongs} />
            )}
            
            <div className='mb-6'>
                <h2 className='text-xl font-semibold mb-2'>Playlists</h2>
                {playlists.length === 0 ? (
                    <p>No playlists available</p>
                ) : (
                    <ul>
                        {playlists.map(playlist => (
                            <li key={playlist._id} className="mb-4">
                                <h3 className="text-lg font-medium ">{playlist.name}</h3>
                                <p className="text-sm text-gray-500">{playlist.description}</p>
                                <button 
                                    onClick={() => handlePlayPlaylist(playlist)}
                                    className="bg-green-500 text-white px-2 py-1 rounded text-sm mt-2 mr-2"
                                    disabled={!playlist.songs || playlist.songs.length === 0}
                                >
                                    {playlist.songs && playlist.songs.length > 0 ? 'Play Playlist' : 'Playlist Empty'}
                                </button>
                                {playlist.songs && playlist.songs.length > 0 && (
                                    <button 
                                        onClick={() => handleViewPlaylist(playlist)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded text-sm mt-2"
                                    >
                                        {viewedPlaylist && viewedPlaylist._id === playlist._id ? 'Hide' : 'View'}
                                    </button>
                                )}
                                {viewedPlaylist && viewedPlaylist._id === playlist._id && (
    <ul className="ml-4 mt-2">
        {viewedPlaylistSongs.map(song => (
            <SongItem
                key={`${playlist._id}-${song._id}`}
                id={song._id}
                name={song.name}
                image={song.image}
                desc={song.artist}
                onPlay={handlePlaySong}
            />
        ))}
    </ul>
)}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            
            
            <div className='mb-6'>
                <h2 className='text-xl font-semibold mb-2'>Liked Songs</h2>
                <button 
                    onClick={handlePlayLikedSongs}
                    className="bg-green-500 text-white px-2 py-1 rounded text-sm mb-2"
                >
                    Play Liked Songs
                </button>
                {likedSongs.length === 0 ? (
                    <p>No liked songs available</p>
                ) : (
                    <ul>
                        {likedSongs.map(song => (
                            <SongItem
                                key={`liked-${song._id}`}
                                id={song._id}
                                name={song.name}
                                image={song.image}
                                desc={song.artist}
                                onPlay={handlePlaySong}
                            />
                        ))}
                    </ul>
                )}
            </div>
            
            <div>
                <h2 className='text-xl font-semibold mb-2'>Most Played Songs</h2>
                <button 
                    onClick={handlePlayMostPlayedSongs}
                    className="bg-green-500 text-white px-2 py-1 rounded text-sm mb-2"
                >
                    Play Most Played Songs
                </button>
                {mostPlayedSongs.length === 0 ? (
                    <p>No most played songs available</p>
                ) : (
                    <ul>
                        {mostPlayedSongs.map(song => (
                            <SongItem
                                key={`most-played-${song._id}`}
                                id={song._id}
                                name={song.name}
                                image={song.image}
                                desc={song.artist}
                                onPlay={handlePlaySong}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Library;