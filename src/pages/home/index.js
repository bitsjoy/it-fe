import { Row, Col, Card } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { diary, noteMaker, time, writer } from '../../assets'

export default function Home() {

  let navigate = useNavigate();
  const date = new Date();

  const CardStyle = {
    textAlign: 'left',
    width:'90%',  
    padding: '10px',
    borderTop: '2px solid silver',
    border: '0px',
    display: 'inline-block',
    marginBottom: '50px',
    fontWeight: '700'
  }
  return (
    <div style={{minHeight: '100vh'}}>
      <br/>
      {/* <h1 style={{fontFamily: 'Italianno'}}>{date.getHours() < 12 ? <span>Good &nbsp; Morning! </span>: date.getHours() < 16 ? <span>Good &nbsp;Afternoon! </span>: <span>Good &nbsp;Evening! </span>}</h1> */}
      <div align="center" style={{fontFamily: 'Italianno', fontSize: '45px'}}>Tool kit</div>
<br/>
      <Row>
        <br/>

        <Col xs={{span: '24'}} md={{span: '6'}} align="center"> 
        <Card
        onClick={()=>{
          navigate('/notes')
        }}
    hoverable
    style={{...CardStyle, paddingTop: '35px'}}
    cover={<img alt="note-maker" style={{width: '60%', margin: 'auto'}} src={noteMaker} />}
  >
    <Card.Meta title="NOTES" description="Lets save some of your time and a lot of trees" />
  </Card>
</Col>


 


<Col xs={{span: '24'}} md={{span: '6'}} align="center"> 

<Card
  hoverable
  style={{...CardStyle, paddingTop: '50px'}}

  cover={<img alt="diary" style={{width: '50%', margin: 'auto'}}  src={diary} />}
>
  <Card.Meta title="DAILY DIARY" description="Story of your life, every single day is a new chapters" />
</Card>
      </Col>




      <Col xs={{span: '24'}} md={{span: '6'}}> 

<Card
  hoverable
  style={{...CardStyle, paddingTop: '40px'}}

  cover={<img alt="writer" style={{width: '60%', margin: 'auto'}}  src={writer} />}
>
  <Card.Meta title="WRITER" description="All-in-one tool for writing a book, organise your thoughts efficiently" />
</Card>
      </Col>





        <Col xs={{span: '24'}} md={{span: '6'}}> 

  <Card
    hoverable
    style={{...CardStyle, paddingTop: '28px'}}

    cover={<img alt="timer" style={{width: '45%', margin: 'auto'}}  src={time} />}
  >
    <Card.Meta title="TIME MANAGER" description="Small changes are often underestimated" />
  </Card>
        </Col>
      </Row>
      <br/>
      </div>
  )
}
