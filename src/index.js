import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ApolloClient  from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import App from './global/App';
import 'antd/dist/antd.css';
const client = new ApolloClient({
    uri:"http://localhost:8000/graphql/"
})

ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));

