import React,{Component} from 'react';
import './css/App.css';
import LoginView from './views/LoginView';
import {Switch,Route} from 'react-router-dom';
import Nav from './views/Nav';
import {ProtectedRoutes} from './routes/ProtectedRoutes';
class App extends Component {
 
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

export default App;
