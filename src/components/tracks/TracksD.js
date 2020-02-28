import React, { useContext, useState, useEffect } from "react";
import { TracksContext } from '../../contexts/tracks/tracksContext';
import { tokenContext } from '../../contexts/token/tokenContext';
import TrackItem from './TrackItem';
import { headers } from '../../helpers/helperFunctions';

function Tracks() {

  const [ accessToken ] = useContext(tokenContext)

  const { state } = useContext(TracksContext); 
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    async function fetchTopTracks() {
      try {
          const apiUrl = `https://api.spotify.com/v1/me/top/tracks?time_range=${state.term}`;
          const response = await fetch(apiUrl, headers('GET', accessToken))
          const data = await response.json()
            const tracksPage = `https://spotify-application.herokuapp.com/tracks`
            if(window.location.href === tracksPage) {
              setTopTracks(data.items)
            } else {
              const topFive = data.items.splice(0,7)
              setTopTracks(topFive)
            }
      } catch(err) {
        console.log(err)
      }
    }
    fetchTopTracks()
  }, [state.term, accessToken]);

    return (
        <div style={{ width: '95%', margin:'0 auto' }}>
        
            <ul className='tracks-display'>
              { topTracks && topTracks.map((track, index) => {

                const img = track.album.images[0];
                const imgUrl = img ? img.url : "http://placekitten.com/g/200/300";

                return <TrackItem key={index} imgUrl={imgUrl} index={index} track={track} />
                })
              }
            </ul>

        </div>
    )
}

export default Tracks;