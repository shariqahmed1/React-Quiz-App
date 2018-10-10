import React, { Component } from 'react';
import fire from './../../config/fire';
import QuestionList from './QuestionList';
import ScoreBox from './ScoreBox';
import Results from './Results';
// import {Link} from 'react-router-dom';

class Quiz extends Component {

    constructor(props){
        super(props);
        this.state = {
          questions: [
            {
              id:1,
              text: 'React is a JavaScript _______ for building user interfaces',
              choices: [
                {
                  id: 'a',
                  text: 'Framework'
                },
                {
                  id: 'b',
                  text: 'Library'
                },
                {
                  id: 'c',
                  text: 'Both A and B'
                },
                {
                  id: 'd',
                  text: 'None of the above'
                }
              ],
              correct: 'b'
            },
            {
              id:2,
              text: 'Which statement are not true about state?',
              choices: [
                {
                  id: 'a',
                  text: 'States are immutable'
                },
                {
                  id: 'b',
                  text: 'States can be updated'
                },
                {
                  id: 'c',
                  text: 'When state has changed the component will re-render to the browser'
                },
                {
                  id: 'd',
                  text: 'Should not be accessed from child components'
                }
              ],
              correct: 'a'
            },
            {
              id:3,
              text: 'Which statement are true about component in react?',
              choices: [
                {
                  id: 'a',
                  text: 'Statefull component'
                },
                {
                  id: 'b',
                  text: 'Stateless Component'
                },
    
                {
                  id: 'c',
                  text: 'Both A and B'
                }
              ],
              correct: 'c'
            },
            {
              id:4,
              text: 'What command is used to make build in react?',
              choices: [
                {
                  id: 'a',
                  text: 'npm build'
                },
                {
                  id: 'b',
                  text: 'npm run build'
                },
                {
                  id: 'c',
                  text: 'npm install run build --save'
                },
                {
                  id: 'c',
                  text: 'npm install build'
                }
              ],
              correct: 'b'
            },
          ],
          score: 0,
          current:1,
          time:60
        }
        this.timer = 0;
        this.countDown = this.countDown.bind(this);
      }

      componentDidMount(){
        this.authListener();
      }

      componentWillMount(){
        if(!localStorage.getItem('key')){
          this.props.history.push('/key')
        }
        else{
         this.startTimer();          
        }
      }
      

      setScore(score){
        this.setState({
          score
        });
      }
    
      setCurrent(current){
        this.setState({
          current
        });
      }

      
        startTimer() {
          if (this.timer === 0) {
            this.timer = setInterval(this.countDown, 1000);
          }
        }
      
        countDown() {
          let seconds = this.state.time - 1;
          
          this.setState({
            time: seconds
          });

          if (seconds === 0) { 
            clearInterval(this.timer);
          }
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
    let scorebox = '';
    let results = '';
    if (this.state.current > this.state.questions.length){
      results = <Results {...this.state} />
      localStorage.removeItem('key');
      scorebox = '';
    }

    else{
      scorebox = <ScoreBox {...this.state} />
      results = '';
    }

    return (
      <div className="container mt-3">
        {
          (this.state.time === 0) ? <Results {...this.state} /> : <div>
              {scorebox}
              <QuestionList {...this.state} setCurrent={this.setCurrent.bind(this)} setScore={this.setScore.bind(this)} />
              {results}
            </div>
        }
      </div>
    );
  }
}

export default Quiz;
