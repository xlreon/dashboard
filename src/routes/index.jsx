import DB from "views/Dashboard/DB.jsx";
import login from "views/access/login.jsx";

const indexRoutes = [
    { path: "/login", component: login },
    { path: "/", component: DB },
];

export default indexRoutes;
