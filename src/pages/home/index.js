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
    <div id="apps-home" style={{}}>

    
      <br/>

        {/* <h1 style={{fontFamily: 'Italianno'}}>{date.getHours() < 12 ? <span>Good &nbsp; Morning! </span>: date.getHours() < 16 ? <span>Good &nbsp;Afternoon! </span>: <span>Good &nbsp;Evening! </span>}</h1> */}
   
<br/>  
<br/>  
        Oops! Something went wrong.
        <br/> 
        <br/> 
        contact us at <b>support@bitsjoy.com </b>
     
      </div>
  )
}
