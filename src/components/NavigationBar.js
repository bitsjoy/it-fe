 
import { AppstoreOutlined, HomeOutlined } from '@ant-design/icons'
import { Col, Dropdown, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom' 
import { btnBackgroundColor } from '../uiConfig'

export default function NavigationBar() {
  return (
    <>
        <Row style={{paddingTop: '13px', paddingBottom: '5px',  paddingLeft: '0px', position: 'fixed', width: '100vw', backgroundColor: 'white', zIndex: '9', left: '0px', color: 'white', fontFamily: 'raleway'}}> 
            <Col span={12} align="left">
            <Link title="Profile page" to="/"><AppstoreOutlined style={{color: btnBackgroundColor, fontSize: '30px', paddingLeft: '20px'}}/><span style={{color: btnBackgroundColor}}>Bitsjoy</span> </Link>
                {/* <sub> &nbsp;bitsjoy </sub> */}
            </Col>
            <Col span={12} align="right">
            {localStorage.getItem("bitsjoy_pp_image") && <Link title="Profile page" to="/profile"> <img src={localStorage.getItem("bitsjoy_pp_image")} style={{width: '40px', borderRadius: '50%', marginRight: '20px', border: '2px solid goldenrod'}} alt="PP" /> </Link>}
                {/* <AimOutlined onClick={()=>{
                    localStorage.clear();
                    window.location.reload();
                }} style={{fontSize: '20px', marginRight: '30px', marginTop: '10px', transform: 'rotate(90deg)'}} /> */}
            </Col>
        </Row> 
    </>
  )
}
