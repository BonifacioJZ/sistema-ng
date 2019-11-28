import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ApolloClient from "apollo-client";
import {InMemoryCache}  from 'apollo-boost';
import {createHttpLink } from 'apollo-link-http';
import { ApolloLink } from "apollo-link";
import {ApolloProvider} from '@apollo/react-hooks';
import App from './global/App';
import 'antd/dist/antd.css';
import {BrowserRouter as Router} from 'react-router-dom';
import { url } from './global/variables/os';


const httplink = new createHttpLink({ uri:url}) 

const authLink = new ApolloLink((operation,forward)=>{

   const token = localStorage.getItem('token')
   operation.setContext({
      headers:{
         authorization: token ? `JWT ${token}` : "",
      }
   })
   return forward(operation)
})

const client = new ApolloClient({
   link:authLink.concat(httplink),
   cache:new InMemoryCache()
})


ReactDOM.render(<ApolloProvider client={client}><Router>
<App /></Router></ApolloProvider>, document.getElementById('root'));

