import React from 'react';
import Question from './Question';

class QuestionList extends React.Component {
    constructor(props) {
        super(props);

        // Not sure if I'll need state for this object; might just pass props up to Exam
        this.state = {
            mood:"hungry",
            selected: '', // Current selected answer choices
        }
    }

    // To modify state,so components update, use setState() rather than updating
    // state directly.
    selectChoice() {

    }

    renderQuestion(item) {
        return(
            <Question 
                key={item.qid}
                question={item.question}
                choices={item.choices}
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