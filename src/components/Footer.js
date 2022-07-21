import { FacebookOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import React from 'react'
import { toast } from 'react-toastify'
import { btnBackgroundColor } from '../uiConfig'

export default function Footer() {
  return (
    <div style={{position: 'fixed', bottom: '0px'}}>
        <Row style={{backgroundColor: btnBackgroundColor, color: 'white', width: '100vw', marginLeft: '-20px', padding: '20px'}}>
            <Col xs={{span: 12}} md={{span: 12}} align="left">
                Contact us :  
                support@bitsjoy.com 
            </Col>

            <Col xs={{span: 12}} md={{span: 12}} align="right"> 
                {/* <LinkedinOutlined style={{fontSize: '20px'}} onClick={()=>{
                    toast.success('coming soon!');
                }} /> &nbsp;
                <FacebookOutlined onClick={()=>{
                    toast.success('coming soon!');
                }} style={{fontSize: '20px'}}/> &nbsp; 
                <InstagramOutlined onClick={()=>{
                    toast.success('coming soon!');
                }} style={{fontSize: '20px'}}/> */}
            </Col>
        </Row>
    </div>
  )
}
