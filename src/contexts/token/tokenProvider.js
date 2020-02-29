import React, { useEffect, useState } from 'react';
import { tokenContext, refreshTokenContext } from './tokenContext';
import { headers, access_token, refresh_token, 
    setLocalAccessToken, setLocalRefreshToken, setTokenTimestamp } from '../../helpers/helperFunctions';

function TokenProvider(props) {

    const [ accessToken, setAccessToken ] = useState([])
    const [ refreshToken, setRefreshToken ] = useState([])

    const refreshTokenFn = async () => {
        let refresh_token = window.localStorage.getItem('refresh_token')
        const apiUrl = `https://hidden-depths-47482.herokuapp.com/refresh_token?refresh_token=${refresh_token}`
        
        try {
            const response = await fetch(apiUrl, headers(refresh_token))
            const data = await response.json()
            setLocalAccessToken(data.access_token)
            setAccessToken(data.access_token)
            setTokenTimestamp()
        } catch (err) {
            console.log(err)
        }
    }
    
    // to refresh token every 55mins
    setTimeout(() => {
        refreshTokenFn()
    }, 3300000)

    useEffect(() => {
        setAccessToken(access_token)
        setTokenTimestamp()
        setLocalAccessToken(access_token)
        setRefreshToken(refresh_token)
        setLocalRefreshToken(refresh_token)
    },[])

    return (
            <tokenContext.Provider value={[ accessToken, setAccessToken ]}>
                <refreshTokenContext.Provider value={[ refreshToken, setRefreshToken ]}>
                    { props.children }
                </refreshTokenContext.Provider>
            </tokenContext.Provider>
    )
}

export default TokenProvider;