
import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import android from "assets/img/android.png";
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  text : {
    color: 'white'
  }
});

class SimpleMenu extends React.Component {

  constructor(props)
  {
    super(props);

    console.log(props.currPhone);
  }

  state={
    text : "Select Device"
  }


  render() {
    const { classes, phones, anchorEl, deviceSelect, handleChange, currPhone } = this.props;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={deviceSelect}
        >
          <Typography className={classes.text} variant='subheading'>
            {/* {phones[currPhone].name} */}
            {this.state.text}
          </Typography>
          <ArrowDropDownIcon className={classes.text}/>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          // onClose={handleChange}
        >
          {/* <MenuItem onClick={handleChange}>
            <img src={android} style={{width: "4vh",height: "4vh",marginTop: "1vh" }}/> Android
          </MenuItem>
          <MenuItem onClick={handleChange}>My account</MenuItem>
          <MenuItem onClick={handleChange}>Logout</MenuItem> */}
          {phones.map((prop, key) => {
            return <MenuItem onClick={handleChange} value={key} key={key}> 
              <img src={android} style={{width: "4vh",height: "4vh",marginTop: "1vh" }}/> {prop.model}
            </MenuItem>
          })} 
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(SimpleMenu);