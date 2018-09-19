import {LOGIN} from './constant';

const initialState = {
    userData:null
}

export default function loginReducer(state = initialState, action){
    switch(action.type){
        case LOGIN: return state = Object.assign({}, state,{
            userData: action.payload
        });
        default: return state
    }
}