import React, { useEffect } from 'react';

function LogIn() {

    function handleServerRedirect() {

        const returnEnv = (env) => {
          switch(env) {
            case 'dev':
              return `http://localhost:8888/login`;
            case 'prod':
              return `https://hidden-depths-47482.herokuapp.com/login`;
            default:
              return
          }
        }
        window.location.href = returnEnv('prod')
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