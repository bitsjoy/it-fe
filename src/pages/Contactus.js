import { MailOutlined, WhatsAppOutlined } from '@ant-design/icons'
import React from 'react'
import { btnBackgroundColor } from '../uiConfig'

export default function Contactus() {
  return (
    <div align="left">
        <br/>
        <h2>Contact us</h2> 
        <h3><MailOutlined style={{color: btnBackgroundColor}}/> &nbsp; support@bitsjoy.com</h3>
        <h3><WhatsAppOutlined style={{color: btnBackgroundColor}}/> &nbsp; +91 8126153920</h3>
    </div>
  )
}
