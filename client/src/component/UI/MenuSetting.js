import React from "react";
import { ListItem, ListItemIcon, ListItemText, List, makeStyles } from "@material-ui/core/";
import ListAltIcon from '@material-ui/icons/ListAlt';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from '../../_actions/authAction'


const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
        color: 'black'
    }
}))

const MenuSettings = ({ onDrawerClose, auth: { username, isAuthenticated, loading, role, user },
    logout }) => {
    const classes = useStyles();



    const PublicLink = (

        <List>

            <Link to="/login" className={classes.link}>
                <ListItem button onClick={onDrawerClose}>
                    <ListItemIcon>
                        <VpnKeyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                </ListItem>
            </Link>

        </List>
    );

    const PrivateLink = (

        <List>

            <Link to="/todo" className={classes.link}>
                <ListItem button onClick={onDrawerClose}>
                    <ListItemIcon>
                        <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Todo" />
                </ListItem>
            </Link>


            <Link to="/login" className={classes.link}>
                <ListItem button onClick={logout}>
                    <ListItemIcon>
                        <LockOpenIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </Link>
        </List>
    )





    return (
        <React.Fragment>
            {isAuthenticated ? PrivateLink : PublicLink}
        </React.Fragment>

    );
}



MenuSettings.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(MenuSettings);
