import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import fire from './../../config/fire';
import './Login.css';
import swal from 'sweetalert';

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
        txtLoginEmail:'',
        txtLoginPass:''
    }
    this.getLoginEmail = this.getLoginEmail.bind(this);
    this.getLoginPass = this.getLoginPass.bind(this);
    this.login = this.login.bind(this);
  }

  getLoginEmail(e){
      const txtLoginEmail = e.target.value;
      this.setState({
          txtLoginEmail
      }) 
  }

  getLoginPass(e){
    const txtLoginPass = e.target.value;
    this.setState({
        txtLoginPass
    }) 
  }

  login(e){
    e.preventDefault();
    const {txtLoginEmail, txtLoginPass} = this.state;
    if(txtLoginEmail === "" || txtLoginPass === ""){
      swal({
        title: "Error",
        text: "Wrong Email or Password",
        icon: "error",
      });
    }
    else{
      fire.auth().signInWithEmailAndPassword(txtLoginEmail,txtLoginPass)
      .then(()=>{
          this.props.history.push('/dashboard');
      })
      .catch(err=>{
        swal({
          title: "Error",
          text: err.message,
          icon: "warning",
        })
      });
    }
  }

  render() {
    return (
      <div className="login-main">
        {/* <div className="login-overlay"></div> */}
          <Navbar />
          <div className="container">
            <br />
            <br />
            <br />
                <div style={{zIndex:'2000'}}>
                  <h1 className="text-center text-light">Login</h1>
                  <br />        
                  <form onSubmit={this.login}>
                      <div className="form-group">
                          <input type="email" className="form-control" onChange={this.getLoginEmail} value={this.state.txtLoginEmail} placeholder="Enter email" />
                      </div>
                      <div className="form-group">
                          <input type="password" className="form-control"  onChange={this.getLoginPass} value={this.state.txtLoginPass}  placeholder="Password" />
                      </div>
                      <button type="submit" className="btn btn-primary">Login</button>
                  </form>
                </div>
            </div>
      </div>
    );
  }
}

export default Login;

function Navbar(){
    return(
      <div>
        <nav style={{zIndex:100}} className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href="">Quiz Application</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">SignUp</Link>
                  </li>
                </ul>
              </div>
          </div>
        </nav>
      </div>
    );
  }