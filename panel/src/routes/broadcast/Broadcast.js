import React from "react";
import { Icon, Row, Col, Tooltip, Alert } from "antd";
import { validImage } from "../../utils/validations";
import PreviewCardInfo from "./PreviewCardInfo";
import TesterPicker from "./PickTesters";
import Filters from "./Filters";
import BroadcastFormInfo from "./BroadcastFormInfo";

import { connect } from "dva";

const emptyCard = {
  image_url: "",
  buttons: [
    {
      type: "url",
      title: "",
      link_url: "",
    },
  ],
};

class BroadCast extends React.Component {
  componentWillMount() {
    this.props.dispatch({ type: "broadcast/load" });
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      sending: false,
      error: {
        call_to_action: {
          loading: false,
          error: true,
        },
        image: {
          loading: false,
          error: true,
        },
      },
      card: emptyCard,
      broadcastType: "alert",
      errorField: "",
      step: 1,
    };
  }
  changeLocation = (value) => {
    const newState = {
      ...this.state,
    };

    newState.location = value;
    const card = this.state.card;
    this.setState(newState);
    card["location"] = value;
    this.setState({
      card,
    });
  };

  inputChange = (event) => {
    console.log(event);
    const card = this.state.card;
    if (event.target.name === "image_url") {
      const error = this.state.error;
      this.setState({
        error: {
          ...error,
          image: {
            loading: true,
          },
        },
      });
      validImage(event.target.value, (url, success) => {
        this.setState({
          error: {
            ...error,
            image: {
              loading: false,
              error: !success,
            },
          },
        });
      });
    }
    card[event.target.name] = event.target.value;
    this.setState({
      card,
    });
  };

  handleCancel = () => {
    this.setState({ visible: false, sending: false });
  };
  changeSending = () => {
    this.setState({ sending: true });
  };

  changeTag = (index) => {
    this.setState({
      card: {
        ...this.state.card,
        tag: this.props.tags[index],
      },
    });
  };

  submit = () => {
    const card = this.state.card;
    const { image } = this.state.error;

    if (card["image_url"] === "") {
      this.setState({
        errorField: `Missing image_url`,
      });
      return;
    }
    if (image.error) {
      this.setState({
        errorField: `Image not valid`,
      });
      return;
    }
    this.props.dispatch({ type: "broadcast/create", payload: { card } });
  };

  submitInfo = () => {
    const card = this.state.card;
    const { image } = this.state.error;
    for (let field in card) {
      if (card[field] === "") {
        this.setState({
          errorField: `Missing ${field}`,
        });
        return;
      }
    }
    if (image.error) {
      this.setState({
        errorField: `Image not valid`,
      });
      return;
    }
    this.props.dispatch({ type: "broadcast/createInfo", payload: { card } });
  };

  CheckIcon = (props) => {
    const { loading, error } = props;
    if (loading) {
      return <Icon type="loading" />;
    }
    if (error) {
      return (
        <Tooltip title="URL is not valid for the current field (A valid url is 'http://www.example.com')">
          <Icon type="warning" style={{ color: "#c93241" }} />
        </Tooltip>
      );
    }
    return <Icon type="check" style={{ color: "green" }} />;
  };
  changeButtonFields = (index, fields) => {
    const buttons = [...this.state.card.buttons];
    buttons[index] = {
      ...buttons[index],
      ...fields,
    };
    console.log(buttons);
    this.setState({
      card: {
        ...this.state.card,
        buttons,
      },
    });
  };

  Error = () => {
    const { errorField } = this.state;
    if (errorField !== "") {
      return <Alert message={errorField} type="error" />;
    }
    return null;
  };

  render() {
    const { step } = this.props;
    const { error, card, broadcastType } = this.state;
    const {
      inputChange,
      Error,
      CheckIcon,
      submit,
      submitInfo,
      handleCancel,
      changeSending,
      changeButtonFields,
    } = this;
    return (
      <div style={{ backgroundColor: "white" }}>
        <h2 style={{ padding: "10px" }}>Μαζική Αποστολή</h2>
        <Row gutter={12} style={{ margin: "0px", backgroundColor: "#e4e8f2" }}>
          <Col span={8}>
            <BroadcastFormInfo
              {...this.state.card}
              error={error}
              inputChange={inputChange}
              ErrorNot={Error}
              CheckIcon={CheckIcon}
              submitInfo={submitInfo}
              handleCancel={handleCancel}
              changeSending={changeSending}
              changeButtonFields={changeButtonFields}
            />
          </Col>
          <Col span={4}>
            <PreviewCardInfo {...card} />
          </Col>
        </Row>
        <TesterPicker
          dispatch={this.props.dispatch}
          open={step === 1 ? true : false}
        />
        <Filters
          sending={this.state.sending}
          visible={step === 2 ? true : false}
          changeSending={changeSending}
          dispatch={this.props.dispatch}
          broadcastType={broadcastType}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.broadcast,
  };
};

export default connect(mapStateToProps)(BroadCast);
