import React from 'react';
import './App.css';
import Main from './views/Main';
import AuthorForm from './components/AuthorForm';
import Update from './views/Update';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>

    <Route exact path="/authors/:id">
      <Update />
    </Route>

        <Route exact path="/new">
          <AuthorForm />
          
        </Route>

        <Route exact path="/">
          <Main />
        </Route>
      </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;
