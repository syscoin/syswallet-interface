import Welcome from "../../Popup/Welcome/Welcome.jsx";
import CreateAccount from "../../Popup/CreateAccount/CreateAccount.jsx";
import Login from "../../Popup/Login/Login.jsx";
import Dashboard from "../../Popup/Dashboard/Dashboard.jsx";

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
];

const publicRoutes = [
  { path: "/create-account", component: CreateAccount },
  { path: "/login", component: Login },
  { path: "/", exact: true, component: Welcome },
];

export { authProtectedRoutes, publicRoutes };
