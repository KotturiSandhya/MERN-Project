import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Login from './login/Login';
import Register from './register/Register';
import Home from'./home/Home';
import EditUser from'./home/todo/EditUser';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <Router>
          <div className="pageContainer">
                <Route exact path="/register" component = {Register}/>
                <Route exact path="/home" component = {Home}/>
                <Route exact path = "/" component ={ Login }/>
                <Route exact path = "/editUser" component ={ EditUser }/>
          </div>
      </Router>
          
    );
  }
}

export default App;
