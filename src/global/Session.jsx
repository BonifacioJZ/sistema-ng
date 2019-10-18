import React, { Component } from 'react';
import './css/App.css';
import LoginView from './views/LoginView';
import {Switch,Route} from 'react-router-dom';
import Nav from './views/Nav';
import {ProtectedRoutes} from './routes/ProtectedRoutes';


class Session extends Component{
  constructor(props) {
    super(props);
    const token = sessionStorage.getItem('token');
    if(token){
      this.props.mutation({variables:{token}})  
    }
    
  }
    render(){
      return (
      <div>
        
        <Switch>
          <Route  exact path="/" component ={LoginView}/>
          <Route path="/login" component = {LoginView}/>
          <ProtectedRoutes path="/home" component =  {Nav} />
          <Route path="*">
              <h1>404</h1>
          </Route>
          
        </Switch>
      </div>
      );
    }
}

export default Session;
