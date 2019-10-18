import { BEGIN, SUCCESS, ERROR } from './actions'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

const initialState = {
    result: {
        success: true,
        isFetching: false
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BEGIN:
            return {
                result: {
                    success: false,
                    isFetching: true,
                    error: false,
                    content: null,
                    method: action.method
                }
            };
        case SUCCESS:
            return {
                result: {
                    success: true,
                    isFetching: false,
                    error: false,
                    content: action.content,
                    method: action.method
                }
            };
        case ERROR:
            return {
                result: {
                    success: false,
                    isFetching: false,
                    error: true,
                    content: null,
                    method: action.method
                }
            };
        default:
            return state;
    }
}

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

export default store
