import { HomeOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import React from 'react'
import { btnBackgroundColor } from '../uiConfig'

export default function FooterMenu() {
  return (
    <div style={{position: 'fixed', bottom: '0px'}}>
    <Row style={{backgroundColor: 'silver', color: 'white', width: '100vw', marginLeft: '-20px', padding: '0px'}}>
        <Col xs={{span: 24}} md={{span: 0}} style={{padding: '10px'}} align="left">
            <div style={{display: 'flex', whiteSpace: 'nowrap'}}>
                <HomeOutlined />
            </div>
        </Col>
 
    </Row>
</div>
  )
}
