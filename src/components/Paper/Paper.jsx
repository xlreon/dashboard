import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from "@material-ui/core/Grid";
import SmallFeature from "components/SmallFeature/SmallFeature.jsx";
import SimpleSelect from "components/SimpleSelect/SimpleSelect.jsx";
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

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
    phoneList: null,
  };
  
  constructor(props) {
    super(props);

    

  //   this.state = {
  //     device: 0,
  //     phones: props.phones,
  //   };

  //   console.log(props.phones)
  }

  componentDidMount() {
    
    console.log(this.props.phones);
    // this.setState({phoneList : this.props.phones});
  }

  getFeature = (feature) => {
    // console.log(feature);
    var body = { featureName : feature.api};

    var formBody = [];
    for (var property in body) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(body[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    axios.post(`http://ec2-18-216-27-235.us-east-2.compute.amazonaws.com:8080/feature`, 
        formBody
    )
    .then(res => {
        this.handleClick(feature.api + " API call : Success");
        console.log(res);
    })
    .catch(error => {
        this.handleClick(feature.api + " API call : Failure");
        console.log(error);
    })
  }

  handleClick = (msg) => {
    this.setState({ open: true, message : msg });
  };

  handleClose = () => {
      this.setState({ open: false });
  };


  handleChange = event => {
    this.setState({ device: event.target.value });
  };

  render() {
    const { classes, width, height, phoneImg, phoneName, features, phones } = this.props;
    const { device } = this.state;
    // var currPhone = phones[device]
    // if (currPhone)
    // {
    //   this.setState({phone : currPhone});
      // console.log(this.state.phones)
    // }

    return (
        <div>
          <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.message}</span>}
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={this.handleClose}
                >
                <CloseIcon />
                </IconButton>,
            ]}
          />
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
              {/* {this.state.phone.name} */}
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
                  return <Grid item xs={4}><SmallFeature feature={prop} key={key} getFeature={this.getFeature}/></Grid>;
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
