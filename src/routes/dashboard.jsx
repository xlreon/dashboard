// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import LocationOn from "@material-ui/icons/LocationOn";
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import Maps from "views/Maps/Maps.jsx";

const dashboardRoutes = [
  {
    path: "/",
    sidebarName: "Devices",
    navbarName: "Dashboard",
    icon: Dashboard,
    component: Maps
  },
  // ,
  // {
  //   path: "/",
  //   sidebarName: "Features",
  //   navbarName: "Dashboard",
  //   icon: LocationOn,
  //   component: Maps
  // },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Dashboard" }
];

export default dashboardRoutes;
