import DB from "views/Dashboard/DB.jsx";
import login from "views/access/login.jsx";
import ForgotPass from "views/access/forgot.jsx";
import selectDevice from "views/access/selectDevice.jsx";
import updatePass from "views/access/updatePass.jsx";

const indexRoutes = [
    { path: "/dashboard", component: DB },
    { path: "/selectDevice", component: selectDevice },
    { path: "/updatePass", component: updatePass },
    { path: "/forgot", component: ForgotPass },
    { path: "/login", component: login },
    { path: "/", component: login },
];

export default indexRoutes;
