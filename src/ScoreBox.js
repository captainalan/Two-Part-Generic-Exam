import React from 'react';
import './ScoreBox.css';

class ScoreBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            score:0,
            scoreShowingp:false // p is for predicate
        }

        this.calculateScore = this.calculateScore.bind(this);
        this.toggleShowScore = this.toggleShowScore.bind(this);
    }

    calculateScore () {
        // Data structure for this thing is different from the response object
        // So here is a hacky way of getting easily comparable objects
        let questions = {}
        this.props.questions.forEach((currentValue, index) => {
            let foo = "q" + [index];
            questions[foo] = currentValue.correct;
        })
        // Score calculation is (number correct) / (total possible)
        let responses = this.props.responses;
        let my_score = 0;
        let total_possible = Object.keys(questions).length;

        for (let key in responses) {
            (responses[key] === questions[key]) && (my_score+=1);
        }
        this.setState({score:my_score/total_possible});
    }

    toggleShowScore () {
        this.calculateScore(); // First update score calculation,
        // this.setState({scoreShowingp:true}); // then make it visible.
        this.props.toggleShowScore();
    }

    render() {
        return (
            <div className="ScoreBox">
                <h2>Finished?</h2>
                <p>I give out grades.</p>

                <button
                    className='Choice'
                    onClick={this.toggleShowScore}
                >
                    {!this.props.showingScore ? "How'd I do?" : "Hide score"}
                </button>

                <button
                    className='Choice'
                    onClick={this.props.reset} 
                >
                    Reset multiple choice
                </button>

                <div 
                    className={this.props.showingScore ? 
                        "ScoreReport" : "ScoreReport hidden"}
                >
                <h2>Evaluation</h2>
                <p>Your score: {(this.state.score*100).toFixed(2)}%</p>
                <p>Scroll back up to the questions to see the correct answers.</p>

                <p>Here is what you wrote for your essay: </p>
                
                <div className="EssayDisplay">{this.props.essay}</div>

                <p>Seems okay to me.</p>

                </div>
            </div>
        )
    }
}

export default ScoreBox;