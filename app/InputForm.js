import React,
		 { Component } from "react";

class InputForm extends Component{
	constructor( props ){
		super( props );
		this.state = {
			inputValue : "",
		};
		this.recordInput = this.recordInput.bind( this );
		this.submit = this.submit.bind( this );
	}

	recordInput( e ){
		this.setState({ inputValue : e.target.value });
	}

	submit( e ){
		e.preventDefault();
		this.props.onSubmitCall( this.state.inputValue );
	}

	render(){
		let classToAppend = "formHeader";
		if( this.props.title == "Github Username" ){
			classToAppend = `mainForm ${ classToAppend }`;
		} else if( this.props.title == "filter by" ){
			classToAppend = `secondaryForm ${ classToAppend }`;
		}
		return(
			<form className = { classToAppend }
					onSubmit = { this.submit }>
				<label htmlFor = "user_input">
					{ this.props.title }
				</label>
				<input className = "userInput"
						 type = "input"
						 autoFocus = { this.props.autoFocusStatus }
						 onChange = { this.recordInput } />
				{/*<input type = "submit" value = "get repos" />*/}
			</form>
		);
	}
}

export default InputForm;