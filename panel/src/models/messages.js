import { getAllUsers, deleteM } from "../services/messages";
import { message } from 'antd';
//todo cleanup code!!!!

const defaultState = {
    messages: [],
    loading: false,
    filter: {
        filterBy: []
    },
    length: 20,
    autoComplete: []
}

export default {
    namespace: 'messages',
    state: {
        ...defaultState
    },
    reducers: {
        changeLoading(state, action) {
            return {
                ...state,
                loading: action.payload.loading
            }
        },
        saveAll(state, action) {
            return {
                ...state,
                messages: action.payload.messages,
                totalCount: action.payload.totalCount,
                autoComplete: action.payload.autoComplete
            }
        },
    },
    effects: {
        *delete(action, { put, call, select }) {
            yield put({ type: 'changeLoading', payload: { loading: true } });
            yield call(deleteM, action.payload.id);
            let { length } = yield select(state => ({
                filter: state.messages.filter,
                length: state.messages.length,
            }));
            const result = yield call(getAllUsers, [0, length - 1], "alert");
            console.log(result.data)
            if (result.err) {
                message.error(result.err.message);
                return
            }
            const totalCount = parseInt(localStorage.getItem('totalCount'), 10);
            yield put({ type: 'saveAll', payload: { messages: result.data, totalCount } });
            yield put({ type: 'changeLoading', payload: { loading: false } });
        },
        *getFirst(action, { put, call, select }) {
            const type = action.payload.type
            yield put({ type: 'changeLoading', payload: { loading: true } });

            let { length } = yield select(state => ({
                filter: state.messages.filter,
                length: state.messages.length,
            }));
            const result = yield call(getAllUsers, [0, length - 1], type);
            console.log(result.data)
            if (result.err) {
                message.error(result.err.message);
                return
            }
            const totalCount = parseInt(localStorage.getItem('totalCount'), 10);
            yield put({ type: 'saveAll', payload: { messages: result.data, totalCount } });
            yield put({ type: 'changeLoading', payload: { loading: false } });
        },
        *getMore(action, { put, call, select }) {
            const type = action.payload.type
            yield put({ type: 'changeLoading', payload: { loading: true } });
            let { totalCount, currentCount, length } = yield select(state => ({
                filter: state.messages.filter,
                totalCount: state.messages.totalCount,
                currentCount: state.messages.messages.length,
                length: state.messages.length,
            }));
            const range = [currentCount, currentCount + length - 1];
            if (currentCount === totalCount) {
                yield put({ type: 'changeLoading', payload: { loading: false } });
                return
            }
            if (currentCount + length > totalCount) {
                range[1] = totalCount
            }
            const result = yield call(getAllUsers, range, type);
            yield put({ type: 'appendUsers', payload: { messages: result.data } });
            yield put({ type: 'changeLoading', payload: { loading: false } });
        },
    }
}
