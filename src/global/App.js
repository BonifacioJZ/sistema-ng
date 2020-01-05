import React from 'react';
import Session from './Session';
import {VERIFY_TOKEN} from './Querys/Query';
import {useMutation} from '@apollo/react-hooks';


const  App = (props)=>{
   
    const [VERIFY] = useMutation(VERIFY_TOKEN,{
        onError(err){
            localStorage.removeItem('session')
        }
    });
    return (
        <Session mutation={VERIFY} />
    );
}

export default App