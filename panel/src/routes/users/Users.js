import React, { Component } from "react";
import { Icon, Input, Form } from "antd";
import { connect } from "dva";
import { Row } from "antd";
import getColumnConfig from "./TableConfig";
import InfiniteTable from "../../components/InfiniteTable";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delayTimer: null,
      length:3,
      search: "",
    };
  }

  handleScroll() {
    const { type } = this.props;
    console.log(type);
    if (!this.props.loading) {
      this.props.dispatch({ type: "users/getMore", payload: { type } });
    }
  }
  searchChange = (event) => {
    console.log(event);
    this.setState({ search: event.target.value });

    this.props.dispatch({
      type: "users/search",
      payload: { searchParams: event.target.value },
    });
  };

  componentWillMount() {
    if (!this.props.loading) {
      this.props.dispatch({ type: "users/clearFilter" });
      this.props.dispatch({ type: "users/getFirst" });
    }
  }

  render() {
    const { loading, users } = this.props;
    const { searchChange } = this;
    const { search } = this.state;
    if (loading) {
      return (
        <span>
          <div>
            <Form.Item label="Name">
              <Input
                name="search"
                value={search}
                onChange={searchChange}
                style={{ float: "left", width: "40%", minWidth: "500px" }}
              />
            </Form.Item>
            <Icon type="loading" style={{ fontSize: 24 }} spin />
          </div>
        </span>
      );
    }
    const columns = getColumnConfig(this.props.dispatch);
    return (
      <span>
        <div>
          <Form.Item label="Name">
            <Input
              name="search"
              value={search}
              onChange={searchChange}
              style={{ float: "left", width: "40%", minWidth: "500px" }}
            />
          </Form.Item>
        </div>
        <div>
          <div style={{ width: "90%" }}>
            <Row>
              <InfiniteTable
                columns={columns}
                rowKey="id"
                dataSource={users}
                onChange={this.handleTableChange}
                bordered
                pagination={false}
                scroll={{ y: "85vh" }}
                onScroll={this.handleScroll.bind(this)}
                loading={loading}
                handleTableChange={this.handleTableChange}
                style={{ minWidth: "900px" }}
              />
            </Row>
          </div>
        </div>
      </span>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.users,
});
export default connect(mapStateToProps)(User);
