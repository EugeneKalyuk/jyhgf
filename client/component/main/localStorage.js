const init = [];

export default function localStorage(state = init, action) {
	switch (action.type) {
		case 'LOAD_LOCALSTORAGE':
			return [
				...action.payload,
				...state
			];
		default:
			return state;
	}
}
