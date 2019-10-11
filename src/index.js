import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ApolloClient  from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import App from './global/App';
import 'antd/dist/antd.css';
import {BrowserRouter as Router} from 'react-router-dom';
const client = new ApolloClient({
    uri:"http://localhost:8000/graphql/"
})

ReactDOM.render(<ApolloProvider client={client}><Router><App /></Router></ApolloProvider>, document.getElementById('root'));

