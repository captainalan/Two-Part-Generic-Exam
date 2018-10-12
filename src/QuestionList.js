import React from 'react';
import Question from './Question';

class QuestionList extends React.Component {

    renderQuestion(item) {
        return(
            <Question 
                key={item.qid}
                question={item.question}
                choices={item.choices}
                onClick={i => this.props.onClick(item.qid,i)}
            />
        );
    }
    
    render() {
        return(
            <div>
                {this.props.questions.map(item =>
                    this.renderQuestion(item)
                )}
            </div>
        )
    }
}

export default QuestionList;