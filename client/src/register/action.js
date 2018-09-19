import axios from 'axios';
import {URL} from '../constants'
import {GET_ERRORS} from '../actions/types';

export const registerUser = (data, history)  => dispatch => {
     axios.post(URL+'/register', data).then(res => {
         console.log(res);
         history.push('/');
    }).catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
        })
}