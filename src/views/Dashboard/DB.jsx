import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Maps from "views/Maps/Maps.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import CustomDrawer from "components/CustomDrawer/CustomDrawer.jsx";
import features from './features.jsx';
import CustomAppBar from 'components/CustomAppBar/CustomAppBar.jsx';
import { Link, Redirect } from 'react-router-dom';

class DashBoard extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      showAll : true,
      settings : null,
      location: [{ lat: 12.9716, lng: 77.5946 }],
      phones: [],
      currentPhone: 0,
    };
  }


  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  }

  changeLocation= (loc) => {
    console.log(loc);
    this.setState({ location : [loc], showAll: false });
  };

  getLocations = () => {
    var list = []
    if (this.state.phones.length)
    {
      {this.state.phones.map((prop, key) => {
        return list.push(prop.data);
      })}
    }
    return list;
  };

  showAllDevices = () => {
    this.setState({ showAll: true });
  };

  componentDidMount() {

    var phones = JSON.parse(localStorage.getItem("phones"));
    var currentPhone = JSON.parse(localStorage.getItem("currPhone"));
    this.setState({phones: phones, currentPhone : currentPhone});

  }

  handleChange = event => {
    this.setState({currentPhone: event.target.value !== undefined ? event.target.value : 0})
  }

  
  
  render() {

    var email = localStorage.getItem("email");
    // console.log(email)

    if(email === "null")
    {
      // console.log(email)
      return <Redirect push to="/login" />;
    }

    const { classes } = this.props;
    const { open, location, showAll, phones, currentPhone } = this.state;
    
    // console.log(phones);
    return (
      <div>
      <div className={classes.appRoot}>
        <CustomAppBar 
          handleDrawerToggle={this.handleDrawerToggle}
          phones={phones}
          currentPhone={currentPhone}
          handleChange={this.handleChange}
        />
        </div>
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <CustomDrawer 
            open={open}
            handleDrawerToggle = {this.handleDrawerToggle}
            phones={phones}
            currentPhone={this.state.currentPhone}
            features={features}
            changeLocation={this.changeLocation} 
            showAllDevices={this.showAllDevices}
          />
          <main
            className={classNames(classes.content, classes[`content-left`], {
              [classes.contentShift]: open,
              [classes[`contentShift-left`]]: open,
            })}
          >
            <div className={classes.mainPanel} ref="mainPanel">
                <Maps 
                    locations={showAll ? this.getLocations() : location}
                />
                </div>
          </main>
        </div>
      </div>
      </div>
    );
  }
}

DashBoard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle, { withTheme: true })(DashBoard);