import React from 'react';
import Button from '@material-ui/core/IconButton';
import Settings from '@material-ui/icons/Settings';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  iconColor : {
      color: "white"
  }
});

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    localStorage.setItem("email", null);
    this.setState({redirect : true});
  };

  update = () => {
    this.props.recurPhoneGet();
    this.setState({ anchorEl: null });
  }

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;

    if (this.state.redirect) {
      return <Redirect push to="/login" />;
    }

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
            <Settings className={classes.iconColor}/>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.update}>Update device</MenuItem>
          <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

SimpleMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMenu);