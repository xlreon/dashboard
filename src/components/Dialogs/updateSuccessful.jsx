import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}


const styles = theme => ({
    tick : {
        hint : 50,
        width : 50,
    },
    container : {
      display: 'flex',
      justifyContent : 'center',
      alignItems : 'center',
    },
});

class AlertDialogSlide extends React.Component {


  render() {
    const {classes } = this.props;

    return (
      <div>
        <Dialog
          open={this.props.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.props.handleCloseDialog}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
          Password Updated Successfully
          </DialogTitle>
          <DialogContent className={classes.container}>
            {/* <DialogContentText id="alert-dialog-slide-description">
              Password Updated Successfully
            </DialogContentText> */}
            <img src="https://png.icons8.com/flat_round/2x/checkmark.png" classes={classes.tick}/>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleRedirect} color="primary">
              Go to Login Page
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