import './App.css';
import NavigationBar from './components/NavigationBar';
import UserAuthentication from './pages/userAutentication.js';
import { HashRouter as Router,
Routes,
Route
} from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MainForm from './pages/home';
import { bearer_token_key } from './localStorageConfig'; 
import Profile from './pages/profilePage';
import VerifyOneTime from './pages/verifyOneTimePayment';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Aboutus from './pages/Aboutus';
import Contactus from './pages/Contactus';
    
function App() {
 
  return (
    <div className="App">
  
      
      <Router>
      <ToastContainer
      position="top-center" />
      <NavigationBar /> 
      <br/>
      <br/>
      <br/>
        <Routes> 
          <Route path='/' exact element={localStorage.getItem(bearer_token_key) === null ? <UserAuthentication/> : <MainForm/>}></Route>
          <Route path='about_us' exact element={<Aboutus />}></Route>
          <Route path='contact_us' exact element={<Contactus />}></Route>
          <Route path='privacy_policy' exact element={<PrivacyPolicy />}></Route>
          <Route path='/terms_and_conditions' exact element={<MainForm/>}></Route>
          
          <Route path='/profile' element={localStorage.getItem(bearer_token_key) === null ? <UserAuthentication/> : <Profile />}></Route>

          <Route path='/verifyonetimepayment/:x' element={localStorage.getItem(bearer_token_key) === null ? <UserAuthentication/> : <VerifyOneTime />}></Route>

        </Routes> 
      </Router>

    </div>
  );
}

export default App;
