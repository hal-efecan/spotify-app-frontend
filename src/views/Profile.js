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
// import { getBackendUri } from '../helpers/helperFunctions';

function Profile() {

  const [ , setArtistsRoute ] = useContext(ArtistsItemContext)
  const [ , setTracksRoute ] = useContext(TracksItemContext)

  useEffect(() => {
    let backend_uri = `https://hidden-depths-47482.herokuapp.com/login`
    // let [ backend_uri ] = getBackendUri()
    // console.log(backend_uri)
    const artistsRouteLocation = () => {
        if(window.location.href=== `${backend_uri}/artists`) {
            setArtistsRoute(true)
        } else {
          setArtistsRoute(false)
        }
    }
    const tracksRouteLocation = () => {
      if(window.location.href=== `${backend_uri}/tracks`) {
          setTracksRoute(true)
      } else {
        setTracksRoute(false)
      }
    }
    artistsRouteLocation()
    tracksRouteLocation()
  },[setArtistsRoute, setTracksRoute])

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