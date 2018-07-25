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

        {phones.map((prop, key) => {
          // console.log(key);
          return <Device 
            changeLocation={this.props.changeLocation} 
            details={prop} 
            features={this.props.features} 
            id={key}
          />
        })}
        
      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);