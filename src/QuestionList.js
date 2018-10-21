import React from 'react';
import './ScoreBox.css';

class QuestionList extends React.Component {

    choiceSelected(qid) {
        // qid is something like 'q1'; returns first found response to 
        // this question (e.g. 0, 1). Otherwise, returns null
        if (this.props.responses && (qid in this.props.responses)) {
            return this.props.responses[qid];
        }
        return null;
    }
    constructor(props) {
        super(props);
        this.choiceSelected = this.choiceSelected.bind(this);
    }

    render() {
        const { questions } = this.props; // Maybe get responses props here too
        return(
            <div>
                {questions.map((item,index) =>
                    <Question 
                        key={'q' + [index]} /* Look for a better solution than this */
                        selected={this.choiceSelected('q' + [index])}
                        question={item.question}
                        correct={item.correct}
                        choices={item.choices}
                        choiceHandler={(choice) => this.props.selectChoice(index,choice)}
                        showingScore={this.props.showingScore}
                    />
                )}
            </div>
        )
    }
}

// Each multiple choice question consists of a problem statement and
// answer choices.
class Question extends React.Component {

    constructor(props) {
        super(props);
        this.choiceHandler = this.choiceHandler.bind(this);
    }

    choiceHandler(i){ 
        this.props.choiceHandler(i);
    }

    render() {
        return (
            <div className='Question'>

                <Problem questionText={this.props.question}/>
                {/* Insert code here to render choices*/}

                {this.props.choices.map((choice_text, i) =>
                    <Choice 
                        key={choice_text} // Better than using indices?
                        className={i === this.props.selected ? 'Selected' : 'Choice'}
                        onClick={ () => this.choiceHandler(i) }
                    >
                        {choice_text}
                    </Choice>
                )}
                <div className={this.props.showingScore ? "Answer" : "hidden" }>
                    {this.props.selected === this.props.correct ? 
                        <p className="Success">You're right!</p> 
                        : <p className="Failure">The correct answer is: "{this.props.choices[this.props.correct]}"</p> }
                    
                </div>
            </div>
        )
    }
}

// Statement of problem for multiple choice Question
function Problem(props) {
    return (<div><p>{props.questionText}</p></div>);
}

// Answer choice for multiple choice Question
class Choice extends React.Component {

    render() {
        const {
            className,
            children,
            onClick,
        } = this.props;
        return (
            <button 
                className={className}
                type="button"  
                onClick={onClick}
            >
                {children}
            </button>     
        );
    }
}

export default QuestionList;