import React, { useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import TracksD from '../components/tracks/TracksD';
import ArtistD from '../components/artists/ArtistsD';
import UserSummary from '../components/userSummary/UserSummary';
import Navigation from "../components/navigation/Navigation";
import './views-scss/profile.view.scss';
import { ArtistsItemContext } from '../contexts/artistsItem/artistsItemContext';
import { TracksItemContext } from '../contexts/tracksItem/tracksItemContext';
import TracksHeader from "../components/tracks/TracksHeader";
import ArtistsHeader from "../components/artists/ArtistsHeader";

function Profile() {

  const [ , setArtistsRoute ] = useContext(ArtistsItemContext)
  const [ , setTracksRoute ] = useContext(TracksItemContext)

  useEffect(() => {
    const artistsRouteLocation = () => {
        if(window.location.href=== `https://spotify-application.herokuapp.com/artists`) {
            setArtistsRoute(true)
        } else {
          setArtistsRoute(false)
        }
    }
    const tracksRouteLocation = () => {
      if(window.location.href=== `https://spotify-application.herokuapp.com/tracks`) {
          setTracksRoute(true)
      } else {
        setTracksRoute(false)
      }
    }
    artistsRouteLocation()
    tracksRouteLocation()
  },[setArtistsRoute, setTracksRoute])
  console.log('test')
  return (
            <div>

              <div className='nav'>
                <Navigation />
              </div>

              <UserSummary />

              <div className='main'>

                <div className='main__tracks'>
                  <TracksHeader />
                  <TracksD />
                  <Link to='/tracks'>
                    <button className='btnStyle'>
                    View more
                    </button>
                  </Link>
                </div>

                <div className='main__artists'>
                  <ArtistsHeader />
                  <ArtistD />
                  <Link to='/artists'>
                    <button className='btnStyle'>
                    View more
                    </button>
                  </Link>
                </div>

              </div>

            </div>
          )
}

export default Profile;