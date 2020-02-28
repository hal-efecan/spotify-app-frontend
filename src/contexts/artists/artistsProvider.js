import React, { useReducer } from 'react';
import { ArtistsContext } from './artistsContext';
import { artistsReducer } from './artistsReducer';

const ArtistsProvider = props => {

    const intialState = {
        term: 'long_term'
    }

    const [state, dispatch] = useReducer(artistsReducer, intialState)

    return  (
        <ArtistsContext.Provider value={{ state, dispatch }}>
            { props.children }
        </ArtistsContext.Provider>
    )
}

export default ArtistsProvider;