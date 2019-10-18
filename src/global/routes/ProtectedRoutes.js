import React from 'react';
import {Route,Redirect} from 'react-router-dom';
let login=false
export const ProtectedRoutes = ({component: Component,...rest}) =>{
    if(sessionStorage.getItem('session')){
        login=true
    }
    return (
        <Route {...rest} render={
            (props)=>{
                return(
                (login)? <Component {...props} />
                :<Redirect to={{
                    pathname:"/login",
                    state:{
                        from: props.location
                    }
                }}/>
                )
            }
        } />
    )
}