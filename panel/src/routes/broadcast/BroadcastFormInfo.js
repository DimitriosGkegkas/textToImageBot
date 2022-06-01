import { Button, Form, Input, Row, Col } from "antd";

import CardButtons from "./buttons/CardButtons";

const BroadcastForm = (props) => {
  const {
    CheckIcon,
    image_url,
    subtitle,
    ErrorNot,
    inputChange,
    changeButtonFields,
  } = props;
  const {
    submitInfo,
    error,
    changeButtonType,
    buttons,
    addButton,
    removeButton,
  } = props;
  return (
    <Form layout="horizontal" style={{ padding: "10px" }}>
      <Row gutter={12}>
        <Col span={22}>
          <Form.Item label="Image">
            <Input
              addonAfter={<CheckIcon {...error.image} />}
              name="image_url"
              value={image_url}
              onChange={inputChange}
            />
          </Form.Item>

          <Col span={24}>
            <Form.Item label="Text">
              <Input name="subtitle" value={subtitle} onChange={inputChange} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <CardButtons
              buttons={buttons}
              changeButtonType={changeButtonType}
              addButton={addButton}
              removeButton={removeButton}
              changeButtonFields={changeButtonFields}
            />
          </Col>
        </Col>
      </Row>
      <Row style={{ clear: "both" }}>
        <ErrorNot />
      </Row>
      <Row gutter={8}>
        <Col span={2}>
          <Button size="large" onClick={submitInfo}>
            Αποθήκευση
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default BroadcastForm;
