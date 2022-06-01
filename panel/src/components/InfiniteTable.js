import React from 'react';
import { Table } from 'antd'

//
export default class InfiniteTable extends React.Component {
    componentDidMount() {
        let tableContent = document.querySelector('.ant-table-body');
        tableContent.addEventListener('scroll', (event) => {
            let maxScroll = event.target.scrollHeight - event.target.clientHeight
            let currentScroll = event.target.scrollTop
            if (currentScroll === maxScroll) {
               this.props.onScroll();
            }
        });
    }

    render() {
        const { onScroll, ...rest } = this.props;
        return <Table {...rest} ref="table"/>
    }
}