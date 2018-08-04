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
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import IconButton from "@material-ui/core/IconButton";
import ImageView from 'components/Dialogs/imageView.jsx';
import Hidden from '@material-ui/core/Hidden'
import { Spin } from 'antd'
import 'antd/dist/antd.css';

const styles = theme => ({
    
      card: {
        minWidth: 275,
        zIndex : 2,
        position : 'relative',
        borderRadius: '25px',
        marginRight : 30,
        marginLeft : 30
      },
      content : {
        // marginRight : 10,
        height : '80vh',
        overflow : 'scroll'
      },
      smallCard: {
        width : '80%',
        zIndex : 2,
        position : 'relative',
        borderRadius: '25px'
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
      button : {
        display : 'block',
        padding : 10
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
      heading : {
        margin :10,
        width : '90%'
      },
      flex : {
        display : 'flex'
      },
      player :{
        height : 200,
        // width : 200
      },
      break : {
        height : 10
      },
      inline : {
        display : 'inline',
        width: 100,
        height : 100
      },
      video : {
        margin : 50,
      }
});     

class Theft extends React.Component {

    componentDidMount() {
      
      var phones = localStorage.getItem("phones")
      this.setState({phones : JSON.parse(phones)});
        

      this.getItems(0);

    }

    headers = {"headers": {'Access-Control-Allow-Origin': '*'}}

    getItems(index) {

      
      var imei = localStorage.getItem('imeiList');
      var email = localStorage.getItem('email');
      
      var imeiList = imei.split(",");
      console.log("imeilist",imeiList)

        if (imeiList.length > 0)
        {

          var body = { imei: imeiList[index], email : email, type : 'image'};
              
          var formBody = [];
              for (var property in body) {
              var encodedKey = encodeURIComponent(property);
              var encodedValue = encodeURIComponent(body[property]);
              formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");
          
          axios.post(`http://ec2-18-219-197-132.us-east-2.compute.amazonaws.com:8080/file/db/get`, 
            formBody,
            this.headers
          )
          .then(res => {
              if (res.data.body.content !== null) {

                  this.setState({images : res.data.body.content })

                  this.state.images.sort((a,b)=>{
                    var timeA = a.name.split('-');
                    var timeB = b.name.split('-');

                    return parseInt(timeB[0]) - parseInt(timeA[0]) 
                    // console.log(parseInt(time[0]))
                  });
                  
                  this.state.images.map((item)=>{
                    console.log(item.name);
                    var time = item.name.split('-');
                    var time = time[0].split('/');
                    // console.log(parseInt(time[1]))

                    var date = new Date(parseInt(time[1]))

                    // console.log(date.toDateString())
                    // console.log(date.toTimeString())

                    item.date = date.toDateString();

                    if (date.getHours() > 12)
                      item.time = (parseInt(date.getHours())-12) + ":" + date.getMinutes() + " pm";
                    else if (date.getHours() === 12)
                      item.time = date.getHours() + ":" + date.getMinutes() + " pm";
                    else if (date.getHours() === 24)
                      item.time = 12 + ":" + date.getMinutes() + " am";
                    else
                      item.time = date.getHours() + ":" + date.getMinutes()+ " am";


                    // console.log(item.date);
                    // console.log(item.time);

                  });

                  this.setState({images : this.state.images})
              }
              else 
              {
                this.setState({images : []})
              }
          })
          .catch(error => console.log(error))

          var body = { imei: imeiList[index], email : email, type : 'video'};
              
          var formBody = [];
              for (var property in body) {
              var encodedKey = encodeURIComponent(property);
              var encodedValue = encodeURIComponent(body[property]);
              formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");
          
          axios.post(`http://ec2-18-219-197-132.us-east-2.compute.amazonaws.com:8080/file/db/get`, 
            formBody,
            this.headers
          )
          .then(res => {
            console.log(res.data)

              if (res.data.body.content !== null) {

                  this.setState({videos : res.data.body.content })
                  
                  // res.data.body.content.map((item)=>{
                  //     console.log(item.name)
                  // })
              }
              else 
              {
                this.setState({videos : []})
              }
          })
          .catch(error => console.log(error))

        }
    }
    
    state = {
        anchorEl : null,
        currentPhone : 0,
        images : null,
        videos : null,
        imageOpen : false
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
        this.setState({currentPhone: event.target.value !== undefined ? event.target.value : 0,anchorEl : null})
        this.getItems(event.target.value);
    }

    handleImageClose = () => {
      this.setState({ imageOpen : false });
    };

    imageClick = (img) => {
      this.setState({ imageOpen : true, image : img});
    };

    render() {
        
        const { classes } = this.props;
        const { phones, currentPhone, anchorEl, images, videos } = this.state;
        
        // console.log(images)

        // console.log(videos)
        return (
            <div className={classes.container}>
              <Card className={classes.card}>
                <CardContent className={classes.content}>
                  {/* <div className={classes.container}> */}
                  <Grid container spacing={24}>
                    <Grid xs={2} item>
                      <IconButton onClick={() => {window.history.back();}}>
                            <ChevronLeft />
                        </IconButton>
                    </Grid>
                    <Grid xs={10} item className={classes.container}>
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
                    </Grid>
                  </Grid>
                  <Typography variant="title" className={classes.heading} color='primary'>Images :</Typography>
                  <Hidden smDown implementation="css">
                    {images !== null && images.length === 0  ? <div className={classes.heading}><Typography color="error" className={classes.container}>No images found!</Typography></div> :
                    <Grid container spacing={24} className={classes.heading}>
                      {images !== null ?
                          images.map((image) => {
                            return <Grid item xs={3} className={classes.container}>
                              <Button onClick={() => {this.imageClick(image.location)}} className={classes.button}>
                                <div className={classes.container}>
                                  <img src={image.location} alt="image" className={classes.img}/>
                                </div>
                                <Typography variant='caption'>{image.date} </Typography>
                                <Typography variant='caption'>{image.time} </Typography>
                              </Button>
                            </Grid>;
                          })
                        : <Spin size="large" /> }
                    </Grid> }
                  </Hidden>
                  <Hidden mdUp implementation="css">
                    {images !== null && images.length === 0  ? <div className={classes.heading}><Typography color="error" className={classes.container}>No images found!</Typography></div> :
                    <Grid container spacing={24} className={classes.heading}>
                      {images !== null ?
                          images.map((image) => {
                            return <Grid item xs={6} className={classes.container}>
                              <Button onClick={() => {this.imageClick(image.location)}} className={classes.button}>
                                <img src={image.location} alt="image" className={classes.img}/>
                                <Typography variant='caption'>{image.date} </Typography>
                                <Typography variant='caption'>{image.time} </Typography>
                              </Button>
                            </Grid>;
                          })
                        : <Spin size="large" /> }
                    </Grid> }
                  </Hidden>
                    <Divider />
                    <Typography variant="title" className={classes.heading} color='primary' >Videos :</Typography>
                    {videos !== null ?
                      <div className={classes.video}>
                      {videos.length === 0 ? <Typography color="error" className={classes.container}>No videos found!</Typography>: ""}
                        {videos.map((video) => {
                          return <div className={classNames('row')} >
                            <Player
                              // playsInline
                              // poster={img}
                              // className={classes.player}
                              src={video.location}
                            />
                            <div className={classes.break}></div>
                          </div>;
                        })}
                      </div>
                      : <Spin size="large" /> }
                </CardContent>
            </Card>
            <ImageView 
              open={this.state.imageOpen}
              onClose={this.handleImageClose}
              image={this.state.image}
            />
            </div>
        );
    }
}

Theft.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Theft);        
        
        