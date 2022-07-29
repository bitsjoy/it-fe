 
import { AppstoreOutlined, BellFilled, BellOutlined, ContactsFilled, DownloadOutlined, DownOutlined, InfoCircleFilled, InfoOutlined, MoreOutlined, PhoneOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons'
import { Col, Dropdown, Menu, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom' 
import { btnBackgroundColor } from '../uiConfig'


let deferredPrompt;  


export default function NavigationBar() {

  const [installable, setInstallable] = useState(false); 
    
 
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
  

    const menu = (
        <Menu
          items={[
            {
                key: '1',
                label: (
                    localStorage.getItem("bitsjoy_pp_image") && <Link title="Profile page" onClick={()=>{
                        window.scrollTo(0,0);
                    }} to="/profile">
                         {/* <img src={localStorage.getItem("bitsjoy_pp_image")} style={{width: '30%', borderRadius: '0%'}} alt="PP" /> */}
                    
                    <br/>
                    Profile <UserOutlined /> </Link>
                ),
              },
            {
                key: '2',
                label: (
                  <Link to="/about_us" onClick={()=>{
                    window.scrollTo(0,0);
                }}>
                    About us
                  </Link>
                ),
              },
              {
                key: '3',
                label: (
                    <Link to="/contact_us" onClick={()=>{
                        window.scrollTo(0,0);
                    }}>
                    Contact us &nbsp; <PhoneOutlined />
                  </Link>
                )
              },
            {
              key: '4',
              label: (
                <a target="privacy_policy" rel="" href="https://bitsjoy.com/#/privacy_policy">
                  Privacy Policy
                </a>
              ),
            },
            // {
            //   key: '5',
            //   label: (
            //     <a target="terms and conditions" rel="" href="https://bitsjoy.com/#/terms_and_conditions">
            //       Terms and conditions
            //     </a>
            //   )
            // }
          ]}
            />
    )

  return (
    <>
        <Row style={{paddingTop: '13px', paddingBottom: '5px',  paddingLeft: '0px', position: 'fixed', width: '100vw', backgroundColor: 'white', zIndex: '9', left: '0px', fontFamily: 'raleway'}}> 
            <Col span={12} align="left">
            <Link title="Profile page" to="/"><AppstoreOutlined style={{color: btnBackgroundColor, fontSize: '30px', paddingLeft: '20px'}}/> </Link>
                {/* <sub> &nbsp;bitsjoy </sub> */}
                 {/* {window.location.href.split('/')[window.location.href.split('/').length - 1]}   */}
            </Col>
            <Col span={12} align="right"> 
            {installable && <DownloadOutlined title="download app" style={{fontSize: '20px', transform: 'translate(0px, 2px)'}}  onClick={handleInstallClick}/>}

            &nbsp;
            &nbsp;
            &nbsp;

            <BellOutlined style={{fontSize: '20px', transform: 'translate(0px, 1px)'}} />
           
            &nbsp;
            &nbsp;
            &nbsp;
 
            <div style={{marginRight: '20px', display: 'inline-block'}}>
            <Dropdown overlay={menu}>
                <a onClick={e => e.preventDefault()}>
                <Space>
                     <InfoCircleFilled style={{fontSize: '18px'}}/>
                </Space>
                </a>
            </Dropdown>
            </div>
                {/* <AimOutlined onClick={()=>{
                    localStorage.clear();
                    window.location.reload();
                }} style={{fontSize: '20px', marginRight: '30px', marginTop: '10px', transform: 'rotate(90deg)'}} /> */}
            </Col>
        </Row> 
    </>
  )
}
