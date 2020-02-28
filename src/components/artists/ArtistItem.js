import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { formatNum } from '../../helpers/helperFunctions';
import '../../views/views-scss/artists.view.scss';
import '../../views/views-scss/profile.view.scss';
import { ArtistsItemContext } from '../../contexts/artistsItem/artistsItemContext'

function ArtistItem({ artist, imgUrl, index }) {

    const [ route, ] = useContext(ArtistsItemContext)

    return (

        <Link to={`/artists/${artist.id}`} style={{ textDecoration: 'none' }} >

            <li key={index} className={route ? `artistView-artistItem` : `profileView-artistItem`} >
                <img className={route ? 'artistView-artistImage' : 'profileView-artistImage'} src={imgUrl} alt={artist.name} />

                <div className={route ? 'artistView-artistItem__textStyle' : 'profileView-artistItem__textStyle'}>
                    <span className={route ? 'artistView-artistItem__artist-name' : 'profileView-artistItem__artist-name'}> 
                        {artist.name.substring(0,20)}
                        <span className={route ? 'artistView-artistItem__artist-followers' : 'profileView-artistItem__artist-followers'}> | Followers: {formatNum(artist.followers.total)}</span>
                    </span>
                </div>
            </li>
            
        </Link>
    )
}

export default ArtistItem;