import React, { useState } from 'react'
import { TracksItemContext } from './tracksItemContext';

function TracksItemProvider({ children }) {

    const [ route, setTracksRoute ] = useState(false)

    return (
        <TracksItemContext.Provider value={[ route, setTracksRoute ]}>
            { children }
        </TracksItemContext.Provider>
    )
}

export default TracksItemProvider;