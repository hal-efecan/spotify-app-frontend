import React from 'react';
import { Link } from 'react-router-dom';
import { trackDuration } from '../../helpers/helperFunctions';
import '../../views/views-scss/recent.view.scss';

function RecentItem({ track, imgUrl, index }) {

    return (
        <Link to={`/recent/${track.track.id}`} style={{ textDecoration:'none' }}>
            <li key={index} className='recentView-trackItem'>
                <img className='recentView-trackImage' src={imgUrl} alt={track.name} />
                
                <div className='recentView-trackItem__textStyle' >
                    <h5 className='recentView-trackItem__track-name'>{track.track.name}</h5>
                    <h5 className='recentView-trackItem__album-name'>{track.track.album.name.substring(0,20)}...</h5>
                </div>

                <h5 className='recentView-trackDuration'>{trackDuration(track.track.duration_ms)}</h5>
            </li>
        </Link>
    )
}

export default RecentItem;