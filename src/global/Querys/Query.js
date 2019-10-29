import {gql} from 'apollo-boost';

//Mutations
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
const ADD_PACIENTE = gql`
mutation CreatePaciete($input:PacienteInput!){
  createPaciente(input:$input){
    ok,
    pacienteUser{
      nombre
    }
  }
}
`

//Query's Consultas
//Consulta de los datos

const PACIENTES_DATA = gql`
query Pacientes2($page:Int!){
  pacientes2(page:$page){
    page,
    pages,
    hasNext,
    hasPrev,
    objects{
      nombre,
      apellidos,
      edad,
      ciudad,
      colonia
    }
  }
}
`;
const PRUEBA_TOKEN = gql `
{
  users{
    username
  }
}

`;

export  {
 USER_LOGIN,
 VERIFY_TOKEN,
 PRUEBA_TOKEN,
 ADD_PACIENTE,
 PACIENTES_DATA
}