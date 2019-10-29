import React ,{useState}from 'react'
import {Pagination,Layout} from 'antd'
import {useQuery,useLazyQuery} from '@apollo/react-hooks';
import {PACIENTES_DATA} from './../../Querys/Query';
const {Footer} = Layout;


function ListP (){
    const [Page, setPage] = useState(1);
    const [total,setTotal] = useState(50)
    const { data } = useQuery(PACIENTES_DATA,{
        variables:{page:Page},
        onCompleted(data){
            console.log(data.patients)
            setPage(data.patients.page)
        }
    })
    
    return(
        
        <div>
            <Footer>
                <Pagination defaultCurrent={Page}  pageSize={2} total={total}/>
            </Footer>
        </div>
    )
}

export default ListP