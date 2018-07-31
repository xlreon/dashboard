import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classNames from "classnames";
import TextField from '@material-ui/core/TextField';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Center from 'react-center';
import logo from "assets/img/pfa.png";
import background from "assets/img/background.png";
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Error from '@material-ui/icons/ErrorOutline';
import img from "assets/img/android.png";
import Grid from '@material-ui/core/Grid';
import SimpleSelect from '../SimpleSelect/SimpleSelect';
import { Divider } from '../../../node_modules/@material-ui/core';
import "video-react/dist/video-react.css";
import { Player } from 'video-react';

const styles = theme => ({
    
      card: {
        minWidth: 275,
        zIndex : 2,
        position : 'relative',
        borderRadius: '25px'
      },
      content : {
        marginRight : 30,
        marginLeft : 30
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        marginBottom: 16,
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 250,
      },
      root: {
        flexGrow: 1,
      },
      container : {
        display: 'flex',
        justifyContent : 'center',
        alignItems : 'center',
      },
      right : {
        display: 'flex',
        justifyContent : 'flex-end',
      },
      space : {
        width : 250,
        marginBottom : 10
      },
      login : {
        display: 'flex',
        justifyContent : 'center',
        marginTop : 30
      },
      forgot : {
        display: 'flex',
        justifyContent : 'flex-end',
        // marginTop : 10
      },
      img : {
        height : 100,
        width : 100,
        },
      loginButton : {
        // background: 'linear-gradient(45deg, #9480ff 30%, #fffff0 90%)',
        background: '#9480ff',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
      video : {
        height : 100,
        width : 100,
        // margin : 10
      }
});     

class Theft extends React.Component {

    componentDidMount() {
      
        var phones = localStorage.getItem("phones")
        this.setState({phones : JSON.parse(phones)});
        var imei = localStorage.getItem('imeiList');
        var email = localStorage.getItem('email');

        var imeiList = imei.split(",");

        var body = { imei: imeiList[this.state.currentPhone], email : email, type : 'image'};
            
        var formBody = [];
            for (var property in body) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(body[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        
        axios.post(`http://localhost:8080/file/db/get`, 
        formBody
        )
        .then(res => {
            console.log(res.data)
            if (res.data.body.content !== null) {

                this.setState({images : res.data.body.content })
                
                // res.data.body.content.map((item)=>{
                //     console.log(item.name)
                // })
            }
        })
        .catch(error => console.log(error))

        var body = { imei: imeiList[this.state.currentPhone], email : email, type : 'video'};
            
        var formBody = [];
            for (var property in body) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(body[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        
        axios.post(`http://localhost:8080/file/db/get`, 
        formBody
        )
        .then(res => {
            console.log(res.data)
            if (res.data.body.content !== null) {

                this.setState({videos : res.data.body.content })
                
                // res.data.body.content.map((item)=>{
                //     console.log(item.name)
                // })
            }
        })
        .catch(error => console.log(error))



    }
    
    state = {
        anchorEl : null,
        currentPhone : 0,
        images : null,
        videos : null,
    }

    
    deviceSelect = event => {
        this.setState({ anchorEl: event.currentTarget });
        // console.log(event.currentTarget)
        console.log(this.state.anchorEl)
    };

    handleChange = (event) => {
        this.setState({currentPhone: event.target.value !== undefined ? event.target.value : 0,anchorEl : null})
    }

    render() {
        
        const { classes } = this.props;
        const { phones, currentPhone, anchorEl, images, videos } = this.state;

        console.log(videos)
        
        return (
            <div>
                <Card className={classes.card}>
                <CardContent className={classes.content}>
                  <div className={classes.container}>
                    <SimpleSelect
                        className={classes.appSelectPhone}
                        phones={phones} 
                        device={currentPhone}
                        handleChange={this.handleChange}
                        deviceSelect={this.deviceSelect}
                        anchorEl={anchorEl}
                        currentPhone={currentPhone}
                        color={'black'}
                    />
                  </div>
                    <Grid container spacing={24}>
                      {images !== null ?
                        images.map((image) => {
                          return <Grid xs={3} className={classes.container}><img src={image.name} alt="image" className={classes.img}/></Grid>;
                        })
                        : ""}
                    </Grid>
                    <Divider />
                    {/* <Grid container spacing={24}> */}
                      {videos !== null ?
                        videos.map((video) => {
                          return <div className='row'>
                            <Player
                              // playsInline
                              poster={img}
                              src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                              className={classes.video}
                            />
                          </div>;
                        })
                        : ""}
                    {/* </Grid> */}

                
                </CardContent>
            </Card>
                
            </div>
        );
    }
}

Theft.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Theft);        
        
        