import React, { useContext, useState, useEffect } from "react";
import { ArtistsContext } from '../../contexts/artists/artistsContext';
import { tokenContext } from '../../contexts/token/tokenContext';
import ArtistItem from './ArtistItem';
import { headers } from '../../helpers/helperFunctions';
import '../../views/views-scss/artists.view.scss';
import Loading from "../loading/Loading";
import '../button/styles/buttons.scss'

function ArtistsD() {

  const [ accessToken ] = useContext(tokenContext)

  const { state } = useContext(ArtistsContext); 
  const [topArtists, setTopArtists] = useState({
    loading: true,
    artists: []
  });
  
  useEffect(() => {
    async function fetchArtistsToDisplay() {
      try {
        const apiUrl = `https://api.spotify.com/v1/me/top/artists?time_range=${state.term}`;
        const response = await fetch(apiUrl, headers('GET', accessToken))
        const data = await response.json()

            // const environment = (environment) => {
            //   if(environment === 'dev'){
            //     return `http://localhost:3000/artists`
            //   } else {
            //     return `https://spotify-application.herokuapp.com/artists`
            //   }
            // }

            const returnEnv = (env) => {
              switch(env) {
                case 'dev':
                  return `http://localhost:3000/artists`;
                case 'prod':
                  return `https://spotify-application.herokuapp.com/artists`;
                default:
                  return
              }
            }

            // const artistsPage = env('dev') // `http://localhost:3000/artists` // `https://spotify-application.herokuapp.com/artists` || `http://localhost:3000/artists`
            if(window.location.href === returnEnv('prod')) {
              setTopArtists({
                loading: false,
                artists: data.items
              })
            } else {
              const topFive = data.items.splice(0,7)
              setTopArtists({
                loading: false,
                artists: topFive
              })
            }
      } catch (err) {
        console.log(err)
      }
    }
      fetchArtistsToDisplay()
  }, [state.term, accessToken, topArtists.loading]);

    return (
          topArtists.loading ? <Loading /> :

          <div style={{ width: '95%', margin:'0 auto' }}>
              <ul className='artists-display'>
              
              {   topArtists.artists.map((artist, index) => {

                  const img = artist.images[0];
                  const imgUrl = img ? img.url : "http://placekitten.com/g/200/300";

                  return <ArtistItem key={index} imgUrl={imgUrl} artist={artist} />

                  })}
              </ul>
          </div>
    )
}

export default ArtistsD;