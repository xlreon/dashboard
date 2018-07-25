import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import SmallFeature from "components/SmallFeature/SmallFeature.jsx";
import SimpleSelect from "components/SimpleSelect/SimpleSelect.jsx";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: 20,
    paddingBottom: 20,
  },
  features : {
    paddingTop : 20,
  }
});

class PaperSheet extends React.Component {
  
  state = {
    device: 0,
  };

  handleChange = event => {
      console.log(event)
    this.setState({ device: event.target.value });
  };

  render() {
    const { classes, width, height, phoneImg, phoneName, features, phones } = this.props;
    const { device } = this.state;
    var currPhone = phones[device]
    console.log(currPhone);

    return (
        <div>
        <Paper
          style={{width: width,height: height}}
          className={classes.root} elevation={1}>
            <SimpleSelect 
              phones={phones} 
              device={this.state.device}
              handleChange={this.handleChange}
            />
            <img style={{width: "100px",height: "100px"}} src={phoneImg} />
            <Typography component="p">
              {/* {phones.device.name} */}
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
            <Grid spacing={24} container className={classes.features}> 
              {features.map((prop, key) => {
                  return <Grid item xs={4}><SmallFeature feature={prop}/></Grid>;
              })}
            </Grid>
        </Paper>
        </div>
    );
  }
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
