import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { State } from "./models/State";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Header from "./components/Header";

const App: React.FC = function (): JSX.Element {
  const state = useSelector(function (state: State): State {
    return state;
  });
  return (
    <div>
      {state.errorAlertVisible ? <Alert variant="danger" style={{ margin: "0" }}>{state.errorAlertText}</Alert> : <></>}
      {state.infoAlertVisible ? <Alert variant="success" style={{ margin: "0" }}>{state.infoAlertText}</Alert> : <></>}
      {state.logged ? <Header /> : <div></div>}
      <main>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/login">
            {state.logged ? <Redirect to="/home" /> : <Login />}
          </Route>
          <Route path="/home">
            {state.logged ? <Home /> : <Redirect to="/login" />}
          </Route>
          <Route path="/posts">
            {state.logged ? <Posts /> : <Redirect to="/login" />}
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default App;