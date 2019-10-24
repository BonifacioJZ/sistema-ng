import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {ApolloClient,HttpLink,InMemoryCache}  from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import App from './global/App';
import 'antd/dist/antd.css';
import {BrowserRouter as Router} from 'react-router-dom';
console.log("hola")
const httplink = new HttpLink({ uri:"http://localhost:8000/graphql/"}) 
const client = new ApolloClient({
   link:httplink,
   request:(operation)=>{
      const token = localStorage.getItem('token')
      operation.setContext({
         header:{
            authorization:token ? `jwt ${token}`:''
         }
      })
   },
   cache:new InMemoryCache()
})

ReactDOM.render(<ApolloProvider client={client}><Router>
<App /></Router></ApolloProvider>, document.getElementById('root'));

