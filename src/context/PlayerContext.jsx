import React, { createContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    const url = process.env.REACT_APP_API_URL ;

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const [playlistsData, setPlaylistsData] = useState([]);
    const [likedSongsData, setLikedSongsData] = useState([]);
    const [mostPlayedSongsData, setMostPlayedSongsData] = useState([]);
    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [shuffle, setShuffle] = useState(false); 
    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 }
    });

    const [isPlaying, setIsPlaying] = useState(false);




    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    
    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    };

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    };

    
    const playWithId = async (id) => {
        if (id === undefined) {
            console.error('Attempted to play song with undefined id');
            return;
        }
    
        console.log("Attempting to play song with id:", id);
        console.log("All songs:", songsData);
    
        let song = songsData.find(item => item._id === id);

    if (!song) {
        // If the song is not in songsData, fetch it from the server
        try {
            const response = await axios.get(`${url}/api/playlist/song/${id}`);
            console.log("API Response:", response);
            song = response.data.song;
            setSongsData(prevSongs => [...prevSongs, song]);
        } catch (error) {
            console.error("Error fetching song:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Error setting up request:", error.message);
            }
            return;
        }
    }

    if (!song) {
        console.error("Song not found with id:", id);
        return;
    }

    console.log("Full song object:", JSON.stringify(song, null, 2));
    setTrack(song);

    if (!audioRef.current) {
        console.error("Audio element not found");
        return;
    }

    const audioUrl = song.file;
    if (!audioUrl) {
        console.error("Song audio URL is missing");
        return;
    }

    console.log("Setting audio source to:", audioUrl);
    audioRef.current.src = audioUrl;

    try {
        await audioRef.current.play();
        console.log("Playback started");
        setPlayStatus(true);
    } catch (error) {
        console.error("Error playing audio:", error);
    }
};

    const getSongsData = async () => {
        try {
            const response = await axios.get( url + "/api/song/list");
            console.log("Raw API response:", response.data);
            if (!response.data.songs || response.data.songs.length === 0) {
                console.error("No songs data received from API");
                return;
            }
            const firstSong = response.data.songs[0];
            console.log("First song structure:", JSON.stringify(firstSong, null, 2));
            console.log("First song _id:", firstSong._id);
            setSongsData(response.data.songs);
            setTrack(firstSong);
        } catch (error) {
            console.error('Error fetching songs data:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
            }
        }
    };

    const previous = async () => {
        const currentIndex = songsData.findIndex(item => item._id === track._id);
        if (currentIndex > 0) {
            setTrack(songsData[currentIndex - 1]);
            audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const next = async () => {
        const currentIndex = songsData.findIndex(item => item._id === track._id);
        if (currentIndex < songsData.length - 1) {
            setTrack(songsData[currentIndex + 1]);
            audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const seekSong = (e) => {
        audioRef.current.currentTime = (
            (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration
        );
    };

   
    const getAlbumsData = async () => {
        try {
            const response = await axios.get(url +"/api/album/list");
            setAlbumsData(response.data.albums);
        } catch (error) {
            console.error('Error fetching albums data:', error);
        }
    };

    const getPlaylistsData = async () => {
        try {
            const token = localStorage.getItem('token'); 
            const response = await axios.get(url +"/api/playlist/getplay", {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            console.log('Playlists Response:', response.data);
            if (response.data && Array.isArray(response.data)) {
                setPlaylistsData(response.data);
            } else if (response.data.playlists && Array.isArray(response.data.playlists)) {
                setPlaylistsData(response.data.playlists);
            } else {
                console.error('Invalid playlists data structure:', response.data);
                setPlaylistsData([]);
            }
        } catch (error) {
            console.error('Error fetching playlists data:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
                console.error('Status code:', error.response.status);
            }
            setPlaylistsData([]); // Set to empty array on error
        }
    };


    
    const addSongToLiked = async (songId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(url +"/api/playlist/liked", 
                { songId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('Song added to liked:', response.data);
            
            getLikedSongsData();
        } catch (error) {
            console.error('Error adding song to liked:', error);
        }
    };


    const getLikedSongsData = async () => {
        try {
            const response = await axios.get(url +"/api/playlist/likedplay");
            console.log('Liked songs response:', response.data);
            setLikedSongsData(response.data.songs || []);
        } catch (error) {
            console.error('Error fetching liked songs data:', error);
            setLikedSongsData([]);
        }
    };
    
    const getMostPlayedSongsData = async () => {
        try {
            const response = await axios.get(url +"/api/playlist/mostplay");
            console.log('Most played songs response:', response.data);
            setMostPlayedSongsData(response.data.songs || []);
        } catch (error) {
            console.error('Error fetching most played songs data:', error);
            setMostPlayedSongsData([]);
        }
    };

    const updatePlaylists = (newPlaylist) => {
        setPlaylistsData(prevPlaylists => [...prevPlaylists, newPlaylist]);
    };
   
    const createNewPlaylist = async (name, description) => {
        try {
            const response = await axios.post(url +"/api/playlist/create", { name, description });
            console.log("Playlist created:", response.data);
            
            // Add the new playlist to the existing playlists
            setPlaylistsData(prevPlaylists => [...prevPlaylists, response.data]);
            
            return response.data._id;
        } catch (error) {
            console.error("Error creating playlist:", error);
            return null;
        }
    };
    
    const addSongToPlaylist = async (songId, playlistId) => {
        try {
            const response = await axios.post(url +"/api/playlist/add", { songId, playlistId });
            console.log("Song added to playlist:", response.data);
            
            // Update the playlists data to reflect the change
            setPlaylistsData(prevPlaylists => 
                prevPlaylists.map(playlist => 
                    playlist._id === playlistId 
                        ? {...playlist, songs: [...playlist.songs, response.data]}
                        : playlist
                )
            );
        } catch (error) {
            console.error("Error adding song to playlist:", error);
        }
    };


    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const playNextTrack = () => {
        if (shuffle) {
            // Shuffle songs if shuffle is enabled
            const shuffledSongs = shuffleArray([...songsData]);
            const currentIndex = shuffledSongs.findIndex(item => item._id === track._id);
            const nextIndex = (currentIndex + 1) % shuffledSongs.length;
            setTrack(shuffledSongs[nextIndex]);
        } else {
            // Play next track in order
            const currentIndex = songsData.findIndex(item => item._id === track._id);
            const nextIndex = (currentIndex + 1) % songsData.length;
            setTrack(songsData[nextIndex]);
        }
        audioRef.current.play();
        setPlayStatus(true);
    };

    const playPreviousTrack = () => {
        if (shuffle) {
            // Shuffle songs if shuffle is enabled
            const shuffledSongs = shuffleArray([...songsData]);
            const currentIndex = shuffledSongs.findIndex(item => item._id === track._id);
            const prevIndex = (currentIndex - 1 + shuffledSongs.length) % shuffledSongs.length;
            setTrack(shuffledSongs[prevIndex]);
        } else {
            // Play previous track in order
            const currentIndex = songsData.findIndex(item => item._id === track._id);
            const prevIndex = (currentIndex - 1 + songsData.length) % songsData.length;
            setTrack(songsData[prevIndex]);
        }
        audioRef.current.play();
        setPlayStatus(true);
    };


     const toggleShuffle = () => {
        setShuffle(prevShuffle => !prevShuffle);
    };

    const handleEnded = () => {
        playNextTrack();
    };

    useEffect(() => {
        if (track) {
            audioRef.current.src = track.file;
            audioRef.current.play();
            setPlayStatus(true);
        }
    }, [track]);

    useEffect(() => {
        const audio = audioRef.current;
        audio.addEventListener('ended', handleEnded);
        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
    }, [track]);

    

    useEffect(() => {
        getSongsData();
        getAlbumsData();
        getPlaylistsData();
        getLikedSongsData();
        getMostPlayedSongsData();
        // addSongToPlaylist();
        // addSongToLiked();
    }, []);


    useEffect(() => {
        console.log('Updated Playlists Data:', playlistsData); 
    }, [playlistsData]);

    useEffect(() => {
        const updateTime = () => {
            seekBar.current.style.width = `${Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)}%`;
            setTime({
                currentTime: {
                    second: Math.floor(audioRef.current.currentTime % 60),
                    minute: Math.floor(audioRef.current.currentTime / 60)
                },
                totalTime: {
                    second: Math.floor(audioRef.current.duration % 60),
                    minute: Math.floor(audioRef.current.duration / 60)
                }
            });
        };
        audioRef.current.ontimeupdate = updateTime;
        return () => {
            audioRef.current.ontimeupdate = null;
        };
    }, [audioRef]);

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        // previous,
        // next,
        seekSong,
        songsData,
        setSongsData,
        albumsData,
        playlistsData,
        likedSongsData,
        mostPlayedSongsData,
        addSongToPlaylist,
        addSongToLiked,
        createNewPlaylist,
        updatePlaylists,
        isPlaying,
        togglePlayPause,
        previous: playPreviousTrack,
        next: playNextTrack,
        shuffle,
        toggleShuffle,
        url
    };

    return (
        <PlayerContext.Provider value={contextValue}>
             <audio ref={audioRef} src={track?.file} />
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
