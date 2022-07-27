import { CiCircleFilled, MediumCircleFilled } from '@ant-design/icons';
import { Row, Col, Card } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { diary, noteMaker, time, writer } from '../../assets'
import { btnTextColor, secondaryColor, successColor } from '../../uiConfig';

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

  // const onclick = () => {
  //   if(window.innerHeight > window.innerWidth){
  //     for( let i = 0; i<=4 ; i++){
  //       if(i%2 == 1){
  //         document.getElementById(`home-${i}`).style.transform = 'translate(200vw, 0px)';
  //       } else {
  //         document.getElementById(`home-${i}`).style.transform = 'translate(-200vw, 0px)';
  //       }
  //     }
  //   } else {
  //     for( let i = 0; i<=4 ; i++){
  //       if(i%2 == 1){
  //         document.getElementById(`home-${i}`).style.transform = 'translate(0px, 200vh)';
  //       } else {
  //         document.getElementById(`home-${i}`).style.transform = 'translate(0px, -200vh)';
  //       }
  //     }
  //   }
   
    // document.getElementById(x).style.borderRadius = '50%';
  //}

  return (
    <div id="apps-home" style={{minHeight: '100vh'}}>
      <br/> 
        {/* <h1 style={{fontFamily: 'Italianno'}}>{date.getHours() < 12 ? <span>Good &nbsp; Morning! </span>: date.getHours() < 16 ? <span>Good &nbsp;Afternoon! </span>: <span>Good &nbsp;Evening! </span>}</h1> */}
   
<br/>
      <Row>
        <br/>
        <Col id="home-1"  xs={{span: '24'}} md={{span: '6'}} align="center"> 
        <Card
        onClick={(e)=>{
          // onclick();
          setTimeout(()=>{
            navigate('/notes')
          }, 0)
        }}
    hoverable
    style={{...CardStyle, paddingTop: '35px'}}
    cover={<img alt="note-maker" style={{width: '45%', margin: 'auto'}} src={noteMaker} />}
  >
    <Card.Meta title={<span>NOTES<br/> <sup style={{color: successColor}}> Live</sup></span>} ZZZdescription="Let us save some of your time and a lot of trees" />
  </Card>
</Col>


 


<Col id="home-2" xs={{span: '24'}} md={{span: '6'}} align="center"> 

<Card
  hoverable
  style={{...CardStyle, paddingTop: '50px'}}

  cover={<img alt="diary" style={{width: '50%', margin: 'auto'}}  src={diary} />}
>
  <Card.Meta title={<span>DAILY DIARY<br/> <sup style={{color: secondaryColor}}>coming soon</sup></span>} ZZZdescription="Story of your life, every single day is a new chapters" />
</Card>
      </Col>




      <Col id="home-3" xs={{span: '24'}} md={{span: '6'}}> 

<Card
  hoverable
  style={{...CardStyle, paddingTop: '40px'}}

  cover={<img alt="writer" style={{width: '66%', margin: 'auto'}}  src={writer} />}
>
  <Card.Meta title={<span>NEW HABIT<br/> <sup style={{color: secondaryColor}}>coming soon</sup></span>} ZZZdescription="Helps develop a new good habit or lose a bad old one!" />
</Card>
      </Col>





        <Col id="home-4" xs={{span: '24'}} md={{span: '6'}}>  
  <Card
    hoverable
    style={{...CardStyle, paddingTop: '28px'}}

    cover={<img alt="timer" style={{width: '45%', margin: 'auto'}}  src={time} />}
  >
    <Card.Meta title={<span>TIME MANAGER<br/> <sup style={{color: secondaryColor}}>coming soon</sup></span>} ZZZdescription="Small changes are often underestimated" />
  </Card>

        </Col>
      </Row>
      <br/>
      </div>
  )
}
