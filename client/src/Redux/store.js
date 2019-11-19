import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import allReducers from 'reducers';
import rootSaga from './rootSaga';
const sagaMiddleWare = createSagaMiddleware();
const initialState = {};
export default function configureStore() {
    const store = createStore(
        allReducers,
        initialState,
        composeWithDevTools(applyMiddleware(sagaMiddleWare))
    );
    sagaMiddleWare.run(rootSaga);
    return store;
}
