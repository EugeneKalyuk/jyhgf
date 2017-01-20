import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

if (global.IS_BROWSER) {
	require('./guestbook.styl');
}

const propTypes = {
	onSendMessage: PropTypes.func.isRequired,
	messages: PropTypes.array.isRequired
};

class GuestBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			message: '',
			messageLength: 500
		};
	}

	handleName(e) {
		this.setState({
			name: e.target.value
		});
	}

	handleMessage(e) {
		let counterSymbols;
		console.log(e.target.value.length); // eslint-disable-line no-console
		counterSymbols = 500 - e.target.value.length;

		this.setState({
			message: e.target.value,
			messageLength: counterSymbols
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		// const validateFields = {
		// 		name: {required: true},
		// 		message: {required: true}
		// 	};
		// const errors = {};
		//
		// Object.keys(this.state).forEach((fieldName) => {
		// 	if (validateFields[fieldName]) {
		// 		if (validateFields[fieldName].required) {
		// 			if (!this.state[fieldName]) {
		// 				errors[fieldName] = validateFields[fieldName].required;
		// 			}
		// 		}
		// 	}
		// });
		//
		// if (Object.keys(errors).length) {
		// 	console.log(errors); // eslint-disable-line no-console
		// 	return this.setState({errors});
		// }
		//
		// console.log(errors); // eslint-disable-line no-console

		if (this.state.name !== '' && this.state.message) {
			this.props.onSendMessage(this.state);
			this.setState({
				name: '',
				message: ''
			});
		}

		return false;
	}

	render() {
		// const {errors = { } } = this.state;
		return (
			<div className='wrap'>
				<div className='container'>
					<ul className='list'>
						{this.props.messages.map((message, index) =>
							<li key={index} className='items list__items'>
								<div className='name-item items__name-item'>{message.name}</div>
								<div className='message-item items__message-item'>{message.message}</div>
							</li>
						)}
					</ul>
				</div>
				<div className='container'>
					<label htmlFor='name' className='label-primary label'>Name</label>
					<input type='text'
						className='name-field'
						value={this.state.name}
						onChange={this.handleName.bind(this)}
						id='name'
					/>
					<label htmlFor='message' className='label-primary label'>Message</label>
					<textarea rows='4'
						className='message-field'
						id='message'
						value={this.state.message}
						onChange={this.handleMessage.bind(this)}
						maxLength='500'
					/>
					<div>Characters left: <span>{this.state.messageLength}/500</span></div>
					<button onClick={this.handleSubmit.bind(this)}
						className='btn btn-default btn-send'>
						Send
					</button>
				</div>
			</div>
		);
	}
}

GuestBook.propTypes = propTypes;

function mapStateToProps(state) {
	return ({
		messages: state.main
	});
}

function mapDispatchToProps(dispatch) {
	return ({
		onSendMessage: (message) => {
			const payload = {
				id: Date.now().toString(),
				name: message.name,
				message: message.message
			};
			dispatch({type: 'NEW_MESSAGE', payload});
		}
	});
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GuestBook);
