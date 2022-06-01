import React from 'react';
import { Table } from 'antd'

//
export default class InfiniteTable extends React.Component {
    
    handleScroll(event) {
        let maxScroll = event.target.scrollHeight - event.target.clientHeight
        let currentScroll = event.target.scrollTop
        if (currentScroll === maxScroll) {
            this.props.onScroll();
        }
    }
    componentDidMount() {
        let tableContent = document.querySelector('.ant-table-body');
        tableContent.addEventListener('scroll', this.handleScroll.bind(this));
    }

    componentWillUnmount() {
        let tableContent = document.querySelector('.ant-table-body');
        tableContent.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    render() {
        const { onScroll, ...rest } = this.props;
        return <Table {...rest} ref="table"/>
    }
}