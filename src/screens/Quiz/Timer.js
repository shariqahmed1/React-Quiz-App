import React, {Component} from 'react';

class Timer extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
          time: {}
        };
      }

      componentWillReceiveProps(nextProps){
        this.setState({
          time: this.secondsToTime(nextProps.tm)
        })
      }
      
      secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));
    
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
    
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
    
        let obj = {
          "h": hours,
          "m": minutes,
          "s": seconds
        };
        return obj;
      }
    
      render() {
        return(
          <div>
            {this.state.time.m} : {this.state.time.s}
          </div>
        );
      }
      
  }

  export default Timer;
  