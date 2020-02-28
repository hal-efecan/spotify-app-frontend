import React from 'react';

function Playback({ playback }) {

    const nowPlaying = { 
        height: '100px',
        width:'100px',
        cursor: 'pointer',
        border: '1px solid white'
    }

    return (
            <div>
                <img src={ playback.trackImage } alt="playlist-cover" style={nowPlaying} />
                <h3>Now playing</h3>
                <span>{playback.trackPlaying}</span>
            </div>
    )
}

export default Playback;