import { BookOutlined, CiCircleFilled, DotChartOutlined, LoadingOutlined, PlayCircleFilled, SyncOutlined } from '@ant-design/icons'
import { Col, List, Row } from 'antd'
import React, { useEffect } from 'react'
import { btnBackgroundColor } from '../../uiConfig'

export default function Fee() {
    useEffect(()=>{
        localStorage.setItem('payment_for_product', 'Notes')
    }, [])
  return (
    <div>
        <Row>
            <Col span={24} align="center">
                <Row>
                    <Col xs={{span: 24}} md={{span: 16}} align="center">
                        <iframe style={{ borderRadius: '10px', width: '90%', height: '50vh'}} src="https://www.youtube.com/embed/4yFfr1myDg8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        <br/>
                <span>Price after Early Bird discount :<span style={{fontSize: '36px', color: 'goldenrod'}}> <br/>  <sup>&#x20B9;</sup>99 <s style={{color: 'silver', fontSize: '21px', color: 'silver'}}>&nbsp;<sup>&#x20B9;</sup> 499 &nbsp;</s> </span></span>
                <br/>
                <br/>
                <form id="rz_form"> </form>
                        <br/> 
                    </Col>
                    <Col xs={{span: 0}} md={{span: 8}} align="left">
                        {/* <iframe style={{width: '50vw', height: '50vh'}} src="https://www.youtube.com/embed/4yFfr1myDg8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                        <h1 style={{ paddingLeft:'0px', color: 'goldenrod', border: `0px solid ${'goldenrod'}`, display: 'inline'}}>Notes <BookOutlined  /> </h1>
                        <br/>
                        <br/>
                        <List>
                            <List.Item style={{color: btnBackgroundColor}}><PlayCircleFilled/> &nbsp; Create a new collection of Notes</List.Item>
                            <List.Item style={{color: btnBackgroundColor}}><PlayCircleFilled/> &nbsp; Add note to a collection</List.Item>
                            <List.Item style={{color: btnBackgroundColor}}><PlayCircleFilled/> &nbsp; Insert image in a Note</List.Item>
                            <List.Item style={{color: btnBackgroundColor}}><PlayCircleFilled/> &nbsp; Update a Note</List.Item>
                            <List.Item style={{color: btnBackgroundColor}}><PlayCircleFilled/> &nbsp; Delete a Note</List.Item>
                            <List.Item style={{color: btnBackgroundColor}}><PlayCircleFilled/> &nbsp; Sharing Notes with friends</List.Item>
                            <List.Item style={{color: btnBackgroundColor}}><PlayCircleFilled/> &nbsp; Download a Note as pdf</List.Item>
                        </List>
                    
                    </Col>
                </Row> 
                <br/>
                <Row>
                    

                    <Col xs={{span: 24}} md={{span: 0}}>
                         
                        <h1 align="center" style={{paddingLeft:'0px', color: 'goldenrod', borderBottom: `0px solid ${'goldenrod'}`, display: 'inline', padding: '0px 10px'}}> <BookOutlined  /> Features </h1>
                         
                        <br/>
                    <List align="left">
                            <List.Item style={{color: btnBackgroundColor}}><PlayCircleFilled/> &nbsp; Create a new collection of Notes</List.Item>
                            <List.Item style={{color: btnBackgroundColor}}><PlayCircleFilled/> &nbsp; Add note to a collection</List.Item>
                            <List.Item style={{color: btnBackgroundColor}}><PlayCircleFilled/> &nbsp; Insert image in a Note</List.Item>
                            <List.Item style={{color: btnBackgroundColor}}><PlayCircleFilled/> &nbsp; Update a Note</List.Item>
                            <List.Item style={{color: btnBackgroundColor}}><PlayCircleFilled/> &nbsp; Delete a Note</List.Item>
                            <List.Item style={{color: btnBackgroundColor}}><PlayCircleFilled/> &nbsp; Sharing Notes with friends</List.Item>
                            <List.Item style={{color: btnBackgroundColor}}><PlayCircleFilled/> &nbsp; Download a Note as pdf</List.Item>
                        </List>
                       {/* <iframe style={{width: '80vw', height: 'auto'}} src="https://www.youtube.com/embed/4yFfr1myDg8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                    </Col>
                </Row>
                
            </Col>
        </Row>
    </div>
  )
}
