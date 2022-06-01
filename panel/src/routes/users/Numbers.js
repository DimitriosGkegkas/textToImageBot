import React from 'react';
import NumberCard from '../../components/design/cards/NumberCard';
import { Row, Col} from 'antd';

const Numbers = (props) => {

    const { users } = props;
    return (
        <div>
            <Row gutter={10}>
                <Col span={24}>
                    <NumberCard
                        icon='user'
                        color='black'
                        title='Συνολικοί Χρήστες '
                        number={users}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default Numbers