import React from 'react';
import {Result,Button,Layout} from 'antd';
import {prefix} from './../variables/os'
const {Content} =Layout


function Error404 (){
    return(
        <div>
            <Content style={{ margin: '24px 16px 0' }}>
                 <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Result
                        status="404"
                        title="404"
                        subTitle="La pagina que consulto no existe"
                        extra={<Button  type="primary" onClick={()=>{ window.location.href=`${prefix}`} } >Regresar</Button>}
                    />
                 </div>
            </Content>
        </div>
    )
}

export default Error404