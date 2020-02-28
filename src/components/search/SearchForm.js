import React, { useState, useContext } from 'react';
import { tokenContext } from '../../contexts/token/tokenContext';
import { SearchedArtistsContext } from '../../contexts/search/searchedArtistsContext';
import { headers } from '../../helpers/helperFunctions';
import './styles/search-form.scss';
import '../../views/views-scss/search.view.scss';

function SearchForm() {

    const [ accessToken ] = useContext(tokenContext)
    const [ , setSearchedArtists ] = useContext(SearchedArtistsContext);

    const [query, setQuery] = useState('');

    async function fetchArtist() {
        try {
            const apiUrl   = `https://api.spotify.com/v1/search?q=${query}&type=artist`;
            const response = await fetch(apiUrl, headers('GET', accessToken))
            const data     = await response.json()
                setSearchedArtists(data.artists.items)
        } catch(err) {
            console.log(err)
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetchArtist();
        setQuery('')
    }
    function handleChange(e) {
        const searchInput = e.target.value
        searchInput ? setQuery(e.target.value) : setQuery('')
    }

    return(
                    <form onSubmit={handleSubmit} className='search-container'>
                        <h1 className='search-form__header'>Artist Search</h1>
                        <div className='search-form__input-button-container'> 
                            <input className='search-form__input' type="text" value={query} onChange={handleChange} />
                            <button className="search-view__button">Search</button>
                        </div>
                    </form>
    )
}

export default SearchForm;