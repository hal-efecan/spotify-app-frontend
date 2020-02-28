import React, { useState, useEffect, useContext } from 'react';
import { tokenContext } from '../../contexts/token/tokenContext';
import Navigation from '../navigation/Navigation';
import { formatNum, headers } from '../../helpers/helperFunctions';
import './styles/artistId.scss'

function ArtistId({ match }) {

  const [ accessToken ] = useContext(tokenContext)
  const [artist, setArtist] = useState([
    {
      name: '',
      followers: null,
      popularity: 0,
      genres: [],
      image: '',
      id: ''
    }
  ])
  
  const [ genres, setGenres ] = useState([])
  const [ , setFollow ] = useState({
    artist: '',
    id: ''
  })

  // follow artist
  async function followArtist() {
      const apiUrl = `https://api.spotify.com/v1/me/following?type=artist&ids=${artist.id}`

      try {
        const response = await fetch(apiUrl, headers('PUT', accessToken))
        const data = await response.json()
        console.log(data)
        setFollow({
          artist: data.name,
          id: data.id
        })
      } catch(err) {
        console.log(err)
      }
  }

  useEffect(() => {
    async function fetchSelectedArtist() {
    try {
      const apiUrl = `https://api.spotify.com/v1/artists/${match.params.id}`;
      const response = await fetch(apiUrl, headers('GET', accessToken))
      const data = await response.json()
      console.log(data)
      const { name, popularity, followers, id } = data
        setArtist({
          name: name,
          popularity: popularity,
          followers: followers.total,
          image: data.images[0].url,
          id: id
        })
        setGenres(data.genres)
    } catch(err) {
      console.log(err)
    }
  }
  fetchSelectedArtist()
  }, [match.params.id, accessToken])

    return (
        <div>
              <div className='nav'>
                <Navigation />
              </div>

              <div className='main__artists-view'>

                <ul className="artistId-container">
                    {
                    <>
                        <div className='artistId__headline'>
                          <h1 style={{ padding: '0', margin: '0' }}>{artist.name}</h1>
                          <img className='artistId__image' src={artist.image} alt={artist.name} />
                          <button className='artistId__button' onClick={followArtist}>Follow</button>
                        </div>

                        <div className="artistId__tags-container">

                          <div className="artistId__tag">Popularity:<br/>
                            <span style={{ color: 'white' }}>{artist.popularity}</span>
                          </div>
                          
                          <ul className="artistId__tag-ul"> 
                          <div className="artistId__tag">Genre(s):</div>
                            {
                              genres.map((genre, index) => {
                                return <li className='artistId__tag-listItem' key={index}>{genre}</li>
                              })
                            }
                          </ul>

                          <div className="artistId__tag">Followers:<br/>
                            <span style={{ color: 'white' }}>{formatNum(artist.followers)}</span>
                          </div>

                        </div>

                    </>
                    }
                </ul>

              </div>

        </div>
    )
}

export default ArtistId;