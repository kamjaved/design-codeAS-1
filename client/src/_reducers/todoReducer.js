/* eslint-disable import/no-anonymous-default-export */
import * as types from "../_actions/types";

const initialState = {
    todo: null,
    todos: [],
    error: {},
    loading: true
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case types.GET_TODO:
            return {
                ...state,
                todo: payload,
                loading: false
            };

        case types.GET_TODOS:
            return {
                ...state,
                todos: payload,
                loading: false
            };

        case types.GET_CURRENT_TODO:
            return {
                ...state,
                todo: payload,
                loading: false
            };



        case types.ADD_TODO:
            return {
                ...state,
                todo: payload,
                loading: false
            };
        case types.SET_CURRENT_TODO:
            return {
                ...state,
                todo: action.payload
            };

        case types.DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todos => todos._id !== action.payload),
                loading: false
            };
        case types.TODO_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
