import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import android from "assets/img/android.png";
import { Grid, Divider } from '../../../node_modules/@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  icon: {
    color: "white"
  }
});

class SimpleSelect extends React.Component {
  

  render() {
    const { classes, phones } = this.props;
    console.log("device",this.props.device);
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple" style={{color: "white"}}>Device</InputLabel>
          <Select
            // className={classes.icon}
            style={{wdith: "170",color: "white"}}
            IconComponent={ArrowDropDownIcon}
            value={this.props.device}
            onChange={this.props.handleChange}
            inputProps={{ 
              name: 'age',
              id: 'age-simple',
            }}
          >
            {phones.map((prop, key) => {
              return  <MenuItem value={key} key={key}><img src={android} style={{width: "4vh",height: "4vh",marginTop: "1vh" }}/> {prop.name}</MenuItem>
            })}
          </Select>
        </FormControl>
        
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);