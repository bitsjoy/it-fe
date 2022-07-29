import { BookOutlined, CiCircleFilled, DotChartOutlined, LoadingOutlined, PlayCircleFilled, SyncOutlined } from '@ant-design/icons'
import { Col, List, Row } from 'antd'
import React, { useEffect } from 'react'
import { mc, rupay, upi, visa } from '../../assets'
import { btnBackgroundColor, secondaryColor } from '../../uiConfig'

export default function Fee() {


    useEffect(() => { 
        localStorage.setItem('payment_for_product', 'Notes')

        const script = document.createElement('script');
        
        script.src = "https://checkout.razorpay.com/v1/payment-button.js";
        script.async = true;
        script.setAttribute('data-payment_button_id' , "pl_JxBuBqoSa0PGbf");
     
    
        if(document.getElementById('rz_form')) {
            document.getElementById('rz_form').innerHTML = '';
            document.getElementById('rz_form').appendChild(script); 
        }
    
    
      
      }, []);

  return (
    <div>
        <br/> 
        <Row>
            <Col span={24} align="center">
                <Row>
                    <Col xs={{span: 24}} md={{span: 8}} align="left">
                    <h1 style={{ paddingLeft:'0px', color: secondaryColor, border: `0px solid ${'goldenrod'}`, display: 'inline'}}>Notes <BookOutlined  /> </h1>
<br/>
<br/>
                    <List>
                            <List.Item style={{color: btnBackgroundColor}}><PlayCircleFilled/> &nbsp; Create a new collection of Notes</List.Item>
                            <List.Item style={{color: btnBackgroundColor}}><PlayCircleFilled/> &nbsp; Add note to a collection</List.Item>
                            <List.Item style={{color: btnBackgroundColor}}><PlayCircleFilled/> &nbsp; Insert image/Videos/Links in a Note</List.Item>
                            <List.Item style={{color: btnBackgroundColor}}><PlayCircleFilled/> &nbsp; Update a Note</List.Item>
                            <List.Item style={{color: btnBackgroundColor}}><PlayCircleFilled/> &nbsp; Delete a Note</List.Item>
                            <List.Item style={{color: btnBackgroundColor}}><PlayCircleFilled/> &nbsp; Sharing Notes with friends</List.Item>
                            {/* <List.Item style={{color: btnBackgroundColor}}><PlayCircleFilled/> &nbsp; Download a Note as pdf</List.Item> */}
                        </List>
                        <br/>
                        <div style={{ borderRadius: '0px', border: `0px solid ${secondaryColor}`, padding: '30px'}} align="center">
                        Pay once, use forever!
               <span style={{fontSize: '40px', color: btnBackgroundColor}}> <br/>  <sup>&#x20B9;</sup><b>99</b>/- <s style={{color: 'silver', fontSize: '21px', color: 'silver'}}>&nbsp;<sup>&#x20B9;</sup> 499 &nbsp;</s> </span>
                <br/>
                <form id="rz_form"> </form> 
                <span style={{backgroundColor :'white', padding: '10px'}}>
                <img src={upi} alt="upi" style={{width: '30px'}} /> 
                <img src={visa} alt="visa" style={{width: '50px'}} /> 
                <img src={mc} alt="mc" style={{width: '30px'}} /> &nbsp;&nbsp;
                <img src={rupay} alt="rupay" style={{width: '40px'}} /> 
                    </span> 
              
                </div>
                <br/>
               <br/>
               <br/>
                    </Col>
                    
                    <Col xs={{span: 24}} md={{span: 16}} align="center">
                        <h3 align="left" style={{width: '80%'}}>User's guide</h3>
                        {/* <iframe style={{width: '50vw', height: '50vh'}} src="https://www.youtube.com/embed/4yFfr1myDg8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                        <iframe style={{ borderRadius: '0px', width: '80%', height: '50vh'}} src="https://www.youtube.com/embed/0TuoHR3s23k?autoplay=1" title="notes user's guide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>       
                   <br/>
                   <br/>
                          <div align="left" style={{width: '80%'}}>
                *This is NOT a recurring payment, it is a one time payment and you can use NOTES app after paying this minimal fee.
                            </div>       
                    </Col>
                </Row> 
                <br/>
                <Row>
                    

                    {/* <Col xs={{span: 24}} md={{span: 0}}>
                         <br/>
                        <h1 align="center" style={{paddingLeft:'0px', color: 'goldenrod', borderBottom: `0px solid ${'goldenrod'}`, display: 'inline', padding: '0px 10px'}}> <BookOutlined  /> Features </h1>
                         
                        <br/>
                    <List align="left">
                            <List.Item style={{color: btnBackgroundColor}}><PlayCircleFilled/> &nbsp; Create a new collection of Notes</List.Item>
                            <List.Item style={{color: btnBackgroundColor}}><PlayCircleFilled/> &nbsp; Add note to a collection</List.Item>
                            <List.Item style={{color: btnBackgroundColor}}><PlayCircleFilled/> &nbsp; Insert image/Videos/Links in a Note</List.Item>
                            <List.Item style={{color: btnBackgroundColor}}><PlayCircleFilled/> &nbsp; Update a Note</List.Item>
                            <List.Item style={{color: btnBackgroundColor}}><PlayCircleFilled/> &nbsp; Delete a Note</List.Item>
                            <List.Item style={{color: btnBackgroundColor}}><PlayCircleFilled/> &nbsp; Sharing Notes with friends</List.Item>
                        </List>
                    </Col> */}
                </Row>
                
            </Col>
        </Row>
    </div>
  )
}
