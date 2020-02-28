import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Profile from './views/Profile';
import Search from './views/Search';
import LogIn from './views/LogIn';
import Artists from './views/Artists';
import Tracks from './views/Tracks';
import TracksProvider from './contexts/tracks/tracksProvider';
import ArtistsProvider from './contexts/artists/artistsProvider';
import RecentlyPlayed from './views/RecentlyPlayed';
import TrackId from './components/tracks/TrackId';
import ArtistId from './components/artists/ArtistId';
import TokenProvider from './contexts/token/tokenProvider'
import ArtistsItemProvider from './contexts/artistsItem/artistsItemProvider';
import TracksItemProvider from './contexts/tracksItem/tracksItemProvider';
import SearchedArtistsProvider from './contexts/search/searchedArtistsProvider';
import { access_token } from './helpers/helperFunctions';

function App() {

return (
      <TokenProvider>
      <div className="App">
        {
              access_token

               ?
              <SearchedArtistsProvider>
                <TracksItemProvider>
                  <ArtistsItemProvider>
                    <ArtistsProvider>
                    <TracksProvider>
                        <div>
                          <Switch>
                            <Route exact path='/' render={() => <Profile />} />
                            <Route exact path='/search' render={() => <Search />} />
                            <Route path='/search/:id' render={props => /*<SearchId {...props}*/ <ArtistId {...props}/>} />
                            <Route exact path='/artists' render={() => <Artists />} />
                            <Route exact path='/tracks' render={() => <Tracks />} />
                            <Route path='/tracks/:id' render={props => <TrackId {...props} />} />
                            <Route path='/artists/:id' render={props => <ArtistId {...props} />} />
                            <Route exact path='/recent' render={() => <RecentlyPlayed />} />
                            <Route path='/recent/:id' /*render={props => <RecentId {...props} />}*/ render={props => <TrackId {...props} />}  />
                          </Switch>
                        </div>
                      </TracksProvider>
                    </ArtistsProvider>
                  </ArtistsItemProvider>
                </TracksItemProvider>
              </SearchedArtistsProvider>
            :
            
              <LogIn />
        }
      </div>
      </TokenProvider>
      
  );
}

export default App;