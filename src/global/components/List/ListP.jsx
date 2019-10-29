import React from 'react'
import {Pagination,Layout} from 'antd'
const {Footer} = Layout;

function ListP (){
    return(
        <div>
            <Footer>
                <Pagination defaultCurrent={1} pageSize={10}/>
            </Footer>
        </div>
    )
}

export default ListP