
import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import android from "assets/img/android.png";
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  white : {
    color: 'white'
  },
  black : {
    color: 'black'
  },
  select : {
    display : "flex",
  },
  button : {
    marginBottom : 20
  }
});

class SimpleMenu extends React.Component {

  
  render() {
    const { classes, phones, anchorEl, deviceSelect, handleChange, color, currentPhone } = this.props;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={deviceSelect}
          className={classes.button}
        >
          { color === "black" ?
          <div className={classes.select}><Typography className={classes.black} variant='subheading'>
            {phones !== undefined ? phones[currentPhone].model : "Select Device"}
          </Typography>
          <ArrowDropDownIcon className={classes.black}/></div>
          :
          <div className={classes.select}>
          <Typography className={classes.white} variant='subheading'>
            {phones.length > 0 ? phones[currentPhone].model : "Select Device"}
            {/* {this.state.text} */}
          </Typography>
          <ArrowDropDownIcon className={classes.white}/></div>}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          // onClose={handleChange}
        >
        {  phones !== undefined ?
        // console.log("phone",typeof(phones))
          phones.map((prop, key) => {
            return <MenuItem onClick={handleChange} value={key} key={key}> 
              <img src={android} style={{width: "4vh",height: "4vh",marginTop: "1vh" }}/> {prop.model}
            </MenuItem>
          })
        :
        ""}
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(SimpleMenu);