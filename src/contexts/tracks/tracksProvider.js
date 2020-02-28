import React, { useReducer } from 'react';
import { TracksContext } from './tracksContext';
import { tracksReducer } from './tracksReducer';

const TracksProvider = props => {

    const intialState = {
        term: 'long_term'
    }

    const [state, dispatch] = useReducer(tracksReducer, intialState)

    return  (
        <TracksContext.Provider value={{ state, dispatch }}>
            { props.children }
        </TracksContext.Provider>
    )
}

export default TracksProvider;