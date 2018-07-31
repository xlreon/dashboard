import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Device from './Device';

const styles = theme => ({
  root: {
    width: '100%',
    // backgroundColor : '#D3D3D3'
  },
});

class ControlledExpansionPanels extends React.Component {

  render() {
    const { classes,phones } = this.props;

    return (
      <div className={classes.root}>
      {phones[this.props.currentPhone] !== undefined ?
        <Device 
          changeLocation={this.props.changeLocation} 
          details={phones[this.props.currentPhone]} 
          features={this.props.features} 
          currentPhone={this.props.currentPhone}
        />
        : ""}
        
      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);