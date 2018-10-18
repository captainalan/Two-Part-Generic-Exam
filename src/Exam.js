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
            responses:{},
        }
        this.selectChoice = this.selectChoice.bind(this)
    }

    selectChoice(questionIndex,choice) {
        // Make a copy of state because we can't change state directly
        let newResponses = Object.assign({}, this.state.responses);
        newResponses['q' + questionIndex] = choice; // Update the copy
        this.setState({responses:newResponses}); // Update state
    }

    render() {
        return(
            <div>
                <h2>Instructions</h2>
                <p>Do this. Do that. Bark, bark, bark. Did you hear what I 
                   said? Mumble, grumble.
                </p>
                <h2>Here are the multiple choice questions.</h2>

                <p>Confine your thoughts to the provided answer choices. 
                   You may look <em>up</em> for inspiration, <em>down</em> in 
                   desperation, but you may NOT look <em>side to side</em> for 
                   consolation.
                </p>

                <QuestionList 
                    questions={this.state.questions} 
                    responses={this.state.responses}
                    selectChoice={(qid,choice) => this.selectChoice(qid,choice) }
                    // onClick={(qid,resp) => this.selectChoice(qid,resp)}
                />
                <FreeResponseEssay 
                    onSubmit={essayText => {this.setState({essay:essayText})}}
                />

                <ScoreBox 
                    questions={this.state.questions}
                    responses={this.state.responses}
                    essay={this.state.essay}
                />
            </div>
        )
    }
}

class FreeResponseEssay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "I think that I'm clever because..."
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        console.log('Essay submitted ' + this.state.value)
        event.preventDefault();
        this.props.onSubmit(this.state.value); // Send essay up!
    }

    render() {
        return(
            <div className='FreeResponeEssay'>
                <h2>Free Response Section</h2>
                <form onSubmit={this.handleSubmit}>
                <label> {/* Figure out what <label /> is for */}
                    <p>Here, you can write about your feelings.</p>
                    <textarea 
                        value={this.state.value}
                        onChange={this.handleChange}
                        rows="10" 
                        cols="79"
                        id="essay" name="essay"
                    />
                </label> <br />
                <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

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
                        choices={item.choices}
                        choiceHandler={(choice) => this.props.selectChoice(index,choice)}
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