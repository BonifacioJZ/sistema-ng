import React from 'react';
import {Route,Redirect} from 'react-router-dom';
let login=false
export const PublicRoute = ({component: Component,...rest}) =>{
    if(localStorage.getItem('session')){
        login=true
    }
    return (
        <Route {...rest} render={
            (props)=>{
                return(
                (login)? <Redirect to={{
                    pathname:"/home",
                    state:{
                        from:props.location
                    }
                }} />
                :<Component {...props}/>
                )
            }
        } />
    )
}