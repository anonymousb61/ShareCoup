import SignIn from "./auth/login";
import SignUp from "./auth/signUp";
import SignOut from "./auth/signOut";
import AuthDetails from "./authDetails";
import TitleBar from './titlebar';

function HomePage() {
  return (
    <div className="App">
      <TitleBar/>
      <SignIn/>
      <SignUp/>
      <SignOut/>
      <AuthDetails/>
    </div>
  );
}

export default HomePage;