import React, { useState } from 'react';
import { SearchedArtistsContext } from './searchedArtistsContext';

function SearchedArtistsProvider({ children }) {

    const [ searchedArtists, setSearchedArtists ] = useState([])

    return (
        <SearchedArtistsContext.Provider value={ [searchedArtists, setSearchedArtists] }>
            { children }
        </SearchedArtistsContext.Provider>

    )
}

export default SearchedArtistsProvider;