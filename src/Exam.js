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
            responses:"----" // dumb string for now
        }
        this.selectChoice = this.selectChoice.bind(this)
    }

    selectChoice(choice,question) {
        this.responses[question].setState(choice)
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
                key={i} /* Look for a better solution than this */
                question={item.question}
                choices={item.choices}
            />
        );
    }
    
    render() {
        return(
            <div>
                {this.props.questions.map((item,i) => 
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
                <Problem questionText={this.props.question}/>
                {/* Insert code here to render choices*/}
                {this.props.choices.map((choice_text, i) =>
                    <Choice 
                        key={i} // index of answer choice
                        className='Choice'
                        onClick={(i) => console.log("WHY")}
                    >
                        {choice_text}
                    </Choice>
                )}
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

export default Exam