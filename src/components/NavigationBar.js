 
import { Col, Dropdown, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom' 
import { btnBackgroundColor } from '../uiConfig'

export default function NavigationBar() {
  return (
    <>
        <Row style={{paddingTop: '13px', paddingBottom: '5px',  paddingLeft: '0px', position: 'fixed', width: '100vw', backgroundColor: btnBackgroundColor, zIndex: '9', left: '0px', color: 'white', fontFamily: 'raleway'}}> 
            <Col span={12} align="left">
            <Link title="Profile page" to="/"><h2 style={{ backgroundColor: 'white', color: btnBackgroundColor, textShadow: '0px 0px black', display: 'inline-block', padding: '0px 20px' }}>Bitsjoy</h2></Link>
                {/* <sub> &nbsp;bitsjoy </sub> */}
            </Col>
            <Col span={12} align="right">
            {localStorage.getItem("bitsjoy_pp_image") && <Link title="Profile page" to="/profile"> <img src={localStorage.getItem("bitsjoy_pp_image")} style={{width: '40px', borderRadius: '50%', marginRight: '20px', border: '2px solid white'}} alt="PP" /> </Link>}
                {/* <AimOutlined onClick={()=>{
                    localStorage.clear();
                    window.location.reload();
                }} style={{fontSize: '20px', marginRight: '30px', marginTop: '10px', transform: 'rotate(90deg)'}} /> */}
            </Col>
        </Row> 
    </>
  )
}
