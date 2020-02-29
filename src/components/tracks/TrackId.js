import React, { useState, useEffect, useContext } from 'react';
import { tokenContext } from '../../contexts/token/tokenContext';
import Navigation from '../navigation/Navigation';
import { trackDuration, headers } from '../../helpers/helperFunctions';
import TrackAudioChart from './TrackAudioChart';
import  './styles/trackId.scss'

function TrackId({ match }) {

    const [ accessToken ] = useContext(tokenContext)

    const [ track, setTrack ] = useState([])
    const [ album, setAlbum ] = useState([])
    const [ artists, setArtists ] = useState([])
    const [ albumImage, setAlbumImage ] = useState([])
    const [ audioFeatures, setAudioFeatures ] = useState({
      acousticness: 0,
      dancability: 0,
      energy: 0,
      instrumentalness: 0,
      key: 0,
      liveliness: 0,
      loudness: 0,
      mode: 0,
      speachiness: 0,
      tempo: 0,
      time_signature: 0,
      valence: 0
    })
    const [ audioAnalysis, setAudioAnalysis ] = useState({
      bars: [],
      beats: [],
      sections: [],
      segments: []
    })

    const data = {
      labels: ['Acousticness', 'Danceability', 'Energy', 'Instrumentalness', 'Liveness', 'Speechiness', 'Valence'],
      datasets:[
        {
        barPercentage: 0.5,
        barThickness: 90,
        maxBarThickness: 90,
        minBarLength: 2,
        borderColor: 'transparent',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [
          audioFeatures.acousticness,
          audioFeatures.danceability,
          audioFeatures.energy,
          audioFeatures.instrumentalness,
          audioFeatures.liveness,
          audioFeatures.speechiness,
          audioFeatures.valence
        ],
        backgroundColor: [
          '#ffffffe5',
          '#4af64abe',
          '#327bacb2',
          'blue',
          '#ec2929de',
          '#ffff00a2',
          '#f374c9d0'
        ]
        },
      ]
      }
    
    useEffect(() => {
      const apiUrl = `https://api.spotify.com/v1/audio-analysis/${match.params.id}`
      
      async function fetchAudionalysis() {
        try {
          const response = await fetch(apiUrl, headers('GET', accessToken))
          const data = await response.json()
          const { bars, beats, sections, segments } = data
          setAudioAnalysis({
            bars: bars.length,
            beats: beats.length,
            sections: sections.length,
            segments: segments.length
          })
        } catch(err) {
          console.log(err)
        }
      }
      fetchAudionalysis()
    }, [match.params.id, accessToken])
    useEffect(() => {
      async function fetchAudioFeatures() {
        const apiUrl = `https://api.spotify.com/v1/audio-features/${match.params.id}`
        
        try {
          const response = await fetch(apiUrl, headers('GET', accessToken))
          const data = await response.json()
          const { acousticness, danceability, energy, instrumentalness, 
          key, liveness, loudness, mode, speechiness, tempo, time_signature,
          valence} = data
          setAudioFeatures({
            acousticness,
            danceability,
            energy,
            instrumentalness,
            key,
            liveness,
            loudness,
            mode,
            speechiness,
            tempo,
            time_signature,
            valence
          })

        } catch(err) {
          console.log(err)
        }
      }
      fetchAudioFeatures()
    },[accessToken, match.params.id])
    useEffect(() => {
      async function fetchTrack() {
        try {
          const apiUrl = `https://api.spotify.com/v1/tracks/${match.params.id}`;
          const response = await fetch(apiUrl, headers('GET', accessToken))
          const data = await response.json()
          const { artists } = data
            setTrack(data);
            setAlbum(data.album)
            setArtists(artists)
            setAlbumImage(data.album.images[0])
        } catch (err) {
          console.log(err)
        }
      }
      fetchTrack()    
    }, [accessToken, match.params.id])

    return (
        <div>

            <div className='nav'>
              <Navigation />
            </div>

            <div className='main__tracks-view'>
              <ul className="Container" style={{ padding: '0'}}>
                { track ? 
                <div>

                  <div className="trackId__heading-container">

                    <img className='trackId__heading-container__image' src={albumImage.url} alt={track.name} />

                    <div className='trackId__heading-container__text'>

                      <span className='trackId__heading-container__text__track-name'>{track.name}</span>

                      <div className='trackId__heading-container__text__album-release-container'>
                        <div className='trackId__heading-container__text__album-name'>{album.name}</div>
                        <div className='trackId__heading-container__text__album-release'>Release date: {album.release_date}</div>
                      </div>
                      
                      <ul className='trackId__heading-container__text__artists-container'>
                          {
                            artists.map((artist, index) => {
                              return <li className='trackId__heading-container__text__artists' key={index}>{artist.name}</li>
                              })
                          }
                      </ul>

                  </div>

                  </div>

                  <div className='trackId__table-container'>
                    <div className="trackId__table-container__table-item1">
                      <h2 className='trackId__heading-container__table-item__title'>Duration</h2>
                      <h4 className='trackId__heading-container__table-item__result'>{trackDuration(track.duration_ms)} min</h4>
                    </div>
                    <div className="trackId__table-container__table-item2">
                      <h2 className='trackId__heading-container__table-item__title'>Popularity</h2>
                      <h4 className='trackId__heading-container__table-item__result'>{track.popularity}</h4>
                    </div>
                    <div className="trackId__table-container__table-item3">
                      <h2 className='trackId__heading-container__table-item__title'>Bars</h2>
                      <h4 className='trackId__heading-container__table-item__result'>{audioAnalysis.bars}</h4>
                    </div>
                    <div className="trackId__table-container__table-item4">
                      <h2 className='trackId__heading-container__table-item__title'>Beats</h2>
                      <h4 className='trackId__heading-container__table-item__result'>{audioAnalysis.beats}</h4>
                    </div>
                    <div className="trackId__table-container__table-item5">
                      <h2 className='trackId__heading-container__table-item__title'>Sections</h2>
                      <h4 className='trackId__heading-container__table-item__result'>{audioAnalysis.sections}</h4>
                    </div>
                    <div className="trackId__table-container__table-item6">
                      <h2 className='trackId__heading-container__table-item__title'>Segments</h2>
                      <h4 className='trackId__heading-container__table-item__result'>{audioAnalysis.segments}</h4>
                    </div>
                    <div className="trackId__table-container__table-item7">
                      <h2 className='trackId__heading-container__table-item__title'>Key</h2>
                      <h4 className='trackId__heading-container__table-item__result'>{audioFeatures.key}</h4>
                    </div>
                    <div className="trackId__table-container__table-item8">
                      <h2 className='trackId__heading-container__table-item__title'>Mode</h2>
                      <h4 className='trackId__heading-container__table-item__result'>{audioFeatures.mode}</h4>
                    </div>
                    <div className="trackId__table-container__table-item9">
                      <h2 className='trackId__heading-container__table-item__title'>Tempo</h2>
                      <h4 className='trackId__heading-container__table-item__result'>{(audioFeatures.tempo).toFixed(0)} Bpm</h4>
                    </div>
                    <div className="trackId__table-container__table-item10">
                      <h2 className='trackId__heading-container__table-item__title'>Time Signature</h2>
                      <h4 className='trackId__heading-container__table-item__result'>{audioFeatures.time_signature}</h4>
                    </div>
                  </div>
                  <TrackAudioChart audioFeatures={audioFeatures} data={data} />

                </div>
                : '' }
              </ul>
            </div>

        </div>
    )
}

export default TrackId;