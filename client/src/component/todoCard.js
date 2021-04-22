import React, { Fragment, useEffect } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { getAllTodo, deleteTodo, setCurrentTodo } from "../_actions/todoAction"


// MATERIAL-ui IMPORT
import { makeStyles, Grid, Card, CardContent, Typography, CardActions, CardHeader, CardActionArea, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },


    gridMargin: {
        marginTop: 100,
        marginLeft: 30,
        // marginRight: 30,
        // marginBottom: 40
    },

    card: {
        flexGrow: 1,
        height: 330,
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 110px -12.125px rgba(0,0,0,0.3)"
        }
    },

    cardActionArea: {
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },

    header: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        width: '100%',

    },


    link: {
        textDecoration: "none",
        colour: "black"
    },


    pos: {
        marginBottom: 12,
    },
    rateText: {
        fontSize: 14,
        fontWeight: 600,

    },

    actions: {
        marginTop: 'auto'
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },

}));



function TodoCards({ getAllTodo, todos, deleteTodo, loading, setCurrentTodo }) {
    const classes = useStyles();

    useEffect(() => {
        getAllTodo();


        //eslint-diable-next-line
    }, [getAllTodo]);

    const handleDelete = (id) => {

        deleteTodo(id);
    }

    return (
        <Fragment>
            {todos !== null && !loading ? (

                <div className={classes.root}>
                    <Grid container spacing={3} className={classes.gridMargin}>

                        {todos ? todos.map(item => (
                            <Grid item xs={12} sm={4} lg={2} key={item._id} >


                                <Card className={classes.card} >
                                    <CardActionArea
                                        className={classes.cardActionArea}>

                                        <CardHeader
                                            className={classes.header} title={item.title}>
                                        </CardHeader>
                                    </CardActionArea>

                                    <CardContent>

                                        <Typography variant="p" gutterBottom className={classes.rateText}>

                                            {item.desc}
                                        </Typography>

                                    </CardContent>

                                    <CardActions className={classes.actions} >
                                        <Link to={`edit/todo/${item._id}`} onClick={() => setCurrentTodo(item._id)}>   <IconButton>
                                            <EditIcon />
                                        </IconButton>  </Link>

                                        <IconButton onClick={() => handleDelete(item._id)}>
                                            <DeleteIcon />
                                        </IconButton>

                                    </CardActions>

                                </Card>


                            </Grid>

                        )) : <h4>Loading....</h4>}

                    </Grid>

                    <Link to="/add/todo">
                        <Tooltip title="Add-Process" aria-label="Process">
                            <Fab color="secondary" className={classes.absolute}>
                                <AddIcon />
                            </Fab>
                        </Tooltip></Link>

                </div>

            ) : <h2>Loading...</h2>
            }
        </Fragment>
    )
}




TodoCards.propTypes = {
    getAllTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    setCurrentTodo: PropTypes.func.isRequired,
    todos: PropTypes.array.isRequired,

}
const mapStateToProps = (state) => ({
    auth: state.auth,
    todos: state.todos.todos,
    loading: state.todos.loading

})

export default connect(mapStateToProps, { getAllTodo, deleteTodo, setCurrentTodo })(TodoCards)

