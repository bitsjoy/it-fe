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
import Profile from './pages/profilePage';
import NoteMaker from './pages/noteMaker';
import VerifyOneTime from './pages/verifyOneTimePayment';
import { useEffect, useState } from 'react';
import { AndroidOutlined, AppleOutlined, WindowsOutlined } from '@ant-design/icons';
import PrivacyPolicy from './pages/PrivacyPolicy';

let deferredPrompt;  
    
function App() {
  const [installable, setInstallable] = useState(false);

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     if(installable == true){
  //       document.getElementById('installBtn').style.transform = 'translate(-500px, 0px)';
  //     }
  //   }, 500);
    
  // }, [installable])

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      setInstallable(true);
    });

    window.addEventListener('appinstalled', () => {
      // Log install to analytics
      console.log('INSTALL: Success');
    });
  }, []);

  const handleInstallClick = (e) => {
      // Hide the app provided install promotion
      setInstallable(false);
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
      });
  };
  
 
  return (
    <div className="App">
 {/* <button onClick={()=>{
  setInstallable(!installable);
 }} />  */}
{
installable && 
          <button id="installBtn" style={{ position: 'fixed', bottom: '0px', right: '0px', zIndex: '999', fontSize: '17px', fontWeight: '500', padding: '10px 30px', border: '1px solid  #009e60', backgroundColor: '#009e60', color: 'white'}} onClick={handleInstallClick}>
            Install app &nbsp; <AndroidOutlined /> <AppleOutlined /> <WindowsOutlined /> 
          </button> 
        }
      
      <Router>
      <ToastContainer
      position="bottom-right" />
      <NavigationBar /> 
      <br/>
      <br/>
      <br/>
        <Routes> 
          <Route path='/' exact element={localStorage.getItem(bearer_token_key) === null ? <UserAuthentication/> : <MainForm/>}></Route>
          <Route path='privacy_policy' exact element={localStorage.getItem(bearer_token_key) === null ? <UserAuthentication/> : <PrivacyPolicy />}></Route>
          <Route path='/terms_and_conditions' exact element={localStorage.getItem(bearer_token_key) === null ? <UserAuthentication/> : <MainForm/>}></Route>
          <Route path='/about_us' exact element={localStorage.getItem(bearer_token_key) === null ? <UserAuthentication/> : <MainForm/>}></Route>
          <Route path='/contact_us' exact element={localStorage.getItem(bearer_token_key) === null ? <UserAuthentication/> : <MainForm/>}></Route>
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
