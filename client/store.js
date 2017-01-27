import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import main from './component/main/reducer';
import localStorage from './component/main/localStorage';
import {composeWithDevTools} from 'redux-devtools-extension';

export default function store(initialState) {
    return createStore(
        combineReducers({
            main,
            localStorage
        }),
        initialState,
        composeWithDevTools(applyMiddleware(thunk))
    );
}
