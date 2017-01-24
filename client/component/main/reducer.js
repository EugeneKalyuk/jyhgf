import {NEW_MESSAGE, DEL_MESSAGE, EDIT_MESSAGE} from './actions';

const init = JSON.parse(localStorage.getItem('list')) || [];
console.log(init); // eslint-disable-line

export default function main(state = init, action) {
	let newState;
	switch (action.type) {
		case NEW_MESSAGE:
			return [
				...state, action.payload
			];
		case DEL_MESSAGE:
			newState = state.filter(function (message, key) {
				return key !== action.payload;
			});
			return [
				...newState
			];
		case EDIT_MESSAGE:
			return [
				...state
			];
	default:
		return state;
	}
}
