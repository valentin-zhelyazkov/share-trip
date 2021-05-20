import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/home/home';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Login from './components/login/login';
import Register from './components/register/register';
import AddTrip from './components/addTrip/addTrip';
import DetailsTrip from './components/detailsTrip/detailsTrip';
import UserProfile from './components/userProfile/userProfile';
import EditTrip from './components/editTrip/editTrip';
import HeaderWhenLoggedIn from './components/headerWhenLoggedIn/headerWhenLoggedIn';

function App() {
  return (
    <Router>
      <div className="App">
      <HeaderWhenLoggedIn/>     
        <Switch>
        <Route path='/' exact component={Home} />
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
          <Route path='/addTrip' exact component={AddTrip} />
          <Route path='/trip-details/:id' exact component={DetailsTrip} />
          <Route path='/user-profile' exact component={UserProfile} />
          <Route path='/edit/:id' exact component={EditTrip} />
          </Switch>
          <Footer />
      </div>
    </Router>
  );
}

export default App;
