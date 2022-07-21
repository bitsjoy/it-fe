import './App.css';
import NavigationBar from './components/NavigationBar';
import UserAuthentication from './pages/userAutentication.js';
import { HashRouter as Router,
Routes,
Route
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MainForm from './pages/home';
import { bearer_token_key } from './localStorageConfig';
import Footer from './components/Footer';
import Profile from './pages/profilePage';
import NoteMaker from './pages/noteMaker';

function App() {
  return (
    <div className="App">
      
      <Router>
      <ToastContainer
      position="bottom-right" />
      <NavigationBar /> 
      <br/>
      <br/>
      <br/>
      <br/>
        <Routes> 
          <Route path='/' exact element={localStorage.getItem(bearer_token_key) === null ? <UserAuthentication/> : <MainForm/>}></Route>
          <Route path='/profile' element={localStorage.getItem(bearer_token_key) === null ? <UserAuthentication/> : <Profile />}></Route>
          <Route path='/notes' element={localStorage.getItem(bearer_token_key) === null ? <UserAuthentication/> : <NoteMaker />}></Route>
          {/* <Route path='/onboarding' element={localStorage.getItem(bearer_token_key) === null ? <UserAuthentication/> : <OnBoarding/>}></Route> */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
