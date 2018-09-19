import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Logo from '../assets/logo.jpg';
import {connect} from 'react-redux';
import {loginAction} from './actions';
import './Login.css';
import {withRouter, Redirect} from 'react-router';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.login.userData !== prevProps.login.userData) {
            this.props.history.push('/home');
        }
      }
    handleChange = event => {
        event.preventDefault();
        this.setState({
          [event.target.name] : event.target.value
        });
    }

    submitForm(e){
        e.preventDefault();
       // var data = {state: this.state, props: this.props};
        // loginAction(data, function(res) {
        //     if(res.data) {
        //         console.log(res.data);
        //         if(res.status === 200){
        //             console.log("Inside home component")
        //             //return <Redirect to="/home"></Redirect>
        //             console.log(data.history.push('/home'))
        //         }
        //     }
        // })
        this.props.dispatch(loginAction(this.state));
        // this.props.history.push('/home');
        //this.props.dispatch(data);
      //  store.dispatch(loginAction(this.state));
    //   this.props.loginAction(this.state, this.props.history); 
    //   return <Redirect to="/home"></Redirect> 
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render(){
        const { errors }  =   this.state; 
        return(
            <div className="background">
                <div className="container">
                    <div className="divClass"> 
                        <div className="logoArea">
                            <img src={Logo} alt="Logo"/>
                        </div>
                        <form onSubmit={this.submitForm.bind(this)} className="form">
                            <div className="height:100%;">
                                <h3 className="label">Email: </h3>
                                <input type="text" className={classnames("form-control form-control-lg textDiv", {
                                        'is-invalid': errors.email
                                })}  name="email"  onChange={this.handleChange}/>
                                {errors.email && (<div className = "invalid-feedback">{errors.email}</div>)}
                            </div>
                            <div className="height:100%;">
                                <h3 className="label">Password: </h3>
                                <input type="password" className={classnames(" form-control form-control-lg textDiv", {
                                    'is-invalid': errors.password
                                })} name="password"onChange={this.handleChange}/>
                                {errors.password && (<div className = "invalid-feedback">{errors.password}</div>)}
                            </div>
                            <input type="submit" className="btn btn-primary submit" value="Submit"/>
                            <Link to="/register" className="submit">Register</Link>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    errors: PropTypes.object.isRequired
}

function mapStateToProps (state ) 
{
    return{
            login: state.login,
            errors: state.errors
        }
  }

//  export default connect(null, mapDispatchToProps)(withRouter(Login))
 export default connect(mapStateToProps)(withRouter(Login))