import DB from "views/Dashboard/DB.jsx";
import login from "views/access/login.jsx";
import ForgotPass from "views/access/forgot.jsx";

const indexRoutes = [
    { path: "/dashboard", component: DB },
    { path: "/forgot", component: ForgotPass },
    { path: "/login", component: login },
    { path: "/", component: login },
];

export default indexRoutes;
