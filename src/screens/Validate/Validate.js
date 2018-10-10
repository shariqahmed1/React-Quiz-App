
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import fire from './../../config/fire';
import swal from 'sweetalert';


class Home extends Component {

  
  constructor(props){
    super(props);
    this.state = {
      user:{},
      data:[],
      txtKey:''
    }

    this.keyField = this.keyField.bind(this);
    this.validateKey = this.validateKey.bind(this);
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

 keyField(e){
  const txtKey = e.target.value;
  this.setState({
    txtKey
  })
 }

 validateKey(e){
   e.preventDefault();
   const {txtKey} = this.state;
   if(txtKey === "shariq"){
     localStorage.setItem('key',true);
    this.props.history.push('/quiz');
   }
   else if(txtKey === ""){
    swal({
      title: "Error",
      text: "Enter Key Please",
      icon: "error",
    });
   }
   else{
    swal({
      title: "Error",
      text: "Wrong Key",
      icon: "error",
    });
   }
 }

  render() {
    return (
      <div>
        <Navbar parentMethod={this.logout}/>
        <div className="container">
        <br/>
        <br/>
        <br/>
        <br/>
          <form onSubmit={this.validateKey}>
            <div className="input-group mt-5 mb-3">
              <input type="password" className="form-control" onChange={this.keyField} placeholder="Enter Proctoring Key" aria-label="Recipient's username" aria-describedby="basic-addon2" />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="submit">Start Quiz</button>
              </div>
            </div>
          </form>
        </div>
     </div>
    );
  }
}

export default Home;


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
