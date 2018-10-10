import React, {Component} from 'react';
import Question from './Question';


class QuestionList extends Component{
  render(){
    return (
      <div className="questions">
      {
           this.props.questions.map((v,i) => {
            return (v.id === this.props.current) ? <Question question={v} key={i} {...this.props} /> : ''
          })
      }
      </div>
    )
  }
}
export default QuestionList;