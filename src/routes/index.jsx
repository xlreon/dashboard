import DB from "views/Dashboard/DB.jsx";
import login from "views/access/login.jsx";

const indexRoutes = [
    { path: "/", component: DB },
    { path: "/login", component: login },
];

export default indexRoutes;
