import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function PaperSheet(props) {
    const { classes, width, height, phoneImg, phoneName } = props;

    return (
        <div>
        <Paper
          style={{width: width,height: height}}
        className={classes.root} elevation={1}>
            <img style={{width: "100px",height: "100px"}} src={phoneImg} />
            <Typography component="p">
              {phoneName}
            </Typography>
            <Typography component="p">
              Android
            </Typography>
            <Typography component="p">
              Battery 95%
            </Typography>
            <Typography component="p">
              ACT
            </Typography>
        </Paper>
        </div>
    );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
