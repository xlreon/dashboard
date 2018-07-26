import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import DraftsIcon from '@material-ui/icons/Drafts';
import Button  from '@material-ui/core/Button';

const styles = theme => ({

});

function SmallFeature(props) {
    const { classes, feature, getFeature } = props;

    return (
        <div className='row'>
            <Button onClick={() => {getFeature(feature)}}>
            <div>
                {feature.icon}
            </div>
            <div>
                <Typography component="p">
                    {feature.name}
                </Typography>
            </div>
            </Button>
        </div>
    );
}

SmallFeature.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SmallFeature);
