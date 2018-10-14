import React from 'react';
import './Question.css';

class Question extends React.Component {
    render() {
        return(
            <div className='Question'>
                <div className="Problem">
                    <Problem problem={this.props.question}/> 
                    {/* Insert code here to render choices*/}
                    <Choice>Sample Text</Choice>

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

class Choice extends React.Component {
    render() {
        const {
            onClick,
            className,
            children,
        } = this.props;

        return (
            <button 
                onClick={onClick}
                className={className}
                type="button"  
            >
                {children}
            </button>     
        );
    }
}

export default Question;