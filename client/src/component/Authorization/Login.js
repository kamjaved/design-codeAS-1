import React, { useState } from 'react';


import { Avatar, Button, CssBaseline, TextField, Typography, makeStyles, Container, } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../_actions/authAction";



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

const Login = ({ login, isAuthenticated }) => {

  const classes = useStyles();


  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChangeHandler = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitHandler = async e => {
    e.preventDefault();
    login(email, password);
  };



  if (isAuthenticated) {
    return <Redirect to="/todo" />;
  }




  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <form className={classes.form} noValidate onSubmit={e => onSubmitHandler(e)}>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            value={email}
            onChange={e => onChangeHandler(e)}
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            value={password}
            onChange={e => onChangeHandler(e)}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign In
          </Button>



        </form>
      </div>

    </Container>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,

};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,

});
export default connect(
  mapStateToProps,
  { login }
)(Login);