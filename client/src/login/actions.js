import {LOGIN} from './constant';
import axios from 'axios';
import {GET_ERRORS} from '../actions/types';

const url = 'http://localhost:5000/api/users'
// export const loginAction = (payload, cb) => (dispatch) => {
//     console.log('hitted actions"');
//     axios.post(url+'/login', payload).then(res=> {
//       cb(res);
//     //     const data = {
//     //         email: res.data.email,
//     //         name: res.data.name,
//     //         role: res.data.role
//     //     }
//     //    dispatch({
//     //     type: LOGIN,
//     //     payload: data
//     //  });
//     //  history.push('/home');
//     })


    
//}
export function loginAction(data, callback){
   return dispatch=>{
    axios.post(url+'/login', data).then(res=> {
            //    callback(res);
            console.log(res);
               dispatch({
                type: LOGIN,
                payload: res.data
              });
            }).catch(err => {
                dispatch({
                  type: GET_ERRORS,
                  payload: err.response.data
                })
            });
}
}