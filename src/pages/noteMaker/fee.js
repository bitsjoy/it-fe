import { LoadingOutlined, SyncOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import React, { useEffect } from 'react'
import { btnBackgroundColor } from '../../uiConfig'

export default function Fee() {
    useEffect(()=>{
        localStorage.setItem('payment_for_product', 'Notes')
    }, [])
  return (
    <div>
        <Row>
            <Col span={24}>
                <div style={{border: '1px solid black', width: '90%', height: '30vh'}}></div>
                <br/>
                <br/>
                Early Bird discount : <span style={{fontSize: '25px', color: btnBackgroundColor}}>&#x20B9; 99</span>
                <br/>
                <br/>
                <form id="rz_form"> </form>
            </Col>
        </Row>
    </div>
  )
}
