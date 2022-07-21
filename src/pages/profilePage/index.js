import React from 'react'
 
import { Row, Col, Button } from 'antd';
import { btnBackgroundColor } from '../../uiConfig';

export default function Profile() {
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
                    window.location.reload();
                }} type="link"><b>Log out</b></Button>
     </div>
  </Col>
 
        </Row>
    </div>
  )
}
