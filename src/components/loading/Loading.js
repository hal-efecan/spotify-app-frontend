import React from 'react';

function Loading() {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignContent: 'center', marginLeft: '275px'}}>
            {/* <h1>Loading...</h1> */}
            <div className="spinner">
            </div>
            
        </div>
    )
}

export default Loading;