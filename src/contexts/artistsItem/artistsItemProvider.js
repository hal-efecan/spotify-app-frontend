import React, { useState } from 'react';
import { ArtistsItemContext } from './artistsItemContext';

function ArtistsItemProvider({ children }) {

    const [ route, setArtistsRoute ] = useState(false)

    return (
        <ArtistsItemContext.Provider value={[route, setArtistsRoute]}>
            { children }
        </ArtistsItemContext.Provider>
    )
}

export default ArtistsItemProvider;