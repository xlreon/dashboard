


import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SmartPhone from '@material-ui/icons/Smartphone';
import { Typography } from '../../../node_modules/@material-ui/core';
import axios from 'axios';
import ArrowRight from '@material-ui/icons/ChevronRight';
import Grid from '@material-ui/core/Grid';
import Divider  from '@material-ui/core/Divider';


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
        location : null
    }

    constructor(props) {
        super(props);

    //     console.log(props.phone)
    // }


    // getLoc() {

        const { phone  } = props;

        var body = phone.data;
        // console.log(body)
            
        var formBody = [];
            for (var property in body) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(body[property]);
            formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            
        axios.post(`http://ec2-18-216-27-235.us-east-2.compute.amazonaws.com:8080/geoloc`, formBody)
        .then(res => {
            const data = res.data.body.content;
            if (data !== null) {
                var location = null;
                data.map((item) => {
                    if (item.location_type == "APPROXIMATE") 
                    {
                        if((item.formatted_address.match(/,/g) || []).length === 2)
                            location = item.formatted_address;
                        }
                    })
                }
                console.log(location)
                this.setState({location : location});

        })
        .catch(error => console.log(error))

    }



    render() {
        const { classes,phone,id  } = this.props;

        return (
        <div>
            <Divider />
            <ListItem button onClick={() => {this.props.handleClick(id)}}>
                <Grid container>
                    <Grid item xs={1}>
                        <ListItemIcon>
                            <SmartPhone />
                        </ListItemIcon>
                    </Grid>
                    <Grid item xs={4}>  
                        <Typography>{phone.brand + " " + phone.model}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>{this.state.location}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <ArrowRight />
                    </Grid>
                </Grid>
            </ListItem>
        </div>
        );
    }
}

Device.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Device);