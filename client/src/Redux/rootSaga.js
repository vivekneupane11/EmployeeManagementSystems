import { all } from 'redux-saga/effects';
import { login } from 'actions/saga';

export default function* rootSaga() {
    yield all([login()]);
}
