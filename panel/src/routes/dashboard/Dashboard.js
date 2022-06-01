import React, { Component } from "react";
import LoggerInfo from "./loggerInfo";
import { Icon, Button } from "antd";
import { connect } from "dva";
import TesterPicker from "../broadcast/PickTesters";
import Filters from "../broadcast/Filters";
import { Switch, Card, Avatar } from "antd";

const { Meta } = Card;

class Dashboard extends Component {
  showToggle(show) {
    this.setState({ show });
  }

  constructor(props) {
    super(props);
    this.state = {
      show: "alert",
      step: 1,
    };
  }

  creatCard(
    { title, link_url, cta, image_url, _id, send, sendTo, totalUser },
    dispatch
  ) {
    const broadcastAction = () => {
      dispatch({
        type: "broadcast/recreate",
        payload: { id: _id },
      });
    };

    const deleteAction = () => {
      dispatch({
        type: "info/delete",
        payload: { id: _id },
      });
    };

    const stats = send ? (
      <p class="card_stats" style={{ color: "green" }}>
        Στάλθηκε σε {sendTo} Χρήστες
      </p>
    ) : (
      <p class="card_stats" style={{ color: "red" }}>
        {" "}
        Δεν έχει σταλθεί
      </p>
    );
    return (
      <Card
        hoverable
        style={{
          width: "20%",
          float: "left",
          margin: "8px",
          minWidth: "250px",
        }}
        cover={<img src={image_url} alt="" />}
        actions={[
          <Button onClick={broadcastAction}>
            {" "}
            {send ? "Επαναποστολη" : "Αποστολή"}
          </Button>,
          <Button
            style={{ backgroundColor: "#c93241", color: "white" }}
            onClick={deleteAction}
          >
            Διαγραφή
          </Button>,
        ]}
      >
        <Meta
          title={title}
          description={
            <span>
              <Button class="card_cta" href={link_url} target="_blank">
                {cta}
              </Button>
            </span>
          }
          style={{ whiteSpace: "pre-line", wordWrap: "break-word" }}
        />
        {stats}
      </Card>
    );
  }

  render() {
    const { loading, step } = this.props;
    const { show } = this.state;
    const { creatCard } = this;
    console.log(show);
    if (loading) {
      return <Icon type="loading" style={{ fontSize: 24 }} spin />;
    }
    return (
      <span>
        <Button
          href="#/broadcast"
          style={{
            height: "50px",
            width: "250px",
            padding: "10px",
            margin: "10px",
          }}
        >
          <h3>+ Προσθήκη </h3>
        </Button>
        <div>
          <LoggerInfo
            loading={loading}
            type={"info"}
            creatCard={creatCard}
          ></LoggerInfo>
          <TesterPicker
            dispatch={this.props.dispatch}
            open={step === 1 ? true : false}
          />
          <Filters
            visible={step === 2 ? true : false}
            broadcastType={show}
            dispatch={this.props.dispatch}
          />
        </div>
      </span>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.statistics,
  ...state.broadcast,
});
export default connect(mapStateToProps)(Dashboard);
