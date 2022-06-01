import react, { Component } from 'react';
import * as Recharts from 'recharts';
import { Row, Col, Icon, Button } from 'antd';

const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = Recharts;

export default class Facebook extends Component {

    right = () => {
        const { data } = {...this.state};
        data.push({
            name: data.length,
            mute: data.length * 10
        })
        this.setState({
            data
        })
    }

    left = () => {
        console.log('clicked left');
    }
    render() {
        const  { width, height, title } = this.props;
        const { reports, blocks } = this.props.data || { reports: [], blocks: [] }
        const summedReports = []
        const summedBlocks = []
        if(reports.length > 0 && blocks.length > 0) {
            summedBlocks.push(blocks[0].values.total);
            summedReports.push({
                spam: reports[0].values.spam,
                other: reports[0].values.other,
                total: reports[0].values.total,
                inappropriate: reports[0].values.inappropriate
            });
            for(let i = 1; i < reports.length - 1; i++) {
                summedBlocks.push(summedBlocks[i - 1] + blocks[i].values.total);
                summedReports.push({});
                for(let key in reports[i].values) {
                    summedReports[i][key] = summedReports[i - 1][key] + reports[i].values[key]
                }
            }
        }
        const formatted = summedReports.map((element, index) => {
            return {
                reports: element.total,
                blocks: summedBlocks[index],
                date: new Date(reports[index].date).toDateString(),
                index
            }
        });
        return (
            <div>
                <Row>
                    <Col><h3>{title}</h3></Col>
                </Row>
                <Row gutter={14}>
                    <Col span={24}>
                        <ResponsiveContainer width={width} height={height}>
                            <LineChart data={formatted}
                                margin={{top: 10, right: 30, left: 20, bottom: 5}}
                            >
                                <Tooltip formatter={(value, name, props) => {
                                    let total, other, spam, inappropriate;
                                    switch(name) {
                                        case 'reports':
                                            ({ total, inappropriate, spam, other } = summedReports[props.payload.index])
                                            return (
                                                <ul>
                                                    <li>inappropriate : {inappropriate}</li>
                                                    <li>spam : {spam}</li>
                                                    <li>other : {other}</li>
                                                    <li>total : {total}</li>
                                                </ul>
                                            )
                                            case 'blocks':
                                                total = summedBlocks[props.payload.index];
                                                return (
                                                    <ul>
                                                        <li>total : {total}</li>
                                                    </ul>
                                                )

                                    }
                                }}/>
                                <XAxis dataKey="date"/>
                                <YAxis/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Legend />
                                <Line
                                    type="linear"
                                    dataKey="blocks"
                                    stroke="#8884d8"
                                    activeDot={{r: 8}}
                                />
                                <Line type="linear" dataKey="reports" stroke="#c93241" activeDot={{r: 8}}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </Col>
                </Row>
            </div>
        );
    }
};
