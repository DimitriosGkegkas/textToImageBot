import React, { Component } from "react";

import { Button, Form, Input, Row, Col } from "antd";
import { connect } from "dva";
import { notification } from "antd";
import { changeUrl } from "../../services/changeUrl";

class Url extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
    };
  }

  inputChange = (event) => {
    console.log(event.target.value);
    this.setState({
      url: event.target.value,
    });
  };
  submit = async () => {
    await changeUrl(this.state.url);
    notification.success({
      message: "Url Updated",
    });
  };

  render() {
    const url = this.state.url;
    const { inputChange } = this;
    return (
      // <Form layout="horizontal" style={{ padding: '10px' }}>
      //   <Row gutter={12}>
      //     <Col span={12}>
      //       <Form.Item label="URL">
      //         <Input
      //           name="url" value={url}
      //           onChange={inputChange}
      //         />
      //       </Form.Item>

      //     </Col>
      //   </Row>
      //   <Row gutter={8}>
      //     <Col span={2}>
      //       <Button size="large" onClick={this.submit}>Αποθήκευση</Button>
      //     </Col>
      //   </Row>
      // </Form>
      <a target="_blank" href="/admin">
        Back Office
      </a>
    );
  }
}
const mapStateToProps = (state) => ({
  ...state,
});
export default connect(mapStateToProps)(Url);
