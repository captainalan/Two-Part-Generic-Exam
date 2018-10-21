import React from 'react';
import './ScoreBox.css';

class FreeResponseEssay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            initial_text: "I think that I'm clever because...",
            essay_submitted: false,
        };

        this.state.value = this.state.initial_text;

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick(event) {
        // Clear the original prompt text when user clicks text area
        if (this.state.value === this.state.initial_text){
            this.setState({value: ''});
        }
    }

    handleBlur(event) {
        if (this.state.value === ''){
            this.setState({value: this.state.initial_text});
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.value); // Send essay up!
        this.setState({ essay_submitted: true })
    }

    wordCount() {
        return (this.state.value).split(" ").length;
    }

    render() {
        return(
            <div className='FreeResponeEssay'>
                <h2>Here is the free response section.</h2>
                <form onSubmit={this.handleSubmit}>
                <label> {/* Figure out what <label /> is for */}
                    <p>Here, you can write about your feelings. Please write at least a dozen words.</p>
                    <textarea 
                        value={this.state.value}
                        onChange={this.handleChange}
                        onClick={this.handleClick}
                        onBlur={this.handleBlur}
                        rows="10" 
                        cols="79"
                        id="essay" name="essay"
                    />
                    {/* Insert word count feature here. */}
                    <p>Current word count is approximately {this.wordCount()} words.</p>
                    {!this.state.essay_submitted ? 
                        <p>Remember to click the Submit button to submit your essay!</p> 
                        : null }
                </label> <br />
                    <input type="submit" value="Submit" />
                </form>
                {this.state.essay_submitted && 
                    <p className="Success">Your essay has been submitted!</p>}
            </div>
        );
    }
}
export default FreeResponseEssay;