import React from 'react';
import { Button } from 'antd';

const Buttons = ({ titles }) => {
    return (

        titles.map(title => {
            return (<Button style={{ width: '100%', marginTop: '10px', height: '40%', minHeight: '15px' }}>
                {title}
            </Button>)
        })




    )
}

export default Buttons;