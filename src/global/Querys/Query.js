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

const ADD_NOTEE = gql`
mutation CreateNote($input:NotaInput!){
  createNote(input:$input){
    ok,
    note{
      id
    }
  }
}`
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
const UPDATE_EXPEDIENTE=gql`
mutation UpdateExpedient($id:Int!,$input:UExpedientInput!){
  updateExpediente(id:$id,input:$input){
    ok,
    expedient{
      id
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
const UPDATE_NOTE_EXPEDIENT= gql`
mutation UpdateNoteExpedient($id:Int!,$input:NoteInput!){
  updateNoteExpedient(id:$id,input:$input){
    ok,
    note{
      id
    }
  }
}`;

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
    ADD_NOTEE ,
    UPDATE_EXPEDIENTE,
    UPDATE_NOTE_EXPEDIENT,

    //Query
    ADD_PACIENTE,
    PACIENTES_DATA
}