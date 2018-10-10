
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import fire from './../../config/fire';
import './Home.css';

class Home extends Component {

  
  constructor(props){
    super(props);
    this.state = {
      user:{}
    }
  }

  
  logout() {
    fire.auth().signOut()
    .then(()=>{
        localStorage.removeItem('sa-userid');
        localStorage.removeItem('sa-useremail');
        this.setState({
          user:null
        })
        this.props.history.push('/');
    })
    .catch(err=>{
        console.log(err.message);
    })
 }

  render() {
    return (
      <div>
        <Navbar parentMethod={this.logout}/>
      </div>
    );
  }
}

export default Home;


class Navbar extends Component{
  
  
  
  constructor(props){
    super(props);
    this.state = {
      user:{},
    }    
  }


  componentDidMount(){
    this.authListener();
  }
  
  authListener(){
    fire.auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({
          user
        })
        localStorage.setItem('sa-userid',user.uid);
        localStorage.setItem('sa-useremail',user.email);
      }
      else{
        this.setState({
          user:null
        })
        localStorage.removeItem('sa-userid');
        localStorage.removeItem('sa-useremail');
      }
    })
  }

  isEmpty(obj) {
      for(var key in obj) {
          if(obj.hasOwnProperty(key))
              return false;
      }
      return true;
  }

  render(){
      return(
          <div className="home-main">
            <div className="overlay"></div>
            <nav style={{zIndex:100}} className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="container">
                <a className="navbar-brand" href="">Quiz Application</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkuped" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                  <div className="collapse navbar-collapse" id="navbarNavAltMarkuped">
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                      </li>
                        { this.isEmpty(this.state.user) ? 
                        <li className="nav-item">
                          <Link className="nav-link" to="/login">Login</Link>
                        </li> 
                        :
                        <li className="nav-item">
                          <a className="nav-link"  onClick={()=>{this.props.parentMethod()}}>Logout</a>
                        </li> 
                        }
                    </ul>
                  </div>
              </div>
            </nav>
              <Link className="quiz-start" to="/dashboard">Start Quiz</Link>
          </div>
        );
  }
}
