import { authenticate } from "../services/authentication";
import { message } from 'antd';

const emptyState = {
    success: '',
    token: '',
    loading: false,
    username: '',
    message: '',
    expiresIn: ''
}

const initialState = { ...emptyState };
const expiresIn = new Date(localStorage.getItem('expiresIn'));
const token = localStorage.getItem('token');
if (expiresIn > new Date() && token) {
    initialState.token = token;
    initialState.expiresIn = expiresIn;
}

export default {
    namespace: 'authentication',
    state: {
        ...initialState
    },
    reducers: {
        changeLoading(state, action) {
            return {
                ...state,
                loading: action.payload.loading
            }
        },
        save(state, action) {
            const newState = {
                ...state,
                ...action.payload,
                expiresIn: new Date(Date.now() + (1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 1))
            }
            return newState;
        },
        logoutF(state, action) {
            localStorage.removeItem('token');
            localStorage.removeItem('expiresIn');
            return { ...emptyState }
        }
    },
    effects: {
        *login(action, { put, call }) {
            yield put({ type: 'changeLoading', payload: { loading: true } })
            const result = yield call(authenticate, action.payload.username, action.payload.password);

            if (result.err) {
                yield put({ type: 'changeLoading', payload: { loading: false } })
                message.error(result.err.message);
                return emptyState
            }
            const hide = message.loading('Login Successful..', 0);
            hide();
            yield put({ type: 'save', payload: result.data })
            yield put({ type: 'changeLoading', payload: { loading: false } })
        },
        *logout(action, { put, call }) {
            yield put({ type: "logoutF" })
            return emptyState
        }
    }
}
