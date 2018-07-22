


import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CustomCard from '../CustomCard/CustomCard.jsx';
import FeatureList from '../FeatureList/FeatureList';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class Device extends React.Component {
  state = {
    expanded: null,
    details : 
      {
        deviceDetails: {
          os : "Android",
          battery : "55",
          wifi : "TP_LINK",
          location: { lat: 20.4625, lng: 85.8830 }
        },
        features : [
          {
            name : "Play Sound",
            description : "sncjancojanclancknckan",
            detail : "Detail1",
            event : "Stop Ringing"
          },
          {
            name : "Get Location",
            description : "Show your current location",
            detail : "Click on this Button to fetch your Location on the map",
            event : "Show on Map"
          },
          {
            name : "Secure Device",
            description : "uiebivsvuibiebvscsd",
            detail : "Detail2",
            event : "Secure"
          },
          {
            name : "Erase Device",
            description : "AIUCBIUASCVOICOSDIVVNELKVSN",
            detail : "Detail3",
            event : "Erase"
          }
        ]
      }
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded, details } = this.state;

    return (
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
            <ExpansionPanelSummary  expandIcon={<ExpandMoreIcon />}>
            <CustomCard details={details.deviceDetails}/>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <FeatureList details={details.features} changeLocation={this.props.changeLocation} location={details.deviceDetails.location}/>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
  }
}

Device.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Device);