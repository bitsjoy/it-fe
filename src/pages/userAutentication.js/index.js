import { Col, Input, Row, Carousel } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_BASE } from '../../apiConfig';
import ButtonPrimary from '../../components/Button'
import { bearer_token_key } from '../../localStorageConfig'; 
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import { btnBackgroundColor, secondaryColor, successColor } from '../../uiConfig';
import { diary, dq, enter, noteMaker, time, writer } from '../../assets';
import { SyncOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default function UserAuthentication() {
 

 const [ setDate ] = useState(new Date());
  setTimeout(()=>{ 
    setDate(new Date());
  }, 60000)

  const [ authType, setAuthType ] = useState(null); // 0 = login, 1 = signup
  const [ email, setEmail ] = useState(null);
  const [ fullName, setFullName ] = useState(null);
  const [ ppImageLink, setPpimageLink ] = useState(null);
  const [ password, setPassword ] = useState(null);
  const [ confirmPassword, setConfirmPassword ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  const [ googleSignLoading, setGoogleSignLoading ] = useState(false);
 

  function handleCredentialResponse(response) {
    setGoogleSignLoading(true);

    const credentialsObject = jwt_decode(response.credential);
    setFullName(credentialsObject.name);
    setPpimageLink(credentialsObject.picture);

    console.log( credentialsObject);

    axios.post(API_BASE + '/api/auth/doesemailexist', {
        email: credentialsObject.email
    }).then(res => {
        console.log(res + "kkkk");
       // toast.error('Please login with email and password');
        setEmail(credentialsObject.email);
        setAuthType(0);
        setGoogleSignLoading(false);
    }).catch((err) => {
        setEmail(credentialsObject.email);
        setAuthType(1);
        setGoogleSignLoading(false);
    })

  
  }

  useEffect(() => {  

        {/* global google */}  
        
            google.accounts.id.initialize({
              client_id: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_KEY,
              callback: handleCredentialResponse
            });
            google.accounts.id.renderButton(
              document.getElementById("signinButtonDiv"),
              { theme: "outlined", size: "large", text: "signin_with", width: '270', border: 'none' }  // customization attributes
            );
            // google.accounts.id.prompt(); // also display the One Tap dialog 
 
    
  }, [])

  return (
    <> 
    <Row>
        {/* md */}
        <Col xs={{span: 0}} md={{span: 24}} style={{marginBottom: '100px'}}>
            <div align="left" style={{ width: '100vw', marginTop: '-20px', backgroundColor: 'white', zIndex: '999', position: 'fixed', border: `0px solid ${btnBackgroundColor}`, fontFamily: 'Poppins', fontWeight: '600' }}>
            {/* <h1 style={{fontFamily: 'Italianno'}}>Hello!</h1> */}
                
                <h1 style={{ color: secondaryColor }}> <span style={{color: btnBackgroundColor}}>Bitsjoy, </span>a way for organising life better</h1>
            </div>
        </Col>
        {/* xs */}
        <Col xs={{span: 24}} md={{span: 0}}>
            <div align="left" style={{padding: '0px 20px 20px 0px', border: `0px solid ${btnBackgroundColor}`, fontFamily: 'Poppins', fontWeight: '600' }}>
            {/* <h1 style={{color: '', fontFamily: 'Italianno'}}>Hello!</h1> */}
                
                <h2 style={{ color: secondaryColor }}><span style={{color: btnBackgroundColor}}>Bitsjoy, </span>a way for organising life better</h2>
            </div>
        </Col>
    </Row> 
        <Row style={{fontFamily: 'Raleway'}}>
      
            <Col style={{marginBottom: '0px'}} xs={{span: 24}} md={{span: 24}} align="center">
            
{ authType === null ? googleSignLoading ? <div><br/><SyncOutlined style={{fontSize: '30px'}} spin /><br/><br/><br/><br/><br/></div> : null  : 
<div style={{width: '600px'}}>
           
                    { authType === 1 ? 
                                    <h3 align="left" className="bounce" style={{color: btnBackgroundColor, borderBottom: `0px solid ${btnBackgroundColor}`}}>You are new here, please set up a password </h3> : null
                    
                }
                { authType === 0 ? 
                                    <h4 align="left" className="bounce" style={{color: btnBackgroundColor, borderBottom: `0px solid ${btnBackgroundColor}`}}> Please enter password to Log in </h4>
                                    : null
                    
                }
                 

                {/* <div id="signinButtonDiv" style={{display: `${authType == 1 ? "block" : "none"}`}}></div> */}
             { authType == 1 ? <span><Input value={email} disabled={ authType == 1} required='true' size='large' type="text" placeholder={ email? email : 'Email' } onChange={(e)=>{
                    setEmail(e.target.value);
                }}/><br/> </span> : null } 
                
                 <Input autoComplete='off' value={password} required={true} size='large' type="Password" placeholder='password' onChange={(e)=>{
                    setPassword(e.target.value);
                }}/>  
                <br/> 
                { 
                    authType === 1 ? <div align="left"> 
                    <span style={{color: `${password === confirmPassword ? 'green': 'red'}`}}>{password === confirmPassword ? '' : 'passwords do not match'}</span>
                  
                        <Input  autoComplete='off' value={confirmPassword} required='true' size='large' type="password" placeholder='Confirm password' onChange={(e)=>{
                        setConfirmPassword(e.target.value);
                    }}/>
                    
                    <br/>
 
                    </div> : null
                }    
                <div align="left">
                    <ButtonPrimary
                    size="medium"
                    // disabledCondition={!(email && confirmPassword ? password === confirmPassword : password)}
                    text={`${ loading ? 'loading' : authType === 0 ? 'Log in' : 'Sign up'}`} onClick={()=>{
                        if(email == null || password == null){
                            toast.error('Username and Password combination is either wrong or empty');
                        } else {
                        setLoading(true);
                        if(authType === 0){
                            axios.post( API_BASE + "/api/auth/login",
                            {
                                "email": email,
                                "password": password
                            }).then(res => { 
                                console.log(res.data); 
                                if(res.data.token){
                                localStorage.setItem(bearer_token_key, res.data.token);
                                localStorage.setItem("bitsjoy_email", res.data.email);
                                localStorage.setItem("bitsjoy_name", res.data.fullName);
                                localStorage.setItem("bitsjoy_pp_image", res.data.ppImageLink);
                                localStorage.setItem("bitsjoy_userId", res.data.userId);
                               window.location.reload();
                                } else {
                                toast.error("something went wrong!");
                                }
                        setLoading(false);
                            }).catch(err => {
                                toast.error(err);
                        setLoading(false);
                            })
                        } else if(authType === 1) {
                            axios.post( API_BASE + "/api/auth/signup",
                            {
                                "email": email,
                                "password": password,
                                "fullName": fullName,
                                "ppImageLink": ppImageLink

                            }).then(res => { 
                                // console.log(res);
                                localStorage.setItem(bearer_token_key, res.data.token);
                                localStorage.setItem("bitsjoy_email", res.data.email);
                                localStorage.setItem("bitsjoy_name", res.data.fullName);
                                localStorage.setItem("bitsjoy_pp_image", res.data.ppImageLink);
                                localStorage.setItem("bitsjoy_userId", res.data.userId);
                        setLoading(false);

                            }).then(()=>{
                               // history('/onboarding');
                               window.location.reload();
                            }).catch(err => {
                                toast.error(err);
                        setLoading(false);

                            })
                        }
                    }
                    }}/>   
                    <br/>
                    {authType == 0 && 
                <Link to="/contact_us"> <h5 align="left" style={{color: secondaryColor, marginTop: '10px'}}>Forgot password?</h5></Link>
            }
                    {/* { authType === 1 ? <Button size="large" onClick={()=>{
                        setEmail(null);
                        setPassword(null);
                        setConfirmPassword(null);
                        setAuthType(authType === 0 ? 1 : 0);
                    }} type='link'>Log in</Button> : null
                } */}

                 

                </div>  
                </div>} 
{/* <h3 style={{fontWeight: '700', color: 'silver'}}>Products</h3>  */}
<br/> 
<Col xs={{span: 24}} md={{span: 0}} align="center">
                {/* <img src={imgHome} style={{width :'90%', marginTop: '-30px'}} alt="Loading ..."/>   */}
                <Carousel afterChange={()=>{}} autoplay={true} effect="fade" speed={600} pauseOnHover={false} dots={false}>
                <div>
      <img src={noteMaker} style={{height :'150px'}} alt="Loading ..."/>  
      <br/>
      <h1 style={{borderBottom: `1px solid ${btnBackgroundColor}`, paddingBottom: '10px'}}>Note Maker</h1>
      </div>
      <div>
      <img src={diary} style={{height :'150px'}} alt="Loading ..."/>  

      <br/>
      <h1 style={{borderBottom: `1px solid ${btnBackgroundColor}`, paddingBottom: '10px'}}>Daily Diary</h1>
      </div>
      <div>
      <img src={writer} style={{height :'150px'}} alt="Loading ..."/>  

      <br/>
      <h1 style={{borderBottom: `1px solid ${btnBackgroundColor}`, paddingBottom: '10px'}}>Habit Tracker</h1>
      </div>
      <div>
      <img src={time} style={{height :'150px'}} alt="Loading ..."/>  

      <br/>
      <h1 style={{borderBottom: `1px solid ${btnBackgroundColor}`, paddingBottom: '10px'}}>Time Manager</h1>
      </div>
    </Carousel>
    <div align="left" style={{marginTop: '-15px', color: secondaryColor}}>
    Our products are <span style={{color: successColor}}>free to use</span>
        
    </div>

            </Col>
<Col xs={{span: 0}} md={{span: 24}} align="center" style={{marginBottom: '0px', height: 'auto'}}>
<div align="center" style={{width: '38%'}}>
    
<Carousel afterChange={()=>{}} autoplay={true} effect="fade" speed={600} pauseOnHover={false} dots={false}>
      <div>
      <img src={noteMaker} style={{height :'230px'}} alt="Loading ..."/>  
      <br/>
      <br/>
      <h1 style={{borderBottom: `1px solid ${btnBackgroundColor}`, width: '80%', paddingBottom: '10px'}}>Note Maker</h1>
      
      </div>
      <div>
      <img src={diary} style={{height :'230px'}} alt="Loading ..."/>  
      <br/>

      <br/>
      <h1 style={{borderBottom: `1px solid ${btnBackgroundColor}`, width: '80%', paddingBottom: '10px'}}>Daily Diary</h1>
      </div>
      <div>
      <img src={writer} style={{height :'230px'}} alt="Loading ..."/>  
      <br/>

      <br/>
      <h1 style={{borderBottom: `1px solid ${btnBackgroundColor}`, width: '80%', paddingBottom: '10px'}}>Habit Tracker</h1>
      </div>
      <div>
      <img src={time} style={{height :'230px'}} alt="Loading ..."/>  
      <br/>

      <br/>
      <h1 style={{borderBottom: `1px solid ${btnBackgroundColor}`, width: '80%', paddingBottom: '10px'}}>Time Manager</h1>
      </div>
    </Carousel>
    <div align="left" style={{marginTop: '-15px', color: secondaryColor, width: '80%', fontWeight: '700'}}> 
    Our products are <span style={{color: successColor}}>free to use</span>
    </div>
    </div>
            </Col>
                    
           
            </Col>
            <Col xs={{span: 24}} md={{span: 24}} align="center">
            <br/> 
            {/* <div align="left" style={{padding: '0px', width: '270px', color: btnBackgroundColor}}>Sign in or create an account</div>

            <div>
                <img src={enter} style={{width: '150px', display: 'inline'}} alt="enter" />
                <br/>
                <br/> */}
                <br/>
                <br/>

                <span  id="signinButtonDiv" style={{display: 'inline', padding: '0px', width: '270px', border: '0px solid silver', borderRadius: '4px'}}></span>
            

                <br/>
                <br/>
                <br/>   <br/>
                <br/> 
                {/* <img src={imgHome} style={{marginRight: '0px', width :'45%'}} alt="Loading ..."/> */}
                <div style={{width: '90%', borderRadius: '15px', borderTop: `0px solid ${btnBackgroundColor}`, borderRight: `0px solid ${btnBackgroundColor}`, padding: '0px'}}>
                    <div style={{fontSize: '19px', color: '#c71585' }} align="center">
                         <img src={dq} style={{width: '50px', marginTop: '-40px'}} alt="''"/> &nbsp;
                         For every minute spent organizing, an hour is earned. &nbsp; &nbsp; &nbsp;
                         <span style={{color: 'grey'}}> 
                    - Benjamin Franklin</span>
                    </div>
                </div>
            </Col>
            </Row> 
<Row>
            <Col xs={{span: 24}} md={{span: 24}} align="center">
            <br/>
                <br/>
                <br/>
                <br/>
              


                
            </Col>
            </Row>
            <br/>
            <Row>
        <Col span={24} align="center"  style={{fontFamily: 'Cinzel', color: 'dimgrey'}}>
          <h1 style={{color: 'dimgrey'}}>
            Bitsjoy
          </h1>
          <div style={{marginTop: '-20px', fontSize: '12px'}}>Simplicity with precision</div>

        </Col>
      </Row>
      <br/>
      <br/>
      <br/>
      <br/>
    </>
  )
}
