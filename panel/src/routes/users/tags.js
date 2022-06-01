import React, { Component } from "react";
import { Icon, Input, Form, Button } from "antd";
import { addTag } from "../../services/tags";
import { notification } from "antd";
import AddTag from "./addTag";
import { removeTagRequest } from "../../services/tags";

export default class Tags extends Component {
  constructor(props) {
    super(props);
    const { preferences, user } = this.props;
    this.state = {
      preferences,
      user,
    };
  }

  render() {
    const { preferences, user } = this.state;
    let { tag } = preferences;

    const popAppAdd = () => {
      notification.open({
        message: `Προσθέστε ένα tag στον χρήστη ${user.firstName}`,
        btn: <AddTag id={user.id} finishCall={updateStateAdd}></AddTag>,
      });
    };

    const popAppRemove = (tagItem) => () => {
      notification.warn({
        message: `Θέλετε να αφερέσεται το tag ${tagItem} από τον χρήστη ${user.firstName};`,
        btn: <Button onClick={removeTag(tagItem, user.id)}>Αφέρεση</Button>,
      });
    };

    const updateState = (tag) => {
      const obj = this.state.preferences;
      obj.tag = obj.tag.filter((tagObj) => tag !== tagObj);
      this.setState({ preferences: obj });
    };
    const updateStateAdd = (tag) => {
      const obj = this.state.preferences;
      if (!obj.tag.includes(tag)) obj.tag = obj.tag.concat([tag]);
      this.setState({ preferences: obj });
    };

    const removeTag = (tag, id) => async () => {
      await removeTagRequest(id, tag);
      notification.destroy();
      updateState(tag);
      notification.success({ message: "Tag Removed" });
    };

    return (
      <span>
        {tag.map((tagItem) => (
          <span>
            <Button className="btn_tag" onClick={popAppRemove(tagItem)}>
              {tagItem}
              <Icon type="delete" className="btn_tag_delete" />
            </Button>
          </span>
        ))}
        <Button
          type="dashed"
          onClick={popAppAdd}
          style={{ display: "block", marginLeft: "25%", marginTop: "4px" }}
        >
          Add Tag
        </Button>
      </span>
    );
  }
}
