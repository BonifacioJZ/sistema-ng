import React from 'react';
import {Icon,Button} from 'antd';
import {Link} from 'react-router-dom'


function IconText({type,theme,id,direccion,color}){
    const url =    `${direccion}/${id}`
    return(
        <span>
            <Link to={url}>
                <Button >
                    <Icon type={type} twoToneColor={color} theme={theme}  />
                </Button>
            </Link>
        </span>
    )
}

export default IconText