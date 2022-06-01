import React from "react";
import { Col, Form, Row, Input } from "antd";

const URLButton = ({ title, link_url, changeButtonFields, index }) => (
  <span>
    <h3>URL Button</h3>
    <Row>
      <Col span={18}>
        <Form.Item label="Button Title">
          <Input
            value={title}
            onChange={(event) =>
              changeButtonFields(index, { title: event.target.value })
            }
          />
        </Form.Item>
      </Col>
    </Row>
    <Row>
      <Col span={18}>
        <Form.Item label="URL">
          <Input
            value={link_url}
            onChange={(event) =>
              changeButtonFields(index, { link_url: event.target.value })
            }
          />
        </Form.Item>
      </Col>
    </Row>
  </span>
);

export default URLButton;
