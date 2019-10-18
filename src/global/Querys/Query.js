import {gql} from 'apollo-boost';

const USER_LOGIN = gql`
mutation TokenAuth($username: String!, $password: String!) {
  tokenAuth(username: $username, password: $password) {
      token
  }
}`;
const VERIFY_TOKEN = gql `
mutation VerifyToken($token:String!){
	verifyToken(token:$token){
    payload
  }
}
`; 

export  {
 USER_LOGIN,
 VERIFY_TOKEN
}