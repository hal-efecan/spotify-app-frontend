import React, { useContext, useEffect } from "react";
// import { Link } from 'react-router-dom';
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

    const returnEnv = (env) => {
      switch(env) {
        case 'dev':
          return `http://localhost:3000`;
        case 'prod':
          return `https://hidden-depths-47482.herokuapp.com`;
        default:
          return
      }
    }

    // let route = `http://localhost:3000`
    // let backend_uri = `https://hidden-depths-47482.herokuapp.com` // 'http://localhost:8888'
    const artistsRouteLocation = () => {
        if(window.location.href=== `${returnEnv('prod')}/artists`) { // 'http://localhost:3000/artists`
            setArtistsRoute(true)
        } else {
          setArtistsRoute(false)
        }
    }
    const tracksRouteLocation = () => {
      if(window.location.href=== `${returnEnv('prod')}/tracks`) { // 'http://localhost:3000/tracks`
          setTracksRoute(true)
      } else {
        setTracksRoute(false)
      }
    }
    artistsRouteLocation()
    tracksRouteLocation()
  },[setArtistsRoute, setTracksRoute])

  return (
            <div className='container'>
              <div className='nav'>
                <Navigation />
              </div>

              <UserSummary />

              <div className='main'>

                <div className='main__tracks'>
                  <TracksHeader />
                  <TracksD />
                </div>

                <div className='main__artists'>
                  <ArtistsHeader />
                  <ArtistD />
                </div>

              </div>
            </div>
          )
}

export default Profile;