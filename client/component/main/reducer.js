import {NEW_MESSAGE, DEL_MESSAGE} from './actions';

const init = [];


export default function main(state = init, action) {
  switch (action.type) {
	case NEW_MESSAGE:
      return [
		...state, action.payload
      ];
		case DEL_MESSAGE:
			let _state = state.splice(action.index, 1); // eslint-disable-line no-underscore-dangle

			return [
				..._state
			];
    default:
      return state;
  }
}
