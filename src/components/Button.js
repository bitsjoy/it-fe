import { LoadingOutlined, SyncOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react'
import { btnBackgroundColor, btnTextColor, secondaryColor } from '../uiConfig'; 

export default function ButtonPrimary(props) {
  const { text, onClick, disabledCondition, styl, id, size, className } = props;
  return (
    <Button size={size} disabled={disabledCondition} id={id} className={className} style={{backgroundColor: secondaryColor, color: btnTextColor, border: '0px', fontWeight: 700, ...styl}} onClick={onClick}>{text === 'loading' ? <SyncOutlined spin/> : text}</Button>
  )
}
