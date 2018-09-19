import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './Register.css';
import PropTypes from 'prop-types';
import {registerUser} from './action';
import classnames from 'classnames';
class Register extends Component {
    
    constructor(props){
        super(props);
        this.state={
            name: '',
            email: '',
            password: '',
            isMatch: false,
            role: 'user',
            errors: {}
        }
    }

    submitRegister(event){
        event.preventDefault();
        this.props.dispatch(registerUser(this.state, this.props.history));
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    verifyPassword(event){
        if(this.state.password !== event.target.value){
            this.setState(()=>{
                return{
                    isMatch: true
                }
            });
        }else{
            this.setState(()=>{
                return{
                    isMatch: false
                }
            });
        }
    }

    render(){
        const {errors} = this.state;
        return(
            <div className="registerContainer">
                <div className="rContainer">
                    <header className="title">Register</header>
                    <form className="registerForm" onSubmit={this.submitRegister.bind(this)}>
                        <div className="height:100%;">
                            <h3 className="label">Name: </h3>
                            <input type="text" name="name" value={this.state.name} className={classnames('form-control form-control-lg textDiv' , {
                                'is-invalid': errors.name
                            })} onChange={this.handleChange}/>
                            {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                        </div>
                        <div className="height:100%;">
                            <h3 className="label">Email: </h3>
                            <input type="email" name="email" className={classnames('form-control form-control-lg textDiv' , {
                                'is-invalid': errors.email
                            })} value={this.state.email} onChange={this.handleChange}/>
                             {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                        </div>
                        <div className="height:100%;">
                            <h3 className="label">Password: </h3>
                            <input type="password" name="password" className={classnames('form-control form-control-lg textDiv' , {
                                'is-invalid': errors.password
                            })} value={this.state.password} onChange={this.handleChange}/>
                            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                        </div>
                        <div className="height:100%;">
                            <h3 className="label">Confirm Password: </h3>
                            <input type="text" className="textDiv" className={classnames('form-control form-control-lg textDiv' , {
                                'is-invalid': this.state.isMatch
                            })}  onChange={this.verifyPassword.bind(this)}/>
                            {this.state.isMatch && (<div className="invalid-feedback">Password Mismatch</div>)}
                        </div>
                        <input type="submit" className="btn btn-primary registerSubmit" value="Register"/>
                        <Link to="/" className="hyperlink">Back to Login</Link>
                    </form>
                </div>
            </div>
        )
    }
    
} 

Register.propTypes = {
    registerUser: PropTypes.func.isRequired
}

 const mapStateToProps = state => ({
    errors: state.errors
 })


export default connect(mapStateToProps)(Register);
//export default Register;