import React, { Component } from "react";
import { Icon, Input, Form, Button } from "antd";
import { addTag } from "../../services/tags";
import { notification } from "antd";

export default class addTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    const { finishCall } = this.props;
    const onChange = (prop) => (value) => {
      const obj = this.state;
      obj[prop] = value.target.value;
      this.setState(obj);
    };

    const onFinish = async () => {
      await addTag(this.props.id, this.state);
      notification.destroy();
      finishCall(this.state.value);
      notification.success({ message: "Tag Added" });
    };
    return (
      <Form name="dynamic_form_nest_item" onSubmit={onFinish}>
        <Form.Item
          name="value"
          rules={[{ required: true, message: "Missing first name" }]}
        >
          <Input
            type="text"
            placeholder="value"
            onChange={onChange("value")}
          ></Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
