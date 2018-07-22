import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import FeatureItem from './FeatureItem';
import Divider from '@material-ui/core/Divider';
import FeatureDetail from './FeatureDetail';

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
      clicked: false,
      feature : null,
      featureDetail: null
    };
  

    openPanel = (feature,detail) => {
        console.log(feature);
        this.setState({ clicked: true, feature : feature, featureDetail : detail});
      };
    
    closePanel = () => {
        this.setState({ clicked: false });
      };
  
    render() {
        
        const { classes, details } = this.props;
        const { clicked } = this.state;
        // console.log(this.state.featureDetail);
        return (
            ( clicked ? 
            <FeatureDetail 
                closePanel={this.closePanel} 
                feature={this.state.feature}
                featureDetail={this.state.featureDetail}
                details = {details}
            />
            :
            <div className={classes.root}>
                <List component="nav" >
                    {details.map((prop, key) => {
                        return <FeatureItem feature={prop} openPanel={this.openPanel} key={key}/>;
                    })}
                </List>
            </div>
            )
        );

    }

}


FeatureList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeatureList);