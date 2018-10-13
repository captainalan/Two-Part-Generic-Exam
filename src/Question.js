import React from 'react';
import './Question.css';

class Question extends React.Component {
    constructor(props) {
        super(props);
        // Question state is question with answer choices in some order
        this.state = {
            selected: null, // Answer choice that is selected
        }
    }

    /* Things to do:
    - OnMouseEnter effects(?)
    */

    render() {
        return(
            <div className='Question'>
                <div className="Problem">
                    <Problem problem={this.props.question}/> {/* Problem statement*/}
                    {this.props.choices.map((item, i) => 
                        <Choice 
                            key = {i} /* Find some better option than this...*/
                            optionText={item}
                            // Clicking an option passes that up...
                            onClick={() => this.props.onClick(i)}
                        />)}
                </div>
            </div>
        )
    }
}

function Problem(props) {
    return(
        <div className="Problem">
            <p>{props.problem}</p>
        </div>
    )
}

function Choice(props) {
    return (
        <button type="button" className="Choice" onClick={props.onClick}> 
            {props.optionText}
        </button>     
    );
}

export default Question;