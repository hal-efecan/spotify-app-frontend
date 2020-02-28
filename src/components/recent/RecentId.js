import React, { useState, useEffect, useContext } from 'react';
import { tokenContext } from '../../contexts/token/tokenContext';
import Navigation from '../navigation/Navigation';
import { headers, trackDuration } from '../../helpers/helperFunctions';

function RecentId({ match }) {

    const [ accessToken ] = useContext(tokenContext)

    const [ track, setTrack ] = useState([])
    const [ artists, setArtists ] = useState([])
    const [ album, setAlbum ] = useState([])
    const [ albumImage, setAlbumImage ] = useState([])
    
    useEffect(() => {
      async function fetchRecentlyPlayedTrack() {
        try {
          const apiUrl = `https://api.spotify.com/v1/tracks/${match.params.id}`;
          const response = await fetch(apiUrl, headers('GET', accessToken))
          const data = await response.json()
          console.log(data)
          const { album: { images } } = data
          const [ image ] = images
            setTrack(data);
            setAlbum(data.album)
            setArtists(data.artists)
            setAlbumImage(image)
        } catch(err) {
          console.log(err)
        }
      }
      fetchRecentlyPlayedTrack()
    }, [match.params.id, accessToken])

    return (
        <div>

            <div className='nav'>
              <Navigation />
            </div>

            <div className='main__recent-view'>
              <ul className="Container">
                  {
                    <div>
                      <h3> Track: { track.name } </h3>
                      <h3> Album: { album.name } </h3>
                      <h3> Duration: { trackDuration(track.duration_ms) }min </h3>
                      <h3>popularity: {track.popularity}</h3>
                      <img src={albumImage.url} alt={track.name} style={{ width: '250px' }} />
                      
                      <ul>
                          {
                            artists.map((artist, index) => {
                              return <li key={index}>Artist: {artist.name}</li>}
                            )
                          }
                      </ul>
                    </div>
                  }
              </ul>
            </div>

        </div>
    )
}

export default RecentId;