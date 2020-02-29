import React, { useEffect, useState, useContext } from 'react';
import Navigation from '../components/navigation/Navigation';
import RecentItem from '../components/recent/RecentItem';
import { tokenContext } from '../contexts/token/tokenContext';
import '../views/views-scss/recent.view.scss';
import { headers } from '../helpers/helperFunctions';
import Loading from '../components/loading/Loading';

function RecentlyPlayed() {

    const [ accessToken ] = useContext(tokenContext)
    const [ recentTracks, setRecentTracks ] = useState({
      loading: true,
      recent: []
    })

    useEffect(() => {
        async function fetchRecentTracks() {
          try {
            const apiUrl = 'https://api.spotify.com/v1/me/player/recently-played?type=track';
            const response = await fetch(apiUrl, headers('GET', accessToken))
            const data = await response.json()
              setRecentTracks({
                loading: false,
                recent: data.items
              });
          } catch(err) {
            console.log(err)
          }
        }
          fetchRecentTracks();
      }, [accessToken])
    
    return (
        <div>
          <div className='nav'>
            <Navigation />
          </div>

          <div className='main__recent-view'>

          <ul style={{ padding: '20px', margin: '0', display: 'flex', justifyContent: 'flex-start', justifyItems: 'center' }}>
            <h2 className='recent-tracks'>Recent Tracks</h2>
          </ul>

            { recentTracks.loading ? <Loading /> :
              <div style={{ width: '95%', margin:'0 auto'}}>
                <ul className='recent-list'>
                  { recentTracks.recent.map((track, index) => {

                    const img = track.track.album.images[0];
                    const imgUrl = img ? img.url : "http://placekitten.com/g/200/300";

                    return <RecentItem key={index} imgUrl={imgUrl} index={index} track={track} />
                    })
                  }
                </ul>
              </div>
            }

          </div>
        </div>
    )
}

export default RecentlyPlayed;