import React, { useEffect, useState, useContext } from 'react';
import Loading from '../loading/Loading';
import { tokenContext } from '../../contexts/token/tokenContext';
import { headers, setLocalDisplayName, setLocalUserImage, setUserFollowers, 
    setUserFollowing, setUsersPlaylists, setLocalUserId } from '../../helpers/helperFunctions';
import './styles/user-summary.scss'

function UserSummary() {

    const [ accessToken ] = useContext(tokenContext)

    const [ userInfo, setUserInfo ] = useState({
        userId: '',
        displayName: '',
        userImage: '',
        userFollowers: null,
        loading: true
    })
    const [ following, setFollowing ] = useState({
        total: null,
        loading: true
    })
    const [ playlists, setPlaylists ] = useState({
        total: null,
        loading: true
    })

    useEffect(() => {
        const display_name = window.localStorage.getItem('display_name')
        const user_image = window.localStorage.getItem('user_image')
        const user_followers = window.localStorage.getItem('user_followers')
        const user_Id = window.localStorage.getItem('user_Id')

        async function fetchUserInfo(){

            try {
                const api = 'https://api.spotify.com/v1/me';
                const response = await fetch(api, headers('GET', accessToken))
                const data = await response.json()
                    console.log(data)
                        setUserInfo({
                            userId: data.id,
                            displayName: data.display_name,
                            userImage: data.images[0].url,
                            userFollowers: data.followers.total,
                            loading: false
                        })
                   
                    // After inital API call cache into local storage: display_name, user_image, followers & user_Id to local storage
                    setLocalDisplayName(data.display_name)
                    setLocalUserImage(data.images[0].url)
                    setUserFollowers(data.followers.total)
                    setLocalUserId(data.id) 
            } catch (err) {
                console.log(err)
            }
        }
        // If nothing stored in localStorage then make API call
        if(!user_Id && !display_name && !user_image && !user_followers) {
            fetchUserInfo()
        } else {
        // otherwise set what is in localStorage as the userInfo state
            setUserInfo({
                userId: user_Id,
                displayName: display_name,
                userImage: user_image,
                userFollowers: user_followers,
                loading: false
            })
        }
    }, [accessToken])
    useEffect(() => {

        const user_following = window.localStorage.getItem('user_following')

        async function fetchUserFollowing() {
            try {
                const apiUrl = "https://api.spotify.com/v1/me/following?type=artist";
                const response = await fetch(apiUrl, headers('GET', accessToken))
                const data = await response.json()
                    setFollowing({
                        total: data.artists.total,
                        loading: false
                    })
                    setUserFollowing(data.artists.total) // saves to localStorage
            } catch(err) {
                console.log(err)
            }
        }

        if(!user_following || user_following === 'undefined') {
                fetchUserFollowing()
        } else {
            setFollowing({
                total: user_following,
                loading: false
            })
        }

    }, [accessToken])
    useEffect(() => {
        const users_playlists = window.localStorage.getItem('users_playlists')

        async function fetchUserPlaylists() {
            try {
                const apiUrl = `https://api.spotify.com/v1/users/${userInfo.userId}/playlists`;
                const response = await fetch(apiUrl, headers('GET', accessToken))
                const data = await response.json()
                    setPlaylists({
                        total: data.total,
                        loading: false
                    })
                    setUsersPlaylists(data.total) // saves to localStorage
            } catch(err) {
                console.log(err)
            }
        }

        if(!users_playlists || users_playlists === 'undefined') {
            setTimeout(() => {
                fetchUserPlaylists()
            }, 500)
        } else {
            setPlaylists({
                total: users_playlists,
                loading: false
            })
        }

    }, [userInfo.userId, accessToken])

    return (
        userInfo.loading && following.loading && playlists.loading ? 
        <div className="loading-container">
            <Loading /> 
        </div> :
 
            <div className='user-summary__container'>

                <div className='user-summary__image-container'>
                    <img className='user-summary__image' src={userInfo.userImage} alt='users-profile' />
                    <h2 className='user-summary__name'>{userInfo.displayName}</h2>  
                </div>

                <ul className='user-summary__tags-container'>
                    <li className='user-summary__tags'>Followers: {userInfo.userFollowers}</li>
                    <li className='user-summary__tags'>Following: {following.total}</li>
                    <li className='user-summary__tags'>Playlists: {playlists.total}</li>
                </ul>

            </div>
    )
}

export default UserSummary;