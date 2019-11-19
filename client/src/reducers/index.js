import { combineReducers } from 'redux';
import getData from './getData';
import createData from './createData';

const allReducers= combineReducers({
    getdata: getData,
    createdata: createData
})

export default allReducers;