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
    name: "",
    battery: "",
    wifi: "",
    os: ""
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
    
    // console.log(this.props.phones);
    this.setState({
      name: this.props.phones[this.state.device] !== undefined ? this.props.phones[this.state.device]["name"] : "",
      os: this.props.phones[this.state.device] !== undefined ? this.props.phones[this.state.device]["os"] : "",
      wifi: this.props.phones[this.state.device] !== undefined ? this.props.phones[this.state.device]["wifi"] : "",
      battery: this.props.phones[this.state.device] !== undefined ? this.props.phones[this.state.device]["battery"] : ""
    })
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
    this.setState({ device: event.target.value ,
      name: this.props.phones[event.target.value ]["name"],
      os: this.props.phones[event.target.value ]["os"],
      battery: this.props.phones[event.target.value ]["battery"],
      wifi: this.props.phones[event.target.value ]["wifi"]
    });
  };

  render() {
    const { classes, width, height, phoneImg, phoneName, features, phones } = this.props;
    const { device,name,os,wifi,battery } = this.state;
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
            { name === "" ?
              <Typography component="p">
                Please select a device
            </Typography>
              :
            (
            <div><img style={{width: "100px",height: "100px"}} src={phoneImg} />
            <Typography component="p">
              {name}
            </Typography>
            <Typography component="p">
            {os}
            </Typography>
            <Typography component="p">
            {battery}
            </Typography>
            <Typography component="p">
            {wifi}
            </Typography>
            <Grid spacing={24} container className={classes.features}> 
              {features.map((prop, key) => {
                  return <Grid item xs={4}><SmallFeature feature={prop} key={key} getFeature={this.getFeature}/></Grid>;
              })}
            </Grid></div>)
            }
        </Paper>
        </div>
    );
  }
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
