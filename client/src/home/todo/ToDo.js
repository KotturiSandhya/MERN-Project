import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserListAction, editUserAction, deleteUserAction} from './actions';
import ReactTable from 'react-table';
import store from '../../store';
import './ToDo.css';
import 'react-table/react-table.css';
import { ReactTableDefaults } from "react-table";

class ToDo extends Component{

    constructor(props){
        super(props);
        this.state={
            user: this.props.user,
            list:[]
        }
    }

    bindDataToUI(self, res){
        
        if(res.data!==null){
            const list = [];
        for(var i=0;i<res.data.length; i++){
            if(res.data[i].email !== self.state.user.email){
            list.push({
                _id: res.data[i]._id,
                name: res.data[i].name,
                email: res.data[i].email,
                role:  res.data[i].role,
                actions: ''
            });
        }
    }
        self.setState(()=>{
            return {
                list: list
            }
        })
    }
    }


    componentDidMount(){
        const self = this;
        this.props.dispatch(getUserListAction(function(res){
            self.bindDataToUI(self, res);
        }));
    }
      handleEdit(data){
          this.props.dispatch(editUserAction(data));
        //   return (
        //       <Redirect push to="/editUser"/>
        //   )
         // this.props.history.push('/editUser');
    }

      handleDelete(data){
     const self=this;
        console.log("Delete handle");
        console.log(data);
        this.props.dispatch(deleteUserAction(data, function(res){
            self.props.dispatch(getUserListAction(function(res){
                self.bindDataToUI(self, res);
            }));
        }));
    }
    render(){

        const data = this.state.list;
        Object.assign(ReactTableDefaults, {
           // showPagination: false,
            minRows: 3 
          });
              const columns = [{
                Header: 'Name',
                accessor: 'name'
              }, {
                Header: 'EMail',
                accessor: 'email',
              }, {
                Header: 'Role',
                accessor: 'role'
              },
            {
                accessor: '',
                Cell: row => (
                    <div>
                       <Link to="/editUser" user={row.original}><button onClick={() => this.handleEdit(row.original)}>Edit</button></Link>
                        <button onClick={() => this.handleDelete(row.original)}>Delete</button>
                    </div>
                )
            }]

        return(
            <div className="listContainer">
                <div className="header">
                    <h1 className="userDetails">Welcome {this.state.user.name}</h1>
                    <Link to="/" className="logoutLink">Logout</Link>
                </div>
                <div className="listBody">
                    <br/>
                    <br/>
                    <ReactTable className="tableContainer"
                        data={data}
                        columns={columns}
                    />
                </div>
                {/* {
                    this.props.userList.userList  &&    this.props.userList.userList.length >  0  ? 
                    this.props.userList.userList.map((data, i)=> {
                         return(   <div className="listBody" key={i}>
                                name of  users : {data.name}
                            </div>
                            )
                    })
                    : null
                } */}
                
            </div>
        )
    }
}

 function mapStateToProps (state ) 
 {
     return{
             userList: state.userList,
             edit_user: state.edit_user
         }
   }

// const mapDispatchToProps = (dispatch) => {
//     return {
//       deleteUserAction: (user) => (dispatch(deleteUserAction(user)))
//     };
//   }
export default connect(mapStateToProps)(ToDo);