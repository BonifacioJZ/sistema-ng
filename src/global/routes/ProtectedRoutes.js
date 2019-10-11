import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import Auth from '../variables/auth';

export const ProtectedRoutes = ({component: Component,...rest}) =>{
    return (
        <Route {...rest} render={
            (props)=>{
                return(
                (Auth.isAuthentication)? <Component {...props} />
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