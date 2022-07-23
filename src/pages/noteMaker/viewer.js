import { CloseOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'
import { API_BASE } from '../../apiConfig'
import { bearer_token_key } from '../../localStorageConfig'
import { btnBackgroundColor } from '../../uiConfig'

export default function Viewer(props) {
  return (
    <div style={{ overflowY: 'auto', display: '', border: `0px solid ${btnBackgroundColor}`, borderRight: '0px', borderLeft: '0px', backgroundColor: '#F8F8F8', padding: '20px', margin: '20px', marginTop: '0px'}} align="left">
            <Row>
                <Col span={12}><span style={{paddingRight: '20px', paddingBottom: '5px', fontSize: '17px'}}>{props.title}</span></Col>
            <Col span={12} align="right">
            <CloseOutlined size="large" onClick={props.close} style={{position: 'revert', right: '0px'}} />
            
            </Col>
            </Row>
            
             <br/>
             <br/>
            {props.loading ? <LoadingOutlined /> : <div style={{height: '60vh', overFlowY: 'scroll'}}  dangerouslySetInnerHTML={{__html: props.rawHtmlBody}}></div>}
    </div>
  )
}
