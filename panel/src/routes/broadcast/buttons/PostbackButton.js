import React from 'react';
import { Col, Form, Select, Row, Input } from 'antd';
import data from './PostbackData';

const Option = Select.Option;

const PostbackButton = ({ index, payload, changeButtonFields, title }) => {
    return (
        <span>
        <h3>Postback Button</h3>
        <Row>
            <Col span={8}>
                <Form.Item label="Button Title">
                    <Input 
                        value={title}
                        onChange={(event) => changeButtonFields(index, { title: event.target.value})}
                    />
                </Form.Item>
            </Col>
        </Row>
        <Row>
            <Col span={16}>
                <Form.Item label="Bot Flow">
                    <Select
                        placeholder="Select postback"
                        onChange={(value) => changeButtonFields(index, { payload: value })}
                        value={payload}
                    >
                    </Select>
                </Form.Item>
            </Col>
        </Row>
    </span>
    )
}

export default PostbackButton;