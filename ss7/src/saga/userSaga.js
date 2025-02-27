import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GET_USERS, SET_USERS, DELETE_USER } from '../redux/actions';

function* fetchUsers() {
    try {
        const response = yield call(axios.get, 'https://jsonplaceholder.typicode.com/users');
        yield put({ type: SET_USERS, payload: response.data });
    } catch (error) {
        console.error('Failed to fetch users', error);
    }
}

function* removeUser(action) {
    try {
        yield call(axios.delete, `https://jsonplaceholder.typicode.com/users/${action.payload}`);
        yield put({ type: DELETE_USER, payload: action.payload });
    } catch (error) {
        console.error('Failed to delete user', error);
    }
}

export default function* userSaga() {
    yield takeLatest(GET_USERS, fetchUsers);
    yield takeLatest(DELETE_USER, removeUser);
}
