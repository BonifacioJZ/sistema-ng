import React from 'react'
import {Pagination,Layout} from 'antd'
const {Footer} = Layout;

function ListP (){
    let estado = {
        page:1,
        total:50
    }
    return(
        <div>
            <Footer>
                <Pagination defaultCurrent={estado.page} total={estado.total}/>
            </Footer>
        </div>
    )
}

export default ListP