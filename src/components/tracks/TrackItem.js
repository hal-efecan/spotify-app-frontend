import React, { useContext } from 'react';
import { TracksItemContext } from '../../contexts/tracksItem/tracksItemContext';
import { Link } from 'react-router-dom';
import { trackDuration } from '../../helpers/helperFunctions';
import '../../views/views-scss/tracks.view.scss';
import '../../views/views-scss/profile.view.scss';

function TrackItem({ imgUrl, index, track }) {

    const [ route, ] = useContext(TracksItemContext)

    return (
                <Link to={`/tracks/${track.id}`} style={{ textDecoration:'none' }} >
                    <li key={index} className={route ? `tracksView-trackItem` : `profileView-trackItem`} >
                        <img className={route ? `tracksView-trackImage` : 'profileView-trackImage' }src={imgUrl} alt={track.name} />
                        
                        <div className={route ? 'tracksView-trackItem__textStyle' : 'profileView-trackItem__textStyle'}>
                            <h5 className={route ? 'tracksView-trackItem__track-name' : 'profileView-trackItem__track-name'}>{track.name.substring(0,40)}</h5>
                            <div>
                                <span className={route ? 'tracksView-trackItem__artist-name' : 'profileView-trackItem__artist-name'}> { track.artists[0].name }</span> |
                                <span className={route ? 'tracksView-trackItem__album-name' : 'profileView-trackItem__album-name'}> { track.album.name.substring(0,15) }...</span>
                            </div>

                        </div>
                        <h5 className={route ? 'tracksView-trackDuration' : 'profileView-trackDuration'}>{trackDuration(track.duration_ms)}</h5>
                    </li>
                </Link>
    )
}

export default TrackItem;