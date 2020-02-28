import React, { useEffect } from 'react';

function LogIn() {

    function handleServerRedirect() {
        // window.location.href = `http://localhost:8888/login`
        // window.location.href  = `https://pure-taiga-22805.herokuapp.com/login`
        window.location.href = `https://powerful-depths-31730.herokuapp.com/login`
      }
      
      useEffect(() => {
        handleServerRedirect()
      },[])

    return (
            <div className="LogIn">
              {/* Loading gif to show before redirect to server login route */}
            </div>
    )
}

export default LogIn;