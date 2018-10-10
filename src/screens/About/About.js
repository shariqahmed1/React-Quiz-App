
import React, { Component } from 'react';
import fire from './../../config/fire';
import {Link} from 'react-router-dom';

class About extends Component {

constructor(props){
    super(props);
    this.state = {
      data:[],
    }
  }

  componentDidMount(){
    this.authListener();
  }

  componentWillMount(){
    fire.database().ref('/users').orderByChild('uemail').equalTo(localStorage.getItem('sa-useremail')).on('child_added', (data) => {
      let obj = data.val();
      obj.id = data.key;
      let currentData = this.state.data;
      currentData.push(obj);
      this.setState({ data: currentData })
    })
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
        this.props.history.push('/login');
      }
    })
  }

  logout() {
    fire.auth().signOut()
    .then(()=>{
        localStorage.removeItem('sa-userid');
        localStorage.removeItem('sa-useremail');
        this.props.history.push('/');
    })
    .catch(err=>{
        console.log(err.message);
    })
 }

  render() {

    let technologyName = {
        Angular:{
            name:'Angular',
            desc:"AngularJS is a structural framework for dynamic web apps. It lets you use HTML as your template language and lets you extend HTML's syntax to express your application's components clearly and succinctly. AngularJS's data binding and dependency injection eliminate much of the code you would otherwise have to write. "
        },
        React:{
            name:'React',
            desc:"React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called “components”. React has a few different kinds of components, but we'll start with React.Component subclasses: class ShoppingList extends React."
        },
        Vue:{
            name:'Vue',
            desc:"Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable."
        }
    }

    let requiredTechname = technologyName[this.props.match.params.techname];
    let requiredQuizName = this.props.match.params.quizname;

    return (
      <div>
        <Navbar  parentMethod={this.logout}/>
        <div className="container">
            <br />
            <h3 className="text-center text-info">Welcome to {requiredTechname.name}</h3>
            <br />
            <p><b>Quiz title</b> : <b>{requiredQuizName}</b></p>
            <p>
                <b>Description</b> : <br/>
                {requiredTechname.desc}
            </p>
            <p><b>Passing Score </b> : <b>80%</b></p>
            <p><b>Quiz Time </b> : <b>1 minutes</b></p>
            <p><b>No. Attemps Allowed </b> : <b>1</b></p>
            <br />
            <center>
                <button className="btn btn-success btn-lg btn-block" onClick={()=>{
                    this.props.history.push('/key')
                }}>Next</button>
            </center>
        </div>
      </div>
    );
  }
}

export default About;


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
                <li className="nav-item">
                    <Link className="nav-link"  to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link"  onClick={()=>{this.props.parentMethod()}}>Logout</a>
                  </li>
                </ul>
              </div>
          </div>
        </nav>
      </div>
    );
  }