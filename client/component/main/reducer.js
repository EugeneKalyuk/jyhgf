import {NEW_MESSAGE} from './actions';

const init = [];


export default function main(state = init, action) {
  switch (action.type) {
	case NEW_MESSAGE:
      return [
		...state, action.payload
      ];
    default:
      return state;
  }
}
