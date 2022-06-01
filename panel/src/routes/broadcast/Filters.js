import react from "react";
import { Modal, Row, Col, Steps, Button } from "antd";
import createfilter from "./FiltersConfig";
import { send } from "../../services/broadcast";
import { getTags } from "../../services/tags";

const Step = Steps.Step;

export default class Filters extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      sending: false,
      results: undefined,
      filter: {},
      audience: 0,
      tags: [],
    };
  }
  async componentDidMount() {
    const response = await getTags();
    this.setState({ tags: response?.data?.tags });
    console.log(response?.data?.tags);
  }

  changeFilter = async (field, value) => {
    const newState = {
      ...this.state,
    };
    switch (field) {
      case "team":
        break;
      default:
        newState.filter[field] = value;
    }
    const audience = await this.props.dispatch({
      type: "broadcast/estimate",
      payload: { filter: newState.filter },
    });
    await this.props.dispatch({
      type: "broadcast/estimate",
      payload: { filter: newState.filter },
    });
    console.log(audience);
    newState.audience = audience.audience;
    this.setState(newState);
    console.log(this.state);
  };

  send = async () => {
    const id = await this.props.dispatch({
      type: "broadcast/getId",
      payload: { filter: this.state.filter },
    });
    this.setState({ sending: true });

    const results = await send(id, this.state.filter);

    if (results.data)
      this.setState({
        results: JSON.stringify(results.data),
      });
    else
      this.setState({
        results: JSON.stringify(results.err),
      });
  };

  closeModal = () => {
    this.setState({ sending: false, results: undefined });
    this.props.dispatch({ type: "broadcast/clear" });
  };

  back = () => {
    this.props.dispatch({ type: "broadcast/save", payload: { step: 1 } });
  };

  render() {
    const { visible, sending } = this.props;
    const filters = createfilter(
      this.changeFilter,
      this.state.filter,
      this.state.tags
    );
    if (!this.state.sending)
      return (
        <Modal
          visible={visible}
          onCancel={this.closeModal}
          footer={[
            <Button key="close" onClick={this.back}>
              Πίσω
            </Button>,
            <Button key="send" type="primary" onClick={this.send}>
              Αποστολή
            </Button>,
          ]}
        >
          <Steps current={2} style={{ padding: "10px" }}>
            <Step title="Δημιουργία" />
            <Step title="Έλεγχος" />
            <Step title="Αποστολή" />
          </Steps>
          <h3>Επιλογή Φίλτρου</h3>
          <h2>{this.state.audience}</h2>
          {filters.map((Component, i) => (
            <Row style={{ padding: "5px" }} key={i}>
              <Col span={12}>{Component}</Col>
            </Row>
          ))}
        </Modal>
      );
    else
      return (
        <Modal visible={visible} onCancel={this.closeModal} footer={[]}>
          <Steps current={2} style={{ padding: "10px" }}>
            <Step title="Δημιουργία" />
            <Step title="Έλεγχος" />
            <Step title="Αποστολή" />
          </Steps>
          {this.state.results ? <p>{this.state.results}</p> : <p>Sending</p>}
        </Modal>
      );
  }
}
