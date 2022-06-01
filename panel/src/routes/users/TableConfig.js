//In this file we just set the columns configuration for Antd table see https://ant.design/components/table/
import { Icon, Spin, Button, Input, Form } from "antd";
import moment from "moment";
import { toggleAdmin } from "../../services/users";
import { notification } from "antd";
import Tags from "./tags";
// import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

export default (dispatch) => [
  {
    title: "Image",
    width: "10%",
    render: ({ user }) => {
      if (!user) return <div></div>;
      if (user.data.avatar) {
        return (
          <img
            style={{ objectFit: "cover", width: "100%" }}
            src={user.data.avatar}
            alt=""
          />
        );
      } else {
        return <Spin />;
      }
    },
  },
  {
    title: "Name",
    width: "14%",
    render: ({ user }) => {
      if (!user) return <div></div>;
      if (user.firstName) {
        return (
          <div>
            <p>{user.firstName}</p>
          </div>
        );
      }
      return (
        <div>
          <p>No Name</p>
        </div>
      );
    },
  },
  {
    title: "Status",
    width: "10%",
    render: ({ preferences, user }) => {
      if (!preferences) return <div></div>;
      let { mute, subscribed } = preferences;
      const onChange = async () => {
        await toggleAdmin(preferences.id);
      };
      return (
        <div>
          <p>{!subscribed ? "Unsubscribed" : mute ? "Muted" : `Active`}</p>
          <p>{moment(user.updatedAt).format("hh:mm, DD/MM/YY")}</p>
        </div>
      );
    },
  },
  {
    title: "Tags",
    width: "25%",
    render: ({ preferences, user }) => {
      if (!preferences || !user) return <div></div>;
      return <Tags preferences={preferences} user={user}></Tags>;
    },
  },
  // {
  //   title: "Last Active",
  //   width: "10%",
  //   render: ({ user }) => {
  //     if (user.updatedAt) {
  //       return (
  //         <div>
  //           <p>{moment(user.updatedAt).format("hh:mm, DD-MM-YYYY")}</p>
  //         </div>
  //       );
  //     }
  //     return <div></div>;
  //   },
  // },
  // {
  //   title: "Created",
  //   width: "15%",
  //   render: ({ user }) => {
  //     if (user.createdAt) {
  //       return (
  //         <div>
  //           <p>{moment(user.createdAt).format("hh:mm, DD-MM-YYYY")}</p>
  //         </div>
  //       );
  //     }
  //     return <div></div>;
  //   },
  // },
  {
    title: "Actions",
    width: "10%",
    render: ({ user }) => {
      if (!user) return <div></div>;
      const deleteUserWarn = () => {
        notification.warn({
          message: `Είστε σίγουροι ότι θέλετε να διαγράψετε τον χρήστη ${user.firstName}; Η ενέργεια είναι μη αναστρέψιμη`,
          btn: [
            <Button
              style={{ background: "#c93241", color: "white", margin: "4px" }}
              onClick={deleteUser}
            >
              Ναι θέλω να διαγράψω μόνιμα αυτόν τον χρήστη
            </Button>,
          ],
        });
      };

      const deleteUser = () => {
        dispatch({
          type: "users/delete",
          payload: { id: user.id },
        });
        notification.info({
          message: `Ο χρήστης ${user.firstName} διαγράφικε`,
        });
      };

      return (
        <Button
          style={{
            background: "#c93241",
            color: "white",
            margin: "4px",
            width: "80% !important",
          }}
          onClick={deleteUserWarn}
        >
          <Icon type="delete"></Icon>
        </Button>
      );
    },
  },
  {
    title: "Tester",
    width: "10%",
    render: ({ preferences, user }) => {
      if (!preferences || !user) return <div></div>;
      let admin = preferences.admin;
      const onChange = async () => {
        await toggleAdmin(preferences.id);
        admin = !admin;
        admin
          ? notification.success({
              message: `Ορίσατε τον χρήστη ${user.firstName} ως Tester και μπορεί πλέον να λαμβάνει δοκιμαστικά μηνύματα.`,
            })
          : notification.error({
              message: `Αφερέσατε τον χρήστη ${user.firstName} από τους Testers δεν θα μπορεί πλέον να λαμβάνει δοκιμαστικά μηνύματα.`,
            });
      };
      return (
        <Input type="checkbox" defaultChecked={admin} onChange={onChange} />
      );
    },
  },
];
