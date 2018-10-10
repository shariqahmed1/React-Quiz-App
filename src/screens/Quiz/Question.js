import React, {Component} from 'react';
import swal from 'sweetalert';

class Question extends Component {

    changeState(){
        const {setCurrent, setScore, question} = this.props;
        var checkVal = document.querySelector("input[type='radio']:checked");
        
        if(checkVal == null){
            swal({
                  title: "Error",
                  text: "Please select any Option",
                  icon: "warning",
                });
        }
        else{
            if (checkVal.value === question.correct){
              setScore(this.props.score+1);
            }
            setCurrent(this.props.current+1)
        }
    }

    render(){
        const {question} = this.props;
        return(
            <div className="jumbotron" style={{paddingBottom:'80px'}}>
                <div className="well">
                    <h5>{question.text}</h5>
                    <br />
                    <ul className="list-group">
                        {
                            question.choices.map((choice,i)=>{
                                return(
                                    <li className="list-group-item" key={i}>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <input type="radio" name={question.id} value={choice.id}/>
                                                </div>
                                            </div>
                                            <input type="text" readOnly className="form-control" value={choice.text}/>
                                        </div>
                                    </li>
                                    
                                )
                            })
                        }
                    </ul>
                    <button type="button" className="btn btn-info float-right mt-3" onClick={this.changeState.bind(this)} >Next</button>
                </div>
            </div>
        );
    }

}

export default Question;