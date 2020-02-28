import React, { useState, useEffect, useContext } from 'react';
import { tokenContext } from '../../contexts/token/tokenContext';
import Navigation from '../navigation/Navigation';
import { headers, formatNum } from '../../helpers/helperFunctions';

function SearchId({ match }) {

    const [ accessToken ] = useContext(tokenContext)
    
    const [artist, setArtist] = useState([
      {
        name: '',
        followers: 0,
        popularity: 0,
        genres: [],
        image: '',
        id: ''
      }
    ])
    const [ genres, setGenres ] = useState({
      artist: '',
      id: ''
    })

    useEffect(() => {
      async function fetchSearchedArtist() {
        try {
          const apiUrl = `https://api.spotify.com/v1/artists/${match.params.id}`;
          const response = await fetch(apiUrl, headers('GET', accessToken))
          const data = await response.json()
          const { name, popularity, followers: { total }, images, genres } = data
          // const { name, popularity, followers, id } = data
          const  [ image ] = images
            setArtist({
              name: name,
              popularity: popularity,
              followers: total,
              image: image.url
            })
            setGenres(genres)
        } catch (err) {
          console.log(err)
        }
      }
      fetchSearchedArtist()
    }, [accessToken, match.params.id])
  
    return (
        <div>

              <div className='nav'>
                <Navigation />
              </div>

              <div className='main'>
                <ul className="Container">
                    {
                      <div>
                        <h2>{artist.name}</h2>
                        <img src={artist.image} alt={artist.name} style={{ width: '250px '}} />
                        <h2>Popularity: {artist.popularity}</h2>
                        <h2>Followers: {formatNum(artist.followers)} </h2>
                        <ul> Genre(s):  
                          {
                            genres.map((genre, index) => {
                              return <li key={index}>{genre}</li>
                            })
                          }
                        </ul>
                      </div>
                    }
                </ul>
              </div>

        </div>
    )
}

export default SearchId;