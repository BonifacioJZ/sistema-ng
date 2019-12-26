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
const UPDATE_MEDICINE = gql`
mutation UpdateMedicine($id:Int!,$input:MedicineInput!){
  updateMedicine(id:$id,input:$input){
    ok,
    medicine{
      id
    }
  }
}`
const UPDATE_NOTE_EXPEDIENT= gql`
mutation UpdateNoteExpedient($id:Int!,$input:NoteInput!){
  updateNoteExpedient(id:$id,input:$input){
    ok,
    note{
      id
    }
  }
}`;
//Delete
const DELETE_MEDICINE=gql`
mutation DeleteMedicine($id:Int!){
  deleteMedicine(id:$id){
    ok
  }
}`
const DELETE_NOTE_EXPEDIENT=gql`
mutation DeleteNoteExpedient($id:Int!){
  deleteNoteExpedient(id:$id){
    ok
  }
}`
const DELETE_EXPEDIENT=gql`
mutation DeleteExpedient($id:Int!){
  deleteExpedient(id:$id){
    ok
  }
}`
const ADD_MEDICINE = gql`
mutation CreateMedicine($input:MedicineInput!){
  createMedicine(input:$input){
    ok,
    medicine{
      id
    }
  }
}`
//Query's Consultas
const SEARCH_PATIENT = gql`
query Busquedap($busqueda:String!,$por:String!){
  busquedap(busqueda:$busqueda,por:$por){
    id,
    nombre,
    apellidos,
    edad,
    birthday
  }
}`
const SEARCH_MEDICINE =gql`
query Busquedam($busqueda:String!,$por:String!){
  busquedam(busqueda:$busqueda,por:$por){
    nombre,
    laboratorio,
    formula
  }
}`
const SEARCH_EXPEDIENT = gql`
query  Busquedae($por:String!){
  busquedae(por:$por){
    expedienteSet{
      id,
      hoara,
      date,
    }
  }
}`
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
    ADD_MEDICINE,
    UPDATE_MEDICINE,
    //Query
    ADD_PACIENTE,
    SEARCH_PATIENT,
    PACIENTES_DATA,
    SEARCH_MEDICINE,
    SEARCH_EXPEDIENT,
    //DeleteQuery's
    DELETE_NOTE_EXPEDIENT,
    DELETE_EXPEDIENT,
    DELETE_MEDICINE,
    
}