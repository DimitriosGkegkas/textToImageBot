import React, { Component } from "react";
import { connect } from "dva";

class Messages extends Component {
  state = {
    delayTimer: null,
  };

  handleScroll() {
    const { type } = this.props;
    console.log(type);
    if (!this.props.loading) {
      this.props.dispatch({ type: "info/getMore", payload: { type } });
    }
  }

  componentWillMount() {
    const { type } = this.props;
    if (!this.props.loading) {
      this.props.dispatch({ type: "info/clearFilter" });
      this.props.dispatch({ type: "info/getFirst", payload: { type } });
    }
  }

  render() {
    const { messages, creatCard, dispatch } = this.props;
    return (
      <div style={{ width: "100%" }}>
        {messages.length > 0 ? (
          messages.map((message) => creatCard(message, dispatch))
        ) : (
          <h1 style={{ margin: "40%" }}>Προσθέστε το Πρώτο σας Μήνυμα</h1>
        )}
        {/* <Row>
          <InfiniteTable
            columns={columns}
            rowKey="id"
            dataSource={messages}
            onChange={this.handleTableChange}
            bordered
            pagination={false}
            scroll={{ y: "85vh" }}
            onScroll={this.handleScroll.bind(this)}
            loading={loading}
            handleTableChange={this.handleTableChange}
          />
        </Row> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.info,
});

export default connect(mapStateToProps)(Messages);
