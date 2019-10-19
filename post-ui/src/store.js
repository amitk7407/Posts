import { BEGIN, ERROR, SUCCESS } from './actions';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';

const initialState = {
    result: {
        content: null,
        error: null,
        isFetching: false,
        method: null,
        success: true
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BEGIN:
            return {
                result: {
                    content: null,
                    error: null,
                    isFetching: true,
                    method: action.method,
                    success: false
                }
            };

        case SUCCESS:
            return {
                result: {
                    content: action.content,
                    error: null,
                    isFetching: false,
                    method: action.method,
                    success: true
                }
            };

        case ERROR:
            return {
                result: {
                    content: null,
                    error: action.error,
                    isFetching: false,
                    method: action.method,
                    success: false
                }
            };

        default:
            return state;
    }
};

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

export default store;
