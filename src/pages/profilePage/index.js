import React from 'react'
 
import { Row, Col, Button } from 'antd';
import { btnBackgroundColor } from '../../uiConfig';
import { useNavigate } from 'react-router';

export default function Profile() {
  let navigate = useNavigate();
  return (
    <div style={{height: '100vh'}}>

        <Row>
            <Col xs={{span: '24'}} md={{span: '24'}}>
        {/* <Card title={localStorage.getItem('bitsjoy_name')} ></Card> */}

     <div align="left">
        <h3> Full name : {localStorage.getItem('bitsjoy_name')}</h3>
        <h3> Username : {localStorage.getItem('bitsjoy_email')}</h3>
        <br/>
        <br/>
        <Button style={{padding: '0px', color: btnBackgroundColor, borderBottom : `1px solid ${btnBackgroundColor}`}} onClick={()=>{
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
