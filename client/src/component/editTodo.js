import React, { useState, useEffect } from 'react';

import { useHistory } from "react-router-dom";

import { Avatar, Button, CssBaseline, TextField, Typography, makeStyles, Container, } from '@material-ui/core';
import ListAltIcon from '@material-ui/icons/ListAlt';


import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editTodo, getCurrentTodo } from "../_actions/todoAction";



const useStyles = makeStyles((theme) => ({

    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const AddTodo = ({ editTodo, getCurrentTodo, match, loading, todoCurrent }) => {

    const classes = useStyles();
    const history = useHistory()


    const [formData, setFormData] = useState({
        title: "",
        desc: ""
    });

    const { title, desc } = formData;



    useEffect(() => {
        getCurrentTodo(match.params.id)

        setFormData({
            title: loading || !todoCurrent.title ? "" : todoCurrent.title,
            desc: loading || !todoCurrent.desc ? "" : todoCurrent.desc,

        })

        // eslint-disable-next-line
    }, [getCurrentTodo, loading]);

    const onChangeHandler = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitHandler = async e => {
        e.preventDefault();
        editTodo(formData, match.params.id, history);
    };



    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <ListAltIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Edit Todo
        </Typography>

                <form className={classes.form} noValidate onSubmit={e => onSubmitHandler(e)}>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        value={title}
                        onChange={e => onChangeHandler(e)}
                        name="title"
                        autoComplete="title"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="desc"
                        value={desc}
                        onChange={e => onChangeHandler(e)}
                        label="Description"
                        type="desc"
                        id="desc"
                        autoComplete="current-desc"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                    >
                        Edit Todo
          </Button>
                </form>
            </div>

        </Container>
    );
}

AddTodo.propTypes = {
    editTodo: PropTypes.func.isRequired,
    getCurrentTodo: PropTypes.func.isRequired,

};
const mapStateToProps = state => ({
    loading: state.todos.loading,
    todoCurrent: state.todos.todo
});
export default connect(
    mapStateToProps,
    { editTodo, getCurrentTodo }
)(AddTodo);