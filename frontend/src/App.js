import React from 'react';
import Nav from './components/Nav'
import Jams from './Jams'
import Learning from './Learning'
import Profile from './Profile'
import Home from './Home'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom' 

function App() {
  return (
    <Router>
      <div className="App">
        <Nav/>
        <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/jams" exact component={Jams}/>
        <Route path="/learning" exact component={Learning}/>
        <Route path="/profile" exact component={Profile}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
