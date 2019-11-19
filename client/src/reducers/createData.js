const initialState = {
    data: {},
    response: [],
    res: {},
    error: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'CREATE_USER':
            return {
                response: action.response,
                error: action.error,
                data: action.payload
            };
        case 'SEND_EMAIL':
            return {
                data: action.payload,
                res: action.response,
                error: action.error
            };
        case 'UPDATE_DATA':
            return {
                response: action.response
            };
        case 'CREATE_DEPT':
            return {
                data: action.payload,
                response: action.response
            };
        case 'UPDATE_DEPT':
            return {
                data: action.payload,
                response: action.response
            };
        case 'UPDATE_PASSWORD':
            return {
                res: action.response
            };

        default:
            return state;
    }
}
