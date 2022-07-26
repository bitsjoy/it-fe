import { LoadingOutlined, SyncOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react'
import { btnBackgroundColor, btnTextColor } from '../uiConfig'; 

export default function ButtonPrimary(props) {
  const { text, onClick, disabledCondition, styl, id } = props;
  return (
    <Button disabled={disabledCondition} id={id} style={{backgroundColor: btnBackgroundColor, color: btnTextColor, border: '0px', ...styl}} onClick={onClick}>{text === 'loading' ? <SyncOutlined spin/> : text}</Button>
  )
}