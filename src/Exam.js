import React, { Component } from 'react'
import './Exam.css'
import ScoreBox from './ScoreBox'

// We can shuffle the questions and answer choices and stuff on the backend
// By default, all the right answers are the second choice (we start counting at 0)
const questions = [
    {question:'Foo?', choices:['Bar', 'Baz','Bloop','Blip'], correct: 1},
    {question:'Foo too?', choices:['Bar too','Baz','Bloop','Blip'], correct: 1},
    {question:'Foo three?', choices:['Bar tree','Baz','Bloop','Blip'], correct: 1},
    {question:'Foo four?', choices:['Foo for thought','answer','me','this'], correct: 1},
    {question:'Foo five', choices:['do','the','um','err'], correct: 1}
]

class Exam extends Component {
    constructor(props){
        super(props);
        this.state = {
            questions:questions,
            responses:[]
        }
        this.selectChoice = this.selectChoice.bind(this)
    }

    selectChoice(qid,choice) {
        let foo = "q" + [qid]                // There's gotta be a more idiomatic way
        let bar = { ...this.state.responses} // Copy,
        bar[foo] = choice                    // add,
        this.setState({responses:bar})       // and update
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
                    selectChoice={(qid,choice) => this.selectChoice(qid,choice) }
                    // onClick={(qid,resp) => this.selectChoice(qid,resp)}
                />
                <ScoreBox 
                    questions={this.state.questions}
                    responses={this.state.responses}
                />
            </div>
        )
    }
}

class QuestionList extends React.Component {

    renderQuestion(item,qid) {
        return(
            <Question 
                key={'q' + [qid]} /* Look for a better solution than this */
                question={item.question}
                choices={item.choices}
                choiceHandler={(choice) => this.props.selectChoice(qid,choice)}
            />
        );
    }
    
    render() {
        return(
            <div>
                {this.props.questions.map((item,index) => 
                    this.renderQuestion(item,index)
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
        this.state = { selected:null }; // Store state of what is selected here
        this.choiceHandler = this.choiceHandler.bind(this);
    }

    choiceHandler(i){ // Using the same function names for dhifferent stuff 
                      // might get confusing
        this.props.choiceHandler(i);
        this.setState({selected:i});
        // Now add local stuff and highlighting effects and things
    }

    render() {
        let currentSelection = this.state.selected;

        return (

            <div className='Question'>
                <Problem questionText={this.props.question}/>
                {/* Insert code here to render choices*/}
                {this.props.choices.map((choice_text, i) =>
                    <Choice 
                        key={choice_text} // Better than using indices?
                        className={currentSelection === i ? 'Selected' : 'Choice'}
                        onClick={ () => this.choiceHandler(i) }
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