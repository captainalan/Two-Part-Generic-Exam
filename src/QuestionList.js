import React from 'react';
import Question from './Question';

class QuestionList extends React.Component {

    renderQuestion(item,i) {
        return(
            <Question 
                key={item.qid} /*Look for a better solution than this */
                question={item.question}
                choices={item.choices}
                onClick={i => this.props.onClick(item.qid,i)}
            />
        );
    }
    
    render() {
        return(
            <div>
                {this.props.questions.map((item, i) =>
                // Look at tic-tac-toe example; how to use i as an identifier
                    this.renderQuestion(item,i)
                )}
            </div>
        )
    }
}

export default QuestionList;