import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import CustomCard from '../CustomCard/CustomCard.jsx';
import FeatureList from '../FeatureList/FeatureList';
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";

function TabContainer(props) {
  // const { classes ,children } = props;
  return (
    <Grid container>
        <GridItem xs={12}>
          <CustomCard/>
        </GridItem>
        <GridItem xs={12}>
          <FeatureList />
        </GridItem>
    </Grid>
    // <Typography component="div" style={{ padding: 3 * 3 }}>
      
    //   <CustomCard />
    //   <FeatureList styles={{marginTop: "2em"}} />
    // </Typography>
  );
}

TabContainer.propTypes = {
  // classes: PropTypes.object.isRequired,
  // theme: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  scrollButtons: {
      width: '50%'
  }
  // ,
  // list : {
  //   padding: theme.spacing.unit * 2,
  // },
});


class ScrollableTabsButtonForce extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            scrollable
            scrollButtons="off"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Item One" icon={<PhoneIcon />} />
            <Tab label="Item Two" icon={<FavoriteIcon />} />
            <Tab label="Item Three" icon={<PersonPinIcon />} />
            <Tab label="Item Four" icon={<HelpIcon />} />
            <Tab label="Item Five" icon={<ShoppingBasket />} />
            <Tab label="Item Six" icon={<ThumbDown />} />
            <Tab label="Item Seven" icon={<ThumbUp />} />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>Item One</TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
        {value === 3 && <TabContainer>Item Four</TabContainer>}
        {value === 4 && <TabContainer>Item Five</TabContainer>}
        {value === 5 && <TabContainer>Item Six</TabContainer>}
        {value === 6 && <TabContainer>Item Seven</TabContainer>}
      </div>
    );
  }
}

ScrollableTabsButtonForce.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonForce);