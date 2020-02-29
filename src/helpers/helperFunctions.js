// To get access_token + refresh_token on app initialization
export const getHashParams = () => {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}
export const access_token = getHashParams().access_token
export const refresh_token = getHashParams().refresh_token

// Local storage cache - Set accessToken + refreshToken states + setting tokenTimestamps
export const setTokenTimestamp = () => {
    return window.localStorage.setItem('token_timestamp', Date.now())
}
export const setLocalAccessToken = (token) => {
    return window.localStorage.setItem('access_token', token)
} 
export const setLocalRefreshToken = (refresh_token) => {
    return window.localStorage.setItem('refresh_token', refresh_token)
}
export const setLocalDisplayName = data => {
    return window.localStorage.setItem('display_name', data)
}
export const setLocalUserImage = data => {
    return window.localStorage.setItem('user_image', data)
}
export const setUserFollowers = data => {
    return window.localStorage.setItem('user_followers', data)
}
export const setUserFollowing = data => {
    return window.localStorage.setItem('user_following', data)
}
export const setUsersPlaylists = data => {
    return window.localStorage.setItem('users_playlists', JSON.stringify(data))
}
export const setLocalUserId = data => {
    return window.localStorage.setItem('user_Id', data)
}

//////////// API header
export const headers = (method, accessToken) => {
    return { 'method': `${method}`, headers: { 'Authorization': `Bearer  ${accessToken}` }}
}

// Number formatting
export const trackDuration = (duration) => {
    return ((duration/1000)/60).toFixed(2)
}

export const formatNum = (number) => {
    if(number > 0) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
        return 0
    }
}

// export const getBackendUri = () => {
//     let backend_uri = process.env.BACKEND_URI
//     if(process.env.NODE_ENV !== 'production') {
//         backend_uri = `http://localhost:8888/artists`
//     } else {
//         backend_uri = process.env.BACKEND_URI
//     }
//     return [backend_uri]
// }