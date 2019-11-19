import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './index';
import Axios from 'axios';
export function* postLocationService(action) {
    const response = yield call(postLocation, action.myJSONObject);
    console.log(response.success);
    if (response.success) {
        yield put(actions.loginSuccess(response));
    } else {
        yield put(actions.loginFailure(response));
    }
}
const postLocation = myJsonObject => {
    const endpoint = `http://localhost:4000/users/login`;
    return Axios.post(endpoint, myJsonObject)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error.response);
            return error.response.data;
        });
};
export function* login() {
    yield takeLatest('LOGIN_REQUEST', postLocationService);
}
