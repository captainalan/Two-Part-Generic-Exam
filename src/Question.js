import React from 'react';
import './Question.css';

// Each multiple choice question consists of a problem statement and
// answer choices.
class Question extends React.Component {
    render() {
        return (
            <div className='Question'>
                <Problem>{this.props.question}</Problem>
                {/* Insert code here to render choices*/}
                {this.props.choices.map((choice_text, i) =>
                    <Choice 
                        key={i} // index of answer choice
                        className='Choice'>{choice_text}
                    </Choice>
                )}
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
            className,
            children,
        } = this.props;

        return (
            <button 
                className={className}
                type="button"  
            >
                {children}
            </button>     
        );
    }
}

export default Question;