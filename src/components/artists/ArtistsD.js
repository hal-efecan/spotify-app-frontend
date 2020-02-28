import React, { useContext, useState, useEffect } from "react";
import { ArtistsContext } from '../../contexts/artists/artistsContext';
import { tokenContext } from '../../contexts/token/tokenContext';
import ArtistItem from './ArtistItem';
import { headers } from '../../helpers/helperFunctions';
import '../../views/views-scss/artists.view.scss';

function ArtistsD() {

  const [ accessToken ] = useContext(tokenContext)

  const { state } = useContext(ArtistsContext); 
  const [topArtists, setTopArtists] = useState([]);
  
  useEffect(() => {
    async function fetchArtistsToDisplay() {
      try {
        const apiUrl = `https://api.spotify.com/v1/me/top/artists?time_range=${state.term}`;
        const response = await fetch(apiUrl, headers('GET', accessToken))
        const data = await response.json()
            const artistsPage = `https://spotify-application.herokuapp.com/artists`
            if(window.location.href === artistsPage) {
              setTopArtists(data.items)
            } else {
              const topFive = data.items.splice(0,7)
              setTopArtists(topFive) 
            }
      } catch (err) {
        console.log(err)
      }
    }

    fetchArtistsToDisplay()
  }, [state.term, accessToken]);
    
    return (
        <div style={{ width: '95%', margin:'0 auto' }}>
            <ul className='artists-display'>
            
            { topArtists && topArtists.map((artist, index) => {

                const img = artist.images[0];
                const imgUrl = img ? img.url : "http://placekitten.com/g/200/300";

                return <ArtistItem key={index} imgUrl={imgUrl} artist={artist} />

                })}
            </ul>
        </div>
    )
}

export default ArtistsD;