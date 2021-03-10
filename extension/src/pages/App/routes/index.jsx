import Welcome from "../../Popup/Welcome/Welcome.jsx";
import CreateAccount from "../../Popup/CreateAccount/CreateAccount.jsx";
import Login from "../../Popup/Login/Login.jsx";
import Dashboard from "../../Popup/Dashboard/Dashboard.jsx";
import ConfirmKeyPhrase from '../../Popup/ConfirmKeyPhrase/ConfirmKeyPhrase.jsx';

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/confirm-keyphrase", component: ConfirmKeyPhrase },
];

const publicRoutes = [
  { path: "/create-account", component: CreateAccount },
  { path: "/login", component: Login },
  { path: "/", component: Welcome },
];

export { authProtectedRoutes, publicRoutes };
