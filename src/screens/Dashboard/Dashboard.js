import React, { Component } from 'react';
import fire from './../../config/fire';
import Login from './../Login/Login';
import {Link} from 'react-router-dom';
import './Dashboard.css';
class Dashboard extends Component {

  constructor(props){
    super(props);
    this.state = {
      user:{},
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
        this.setState({
          user:null
        })
        this.props.history.push('/');
    })
    .catch(err=>{
        console.log(err.message);
    })
 }

 name(){
    const {data} = this.state;
    return data.map((v,i)=>{
      return <h3 className="text-center text-light">Welcome {v.uname}</h3>;
    })
  }

  renderDashboard(){
    return(
      <div className="container">
        <br />
        {this.name()}
        <br />
        <br />
        <div className="accordion" id="accordionExample">
          <div className="card">
            <div className="card-header" id="headingOne">
              <h5 className="mb-0">
                <span>React</span>
                <button className="btn btn-info float-right" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <i className="fa fa-plus"></i>
                </button>
              </h5>
            </div>

            <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
              <div className="card-body">
                <div className="card-header mb-2">
                  <h6 className="mb-0 pb-3">
                    <span>React Quiz 1</span>
                    <button className="btn btn-info float-right" type="button">
                      <Link className="go-link" to="/about/React/React Quiz 1">GO</Link>
                    </button>
                  </h6>
                </div>
                <div className="card-header mb-2">
                  <h6 className="mb-0 pb-3">
                    <span>React Quiz 2</span>
                    <button className="btn btn-info float-right" type="button">
                      <Link className="go-link" to="/about/React/React Quiz 2">GO</Link>
                    </button>
                  </h6>
                </div>
                <div className="card-header mb-2">
                  <h6 className="mb-0 pb-3">
                    <span>React Quiz 3</span>
                    <button className="btn btn-info float-right" type="button">
                      <Link className="go-link" to="/about/React/React Quiz 3">GO</Link>
                    </button>
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="headingTwo">
              <h5 className="mb-0">
                <span>Angular</span>
                <button className="btn btn-info float-right" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  <i className="fa fa-plus"></i>
                </button>
              </h5>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
            <div className="card-body">
                <div className="card-header mb-2">
                  <h6 className="mb-0 pb-3">
                    <span>Angular Quiz 1</span>
                    <button className="btn btn-info float-right" type="button">
                        <Link className="go-link" to="/about/Angular/Angular Quiz 1">GO</Link>
                    </button>
                  </h6>
                </div>
                <div className="card-header mb-2">
                  <h6 className="mb-0 pb-3">
                    <span>Angular Quiz 2</span>
                    <button className="btn btn-info float-right" type="button">
                      <Link className="go-link" to="/about/Angular/Angular Quiz 2">GO</Link>             
                    </button>
                  </h6>
                </div>
                <div className="card-header mb-2">
                  <h6 className="mb-0 pb-3">
                    <span>Angular Quiz 3</span>
                    <button className="btn btn-info float-right" type="button">
                     <Link className="go-link" to="/about/Angular/Angular Quiz 3">GO</Link>
                    </button>
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="headingThree">
              <h5 className="mb-0">
              <span>Vue</span>
                <button className="btn btn-info float-right" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  <i className="fa fa-plus"></i>
                </button>
              </h5>
            </div>
            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
            <div className="card-body">
                <div className="card-header mb-2">
                  <h6 className="mb-0 pb-3">
                    <span>Vue Quiz 1</span>
                    <button className="btn btn-info float-right" type="button">
                      <Link className="go-link" to="/about/Vue/Vue Quiz 1">GO</Link>
                    </button>
                  </h6>
                </div>
                <div className="card-header mb-2">
                  <h6 className="mb-0 pb-3">
                    <span>Vue Quiz 2</span>
                    <button className="btn btn-info float-right" type="button">
                     <Link className="go-link" to="/about/Vue/Vue Quiz 2">GO</Link>
                    </button>
                  </h6>
                </div>
                <div className="card-header mb-2">
                  <h6 className="mb-0 pb-3">
                    <span>Vue Quiz 3</span>
                    <button className="btn btn-info float-right" type="button">
                      <Link className="go-link" to="/about/Vue/Vue Quiz 3">GO</Link>
                    </button>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    );
  }

  render() {
    return (
      <div className="dash-main">
        <Navbar parentMethod={this.logout}/>
        {
            this.state.user ? this.renderDashboard() : <Login />
        }
      </div>
    );
  }
}

export default Dashboard;

class Navbar extends Component{
    render(){
        return(
            <div>
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                  <a className="navbar-brand" href="">Quiz Application</a>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkuped" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkuped">
                      <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                          <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item active">
                          <Link className="nav-link" to="/dashboard">Dashboard</Link>
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
  }

