import React, { useContext, useEffect } from 'react';
import TracksD from '../components/tracks/TracksD';
import Navigation from '../components/navigation/Navigation';
import TracksButton from '../components/button/TracksButton';
import { TracksItemContext } from '../contexts/tracksItem/tracksItemContext';
import TracksHeader from '../components/tracks/TracksHeader';
import './views-scss/tracks.view.scss';

function Tracks() {

    const [ , setTracksRoute ] = useContext(TracksItemContext)

    useEffect(() => {
        const tracksRouteLocation = () => {
            if(window.location.href=== `https://spotify-application.herokuapp.com/tracks`|| `http://localhost:3000/tracks`) {
                setTracksRoute(true)
            } else {
                setTracksRoute(false)
            }
        }
        tracksRouteLocation()
    },[setTracksRoute])
    
    return (
        <div>
            <div className='nav'>
                <Navigation />
            </div>

            <div className='main__tracks-view'>
                
                <ul className='tracksView-header'>
                    <TracksHeader />
                    <TracksButton />
                </ul>
                <TracksD />
            </div>
        </div>  
    )
}

export default Tracks;