import { Menu } from "antd";
import { connect } from "dva";
import { routerRedux } from "dva/router";

const Item = Menu.Item;
function goTo(dispatch, path) {
  dispatch(routerRedux.routerActions.push(path));
}

const SideBar = (props) => {
  const handleClick = (e) => {
    let path = e.key;
    switch (path) {
      case "/logout":
        props.dispatch({ type: "authentication/logout" });
        goTo(props.dispatch, "/login");
        break;
      case "/":
        props.dispatch({
          type: "users/filter",
          payload: { filter: { admin: true } },
        });
        goTo(props.dispatch, path);
        break;
      case "/broadcast":
        props.dispatch({
          type: "users/filter",
          payload: { filter: { admin: true } },
        });
        goTo(props.dispatch, path);
        break;
      default:
        props.dispatch({ type: "users/clearFilter" });
        goTo(props.dispatch, path);
    }
  };

  const selectedKeys = [props.location.pathname];

  return (
    <Menu
      theme="dark"
      style={{ backgroundColor: "#0E8FC9" }}
      onClick={handleClick}
      selectedKeys={selectedKeys}
      mode="inline"
    >
      <Item key="/history">
        <span>Στατιστικά</span>
      </Item>
      <Item key="/">
        <span>Μηνύματα</span>
      </Item>
      <Item key="/users">
        <span>Χρήστες</span>
      </Item>
      {/* <Item key="/broadcast">
        <span>Προσθήκη</span>
      </Item> */}
      <Item key="/" style={{ backgroundColor: "#ffffff" }}>
        <a target="_blank" href="/admin">
          <span style={{ color: "#0E8FC9" }}>Back Office</span>
        </a>
      </Item>
      <Item key="/logout" style={{ backgroundColor: "#c93241" }}>
        <span style={{ color: "white" }}>Αποσύνδεση</span>
      </Item>
    </Menu>
  );
};

const mapStateToProps = (state, ownProps) => ({
  location: ownProps.location,
});

export default connect(mapStateToProps)(SideBar);
