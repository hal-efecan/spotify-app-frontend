import React, { useContext } from 'react';
import { ArtistsContext } from '../../contexts/artists/artistsContext';
import { LONG_TERM, MEDIUM_TERM, SHORT_TERM } from '../../contexts/artists/artistsTypes'
import './styles/buttons.scss';

function ArtistsButton() {

    const { dispatch } = useContext(ArtistsContext);

    return (
        <div className='buttons-container'>
            <button className='button' onClick={() => dispatch({ type: LONG_TERM })} >LongTerm</button>
            <button className='button' onClick={() => dispatch({ type: MEDIUM_TERM })}>MediumTerm</button>
            <button className='button' onClick={() => dispatch({ type: SHORT_TERM })}>ShortTerm</button>
        </div>
    )
}

export default ArtistsButton;