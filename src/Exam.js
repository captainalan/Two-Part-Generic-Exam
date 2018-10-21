import React, { Component } from 'react'
import './Exam.css'
import QuestionList from './QuestionList'
import FreeResponseEssay from './FreeResponseEssay'
import ScoreBox from './ScoreBox'

// We can shuffle the questions and answer choices and stuff on the backend
// By default, all the right answers are the second choice (we start counting at 0)
const questions = [
    {question:'Why did the chicken cross the road?', choices:['To walk into a bar', 'To get to the other side.', 'For kicks and giggles.','I know why the caged bird sings.'], correct: 1},
    {question:'What is the capital of california?', choices:['Sacramento','California','Irvine','47'], correct: 1},
    {question:'Which of the following is a social construct?', choices:['Gravity','The will of the people','Butter','Bitcoin'], correct: 1},
    {question:'Foo is to bar as Sam is to ____', choices:['ple','sung','e','po'], correct: 1},
    {question:'How many moons does Earth have?', choices:['zero','one','two','three'], correct: 1}
]

class Exam extends Component {

    constructor(props){
        super(props);
        this.state = {
            questions:questions,
            responses:{},
            showingScore:false,
        }
        this.selectChoice = this.selectChoice.bind(this)
        this.toggleShowScore = this.toggleShowScore.bind(this)
        this.resetExam = this.resetExam.bind(this)
    }

    /* Reset entire exam */
    resetExam() {
        this.setState({responses:{}});
        this.setState({showingScore:false});
        // this.setState({essay:''});
    }

    selectChoice(questionIndex,choice) {
        let newResponses = Object.assign({}, this.state.responses);
        newResponses['q' + questionIndex] = choice;
        this.setState({responses:newResponses});
    }

    toggleShowScore(){
        this.state.showingScore ? 
            this.setState({showingScore:false}) : this.setState({showingScore:true})
    }

    render() {
        return(
            <div>
                <h2>Instructions</h2>
                <p>Do this. Do that. Bark, bark, bark. Did you hear what I said? 
                    Mumble, grumble.</p>

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
                    showingScore={this.state.showingScore}
                />

                <FreeResponseEssay 
                    initial_text={"I think that I am clever because..."}
                    onSubmit={essayText => {this.setState({essay:essayText})}}
                />

                <ScoreBox 
                    questions={this.state.questions}
                    responses={this.state.responses}
                    essay={this.state.essay}
                    toggleShowScore={this.toggleShowScore}
                    showingScore={this.state.showingScore}
                    reset={this.resetExam}
                />
            </div>
        )
    }
}


export default Exam