//Elementos que estaban desde que se genero el proyecto.
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './global/App';
//importaciones de Apollo
import ApolloClient from "apollo-client";
import {InMemoryCache}  from 'apollo-boost';
import {createHttpLink } from 'apollo-link-http';
import { ApolloLink } from "apollo-link";
import {ApolloProvider} from '@apollo/react-hooks';
//Importaciones de antd
import 'antd/dist/antd.css';
//Importaciones del Router dom
import {BrowserRouter as Router} from 'react-router-dom';
import { url } from './global/variables/os';

///Creacion de un objeto con la url
const httplink = new createHttpLink({ uri:url}) 
// creacion del link para graphql 
const authLink = new ApolloLink((operation,forward)=>{

   const token = localStorage.getItem('token')
   operation.setContext({
      //asignando los header
      headers:{
         authorization: token ? `JWT ${token}` : "",
      }
   })
   return forward(operation)
})

//Creacion del client
const client = new ApolloClient({
   link:authLink.concat(httplink),
   cache:new InMemoryCache()
})


ReactDOM.render(<ApolloProvider client={client}><Router>
<App /></Router></ApolloProvider>, document.getElementById('root'));

