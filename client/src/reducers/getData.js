import produce from 'immer';
const initialState = {
    datas: [],
    deptdatas: [],
    data: {},
    response: [],
    res: {},
    error: {},
    notification: [],
    loading: {}
};
const loginModule = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case 'GET_DATA':
                return {
                    datas: action.payload
                };

            case 'GET_DEPT_DATA':
                return {
                    deptdatas: action.deptdatas
                };
            case 'LOGIN_REQUEST':
                draft.loading = true;
                break;
            case 'LOGIN_SUCCESS':
                draft.res = action.response;
                draft.loading = false;
                break;
            case 'LOGIN_FAILURE':
                draft.res = action.response;
                draft.loading = false;
                break;

            case 'VERIFY':
                return {
                    res: action.response
                };
            case 'DELETE_DATA':
                return {
                    response: action.response
                };
            case 'DELETE_DEPT':
                return {
                    res: action.response
                };
            case 'SEARCH_DEPT':
                return {
                    res: action.response,
                    error: action.error
                };
            case 'SEARCH_USER':
                return {
                    res: action.response,
                    error: action.error
                };
            case 'CREATE_DOCS':
                return {
                    res: action.response,
                    error: action.error
                };
            case 'GET_DOCS':
                return {
                    res: action.response
                };
            case 'NOTIFY':
                return {
                    notification: action.notification
                };
            default:
                return state;
        }
    });
export default loginModule;
