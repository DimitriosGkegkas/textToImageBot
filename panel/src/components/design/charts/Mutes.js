import react, { Component } from 'react';
import * as Recharts from 'recharts';
import { Row, Col, Icon } from 'antd';

const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = Recharts;

export default class MuteChart extends Component {
    state = {
        pressed: false
    }

    render() {
        const  { width, height, data, title } = this.props;
        return (
            <div>
                <Row>
                    <Col><h3>{title}</h3></Col>
                </Row>
                <Row gutter={14}>
                    <Col span={24}>
                        <ResponsiveContainer width={width} height={height}>
                            <LineChart data={data}
                                margin={{top: 10, right: 30, left: 20, bottom: 5}}
                            >
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip/>
                                <Legend />
                                <Line name="Mutes" type="monotone" dataKey="mute" stroke="#8884d8" activeDot={{r: 8}}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </Col>
                </Row>
            </div>
        );
    }
};