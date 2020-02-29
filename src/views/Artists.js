import React, { useContext, useEffect } from 'react';
import { ArtistsItemContext } from '../contexts/artistsItem/artistsItemContext';
import ArtistD from '../components/artists/ArtistsD';
import Navigation from '../components/navigation/Navigation';
import ArtistsButton from '../components/button/ArtistsButton';
import './views-scss/artists.view.scss';
import '../components/navigation/styles/navigation.scss';
import ArtistsHeader from '../components/artists/ArtistsHeader';

function Artists() {

    const [ route, setRoute ] = useContext(ArtistsItemContext)

    useEffect(() => {
        const artistsRouteLocation = () => {
            if(window.location.href=== `https://spotify-application.herokuapp.com/artists` || `http://localhost:3000/artists`) {
                setRoute(true)
            } else {
                setRoute(false)
            }
        }
        artistsRouteLocation()
    },[setRoute])

    return (
        <div>

            <div className='nav'>
                <Navigation />
            </div>

            <div className='main__artists-view'>
            
                <ul className='artistView-header'>
                    <ArtistsHeader />
                    <ArtistsButton />
                </ul>
                <ArtistD />
            </div>

        </div>  
    )
}

export default Artists;