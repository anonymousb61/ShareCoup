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
class App extends Component{
  render(){
    return(
      <>
      <Titlebar/>
      
      <Router>
      <Navbar/>
        
        <div className="App">
         
          <Routes>
            <Route exact path = '/' element ={<HomePage />}></Route>
            <Route exact path = '/ProfilePage' element ={<ProfilePage />}></Route>
            <Route exact path = '/addCode' element ={<AddCode/>}></Route>

            <Route exact path = '/dashboard' element ={<Dashboard />}></Route>

          </Routes>

        </div>
        
      </Router></>
    );
  }
}

// const App = () => {
//   const [currentPage, setCurrentPage] = useState('home');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setIsAuthenticated(!!user);
//     });
//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const renderPage = () => {
//     switch (currentPage) {
//       case 'home':
//         return <HomePage />;
//       case 'profile':
//         return <ProfilePage />;
//       case 'dashboard':
//         return <Dashboard />;
//       default:
//         return <HomePage />;
//     }
//   };

//   const navigateToPage = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="App">
//       <Titlebar/>
//       <nav>
//         <button className="homepage-button" onClick={() => navigateToPage('home')}>
//           Home
//         </button>
//         <button className="profilepage-button" onClick={() => navigateToPage('profile')}>
//           My Profile
//         </button>
//         <button className="dashboard-button" onClick={() => navigateToPage('dashboard')}>
//           Coupons
//         </button>
//       </nav>
//       {renderPage()}
//     </div>
//   );
// };

 export default App;