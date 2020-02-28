import React, { useContext } from 'react';
import SearchItem from '../search/SearchItem';
import './styles/search-form.scss';
import { SearchedArtistsContext } from '../../contexts/search/searchedArtistsContext';

function SearchRender() {

    const [ artists, ] = useContext(SearchedArtistsContext)
    
    return (
        <ul className="serch-render__results">

        { artists.map((artist, index) => {

            const img = artist.images[0];
            const imgUrl = img ? img.url : "http://placekitten.com/g/200/300";

            return <SearchItem key={index} artist={artist} imgUrl={imgUrl} index={index} style={{ margin: '20px' }} />

            })
        }
    </ul>
    )
}

export default SearchRender;