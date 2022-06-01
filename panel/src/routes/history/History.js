import React, { Component, useState, useEffect } from "react";
import { redashURL } from "../../../settings";

class History extends Component {
  render() {
    return (
      <iframe
        src={redashURL}
        style={{ border: "0px #ffffff none" }}
        title="myiFrame"
        scrolling="yes"
        frameborder="1"
        marginheight="0px"
        marginwidth="0px"
        height="100%"
        width="100%"
        allowfullscreen
      ></iframe>
    );
  }
}


export default History;
