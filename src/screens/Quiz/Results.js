import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Results extends Component{

  render(){

    let percent = (this.props.score / this.props.questions.length * 100);
    let message = '';  
    if(percent > 80){
        message = 'Great! 👏'
    } else if(percent < 80 && percent > 40){
        message = 'Not Bad! 😏'
    } else{
        message = "Better Luck on Next Time 😱"
    }
    
    return (
      <div className="jumbotron">
          <div className="well">
                <center>
                    <h4>You Got {this.props.score} out of {this.props.questions.length} Correct</h4>
                    <br />
                    <h1>{percent}% - {message}</h1>
                    <hr />
                    <Link to="/dashboard" className="btn btn-primary mt-2">Dashboard</Link>
                </center>
            </div>
      </div>
    )
  }
}
export default Results;