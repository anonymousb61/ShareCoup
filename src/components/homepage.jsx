import SignIn from "./auth/login";
import SignUp from "./auth/signUp";
import SignOut from "./auth/signOut";
import AuthDetails from "./authDetails";
import TitleBar from './titlebar';
import Sidebar from "./sidebar";


function HomePage() {
  return (

    <div className="App">
      <div>
    <h2> Introduction to app</h2>      
  </div>
      <SignIn/>
      <SignUp/>
      <AuthDetails/>
    </div>
  );
}

export default HomePage;