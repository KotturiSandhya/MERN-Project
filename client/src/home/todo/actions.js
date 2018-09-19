import axios from 'axios';
import {USERLIST, EDITUSER, DELETE_USER} from './constant';
const url = 'http://localhost:5000/api/users';

export function getUserListAction(callback){
    return dispatch=>{
    axios.get(url+'/usersList').then(res=>{
        dispatch({
             type: USERLIST,
             payload: res.data
         });
         callback(res);
    })
}
}
export function updateUserAction(user, callback){
    return dispatch=>{
    axios.post(url+"/updateUser", user).then(function(res){
            dispatch({
                type: EDITUSER,
                payload: res.data
            });
            callback(res);
    })
}
}

export function editUserAction(user){
    return dispatch=>{
    dispatch({
        type: EDITUSER,
        payload: user
    })
}
}

export function deleteUserAction(user, callback){
    return dispatch=>{
        axios.post(url+"/removeUser", {_id: user._id}).then((res) => {
            if(res.data= "Successfully Deleted"){
                dispatch({
                    type: DELETE_USER,
                    payload: res.data
                });
                callback(user);  
            }

        })

     
}

}
