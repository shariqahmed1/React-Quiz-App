import React, {Component} from 'react';
import Timer  from './Timer'
class ScoreBox extends Component{
  constructor(props){
    super(props);
    this.state = {
      sec:this.props.time
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
     sec:nextProps.time 
    })
    // console.log(this.state.sec);
  }

  render(){
    return (
      <div className="jumbotron p-4">
          <div className="well">
            Question {this.props.current} out of {this.props.questions.length}
            <span className="pull-right">
            <strong>
              <Timer tm={this.state.sec} />
            </strong>
            </span>
        </div>
      </div>
    )
  }
}
export default ScoreBox;