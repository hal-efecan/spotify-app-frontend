import React, { useEffect } from 'react';

function LogIn() {

    function handleServerRedirect() {
        // let backend_uri = process.env.BACKEND_URI
        if(process.env.NODE_ENV !== 'production') {
          // window.location.href = `https://hidden-depths-47482.herokuapp.com/login`
            window.location.href  = `http://localhost:8888/login`
        } else {
            // window.location.href  = backend_uri 
            window.location.href = `https://hidden-depths-47482.herokuapp.com/login`
        }
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