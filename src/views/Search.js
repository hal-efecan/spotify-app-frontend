import React from 'react';
import Navigation from '../components/navigation/Navigation'
import SearchForm from '../components/search/SearchForm';
import './views-scss/search.view.scss';
import SearchRender from '../components/search/SearchRender';

function Search() {

    return (
        <div>
            <div className='nav'>
                <Navigation />
            </div>
            <div className='search'>
                <SearchForm />
                <SearchRender />
            </div>
        </div>
    )
}

export default Search;