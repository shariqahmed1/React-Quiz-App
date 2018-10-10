import React from 'react';
import {Router, Route } from 'react-router-dom';
import Home from './screens/Home/Home';
import createBrowserHistory from 'history/createBrowserHistory';
import Dashboard from './screens/Dashboard/Dashboard';
import About from './screens/About/About'
import Validate from './screens/Validate/Validate';
import Quiz from './screens/Quiz/Quiz';
import Login from './screens/Login/Login';
import Signup from './screens/Signup/Signup';
const customHistory = createBrowserHistory();
const App = () => (
    <Router history={customHistory}>
        <div>
            <Route exact path='/' component={Home}/>
            <Route path='/dashboard' component={Dashboard}/>
            <Route path='/login' component={Login}/>
            <Route path='/signup' component={Signup}/>
            <Route path='/about/:techname/:quizname' component={About}/>
            <Route path='/key' component={Validate}/>
            <Route path='/quiz' component={Quiz}/>
        </div>
    </Router>
)

export default App;