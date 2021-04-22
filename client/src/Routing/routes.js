import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Login from '../component/Authorization/Login'

import TodoCard from "../component/todoCard";
import AddTodo from "../component/addTodo";
import EditTodo from "../component/editTodo";


const Routes = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route exact path="/login" component={Login} />
                <PrivateRoute path="/todo" component={TodoCard} />
                <PrivateRoute path="/add/todo" component={AddTodo} />
                <PrivateRoute path="/edit/todo/:id" component={EditTodo} />
            </Switch>
        </React.Fragment>
    );
}



export default Routes;
