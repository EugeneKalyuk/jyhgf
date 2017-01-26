import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

if (global.IS_BROWSER) {
	require('./guestbook.styl');
}

const propTypes = {
	onSendMessage: PropTypes.func.isRequired,
	onDelComment: PropTypes.func.isRequired,
	onEditComment: PropTypes.func.isRequired,
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

		this.handleRemove = this.handleRemove.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
	}

	handleName(e) {
		this.setState({
			name: e.target.value
		});
	}

	handleMessage(e) {
		let counterSymbols;

		counterSymbols = 500 - e.target.value.length;

		this.setState({
			message: e.target.value,
			messageLength: counterSymbols
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		if (this.state.name !== '' && this.state.message) {
			this.props.onSendMessage(this.state);
			this.setState({
				name: '',
				message: '',
				messageLength: 500
			});
		}

		return false;
	}

	handleRemove({index}) {
		this.props.onDelComment(index);
	}

	handleEdit({index}) {
		this.props.onEditComment(index);
	}

	render() {
		return (
			<div className='wrap'>
				<div className='container'>
					<ul className='list'>
						{this.props.messages.map((message, index) => {
							function handleRemoveAdapter() {
								this.handleRemove({index});
							}
							function handleEditAdapter() {
								this.handleEdit({index});
							}
							return (
								<li key={index} id={message.id} className='items list__items'>
									<div className='header-item items__header-item'>
										<div className='header-item__time-item'>{message.time}</div>
										<div className='header-item__name-item'>{message.name}</div>
										<div className='header-item__handlers'>
											<div className='header-item__edit-item'>
												<button type='button'
												onClick={handleEditAdapter.bind(this)}>
													<img src='../../images/edit.svg' alt='edit' />
												</button>
											</div>
											<div className='header-item__del-item'>
												<button type='button'
													onClick={handleRemoveAdapter.bind(this)}>
													<img src='../../images/delete.svg' alt='delete' />
												</button>
											</div>
										</div>
									</div>
									<div className='message-item items__message-item'>{message.message}</div>
								</li>
							);
						}
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
			let date = new Date(),
				currHours = date.getHours(),
				currMinutes = date.getMinutes(),
				currSec = date.getSeconds(),
				currDate = date.getDate(),
				currMonth = date.getMonth() + 1,
				currYear = date.getFullYear();

			if (currSec < 10) {
				currSec = '0' + currSec;
			}
			if (currHours < 10) {
				currHours = '0' + currHours;
			}
			if (currMinutes < 10) {
				currMinutes = '0' + currMinutes;
			}

			if (currMonth < 10) {
				currMonth = '0' + currMonth;
			}

			const time = currHours + ':' +
					currMinutes + ':' +
					currSec + ' ' +
					currDate + '/' +
					currMonth + '/' +
					currYear;

			const payload = {
				id: Date.now().toString(),
				name: message.name,
				message: message.message,
				time: time
			};
			dispatch({type: 'NEW_MESSAGE', payload});
			mapToLocalStorage(message);
		},
		onDelComment: (payload) => {
			dispatch({type: 'DEL_MESSAGE', payload});
		},
		onEditComment: (payload) => {
			dispatch({type: 'EDIT_MESSAGE', payload});
		}
	});
}

let list = [];

function mapToLocalStorage(message) {
	list.push(message);
	localStorage.setItem('list', JSON.stringify(list));
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GuestBook);

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
