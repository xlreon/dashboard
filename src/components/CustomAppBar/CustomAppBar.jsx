import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import IconButton from "@material-ui/core/IconButton";
import Settings from 'components/Settings/Settings.jsx';
import SimpleSelect from "components/SimpleSelect/SimpleSelect.jsx";
import logo from "assets/img/pfa.png";
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
    appFlex: {
        flexGrow: 1,
        display: 'flex',
        alignItems : 'center',
        justifyContent : 'center'
    
    },
    appSelectPhone: {
        width: "100%",
        // flexGrow: 1,
        // marginRight : 100
    },
    appMenuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    img : {
        height : 30,
        width : 30,
        marginRight : 10,
    },
});

class CustomAppBar extends React.Component {

    state = {
        anchorEl : null
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    
    deviceSelect = event => {
        this.setState({ anchorEl: event.currentTarget });
        // console.log(event.currentTarget)
        console.log(this.state.anchorEl)
    };

    handleChange = (event) => {
        this.setState({anchorEl : null});
        this.props.handleChange(event);
    }

    render() {
        const { classes, handleDrawerToggle , phones, currentPhone, handleChange  } = this.props;
        const { anchorEl  } = this.state;

        return (
        <div>
            <AppBar position="static" color="default">
                <Toolbar>
                    <IconButton className={classes.appMenuButton} color="inherit" aria-label="Menu">
                        <MenuIcon onClick={handleDrawerToggle}/>
                    </IconButton>
                    <img src={logo} alt="logo" className={classes.img} />
                    <Typography variant="title" color="inherit" >
                        UniQ Mobile Finder
                    </Typography>
                    <div className={classes.appFlex}>
                    <SimpleSelect
                        className={classes.appSelectPhone}
                        phones={phones} 
                        device={currentPhone}
                        handleChange={this.handleChange}
                        deviceSelect={this.deviceSelect}
                        anchorEl={anchorEl}
                        currentPhone={currentPhone}
                        handleClose={this.handleClose}
                    />
                    </div>
                    <Settings recurPhoneGet={this.props.recurPhoneGet}/>
                </Toolbar>
            </AppBar>
        </div>
        );
    }
}

CustomAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomAppBar);