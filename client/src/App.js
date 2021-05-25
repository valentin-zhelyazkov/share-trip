import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import LoggedContext from './contexts/logged-context';
import Home from './components/home/home';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Login from './components/login/login';
import Register from './components/register/register';
import AddTrip from './components/addTrip/addTrip';
import DetailsTrip from './components/detailsTrip/detailsTrip';
import UserProfile from './components/userProfile/userProfile';
import EditTrip from './components/editTrip/editTrip';
import EditUserProfile from './components/editUserProfile/editUserProfile';
import HeaderWhenLoggedIn from './components/headerWhenLoggedIn/headerWhenLoggedIn';

function App() {
  const [isLogged, setIsLogged] = useState(sessionStorage.getItem('accessToken'));
  
  return (
    <Router>
      <div className="App">
        <LoggedContext.Provider value={{ isLogged, setIsLogged }}>
          {isLogged ? <HeaderWhenLoggedIn /> : <Header />}
          <Switch>
            <Route path='/' exact component={Home} />
            {!isLogged ? <Route path='/login' exact component={Login} /> : null}
            {!isLogged ? <Route path='/register' exact component={Register} /> : null}
            {isLogged ? <Route path='/addTrip' exact component={AddTrip} /> : null}
            {isLogged ? <Route path='/trip-details/:id' exact component={DetailsTrip} /> : null}
            {isLogged ? <Route path='/user-profile' exact component={UserProfile} /> : null}
            {isLogged ? <Route path='/edit/:id' exact component={EditTrip} /> : null}
            {isLogged ? <Route path='/editUserProfile' exact component={EditUserProfile} /> : null}
            <Redirect to='/' />
          </Switch>
          <Footer />
        </LoggedContext.Provider>
      </div>
    </Router>
  );
}

export default App;
