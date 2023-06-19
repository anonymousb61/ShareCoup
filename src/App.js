import logo from './logo.svg';
import './App.css';
import {Component} from 'react';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import HomePage from './components/homepage';
import ProfilePage from './components/profile';
import Dashboard from './components/dashboard';
import ProfilePrivateRoute from './components/ProfilePrivateRoute';
import Titlebar from './components/titlebar'
import {BrowserRouter as Router, Switch,Route,Routes,Link} from "react-router-dom";
import AddCode from './components/addCode';
import Navbar from './components/navbar/navbar';
import SignIn from './components/auth/login';
import SignUp from './components/auth/signUp';
import YourUploaded from './components/yourUploaded';
import YourUsedCoupons from './components/yourUsedCoupons';
import SignOut
 from './components/auth/signOut';
class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isUserSignedIn: false
    };
  } componentDidMount() {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      this.setState({ isUserSignedIn: !!user });
    });
    this.unsubscribe = unsubscribe;
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  } render(){   
     const { isUserSignedIn } = this.state;

    return(
      <>
      <Titlebar/>
      
      <Router>
      <Navbar isUserSignedIn={isUserSignedIn}/>
        
        <div className="App">
         
          <Routes>
            <Route exact path = '/' element ={<HomePage />}></Route>
            <Route exact path = '/ProfilePage' element ={<ProfilePage />}></Route>
            <Route exact path = '/addCode' element ={<AddCode/>}></Route>
            <Route exact path = '/auth/login' element ={<SignIn/>}></Route>
            <Route exact path = '/auth/signUp' element ={<SignUp/>}></Route>
            <Route exact path ='/yourUploaded' element={<YourUploaded/>}></Route>
            <Route exact path = '/auth/signOut' element ={<SignOut/>}></Route>
            <Route exact path ='/yourUsedCoupons' element={<YourUsedCoupons/>}></Route>
            <Route exact path = '/dashboard' element ={<Dashboard />}></Route>

          </Routes>

        </div>
        
      </Router></>
    );
  }
}



 export default App;