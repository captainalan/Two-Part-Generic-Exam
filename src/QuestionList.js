import React from 'react';
import Question from './Question';

class QuestionList extends React.Component {

    renderQuestion(item,i) {
        return(
            <Question 
                key={item.objectId} /* Look for a better solution than this */
                question={item.question}
                choices={item.choices}
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