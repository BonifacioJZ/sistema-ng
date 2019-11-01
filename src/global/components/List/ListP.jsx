import React ,{useState}from 'react'
import {Pagination,Layout,List} from 'antd'
import {useQuery,useLazyQuery} from '@apollo/react-hooks';
import {PACIENTES_DATA} from './../../Querys/Query';
const {Footer} = Layout;


function ListP (){
    const [Page, setPage] = useState(1);
    const [total,setTotal] = useState(50);
    let datos = []
    const { loading, data } = useQuery(PACIENTES_DATA,{
        variables:{page:Page},
        onCompleted(data){
            console.log(data.patients)
            setPage(data.patients.page)
            datos = data.patients.objects
            console.log(datos)
        }
    })
    let onChange=()=> {
        datos= datos 
        console.log(datos)
    }
    
    return(
        
        <div>
            <List 
                itemLayout="horizontal"
                loading={loading}
                dataSource={datos}
                renderItem={item=>(
                    <List.Item>
                        <List.Item.Meta
                        
                        />
                    </List.Item>
                )}
            />
            <Footer>
                <Pagination defaultCurrent={Page} onChange={onChange}  pageSize={2} total={total}/>
            </Footer>
        </div>
    )
}

export default ListP