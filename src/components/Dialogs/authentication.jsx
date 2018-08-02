import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { Typography } from '../../../node_modules/@material-ui/core';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends React.Component {


  render() {


    return (
      <div>
        <Dialog
          open={this.props.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.props.onClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          {/* <DialogTitle id="alert-dialog-slide-title">
            {"Enter your password"}
          </DialogTitle> */}
          <DialogContent>
            <Typography variant='title'>Enter Password</Typography>
            <TextField
              id="password"
              label="Password"
              type="password"
              // className={classes.textField}
              value={this.props.pass}
              onChange={this.props.handlePassChange}
              margin="normal"
            />
            {this.props.invalid ? <Typography color='error'>invalid Password</Typography>:""}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handlePassSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialogSlide;