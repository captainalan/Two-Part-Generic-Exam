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
        this.showScore = this.showScore.bind(this);
        this.hideScore = this.hideScore.bind(this);
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

    showScore () {
        this.calculateScore(); // First update score calculation,
        this.setState({scoreShowingp:true}); // then make it visible.
    }

    hideScore () {
        this.setState({scoreShowingp:false}); // Hide ScoreReport
    }

    render() {
        return (
            <div className="ScoreBox">
                <h2>Finished?</h2>
                <p>I give out grades.</p>

                <button
                    className='Choice'
                    onClick={this.showScore}
                >
                    How'd I do?
                </button>

                <button
                    className='Choice'
                    onClick={this.hideScore} 
                >
                    Don't judge pls.
                </button>
                <button
                    className='Choice'
                    onClick={() => alert("What's done is done, bucko.")} 
                >
                    Reset everything
                </button>

                <div 
                    className={this.state.scoreShowingp ? 
                        "ScoreReport" : "ScoreReport hidden"}
                >
                <h2>Evaluation</h2>
                <p>Score: {(this.state.score*100).toFixed(2)}%</p>

                <p>Here is what you wrote for your essay: </p>
                
                <div className="EssayDisplay">{this.props.essay}</div>

                </div>
            </div>
        )
    }
}

export default ScoreBox;