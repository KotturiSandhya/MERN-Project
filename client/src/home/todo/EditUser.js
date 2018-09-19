import React,{Component} from 'react';
import {connect} from 'react-redux';
import store from '../../store';
import './EditUser.css';
import {Link} from 'react-router-dom';
import {updateUserAction} from './actions';
class EditUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            _id: store.getState().userList.edit_user._id,
            name: store.getState().userList.edit_user.name,
            email: store.getState().userList.edit_user.email,
            role: store.getState().userList.edit_user.role
        }
    }
    // componentDidMount(){
    //     console.log(this.state);
    // }
    handleChange(event){
             event.preventDefault();
             this.setState({[event.target.name]: event.target.value})
    }
    submitData(event){
        let self = this;
        event.preventDefault();
        this.props.dispatch(updateUserAction(this.state, function(res){
                alert("Successfully updated the user data");
                self.props.history.push("/home");
        }));
    }
    render(){
        return(
            <div className="row">
            <div className="col-sm-4">
                <form onSubmit={this.submitData.bind(this)}>
                <label>Name</label>
                <div className="form-group pass_show"> 
                    <input type="text" name="name" value={this.state.name} onChange = {this.handleChange.bind(this)} className="form-control"/> 
                </div> 
                   <label>Email</label>
                <div className="form-group pass_show"> 
                    <input type="text" name="email" value={this.state.email} onChange = {this.handleChange.bind(this)} className="form-control"/> 
                </div> 
                   <label>Role</label>
                <div className="form-group pass_show"> 
                    <input type="text" name="role" value={this.state.role} onChange = {this.handleChange.bind(this)} className="form-control" /> 
                </div>
                <div> 
                    <input type="submit" className="btn btn-primary submit edit" value="Submit"/>
                    <Link to="/home"><button className="btn btn-primary back">Back</button></Link>
                 </div>
                 </form>
            </div>  
        </div>
        )
    }
}

export default connect()(EditUser);