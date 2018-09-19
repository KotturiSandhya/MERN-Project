import {USERLIST, EDITUSER, DELETE_USER} from './constant';
let initialState =  {
    userList: null,
    edit_user: null,
    deleteSuccess: "",
}

export default function userReducer(state= initialState, action){
    switch(action.type){
        case USERLIST: return state = Object.assign({}, state, {userList: action.payload});
        case EDITUSER: return state = Object.assign({}, state, {edit_user: action.payload});
        case DELETE_USER: return state = Object.assign({}, state, {deleteSuccess: action.payload});
        default: return state;
    }
}