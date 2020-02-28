import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/navigation.scss';
// Icon imports
import IconClock from '../icons/IconClock';
import IconMusic from '../icons/IconMusic';
import IconMicrophone from '../icons/IconMicrophone';
import IconSearch from '../icons/IconSearch';
import IconHome from '../icons/IconHome';

function Navigation() {

    return (
        <div className='navigation-wrapper'>

                <NavLink to='/' className='navigation-item'>
                    <div className='navigation-item__name-icon-container'>
                        <IconHome />
                        <h3 className='navigation-item__name-icon-container__name'>
                        Profile
                        </h3>
                    </div>
                </NavLink>
                <NavLink to='/search' className='navigation-item'>
                    <div className='navigation-item__name-icon-container'>
                        <IconSearch />
                        <h3 className='navigation-item__name-icon-container__name'>
                        Search
                        </h3>
                    </div>
                </NavLink>
                <NavLink to='/artists' className='navigation-item'>
                    <div className='navigation-item__name-icon-container'>
                        <IconMicrophone />
                        <h3 className='navigation-item__name-icon-container__name'>
                        Artists
                        </h3>
                    </div>
                </NavLink>
                <NavLink to='/tracks' className='navigation-item'>
                    <div className='navigation-item__name-icon-container'>
                        <IconMusic />
                        <h3 className='navigation-item__name-icon-container__name'>
                        Tracks
                        </h3>
                    </div>
                </NavLink>
                <NavLink to='/recent' className='navigation-item'>
                    <div className='navigation-item__name-icon-container'>
                        <IconClock />
                        <h3 className='navigation-item__name-icon-container__name'>
                        Recent
                        </h3>
                    </div>
                </NavLink>

        </div>
    )
}

export default Navigation