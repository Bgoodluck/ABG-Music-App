import React, { useState, useContext, useEffect } from 'react';
import { PlayerContext } from '../context/PlayerContext';

const PlaylistPlayer = ({ playlist, songs }) => {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const { playWithId, isPlaying, togglePlayPause } = useContext(PlayerContext);

    useEffect(() => {
        if (songs && songs.length > 0 && songs[currentSongIndex] && songs[currentSongIndex]._id) {
            playWithId(songs[currentSongIndex]._id);
        }
    }, [currentSongIndex, songs, playWithId]);

    const playNext = () => {
        if (currentSongIndex < songs.length - 1) {
            setCurrentSongIndex(currentSongIndex + 1);
        }
    };

    const playPrevious = () => {
        if (currentSongIndex > 0) {
            setCurrentSongIndex(currentSongIndex - 1);
        }
    };

    if (!songs || songs.length === 0) return null;

    return (
        <div className="bg-gray-800 p-4 rounded-lg mt-2">
            <h4 className="text-lg font-semibold mb-2">Now Playing: {playlist}</h4>
            {songs[currentSongIndex] && (
                <p>{songs[currentSongIndex].name} - {songs[currentSongIndex].artist}</p>
            )}
            <div className="flex justify-center space-x-4 mt-2">
                <button onClick={playPrevious} className="bg-blue-500 text-white px-4 py-2 rounded">Previous</button>
                <button onClick={togglePlayPause} className="bg-green-500 text-white px-4 py-2 rounded">
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button onClick={playNext} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
            </div>
        </div>
    );
};

export default PlaylistPlayer;