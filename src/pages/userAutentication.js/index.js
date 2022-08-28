import { Col, Input, Row, Carousel } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_BASE } from '../../apiConfig';
import ButtonPrimary from '../../components/Button'
import { bearer_token_key } from '../../localStorageConfig'; 
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import { btnBackgroundColor, btnTextColor, secondaryColor, successColor } from '../../uiConfig';
import { diary, dq, enter, noteMaker, time, writer } from '../../assets';
import { AndroidFilled, AndroidOutlined, AppleFilled, BookFilled, FacebookFilled, GlobalOutlined, GoogleCircleFilled, GoogleOutlined, InstagramFilled, LaptopOutlined, MobileFilled, MobileOutlined, SyncOutlined, WindowsFilled } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';

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
    window.scrollTo(0,0);

    setGoogleSignLoading(true);

    const credentialsObject = jwt_decode(response.credential);
    setFullName(credentialsObject.name);
    setPpimageLink(credentialsObject.picture);

    console.log( credentialsObject);

    axios.post(API_BASE + '/api/auth/doesemailexist', {
        email: credentialsObject.email
    }).then(res => {
        console.log(res + "kkkk");
        window.scrollTo(0,0);
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
              { theme: "filled_blue", size: "small", text: "signin", width: '80', border: 'none' }  // customization attributes
            );
            // google.accounts.id.prompt(); // also display the One Tap dialog 
 
    
  }, [])

  return (
    <> 
    <Row>
        {/* md */}
        <Col xs={{span: 0}} md={{span: 24}} style={{marginBottom: '100px', backgroundColor: 'white'}}>
            <div align="left" style={{ width: '100vw', marginTop: '-20px', zIndex: '999', position: 'fixed', border: `0px solid ${btnBackgroundColor}`, fontFamily: 'Poppins', fontWeight: '600', marginBottom: '0px' }}>
            {/* <h2 style={{fontFamily: 'Italianno'}}>Hello!</h2> */} 
                <h1 style={{ color: secondaryColor, backgroundColor: 'white', marginLeft: '-20px', paddingLeft: '20px' }}> <span style={{color: btnBackgroundColor, backgroundColor: 'white'}}>Bitsjoy, </span>software solutions for your business or personal needs.</h1>
            </div>
        </Col>
        {/* xs */}
        <Col xs={{span: 24}} md={{span: 0}}> 
            <div align="left" style={{padding: '0px 20px 20px 0px', border: `0px solid ${btnBackgroundColor}`, fontFamily: 'Poppins', fontWeight: '600' }}>
            {/* <h2 style={{color: '', fontFamily: 'Italianno'}}>Hello!</h2> */}
                
                <h2 style={{ color: secondaryColor, backgroundColor: 'white' }}><span style={{color: btnBackgroundColor, backgroundColor: 'white'}}>Bitsjoy, </span>software solutions for your business or personal needs.</h2>
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
                    <>
                <Link to="/contact_us"> <h5 align="left" style={{color: secondaryColor, marginTop: '10px'}}>Forgot password?</h5></Link>
                <br/>
                <br/>
                </>
                
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
      <h2 style={{borderBottom: `0px solid ${btnBackgroundColor}`, paddingBottom: '10px'}}>Mobile Applications</h2>
      </div>
      <div>
      <img src={diary} style={{height :'150px'}} alt="Loading ..."/>  

      <br/>
      <h2 style={{borderBottom: `0px solid ${btnBackgroundColor}`, paddingBottom: '10px'}}>Personal Website /<br/> Portfolio</h2>
      </div>
      <div>
      <img src={writer} style={{height :'150px'}} alt="Loading ..."/>  

      <br/>
      <h2 style={{borderBottom: `0px solid ${btnBackgroundColor}`, paddingBottom: '10px'}}>Digital Stock Register</h2>
      </div>
    </Carousel>
    <div align="left" style={{marginTop: '-15px', color: secondaryColor}}>
        
    </div>

            </Col>

            <Row>
                <Col xs={{span: 0}} md={{span: 24}}>
                    <div align="left" style={{marginTop: '-50px'}}>
                    <div align="left" style={{color: secondaryColor, fontWeight: '700'}}>  
                   </div> 
                       <br/>
                        <a href="#fa" onClick={(e)=>{
                            e.preventDefault();
                            document.getElementById('quotation').scrollIntoView({behavior: 'smooth'}, false);
                        }}><span style={{fontWeight: '700', borderRadius: '3px', border: `0px solid ${btnBackgroundColor}`, padding: '10px 20px', color: 'grey', marginRight: '10px'}}>Mobile Applicationss &nbsp; <AndroidFilled/> </span></a>
                        <a href="#fa" onClick={(e)=>{
                            e.preventDefault();
                            document.getElementById('quotation').scrollIntoView({behavior: 'smooth'}, false);
                        }}><span style={{fontWeight: '700', borderRadius: '3px', border: `0px solid ${btnBackgroundColor}`, padding: '10px 20px', color: 'grey', marginRight: '10px'}}>Portfolio website &nbsp; <LaptopOutlined /> <MobileOutlined /> </span></a>
                        
                        <a href="#fa" onClick={(e)=>{
                            e.preventDefault();
                            document.getElementById('quotation').scrollIntoView({behavior: 'smooth'}, false);
                        }}><span style={{fontWeight: '700', borderRadius: '3px', border: `0px solid ${btnBackgroundColor}`, padding: '10px 20px', color: 'grey', marginRight: '10px'}}>Personal utility website &nbsp; <GlobalOutlined /></span></a>
                         <br/>
                        <br/>
                        
                        <a href="#fa" onClick={(e)=>{
                            e.preventDefault();
                            document.getElementById('quotation').scrollIntoView({behavior: 'smooth'}, false);
                        }}><span style={{fontWeight: '700', borderRadius: '3px', border: `0px solid ${btnBackgroundColor}`, padding: '10px 20px', color: 'grey', marginRight: '10px'}}>Digital stock register &nbsp; <BookFilled /> </span></a>
                       
                        <a href="#fa" onClick={(e)=>{
                            e.preventDefault();
                            document.getElementById('quotation').scrollIntoView({behavior: 'smooth'}, false);
                        }}><span style={{fontWeight: '700', borderRadius: '3px', border: `0px solid ${btnBackgroundColor}`, padding: '10px 20px', color: 'grey', marginRight: '10px'}}>Marketing and Advertizing &nbsp; <InstagramFilled/> <FacebookFilled /> <GoogleOutlined/> </span></a>
                        
                        <a href="#fa" onClick={(e)=>{
                            e.preventDefault();
                            document.getElementById('quotation').scrollIntoView({behavior: 'smooth'}, false);
                        }}><span style={{fontWeight: '700', borderRadius: '3px', border: `0px solid ${btnBackgroundColor}`, padding: '10px 20px', color: 'grey', marginRight: '10px'}}>Desktop applications &nbsp; <WindowsFilled /> </span></a>
                        
                        <a href="#fa" onClick={(e)=>{
                            e.preventDefault();
                            document.getElementById('quotation').scrollIntoView({behavior: 'smooth'}, false);
                        }}><span style={{fontWeight: '700', borderRadius: '3px', border: `0px solid ${btnBackgroundColor}`, padding: '10px 20px', color: 'grey', marginRight: '10px'}} title="Search Engine Optimization">S.E.O. &nbsp; <GlobalOutlined /> </span></a> 

<span onClick={(e)=>{
                            e.preventDefault();
                            document.getElementById('quotation').scrollIntoView({behavior: 'smooth'}, false);
                        }}><span style={{fontWeight: '700', borderRadius: '3px', border: `0px solid ${btnBackgroundColor}`, padding: '10px 10px', color: 'grey', marginRight: '10px'}} title="Search Engine Optimization">and more ...</span></span>
                    </div>
                    <br/>
                    <br/> 
                    <br/> 
     
                </Col>

                <Col xs={{span: 0}} md={{span: 24}} align="center" style={{marginTop: '50px', marginLeft: '0px'}}> 
                        <div style={{ width: '100vw', paddingTop: '100px', marginLeft: '-20px', background: 'url(https://images.unsplash.com/photo-1637825891028-564f672aa42c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)', backgroundRepeat: 'no-repeat', backgroundPosition: 'right top', backgroundSize: '100%', backgroundAttachment: 'fixed'}}> 
                <div align="right" style={{background: 'white', width: '50%', color: secondaryColor, padding: '40px', borderLeft: `11px solid ${secondaryColor}`, borderRight: `0px solid ${secondaryColor}`, opacity: '1'}} className="bounc">
     <h1>Testimonials</h1>
     <br/>
     <div style={{fontSize: '19px', color: '#c71585' }}>
                         <img src={dq} style={{width: '50px', marginTop: '-10px'}} alt="''"/> &nbsp;
                         For every minute spent organizing, an hour is earned.
                         <div style={{color: 'grey', width: '100%'}} align="right"> 
                         <br/>
                    - Benjamin Franklin</div>
                    </div>
<div id="quotation"></div>

     <br/>
    
      </div>

<br/>
<br/>
<br/>
<br/>
      
     <div align="right" style={{background: 'white', width: '50%', color: btnBackgroundColor, padding: '40px 40px', borderLeft: `11px solid ${btnBackgroundColor}`, borderRight: `0px solid ${btnBackgroundColor}`, opacity: '1', background: 'linear-gradient(to right, white, white, white, white)'}} className="bounc">
    
     <h1>Tell us what you need!</h1>
     <br/>
     <h3 style={{color: 'grey'}}>Click on the button below to get quotation for your requirements.</h3>
     We reply within 24 hours 
     <br/>
     <br/>
     <span style={{padding: '10px 6px', border: `1px solid ${btnBackgroundColor}`}}>
     <ButtonPrimary className="bounce" text="Get quotation" styl={{backgroundColor: btnBackgroundColor}}></ButtonPrimary>
     </span>
     <br/>
     <br/> 
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      
          <h2 align="center" style={{fontFamily: 'Cinzel', color: 'white'}}>
            Our clients
          </h2>
          <br/>
          <Row>
            <Col align="center" style={{fontFamily: 'Cinzel', color: 'white'}} span={6}>
                <h3 style={{ border: '1px solid white', borderRadius: '4px', padding: '20px 20px', width: '80%'}}><a style={{color: 'white'}} target="client" href="https://archanadesign.com">
                    archanadesign.com <br/>
                    ( Portfolio )
                    </a></h3>
            </Col>
            <Col align="center" style={{fontFamily: 'Cinzel', color: 'white'}} span={6}>
            <h3 style={{ border: '1px solid white', borderRadius: '4px', padding: '20px 20px', width: '80%'}}><a style={{color: 'white'}} target="client" href="#">
                R.K. Minerals<br/> ( Stock Register )
                </a></h3>
            </Col>
            <Col align="center" style={{fontFamily: 'Cinzel', color: 'white'}} span={6}>
            <h3 style={{ border: '1px solid white', borderRadius: '4px', padding: '20px 20px', width: '80%'}}><a style={{color: 'white'}} target="client" href="https://alicebanting.com">
                alicebanting.com<br/>
               ( Professional Website )
                </a></h3>
            </Col>
            
            <Col align="center" style={{fontFamily: 'Cinzel', color: 'white'}} span={6}>
            <h3 style={{ border: '1px solid white', borderRadius: '4px', padding: '20px 20px', width: '80%'}}><a style={{color: 'white'}} target="client" href="www.alicebanting.com">
                R.K. Minerals<br/> ( Stock Register )
                </a></h3>
            </Col>
          </Row>
          <br/>
          <br/>
           
          </div> 
    
      </Col> 
 
   

      <Col xs={{span: 24}} md={{span: 0}} align="center" style={{marginTop: '-50px', paddingTop: '100px'}}> 
 <div style={{width: '100vw', marginLeft: '-20px', background: 'url(https://images.unsplash.com/photo-1637825891028-564f672aa42c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'}}>
      <div align="center" style={{border: '0px solid grey', width: '100%', color: 'white', padding: '0px 30px', borderLeft: `0px solid ${btnBackgroundColor}`, borderRight: `0px solid ${btnBackgroundColor}`, opacity: '1'}} className="bounc">
     <br/>
     <br/>
    
     <h2 style={{color: 'white'}}>Tell us what you need!</h2>
     <br/>
     <h3 style={{color: 'silver'}}>Click on the button below to get quotation for your requirements.</h3>
     <br/> 
     We reply with in 24 hours 
     <br/>
     <br/>
     <span style={{padding: '10px 5px', border: `1px solid ${btnBackgroundColor}`}}>
     <ButtonPrimary className="bounce" text="Get quotation" styl={{backgroundColor: btnBackgroundColor}}></ButtonPrimary>
     </span>
     <br/>
     <br/>
     <br/>
      </div> 
      <br/>
      <br/>
      <h3 align="center" style={{fontFamily: 'Cinzel', color: 'white'}}>
            Our clients
          </h3>
      <br/>
      <Row>
            <Col align="center" style={{fontFamily: 'Cinzel', color: 'white'}} span={24}>
                <h3 align="left" style={{ borderLeft: '0px solid white', padding: '20px 20px', width: '70%'}}><a style={{color: 'white'}} target="client" href="https://archanadesign.com">
                    archanadesign . com <br/>
                    ( Portfolio )
                    </a></h3>
            </Col>
            <Col align="center" style={{fontFamily: 'Cinzel', color: 'white'}} span={24}>
            <h3 align="right" style={{ borderRight: '0px solid white', padding: '20px 20px', width: '70%'}}><a style={{color: 'white'}} target="client" href="#">
                R.K. Minerals<br/> ( Stock Register )
                </a></h3>
            </Col>
            <Col align="center" style={{fontFamily: 'Cinzel', color: 'white'}} span={24}>
            <h3 align="left" style={{ borderLeft: '0px solid white', padding: '20px 20px', width: '70%'}}><a style={{color: 'white'}} target="client" href="https://alicebanting.com">
                alicebanting . com<br/>
               ( Professional Website )
                </a></h3>
            </Col>
            
            <Col align="center" style={{fontFamily: 'Cinzel', color: 'white'}} span={24}>
            <h3 align="right" style={{ borderRight: '0px solid white', padding: '20px 20px', width: '70%'}}><a style={{color: 'white'}} target="client" href="www.alicebanting.com">
                R.K. Minerals<br/> ( Stock Register )
                </a></h3>
            </Col>
            <Col align="center" style={{fontFamily: 'Cinzel', color: 'white'}} span={24}>
            <div align="left" style={{width: '70%', padding: '20px'}}>and counting . . .</div>
            </Col>
          </Row>
          <br/>
          <br/>
      </div>
    
      </Col> 
      </Row>


 

            </Col> 
            {/* <div align="left" style={{padding: '0px', width: '270px', color: btnBackgroundColor}}>Sign in or create an account</div>

            <div>
                <img src={enter} style={{width: '150px', display: 'inline'}} alt="enter" />
                <br/>
                <br/> */}
                <span id="signinButtonDiv" style={{display: 'block', borderRadius: '0px', position: 'fixed', top: '16px', right: '95px', zIndex: '9999', background: 'blue'}}></span>
            
 

                {/* <img src={imgHome} style={{marginRight: '0px', width :'45%'}} alt="Loading ..."/> */}
                 
            </Row> 
  
            <Row>
        <Col xs={{span: 24}} md={{span: 24}} align="center"  style={{fontFamily: 'Cinzel', color: 'dimgrey'}}>
             <br/>
             <br/>
          <h2 style={{color: 'dimgrey'}}>
            Bitsjoy
          </h2>
          <div style={{marginTop: '-20px', fontSize: '12px'}}>Simplicity with precision</div>
<br/>
<br/>
<br/>
        </Col>
      </Row> 
    </>
  )
}
