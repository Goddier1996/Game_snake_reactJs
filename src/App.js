import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./pages/register";
import Admin from "./pages/admin";
import Menu from "./components/menu";
import Login from "./pages/login";
import Profile from "./pages/profile";
import UpdateDetails from "./pages/updateDetails";
import game from "./pages/game";

function App() { // אחראי על ההעברה בין המסכים

  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/Login" exact component={Login} />
        <Route path="/Register" exact component={Register} />
        <Route path="/Profile" exact component={Profile} />
        <Route path="/UpdateDetails" exact component={UpdateDetails} />
        <Route path="/Admin" component={Admin} />
        <Route path="/game" component={game} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;

