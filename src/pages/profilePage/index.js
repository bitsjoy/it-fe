import React from 'react'
 
import { Row, Col, Button } from 'antd';
import { btnBackgroundColor } from '../../uiConfig';
import { useNavigate } from 'react-router';
import { MailFilled, MailOutlined, UserOutlined } from '@ant-design/icons';

export default function Profile() {
  let navigate = useNavigate();
  return (
    <div style={{}}>

        <Row>
            <Col xs={{span: '24'}} md={{span: '24'}}>
        {/* <Card title={localStorage.getItem('bitsjoy_name')} ></Card> */}

     <div align="Right">
      <br/>
        <h3><UserOutlined style={{color: btnBackgroundColor}} /> &nbsp; {localStorage.getItem('bitsjoy_name')}</h3>
        <h3> <MailOutlined style={{color: btnBackgroundColor}}/> &nbsp; {localStorage.getItem('bitsjoy_email')}</h3>
        <br/>
        <br/>
        <Button style={{padding: '0px', position: 'fixed', bottom: '15px', right: '20px', color: btnBackgroundColor, borderBottom : `1px solid ${btnBackgroundColor}`}} onClick={()=>{

        {/* global google */}  
        google.accounts.id.disableAutoSelect();
                    localStorage.clear();
                    navigate('/');
                    window.location.reload();
                }} type="link"><b>Log out</b></Button>
     </div>
  </Col>
 
        </Row>
    </div>
  )
}
