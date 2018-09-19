import React, {Component} from 'react';
import store from '../store';
import ToDo from './todo/ToDo';
import {connect} from 'react-redux';
import './Home.css';

class Home extends Component{
    constructor(props){
        super(props);   
    }

    componentDidMount(){
        console.log("LOGIN", this.props.login.userData);
    }

    render(){
        return (
            <div className="homeContainer">
                <ToDo user={this.props.login.userData}/>
            </div>
        )
    }
}

function mapStateToProps (state ) 
{
    return{
            login: state.login,
            userList: state.userList
        }
  }

export default connect(mapStateToProps)(Home);