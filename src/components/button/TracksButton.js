import React, { useContext } from 'react';
import { TracksContext } from '../../contexts/tracks/tracksContext';
import { LONG_TERM, MEDIUM_TERM, SHORT_TERM } from '../../contexts/tracks/tracksTypes';
import './styles/buttons.scss';

function TracksButton() {

    const { dispatch } = useContext(TracksContext);

    return (
        <div className='buttons-container'>
            <button className='button' onClick={() => dispatch({ type: LONG_TERM })}>LongTerm</button>
            <button className='button' onClick={() => dispatch({ type: MEDIUM_TERM })}>MediumTerm</button>
            <button className='button' onClick={() => dispatch({ type: SHORT_TERM })}>ShortTerm</button>
        </div>
    )
}

export default TracksButton;