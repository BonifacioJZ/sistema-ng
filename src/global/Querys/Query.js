import { gql } from 'apollo-boost';

//Mutations
const USER_LOGIN = gql `
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
const ADD_PACIENTE = gql `
mutation CreatePaciete($input:PacienteInput!){
  createPaciente(input:$input){
    ok,
    pacienteUser{
      id,
      nombre
    }
  }
}
`

const UPDATE_PATIENT = gql `
mutation UpdatePaciente($id:Int!,$input:PacienteInput!){
  updatePaciente(id:$id,input:$input){
    ok,
    patient{
      id,
      nombre
    }
  }
}
`;

const CREAT_EXPEDIENTE = gql`
mutation CreateExpediente($input:ExpedientInput!){
  createExpediente(input:$input){
    ok,
    expedient{
      id
    }
  }
}
`;

//Query's Consultas
//Consulta de los datos

const PACIENTES_DATA = gql `
query Patients($page:Int!){
  patients(page:$page){
    page,
    pages,
    total,
    hasNext,
    hasPrev,
    objects{
      id,
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

export {
    //Mutation
    USER_LOGIN,
    VERIFY_TOKEN,
    PRUEBA_TOKEN,
    CREAT_EXPEDIENTE,
    UPDATE_PATIENT,
    //Query
    ADD_PACIENTE,
    PACIENTES_DATA
}