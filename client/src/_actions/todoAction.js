import axios from "axios";
import * as types from "./types";
import makeToast from '../utils/toaster';
const URI = 'http://localhost:5000/api'


// Get current RateDryDrum
export const getAllTodo = id => async dispatch => {

    try {
        const res = await axios.get(`${URI}/todo`);
        dispatch({
            type: types.GET_TODOS,
            payload: res.data.data
        });
    } catch (err) {
        dispatch({
            type: types.TODO_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};



// Add Todo
export const addTodo = (formData, history) => async dispatch => {
    try {
        const res = await axios.post(`${URI}/todo`, formData);
        dispatch({
            type: types.ADD_TODO,
            payload: res.data
        });

        makeToast("success", "Price Added Succesfully")

        history.push(`/todo`);

    } catch (err) {


        // if (err) {
        //     makeToast("error", "Something Went Wrong")
        // }

    }
};




//Delete RateDryDrum
export const deleteTodo = (id) => async dispatch => {

    if (
        window.confirm(
            "Are You Sure to Delete?"
        )
    ) {
        try {
            await axios.delete(`${URI}/todo/${id}`);
            dispatch({
                type: types.DELETE_TODO,
                payload: id
            });

            makeToast("info", "Deleted Succesfully")

            // window.location.reload()
        } catch (err) {
            dispatch({
                type: types.TODO_ERROR
            });
        }
    }
};


// Get current RateDryDrum
export const getCurrentTodo = id => async dispatch => {

    try {
        const res = await axios.get(`${URI}/todo/${id}`);
        dispatch({
            type: types.GET_TODO,
            payload: res.data.data
        });
    } catch (err) {
        dispatch({
            type: types.TODO_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


// Edit RateDryDrum
export const editTodo = (formData, id, history) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const res = await axios.patch(`${URI}/todo/${id}`, formData, config);

        dispatch({
            type: types.GET_TODO,
            payload: res.data
        });

        makeToast("success", "Edited Succesfully")


        history.push(`/todo`);
    } catch (err) {
        const errors = err.response.data;

        if (errors) {
            makeToast("error", "Something Went Wrong")

        }

        dispatch({
            type: types.TODO_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};



//Set Current RateDryDrum
export const setCurrentTodo = (id) => async dispatch => {


    dispatch({
        type: types.SET_CURRENT_TODO,
        payload: id
    });
};