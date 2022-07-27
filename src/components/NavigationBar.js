 
import { AppstoreOutlined, BellFilled, BellOutlined, ContactsFilled, DownOutlined, InfoCircleFilled, InfoOutlined, MoreOutlined, PhoneOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons'
import { Col, Dropdown, Menu, Row, Space } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom' 
import { btnBackgroundColor } from '../uiConfig'

export default function NavigationBar() {

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
            {
              key: '5',
              label: (
                <a target="terms and conditions" rel="" href="https://bitsjoy.com/#/terms_and_conditions">
                  Terms and conditions
                </a>
              )
            }]}
            />
    )

  return (
    <>
        <Row style={{paddingTop: '13px', paddingBottom: '5px',  paddingLeft: '0px', position: 'fixed', width: '100vw', backgroundColor: 'white', zIndex: '9', left: '0px', fontFamily: 'raleway'}}> 
            <Col span={12} align="left">
            <Link title="Profile page" to="/"><AppstoreOutlined style={{color: btnBackgroundColor, fontSize: '30px', paddingLeft: '20px'}}/><span style={{color: btnBackgroundColor}}>Bitsjoy</span> </Link>
                {/* <sub> &nbsp;bitsjoy </sub> */}
            </Col>
            <Col span={12} align="right"> 
            <BellOutlined style={{fontSize: '20px', transform: 'translate(0px, 1px)'}} />
           
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
