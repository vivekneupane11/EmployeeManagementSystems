const initialState={
    datas:[],
    deptdatas:[],
    data:{},
    response:[],
    res:{}
}

export default function (state=initialState,action) {
    switch(action.type){
        case 'GET_DATA':
            return {
                datas: action.payload
            }
        
        case 'GET_DEPT_DATA':
            return{
                deptdatas: action.deptdatas
            }
        case 'LOGIN':
            return{
                res: action.response
            }
        case 'VERIFY':
            return{
                res: action.response
            }
        case 'DELETE_DATA':
            return{
                response: action.response,
            }
        case 'DELETE_DEPT':
            return{
                res:action.response,
            }
        default:
            return state; 
            
}
}

