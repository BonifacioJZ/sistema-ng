import React,{Component} from 'react';
import './css/App.css';
import LoginView from './views/LoginView';
import Home from './views/Home';

class App extends Component {
 
  render(){
      return (
      <LoginView/>
    );
    
    }
}

export default App;
