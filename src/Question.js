import React from 'react';
import './Question.css';

// Each multiple choice question consists of a problem statement and
// answer choices.
class Question extends React.Component {
    render() {
        return(
            <div className='Question'>
                <div className="Problem">
                    <Problem>{this.props.question}</Problem>
                    {/* Insert code here to render choices*/}
                    <Choice>Sample Text</Choice>

                </div>
            </div>
        )
    }
}

// Statement of problem for multiple choice Question
class Problem extends React.Component {
    render() {
        const {
            className,
            children,
        } = this.props;
        return (
            <div className={className}>
                <p>{children}</p>
            </div>
        );
    }
}

// Answer choice for multiple choice Question
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