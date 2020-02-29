import React, { useContext, useState, useEffect } from "react";
import { TracksContext } from '../../contexts/tracks/tracksContext';
import { tokenContext } from '../../contexts/token/tokenContext';
import TrackItem from './TrackItem';
import { headers } from '../../helpers/helperFunctions';
import Loading from "../loading/Loading";

function Tracks() {

  const [ accessToken ] = useContext(tokenContext)

  const { state } = useContext(TracksContext); 
  const [topTracks, setTopTracks] = useState({
    loading: true,
    tracks: []
  })

  useEffect(() => {
    async function fetchTopTracks() {
      try {
          const apiUrl = `https://api.spotify.com/v1/me/top/tracks?time_range=${state.term}`;
          const response = await fetch(apiUrl, headers('GET', accessToken))
          const data = await response.json()

            // const tracksPage = `http://localhost:3000/tracks` // `https://spotify-application.herokuapp.com/tracks`
            
            // const environment = (environment) => {
            //   if(environment === 'dev'){
            //     return `http://localhost:3000/tracks`
            //   } else {
            //     return `https://spotify-application.herokuapp.com/tracks`
            //   }
            // }
          const returnEnv = (env) => {
            switch(env) {
              case 'dev':
                return `http://localhost:3000/tracks`;
              case 'prod':
                return `https://spotify-application.herokuapp.com/tracks`;
              default:
                return
            }
          }

            if(window.location.href === returnEnv('prod')) {
              setTopTracks({
                loading: false,
                tracks: data.items
              })
            } else {
              const topFive = data.items.splice(0,7)
              setTopTracks({
                loading: false,
                tracks: topFive
              })
            }
      } catch(err) {
        console.log(err)
      }
    }
      fetchTopTracks()
  }, [state.term, accessToken]);
    console.log(topTracks.tracks)
    return (

        topTracks.loading ? <Loading /> :

        <div style={{ width: '95%', margin:'0 auto' }}>
            <ul className='tracks-display'>
              { topTracks.tracks.map((track, index) => {

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