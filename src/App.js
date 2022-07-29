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
import NoteMaker from './pages/noteMaker';
import VerifyOneTime from './pages/verifyOneTimePayment';
import { useEffect, useState } from 'react';
import { AndroidOutlined, AppleOutlined, SyncOutlined, WindowsOutlined } from '@ant-design/icons';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { Button, Input, Modal } from 'antd'; 
import { btnBackgroundColor } from './uiConfig';
import Aboutus from './pages/Aboutus';
import Contactus from './pages/Contactus';
import Fee from './pages/noteMaker/fee';

let deferredPrompt;  
    
function App() {
  const [installable, setInstallable] = useState(false);
  const [installAppModal, setInstallAppModal] = useState(true);
    
 
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      setInstallable(true);
      setInstallAppModal(true);
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
 
      
      <Router>
      <ToastContainer
      position="bottom-right" />
      <NavigationBar /> 
      <br/>
      <br/>
      <br/>
        <Routes> 
          <Route path='/' exact element={localStorage.getItem(bearer_token_key) === null ? <UserAuthentication/> : <MainForm/>}></Route>
          <Route path='about_us' exact element={localStorage.getItem(bearer_token_key) === null ? <UserAuthentication/> : <Aboutus />}></Route>
          <Route path='contact_us' exact element={localStorage.getItem(bearer_token_key) === null ? <UserAuthentication/> : <Contactus />}></Route>
          <Route path='privacy_policy' exact element={<PrivacyPolicy />}></Route>
          <Route path='/terms_and_conditions' exact element={<MainForm/>}></Route>
          <Route path='/about_us' exact element={localStorage.getItem(bearer_token_key) === null ? <UserAuthentication/> : <MainForm/>}></Route>
          <Route path='/contact_us' exact element={localStorage.getItem(bearer_token_key) === null ? <UserAuthentication/> : <MainForm/>}></Route>
          <Route path='/profile' element={localStorage.getItem(bearer_token_key) === null ? <UserAuthentication/> : <Profile />}></Route>

          <Route path='/notes' element={localStorage.getItem(bearer_token_key) === null ? <UserAuthentication/> : <NoteMaker />}></Route>
          <Route path='/notes/buy' element={localStorage.getItem(bearer_token_key) === null ? <UserAuthentication/> : <Fee />}></Route>

          <Route path='/editorview' element={localStorage.getItem(bearer_token_key) === null ? <UserAuthentication/> : <NoteMaker />}></Route>
          <Route path='/verifyonetimepayment/:x' element={localStorage.getItem(bearer_token_key) === null ? <UserAuthentication/> : <VerifyOneTime />}></Route>

        </Routes> 
      </Router>

      <Modal title="Install Bitsjoy App" visible={installable && installAppModal} onOk={()=>{}} onCancel={()=>{setInstallAppModal(false)}}

footer={[
  <Button key="back" type="link" onClick={() => {setInstallAppModal(false)}}>
    Remind me later
  </Button>
   
]}>
<div align="center">
 Visit <span style={{color: btnBackgroundColor}}>bitsjoy.com</span> via chrome on any device (smartphone / PC / laptop) to install the app on that device
  <br/>
  <br/>  
<Button size='large' id="installBtn" style={{ fontWeight: '500', border: '1px solid  #009e60', backgroundColor: '#009e60', color: 'white'}} onClick={handleInstallClick}>
            Install on this device
          </Button> 
          <br/>
          <br/>
   <span style={{fontSize: '20px', color: 'silver'}}> <AndroidOutlined /> <AppleOutlined /> <WindowsOutlined /> </span>

          </div>
          <br/> 
      </Modal>

    </div>
  );
}

export default App;
