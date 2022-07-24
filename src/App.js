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
import FooterMenu from './components/FooterMenu';
import VerifyOneTime from './pages/verifyOneTimePayment';

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
          <Route path='/editorview' element={localStorage.getItem(bearer_token_key) === null ? <UserAuthentication/> : <NoteMaker />}></Route>
          {/* <Route path='/onboarding' element={localStorage.getItem(bearer_token_key) === null ? <UserAuthentication/> : <OnBoarding/>}></Route> */}
          <Route path='/verifyonetimepayment/:x' element={localStorage.getItem(bearer_token_key) === null ? <UserAuthentication/> : <VerifyOneTime />}></Route>

        </Routes> 
      </Router>
    </div>
  );
}

export default App;
