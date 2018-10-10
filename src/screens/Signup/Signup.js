import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import fire from './../../config/fire';
import './Signup.css';
import swal from 'sweetalert';

class Signup extends Component {

  constructor(props){
    super(props);
    this.state = {
        txtSignupName:'',
        txtSignupEmail:'',
        txtSignupPass:''
    }
    this.getSignupName = this.getSignupName.bind(this);
    this.getSignupEmail = this.getSignupEmail.bind(this);
    this.getSignupPass = this.getSignupPass.bind(this);
    this.signup = this.signup.bind(this);
  }

  getSignupName(e){
    const txtSignupName = e.target.value;
    this.setState({
      txtSignupName:txtSignupName
    }) 
 }

  getSignupEmail(e){
      const txtSignupEmail = e.target.value;
      this.setState({
        txtSignupEmail
      }) 
  }

  getSignupPass(e){
    const txtSignupPass = e.target.value;
    this.setState({
        txtSignupPass
    }) 
  }

  signup(e){
    e.preventDefault();
    const {txtSignupName, txtSignupEmail, txtSignupPass} = this.state;
    if(txtSignupName === "" || txtSignupEmail === "" || txtSignupPass === ""){
      swal({
        title: "Error",
        text: "Please fill all fields",
        icon: "error",
      });
    }
    else{
      fire.auth().createUserWithEmailAndPassword(txtSignupEmail,txtSignupPass)
      .then((newUser)=>{
          fire.database().ref('/').child('users/').push({
              uname:txtSignupName,
              uemail:txtSignupEmail
          })
          .then(()=>{
              this.props.history.push('/login');
          })
          .catch(err=>{
              console.log(err.message);
          })
          console.log('uid=> ',newUser.uid)
      })
      .catch(err=>{
        swal({
          title: "Error",
          text: err.message,
          icon: "warning",
        })
      })
    }
  }

  render() {
    return (
      <div className="signup-main">
        <Navbar />
        <div className="container">
        <br />
        <br />
        <br />
            <h1 className="text-center text-light">Create Account</h1>
            <br />        
            <form onSubmit={this.signup}>
                <div className="form-group">
                    <input type="text" className="form-control" onChange={this.getSignupName} value={this.state.txtSignupName} placeholder="Enter Name" />
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" onChange={this.getSignupEmail} value={this.state.txtSignupEmail} placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control"  onChange={this.getSignupPass} value={this.state.txtSignupPass}  placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
      </div>
    );
  }
}

export default Signup;

function Navbar(){
    return(
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href="">Quiz Application</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item active">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                </ul>
              </div>
          </div>
        </nav>
      </div>
    );
  }