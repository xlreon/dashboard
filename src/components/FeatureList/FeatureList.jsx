import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import FeatureItem from './FeatureItem';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    root: {
      width: '100%',
      // maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    ListItem : {
        paddingTop : 20,
        paddingBottom : 20,
    },
    featureDrawer : {
        position: 'relative',
        width: 100,
    },
  });

class FeatureList extends React.Component {

    state = {
      clicked: true,
      in: false
    };
  
    handleDrawerToggle = () => {
      this.setState({ clicked: !this.state.clicked });
    };
  
    render() {
        
        const { classes } = this.props;
        const { clicked } = this.state;

        return (
            <div className={classes.root}>
                <List component="nav">
                    <FeatureItem />
                    <Divider />
                    <FeatureItem />
                    <Divider />
                    <FeatureItem />
                </List>
            </div>
        );

    }

}


FeatureList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeatureList);