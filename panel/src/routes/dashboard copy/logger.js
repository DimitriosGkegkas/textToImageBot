import React, { Component } from 'react';
import { Row } from 'antd';
import { connect } from 'dva';
import getColumnConfig from './TableConfig';
import InfiniteTable from '../../components/InfiniteTable';

class Messages extends Component {

    state = {
        delayTimer: null
    }

    handleScroll() {
        const { type } = this.props;
        console.log(type)
        if (!this.props.loading) {
            this.props.dispatch({ type: 'messages/getMore', payload: { type } })
        }
    }

    componentWillMount() {
        const { type } = this.props;
        if (!this.props.loading) {
            this.props.dispatch({ type: 'messages/clearFilter' });
            this.props.dispatch({ type: 'messages/getFirst', payload: { type } });
        }
    }

    render() {
        const { messages, loading } = this.props;
        const columns = getColumnConfig(this.props.dispatch);
        console.log(messages)
        return (
            <div style={{ width: "90%" }}>
                <Row>
                    <InfiniteTable
                        columns={columns}
                        rowKey='id'
                        dataSource={messages}
                        onChange={this.handleTableChange}
                        bordered
                        pagination={false}
                        scroll={{ y: '85vh' }}
                        onScroll={this.handleScroll.bind(this)}
                        loading={loading}
                        handleTableChange={this.handleTableChange}
                    />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.messages
});

export default connect(mapStateToProps)(Messages);
