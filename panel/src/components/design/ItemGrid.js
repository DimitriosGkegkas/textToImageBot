import react from 'react';
import { Collapse, Row, Col, List, Button } from 'antd';

/**
 * 
 * @param {items, columns, gutter, actions, itemKey, verticalPadding} param0 
 */
const ItemGrid = ({ items, columns , gutter, actions, verticalPadding, style: bodyStyle, itemKey }) => {
    const rows = [[]];
    let columnCount = 0;
    for(let item of items) {
        if(columnCount >= columns) {
            rows.push([])
            columnCount = 0;
        } 
        columnCount++;
        rows[rows.length - 1].push(item)
    }
    const span = 24/columns;
    return (
        <div style={bodyStyle}>
            {rows.map((row, index) => {
                return <Row key={index} gutter={gutter} style={{ paddingBottom: verticalPadding}}>
                    {row.map((item, index) => {
                        const key = itemKey(item.props)
                        return <Col key={key} span={span}>{item}</Col>
                    })}
                </Row>
            })}
            {actions}
        </div>)
}

export default ItemGrid;