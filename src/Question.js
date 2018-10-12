import React from 'react';
import './Question.css';

class Question extends React.Component {
    constructor(props) {
        super(props);

        this.selectChoice = this.selectChoice.bind(this);
        // Question state is question with answer choices in some order
        this.state = {
            selected: null, // Answer choice that is selected
        }
    }

    /* Things to do:
    - Be able to select answer choices
    - OnMouseEnter effects(?)
    */

    selectChoice(i) {
        this.setState({selected:i});
        console.log(i," selected");
    }

    render() {
        return(
            <div className='Question'>
                <div className="Problem">
                     
                    <Problem problem={this.props.question}/> {/* Problem statement*/}

                    {/* Randomize the order of these things later*/}
                    {this.props.choices.map((item, i) => 
                        <Choice 
                            key={i} /* Can a find a better key than this?*/
                            option={item} 
                            // onClick={() => this.props.onClick()}
                            onClick={() => this.selectChoice(i)}
                        />)}
                    {/* Draw choices*/}
                </div>
                {/* Get choices*/}
            </div>
        )
    }
}

function Problem(props) {
    return(
        <div
            className="Problem" 
        >
            <p>{props.problem}</p>
        </div>
    )
}

function Choice(props) {
    return (
        <button 
            type="button"
            className="Choice"
            onClick={props.onClick}
        >
            {/*Find a way to get unique keys*/}
            {props.option}
        </button>     
    );
}

export default Question;