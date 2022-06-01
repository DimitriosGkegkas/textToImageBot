import { create, test, send, estimate, testUsers } from "../services/broadcast";
import { notification } from "antd";
import { unpackFilter } from "../utils/validations";
const emptyState = {
  tags: [],
  step: 0,
};

export default {
  namespace: "broadcast",
  state: {
    ...emptyState,
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    clear(state, action) {
      return {
        ...emptyState,
      };
    },
  },
  effects: {
    *load(action, { select, call, put }) {},
    *create(action, { select, call, put }) {
      const card = { ...action.payload.card };
      const {
        data: { error, message_id },
      } = yield call(create, { ...card, type: "alert" });
      if (error) {
        notification["error"]({
          message: `There was an error with the field ${error}`,
        });
        return;
      } else {
        notification.success({
          message: "Saved",
        });
      }
      localStorage.setItem("message_id", message_id);
      yield put({ type: "save", payload: { id: message_id, step: 1 } });
    },
    *createInfo(action, { select, call, put }) {
      const card = { ...action.payload.card };
      const {
        data: { error, message_id },
      } = yield call(create, { ...card, type: "info" });
      if (error) {
        notification["error"]({
          message: `There was an error with the field ${error}`,
        });
        return;
      } else {
        notification.success({
          message: "Saved",
        });
      }
      yield put({ type: "save", payload: { id: message_id, step: 1 } });
    },
    *recreate(action, { select, call, put }) {
      const id = action.payload.id;
      console.log(id);
      yield put({ type: "save", payload: { id, step: 1 } });
    },
    *test(action, { select, call, put }) {
      const testUsers = action.payload.users;
      const { id } = yield select((state) => ({
        id: state.broadcast.id,
      }));
      console.log(id);
      const { data } = yield call(test, id, testUsers);
      console.log(data);
      yield put({ type: "save", payload: { step: 2 } });
    },
    *getId(action, { select, call, put }) {
      const { id } = yield select((state) => ({
        id: state.broadcast.id,
      }));
      return id;
    },
    *send(action, { select, call, put }) {
      let { filter } = action.payload;
      filter = unpackFilter(filter);
      const { id } = yield select((state) => ({
        id: state.broadcast.id,
      }));
      const { data } = yield call(send, id, filter);
      if (data.success) {
        notification.success({
          message:
            data.failed === 0
              ? "Message Sent"
              : "Message Sent, except " + data.failed.toString() + " users",
        });
      }
      yield put({ type: "clear" });
    },
    *estimate(action, { select, call, put }) {
      let { filter } = action.payload;
      filter = unpackFilter(filter);
      const { data: audience } = yield call(estimate, filter);
      console.log(audience);
      return audience;
    },
    *testUsers(action, { select, call, put }) {
      const { data: testers } = yield call(testUsers);
      yield put({ type: "save", payload: testers ? testers : [] });
    },
  },
};
