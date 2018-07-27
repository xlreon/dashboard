import DB from "views/Dashboard/DB.jsx";
import login from "views/access/login.jsx";
import ForgotPass from "views/access/forgot.jsx";

const indexRoutes = [
    { path: "/forgot", component: ForgotPass },
    { path: "/login", component: login },
    { path: "/", component: DB },
];

export default indexRoutes;
