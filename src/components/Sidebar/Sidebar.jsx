import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MobileCard from '../MobileCard/MobileCard.jsx';
import MobileTabs from '../MobileTabs/MobileTabs.jsx';

import Typography from '@material-ui/core/Typography';
// core components
import HeaderLinks from "components/Header/HeaderLinks.jsx";

import sidebarStyle from "assets/jss/material-dashboard-react/components/sidebarStyle.jsx";

const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }
  const { classes, color, logo, image, logoText, routes, body } = props;
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        if (prop.redirect) return null;
        var activePro = " ";
        var listItemClasses;
        // if(prop.path === "/upgrade-to-pro"){
        //   activePro = classes.activePro + " ";
        //   listItemClasses = classNames({
        //     [" " + classes[color]]: true
        //   });
        // } else 
        {
          listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.path)
          });
        }
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.path)
        });
        return (
          <NavLink
            to={prop.path}
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
              <ExpansionPanel className={classes.itemLink + listItemClasses}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <ListItemIcon className={classes.itemIcon}>
                  <prop.icon />
                </ListItemIcon>
                  <Typography className={classes.heading}>Devices</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {body}
                </ExpansionPanelDetails>
            </ExpansionPanel>
          </NavLink>
        );
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a href="#" className={classes.logoLink}>
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        <b style={{color: "black"}}>{logoText}</b>
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <HeaderLinks />
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper
          }}
        >
          {brand}
          <MobileTabs/>
          {/* <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              // className={classes.background}
              // style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null} */}
        </Drawer>
      </Hidden>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(sidebarStyle)(Sidebar);
