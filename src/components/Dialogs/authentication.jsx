import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { Typography } from '../../../node_modules/@material-ui/core';
import logo from "assets/img/pfa.png";
import { withStyles } from '@material-ui/core/styles';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
    
  img : {
    marginBottom : 20,
    marginTop : 20,
  },
  content : {
    marginRight : 30,
    marginLeft : 30
  },
  container : {
    display: 'flex',
    justifyContent : 'center',
    alignItems : 'center',
  },
  textField : {
    width : '100%'
  },
  dialog : {
    borderRadius: '25px'
  }
});

class AlertDialogSlide extends React.Component {


  render() {

    const {classes} = this.props;
    return (
      <div>
        <Dialog
          open={this.props.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.props.onClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          className={classes.dialog}
        >
          {/* <DialogTitle id="alert-dialog-slide-title">
            {"Enter your password"}
          </DialogTitle> */}
          <DialogContent className={classes.content}>
            <div className={classes.container}>
                <img src={logo} alt="logo" className={classes.img} />
            </div>
            <Typography variant='subheading'>To continue, first verify it's you</Typography>
            <TextField
              id="password"
              label="Enter your Password"
              type="password"
              className={classes.textField}
              value={this.props.pass}
              onChange={this.props.handlePassChange}
              margin="normal"
            />
            {this.props.invalid ? <Typography color='error'>Invalid Password</Typography>:""}
          </DialogContent>
          <DialogActions className={classes.container}>
            <Button onClick={this.props.handlePassSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AlertDialogSlide.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlertDialogSlide);