import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import DraftsIcon from '@material-ui/icons/Drafts';

const styles = theme => ({

});

function SmallFeature(props) {
    const { classes, feature } = props;

    return (
        <div className='row'>
            <div>
                <IconButton aria-label="Back" >
                    {feature.icon}
                </IconButton>
            </div>
            <div>
                <Typography component="p">
                    {feature.name}
                </Typography>
            </div>
        </div>
    );
}

SmallFeature.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SmallFeature);
