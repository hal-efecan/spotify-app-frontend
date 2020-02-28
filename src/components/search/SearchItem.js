import React from 'react';
import { Link } from 'react-router-dom'
import { formatNum } from '../../helpers/helperFunctions';
import '../../views/views-scss/search.view.scss';

function SearchItem({ artist, imgUrl, index }) {

    return (
        <Link to={`/artists/${artist.id}`} style={{ textDecoration:'none' }} >
            <li key={index} className='searchView-searchItem'>

                <img className='search-view__artists-image' src={imgUrl} alt={artist.name} />
                
                <div className='searchView-searchItem__text-style'>
                    <div className='searchView-artistItem__artist-name'>
                        <span>{artist.name} </span>
                        <span style={{ color: 'lightBlue' }}>
                        | Followers: {formatNum(artist.followers.total)}
                        </span>
                    </div>
                </div>

            </li> 
        </Link>
    )
}

export default SearchItem;