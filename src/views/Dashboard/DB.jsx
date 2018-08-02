import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Maps from "views/Maps/Maps.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import CustomDrawer from "components/CustomDrawer/CustomDrawer.jsx";
import features from './features.jsx';
import CustomAppBar from 'components/CustomAppBar/CustomAppBar.jsx';
import Snackbar from '@material-ui/core/Snackbar';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import md5 from 'md5';

class DashBoard extends React.Component {
  
  

  constructor(props) {
    super(props);
    this.flag = false

    this.state = {
      open: true,
      showAll : true,
      foundLocation: true,
      settings : null,
      location: null,
      phones: [],
      currentPhone: 0,
    };
  }


  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  }

  changeLocation= (loc) => {
    console.log(loc);
    this.setState({ location : loc });
  };

  getLocations = () => {
    // console.log(this.state.phones)
    var list = []
    if (this.state.phones.length)
    {
      {this.state.phones.map((prop, key) => {
        
        // if (prop.data === JSON.stringify({})) {
        //   this.setState({foundLocation: false})
        // }

        console.log(prop.gps)
        if (prop.gps === "true") {
          for (var property in prop.data) {
            prop.data[property] = Number(prop.data[property])
          } 
          // this.setState({foundLocation: true})
          this.flag = false
          return list.push(prop.data);
        }
        else {
          this.flag = true
          return list;
          // var body = prop.data
          // var formBody = [];
          // for (var property in body) {
          //     var encodedKey = encodeURIComponent(property);
          //     var encodedValue = encodeURIComponent(body[property]);
          //     formBody.push(encodedKey + "=" + encodedValue);
          // }
          // formBody = formBody.join("&");
          // axios.post(`http://:8080/getLatLng`, formBody)
          //             .then(res => {
          //               // this.setState({foundLocation: true})
          //               return list.push(res.data);
          //             })
          //             .catch(err => console.log('Get lat long error'))
        }
        // return list.push(prop.data);
      })
    }
    }
    return list;
  };

  showAllDevices = () => {
    this.setState({ showAll: true });
  };

  componentDidMount() {

    setInterval(() => this.recurGetInfo(),30000);

    var phones = JSON.parse(localStorage.getItem("phones"));
    var currentPhone = JSON.parse(localStorage.getItem("currPhone"));

    if (phones !== null)
    {
      phones.map((phn) => {
        phn.data.lat = parseFloat(phn.data.lat);
        phn.data.lng = parseFloat(phn.data.lng);
      })

      this.setState({phones: phones, currentPhone : currentPhone, location : phones[currentPhone].data});
    }
    
    // console.log(phones[currentPhone].data)
    setInterval(() => {
      this.recurPhoneGet()
    },30000)

    
  }

  recurGetInfo = () => {
    var body = { featureName : "info"};
            
            var formBody = [];
            for (var property in body) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(body[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            
            axios.post(`http://localhost:8080/feature`, 
                formBody
            )
            .then(res => { 
              console.log('Get information notification sent.');
            })
            .catch(err => {
              console.log('Get information notification failed to send')
            })
  }

  handleChange = event => {
    if(this.state.phones[event.target.value].data !== null)
      this.setState({currentPhone: event.target.value !== undefined ? event.target.value : 0, location : this.state.phones[event.target.value].data});
  }

  recurPhoneGet = () => {
    const email = localStorage.getItem("email")
        
    var phoneList = [];
        if (email)
        {
            var body = { email : email};
            
            var formBody = [];
            for (var property in body) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(body[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            
            axios.post(`http://localhost:8080/imei/get`, 
                formBody
            )
            .then(res => {
            var imeiList = res.data.body.content;
            console.log(imeiList)
            localStorage.setItem("imeiList", imeiList);
            
            {imeiList.map((prop, key) => {
            if(prop!==null) {
            var body = { imei: prop};
            
            var formBody = [];
                for (var property in body) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(body[property]);
                formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");
                
                axios.post(`http://localhost:8080/phone/get`, 
                formBody
                )
                .then(res => {
                if (res.data.body.content !== null) {
                    phoneList.push(res.data.body);
                    // localStorage.setItem("phones",JSON.stringify(phoneList));
                    localStorage.setItem('currHash',md5(JSON.stringify(res.data.body)))
                    // console.log(localStorage.getItem('currHash'))
                    // console.log(this.state.phones)
                    var prevHash = localStorage.getItem('prevHash');
                    var currHash = localStorage.getItem('currHash')
                    
                    if (prevHash !== currHash) {
                      localStorage.setItem("phones",JSON.stringify(phoneList));
                      localStorage.setItem("prevHash",currHash)
                      this.setState({phones: phoneList});
                    }
                  }
                })
                .catch(error => console.log(error))
        
              }
            })}
            })
            .catch(error => console.log(error))
        }
  }

  // recurPhoneGet = () => {
  //   const email = localStorage.getItem("email")
        
  //   var phoneList = [];
  //       if (email)
  //       {
  //           var body = { email : email};
            
  //           var formBody = [];
  //           for (var property in body) {
  //               var encodedKey = encodeURIComponent(property);
  //               var encodedValue = encodeURIComponent(body[property]);
  //               formBody.push(encodedKey + "=" + encodedValue);
  //           }
  //           formBody = formBody.join("&");
            
  //           axios.post(`http://ec2-18-216-27-235.us-east-2.compute.amazonaws.com:8080/imei/get`, 
  //               formBody
  //           )
  //           .then(res => {
  //           var imeiList = res.data.body.content;
        
            
  //           // console.log(imeiList)
  //           {imeiList.map((prop, key) => {
            
  //           var body = { imei: prop};
            
  //           var formBody = [];
  //               for (var property in body) {
  //               var encodedKey = encodeURIComponent(property);
  //               var encodedValue = encodeURIComponent(body[property]);
  //               formBody.push(encodedKey + "=" + encodedValue);
  //               }
  //               formBody = formBody.join("&");
                
  //               axios.post(`http://ec2-18-216-27-235.us-east-2.compute.amazonaws.com:8080/phone/get`, 
  //               formBody
  //               )
  //               .then(res => {
  //               if (res.data.body.content !== null) {
  //                   phoneList.push(res.data.body);
  //                   // localStorage.setItem("phones",JSON.stringify(phoneList));
  //                   localStorage.setItem('currHash',md5(JSON.stringify(res.data.body)))
  //                   console.log(localStorage.getItem('currHash'))
  //                   // console.log(this.state.phones)
  //                   var prevHash = localStorage.getItem('prevHash');
  //                   var currHash = localStorage.getItem('currHash')
                    
  //                   if (prevHash !== currHash) {
  //                     localStorage.setItem("phones",JSON.stringify(phoneList));
  //                     localStorage.setItem("prevHash",currHash)
  //                     this.setState({phones: phoneList});
  //                   }
  //                 }
  //               })
  //               .catch(error => console.log(error))
        
  //           })}
            
  //           })
  //           .catch(error => console.log(error))
  //       }
  // }

  
  
  render() {

    var email = localStorage.getItem("email");

    if(email === "null")
    {
      return <Redirect push to="/login" />;
    }

    
    const { classes } = this.props;
    const { open, location, phones, currentPhone } = this.state;
    // console.log(location);
    
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
              {/* {location !== null ? */}
                <Maps 
                    // locations={this.getLocations().length > 0 ? this.getLocations() : location}
                    location={location } 
                />
                {/* : ""} */}
                </div>
          <Snackbar
          open={this.flag}
          // onClose={this.handleClose}
          // TransitionComponent={this.state.Transition}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Location not found</span>}
        />
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