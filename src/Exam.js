import React, { Component } from 'react'
import './Exam.css'

// We can shuffle the questions and answer choices and stuff on the backend
const questions = [
    {question:'Foo?', choices:['Bar', 'Baz','Bloop','Blip'], correct: 1},
    {question:'Foo too?', choices:['Bar too','Baz','Bloop','Blip'], correct: 1},
    {question:'Foo three?', choices:['Bar tree','Baz','Bloop','Blip'], correct: 1},
    {question:'Foo four?', choices:['Foo for thought','answer','me','this'], correct: 1}
]

class Exam extends Component {
    constructor(props){
        super(props);
        this.state = {
            questions:questions,
        }
    }

    selectChoice(qid,resp) {
        // console.log('You said ' + resp + ' for ' + qid);
        // this.setState({ [qid]:resp }); // JSX trickery to use dynamic key; maybe not best practice? 
    }

    render() {
        return(
            <div>
                <h2>Instructions</h2>
                <p>Do this. Do that. Bark, bark, bark. Did you hear what I said? Mumble, grumble.</p>
                <h2>Here are the questions.</h2>
                <QuestionList 
                    questions={this.state.questions} 
                    responses={this.state.responses}
                    onClick={(qid,resp) => this.selectChoice(qid,resp)}
                />
            </div>
        )
    }
}

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

// Each multiple choice question consists of a problem statement and
// answer choices.
class Question extends React.Component {
    render() {
        return (
            <div className='Question'>
                <Problem>{this.props.question}</Problem>
                {/* Insert code here to render choices*/}
                {this.props.choices.map((choice_text, i) =>
                    <Choice 
                        key={i} // index of answer choice
                        className='Choice'>{choice_text}
                    </Choice>
                )}
            </div>
        )
    }
}

// Statement of problem for multiple choice Question
class Problem extends React.Component {
    render() {
        const {
            className,
            children,
        } = this.props;
        return (
            <div className={className}>
                <p>{children}</p>
            </div>
        );
    }
}

// Answer choice for multiple choice Question
class Choice extends React.Component {
    render() {
        const {
            className,
            children,
        } = this.props;

        return (
            <button 
                className={className}
                type="button"  
            >
                {children}
            </button>     
        );
    }
}

export default Exam