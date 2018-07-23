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
  state = {
    expanded: null
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>

        {this.props.phones.map((prop, key) => {
          return <Device changeLocation={this.props.changeLocation} details={prop} key={key}/>
        })}
        
      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);