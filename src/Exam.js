import React, { Component } from 'react'
import QuestionList from './QuestionList.js'

class Exam extends Component {
    constructor(props){
        super(props);

        // Example questions; in the future get these from some backend,
        // Serve on express server via JSON?

        // We can shuffle the questions and answer choices and stuff on the backend
        // Here, just be able to select answers, make them ready for submission 

        this.state = {
            questions:[
                {qid:'q1', question:'Foo?', choices:['Bar', 'Baz','Bloop','Blip']},
                {qid:'q2', question:'Foo too?', choices:['Bar too','Baz','Bloop','Blip']},
                {qid:'q3', question:'Foo three?', choices:['Bar tree','Baz','Bloop','Blip']},
                {qid:'q4', question:'Foo four?', choices:['Foo for thought','answer','me','this']}
            ],
        }
    }

    selectChoice(qid,resp) {
        // console.log('You said ' + resp + ' for ' + qid);
        // Answered question just stored in this.state under qid as key for now
        this.setState({ [qid]:resp }); // JSX trickery to use dynamic key; maybe not best practice? 
    }

    render() {
        return(
            <div>
                <h2>Instructions</h2>
                <p>Do this. Do that. Bark, bark, bark. Did you hear what I said? Mumble, grumble.</p>
                <h2>Here are the questions.</h2>
                <QuestionList 
                    questions={this.state.questions} 
                    onClick={(qid,resp) => this.selectChoice(qid,resp)}
                />
            </div>
        )
    }
}

export default Exam