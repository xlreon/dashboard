


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
    expanded: true,
  };

  handleChange = panel => (event, expanded) => {

    console.log(panel);

    this.setState({
      expanded: !this.state.expanded,
    });
  };

  render() {
    const { classes,details,key  } = this.props;
    const { expanded } = this.state;

    // console.log(id);

    return (
      <ExpansionPanel expanded={expanded} onChange={this.handleChange(key)}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <CustomCard details={details}/>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <FeatureList 
            details={this.props.features} 
            changeLocation={this.props.changeLocation} 
            location={this.props.details.data}
            currentPhone={this.props.currentPhone}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

Device.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Device);