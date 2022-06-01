import React from 'react';

import URLButton from './URLButton';


const ButtonForm = ({ type, ...rest }) => {
    return <URLButton type={type} {...rest} />

}

const CardButton = ({ index, type, changeButtonType, ...rest }) => {
    return (
        <div style={{ background: "rgb(189, 198, 241)", float: "left", width: "30%", "min-width": "300px", padding: "15px", "border-radius": "15px", margin: "15px", "max-width": "500px" }}>
            <hr />
            <ButtonForm index={index} type={type} {...rest} />
        </div>
    )


}

export default CardButton

/**
 * if(checked) {
        return (
            <Col span={16}>
                <Form.Item label="Post Link">
                    <Input
                        name="call_to_action"
                    />
                </Form.Item>
            </Col>
        )
    }
    return (
        <Col span={16}>
            <Form.Item label="Post Link">
                <Select
                    placeholder="Select postback"
                >
                    <Option value="test">Κοντινότερο Πρακτορείο</Option>
                    <Option value="test2">Προσθήκη Ομάδας</Option>
                </Select>
            </Form.Item>
        </Col>
    );

 *

    <Row gutter={12}>
                <Form.Item label="Button Type">
                    <Col span={3}>
                        <Checkbox
                            checked={checked}
                            onChange={() => changeButton('url')}
                        >
                            Postback
                        </Checkbox>
                    </Col>
                    <Col span={3}>
                        <Checkbox
                            checked={!checked}
                            onChange={() => changeButton('postback')}
                        >
                            URL
                        </Checkbox>
                    </Col>
                </Form.Item>
            </Row>
     <Row>
                <Buttons checked={checked} error={error.call_to_action} onChange={inputChange}/>
            </Row>
 */
