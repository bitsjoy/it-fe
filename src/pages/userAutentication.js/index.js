import { Col, Input, Row, Button } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_BASE } from '../../apiConfig';
import ButtonPrimary from '../../components/Button'
import { bearer_token_key } from '../../localStorageConfig'; 
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import { btnBackgroundColor, secondaryColor } from '../../uiConfig';
import { dq, imgHome } from '../../assets';  
import Footer from '../../components/Footer';
import { DoubleLeftOutlined, QqOutlined } from '@ant-design/icons';

export default function UserAuthentication() {
 

 const [ date, setDate ] = useState(new Date());
  setTimeout(()=>{ 
    setDate(new Date());
  }, 60000)

  const [ authType, setAuthType ] = useState(0); // 0 = login, 1 = signup
  const [ email, setEmail ] = useState(null);
  const [ fullName, setFullName ] = useState(null);
  const [ ppImageLink, setPpimageLink ] = useState(null);
  const [ password, setPassword ] = useState(null);
  const [ confirmPassword, setConfirmPassword ] = useState(null);
  const [ loading, setLoading ] = useState(false);
 

  function handleCredentialResponse(response) {

    const credentialsObject = jwt_decode(response.credential);
    setFullName(credentialsObject.name);
    setPpimageLink(credentialsObject.picture);

    console.log( credentialsObject);

    axios.post(API_BASE + '/api/auth/doesemailexist', {
        email: credentialsObject.email
    }).then(res => {
        console.log(res + "kkkk");
        toast.error('Please login with email and password');
        setAuthType(0);
    }).catch((err) => {
        //  
    })

    setEmail(credentialsObject.email);
    setAuthType(1);
  }

  useEffect(() => {  

        {/* global google */}  
            google.accounts.id.initialize({
              client_id: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_KEY,
              callback: handleCredentialResponse
            });
            google.accounts.id.renderButton(
              document.getElementById("signinButtonDiv"),
              { theme: "outline", size: "large", text: "signup_with" }  // customization attributes
            );
            // google.accounts.id.prompt(); // also display the One Tap dialog 
 
    
  }, [])

  return (
    <> 
    <Row>
        {/* md */}
        <Col xs={{span: 0}} md={{span: 24}}>
            <div align="left" style={{padding: '20px 20px 20px 0px', border: `0px solid ${btnBackgroundColor}`, fontFamily: 'Poppins', fontWeight: '600' }}>
            {/* <h1 style={{fontFamily: 'Italianno'}}>Hello!</h1> */}
                
                <h1 style={{ color: secondaryColor }}> Software to organise and manage tasks better on a daily basis! </h1>
            </div>
        </Col>
        {/* xs */}
        <Col xs={{span: 24}} md={{span: 0}}>
            <div align="left" style={{padding: '20px 20px 20px 20px', border: `0px solid ${btnBackgroundColor}`, fontFamily: 'Poppins', fontWeight: '600' }}>
            {/* <h1 style={{color: '', fontFamily: 'Italianno'}}>Hello!</h1> */}
                
                <h2 style={{ color: secondaryColor }}>Software to organise and manage tasks better on a daily basis!</h2>
            </div>
        </Col>
    </Row> 
        <Row style={{fontFamily: 'Raleway'}}>
        <Col xs={{span: 24}} md={{span: 0}} align="center" style={{marginBottom: '0px', height: 'auto'}}>
                {/* <img src={imgHome} style={{marginRight: '0px', width :'70%', marginBottom: '0px'}} alt="Loading ..."/> */}
            <br/>
            <br/> 
            </Col>
            <Col style={{marginBottom: '150px'}} xs={{span: 24}} md={{span: 8}}>
            <br/>
                    <br/>
                <h2 align="left" style={{color: btnBackgroundColor, borderBottom: `1px solid ${btnBackgroundColor}`}}> Log in to get started</h2>
                <br/>
                {/* <div id="signinButtonDiv" style={{display: `${authType == 1 ? "block" : "none"}`}}></div> */}
              <Input value={email} disabled={ authType == 1} required='true' size='large' type="text" placeholder={ email? email : 'Email' } onChange={(e)=>{
                    setEmail(e.target.value);
                }}/>  
                <br/>
                <br/> <Input value={password} required={true} size='large' type="Password" placeholder='password' onChange={(e)=>{
                    setPassword(e.target.value);
                }}/> 
                <br/>
                <br/>
                { 
                    authType === 1 ? <div align="left"> 
                    <span style={{color: `${password === confirmPassword ? 'green': 'red'}`}}>{password === confirmPassword ? '' : 'passwords do not match'}</span>
                        
                        <Input value={confirmPassword} required='true' size='large' type="password" placeholder='Confirm password' onChange={(e)=>{
                        setConfirmPassword(e.target.value);
                    }}/>
                    
                    <br/>
 
                    </div> : null
                }    
                <div align="right">
                    <ButtonPrimary
                    size="large"
                    // disabledCondition={!(email && confirmPassword ? password === confirmPassword : password)}
                    text={`${ loading ? 'loading' : authType === 0 ? 'Log in' : 'Save and Continue'}`} onClick={()=>{
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
                    &nbsp; &nbsp; Or 
                    { authType === 1 ? <Button size="large" onClick={()=>{
                        setEmail(null);
                        setPassword(null);
                        setConfirmPassword(null);
                        setAuthType(authType === 0 ? 1 : 0);
                    }} type='link'>Log in</Button> : null
                }

                 
                <span id="signinButtonDiv" style={{display: `${authType == 0 ? 'inline-block' : 'none'}`, marginLeft: '20px', transform: 'translate(0px, 15px)'}}></span>

                </div> 
            </Col>
            <Col xs={{span: 0}} md={{span: 16}} align="center">
                {/* <img src={imgHome} style={{marginRight: '0px', width :'45%'}} alt="Loading ..."/> */}
                <div style={{width: '60%', borderRadius: '15px', borderTop: `0px solid ${btnBackgroundColor}`, borderRight: `0px solid ${btnBackgroundColor}`, padding: '30px'}}>
                    <div align="center"><img src={imgHome} style={{width: '70%'}} alt="oimgjhome" /></div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div style={{fontSize: '19px', color: '#c71585' }} align="left">
                         <img src={dq} style={{width: '50px', marginTop: '-40px'}} alt="''"/> &nbsp;
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been 
                    
                    </div>
                    <br/>
                    <h3 align="right" style={{color: 'grey'}}> 
                    - Romita Sharma</h3>
                </div>
            </Col>
        </Row> 
    </>
  )
}
