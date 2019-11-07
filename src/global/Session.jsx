import React, { Component } from 'react';
import './css/App.css';
import LoginView from './views/LoginView';
import {Switch,Route} from 'react-router-dom';
import Nav from './views/Nav';
import {ProtectedRoutes} from './routes/ProtectedRoutes';
import {PublicRoute} from './routes/PublicRoute';
import Error404 from './views/Error404';

class Session extends Component{
  constructor(props) {
    super(props);
    const token = localStorage.getItem('token');
    if(token){
      this.props.mutation({variables:{token}})  
    }
    
  }
    render(){
      return (
      <div>
        
        <Switch>
          <PublicRoute  exact path="/" component ={LoginView}/>
          <PublicRoute path="/login" component = {LoginView}/>
          <ProtectedRoutes path="/home" component =  {Nav} />
          <Route path="*" component={Error404} />
          
        </Switch>
      </div>
      );
    }
}

export default Session;
