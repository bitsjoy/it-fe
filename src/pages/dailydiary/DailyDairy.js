import { Editor } from '@tinymce/tinymce-react';
import { Button, Calendar, Col, Modal, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import ButtonPrimary from '../../components/Button';
import { btnBackgroundColor, secondaryColor, successColor } from '../../uiConfig';
import moment from 'moment';
import axios from 'axios';
import { API_BASE } from '../../apiConfig';
import { bearer_token_key } from '../../localStorageConfig';
import { toast } from 'react-toastify';
import { DownCircleFilled, DownCircleOutlined, ForwardFilled, ForwardOutlined, MinusCircleFilled, PauseOutlined, PlayCircleFilled, PlayCircleOutlined, PlaySquareOutlined, PlaySquareTwoTone, SmileOutlined, StepForwardFilled, SyncOutlined } from '@ant-design/icons';
import { ddbgmusic, diary } from '../../assets';
import { Link } from 'react-router-dom';

export default function DailyDairy() {

  const [noDiaryErr, setNoDiaryErr] = useState(false);

  const editorRef = useRef(null);
  let noteHTMLCharacterLimit = 1000000; 
  const ndate = new Date();

  const [ savingDiary, setSavingDiary ] = useState(false);
 

  const [ date, setDate] = useState(moment(`${ndate.getFullYear()}/${ndate.getMonth()+1}/${ndate.getDate()}`).toString().split('00:00:00')[0].trim());
  const [ mainContent, setMainContent ] = useState('<p>type here ...</p>');
  const [ moodModal, setMoodModal ] = useState(false); 
  const [ moodNumber, setMoodNumber ] = useState(null); 

  const [ loadingEditor, setLoadingEditor ] = useState(true);

  useEffect(()=>{  
   
    setLoadingEditor(true);
    axios.get(API_BASE + "/api/dailydiary/getdiaryentrybydate/" + date, {
        headers: {
            Authorization: localStorage.getItem(bearer_token_key),
            'Content-Type': 'application/json'
        }
    }).then((res)=>{
        console.log(res);
        if(res.status == 200){
            setMainContent(res.data.mainContent);
            document.getElementById('mood').innerHTML = res.data.mood == 0 || res.data.mood ==  null ? 'Mood?' : res.data.mood;
            setMoodNumber(res.data.mood);
        }
        setLoadingEditor(false);
 


    }).catch((err) => {
        document.getElementById('mood').innerHTML = 'Mood?';
        setMainContent(`<div style="opacity: 0.8; color: ${secondaryColor}">${err.response.data.message} &nbsp; <span style="color:${btnBackgroundColor};">click anywhere to edit</span> ...</div>`);
        setLoadingEditor(false);
       // toast.error(err.response.data.message);
    })
  }, [date])

  const saveDiary = () => { 
    setSavingDiary(true);
    axios.post(API_BASE + "/api/dailydiary/createDiaryEntry", {
        date: date,
        mainContent: editorRef.current.getContent(),
        mood: moodNumber
    }, {
        headers: {
            Authorization: localStorage.getItem(bearer_token_key),
            'Content-Type': 'application/json'
        }
    }).then((res)=>{ 
        console.log(res);
        toast.success(res.data.message);
    setSavingDiary(false);
  
    }).catch(err => {
        toast.error(err.response.data.message);
        setSavingDiary(false);
    })
  };

  const setMood = (mood, n) => {
    document.getElementById('mood').innerHTML = mood;
    setMoodNumber(mood);
  }

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <>
     <Row>
          <Col span={24}>
            <h3 id="word_limit_reached" style={{display: 'none', backgroundColor: '#FF9494', color: 'white'}}>Word limit reached</h3>
          </Col>
        </Row>
        <Row id="op" style={{backgroundColor: ''}}>
            <Col xs={{span: 24}} md={{span: 18}} align="center">
                <div style={{width: '100%'}}> 
                <h3 align="left" style={{fontWeight:'700', background: 'linear-gradient(to left,#f2f3f4, white)', padding: '4px 4px', color: btnBackgroundColor}}>
                    <Row>
                        <Col align="left"  span={12}>{
                        
                        date.split(" ")[1] == months[ndate.getMonth()] && date.split(" ")[2] == ndate.getDate() && date.split(" ")[3] == ndate.getFullYear() ? "Today" : date
                        
                        }</Col>
                        <Col align="right"  span={12}> 
<span>
                        <sup style={{display: 'inline-block'}} id="moosic" className="bounce">&#x266b; </sup>

                        <PlaySquareOutlined title="Play music" id="playMusicButton" onClick={()=>{
                    document.getElementById("bgmusic").volume = 0.6; 

                            document.querySelector("#bgmusic").play();

                            document.querySelector('#pauseMusicButton').style.display = 'inline';
                            document.querySelector('#moosic').style.display = 'block';
                            document.querySelector('#moosic').style.paddingRight = '20px';
                            document.querySelector('#playMusicButton').style.display = 'none';
                        }} style={{color: successColor, display: 'inline'}}/>
                        &nbsp;
                        <PauseOutlined title="Pause music" id="pauseMusicButton" onClick={()=>{
                            document.querySelector("#bgmusic").pause();
                            document.querySelector('#pauseMusicButton').style.display = 'none';
                            document.querySelector('#moosic').style.display = 'inline';
                            document.querySelector('#moosic').style.paddingRight = '0px';
                            document.querySelector('#playMusicButton').style.display = 'inline';
                        }} style={{color: secondaryColor, display: 'none'}}/>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        </span>

                        <span id="mood" onClick={()=>{setMoodModal(true);}} style={{color: secondaryColor}}>Mood?</span>
                        </Col>
                        </Row>
                </h3>
            
            <div style={{display: !loadingEditor ? 'none' : 'block'}}>
                <br/>
                <br/> 
                <img src={diary} style={{width: '40%'}} />
                <br/> 
                <br/> 
                <br/> 
             <h2> <SyncOutlined spin/> &nbsp; Fething your diary!</h2>
            <br/>
 
            </div>

              <div style={{display: loadingEditor ? 'none' : 'block', marginBottom: '30vh'}}><Editor  
                  onInit={(evt, editor) => editorRef.current = editor}
                  initialValue={`${mainContent}`}
                  onChange={(e)=>{
                    if(editorRef.current.getContent().length > noteHTMLCharacterLimit){
                      document.getElementById('word_limit_reached').style.display = 'block';
                    } else {
                      document.getElementById('word_limit_reached').style.display = 'none';
                    }
                  }}
                  onLoadContent={(tinyMCE)=>{
                    // alert("FAFAFAF");
                    // background: url(https://images.pexels.com/photos/19670/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1) center;
                    // /* color: white; */ 
                    // background-size: cover;
                   document.querySelector('.tox-edit-area__iframe').style.background = `url(https://cdn.pixabay.com/photo/2017/12/03/20/31/background-2995826_1280.png) center`;
                   document.querySelector('.tox-edit-area__iframe').style.backgroundSize = 'cover';
                   //setLoadingEditor(false);

                  }} 
                  init={{  
                    init_instance_callback: function (editor){
                    // document.querySelector('.tox-statusbar__wordcount').click();
                   },
                    selector: 'textarea#full-featured',
                     plugins: 'preview link media lists checklist linkchecker emoticons',
                    tinydrive_max_image_dimension: 100,
                    mobile: {
                      plugins: 'preview link media lists checklist linkchecker emoticons images',
                    },
                    menu: {
                      tc: {
                        title: 'Comments',
                        items: 'addcomment showcomments deleteallconversations'
                      }
                    }, 
                    menubar: false,
                    toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl',
                    autosave_retention: '2m',
                     
                    image_advtab: false, 
                    importcss_append: true,
                    templates: [
                          { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
                      { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
                      { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
                    ],
                    height: 630,
                    image_caption: true,
                    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                    noneditable_noneditable_class: 'mceNonEditable',
                    toolbar_mode: 'sliding',
                    spellchecker_ignore_list: ['Ephox', 'Moxiecode'], 
                    content_style: 'body {font-weight: 300; font-size:15px;}',
                    contextmenu: 'link image imagetools table configurepermanentpen', 
                    /*
                    The following settings require more configuration than shown here.
                    For information on configuring the mentions plugin, see:
                    https://www.tiny.cloud/docs/plugins/premium/mentions/.
                    */ 
                    mentions_item_type: 'profile'
                  
                  }}
                />
              
                </div>
                
                </div>
            </Col> 
            <Col xs={{span: 24}} md={{span: 6}} align="right">
                <Row>
                  <Col xs={{span: 0}} md={{span: 24}}>  
                  <ButtonPrimary  onClick={saveDiary} styl={{width: '96%'}} text={savingDiary ? 'loading' : 'Save'}></ButtonPrimary>
<br/>
<br/>  </Col>
                </Row>
 
 
                
                {/* <h3 align="right" style={{color: secondaryColor}}>See previous diary entries<br/> 
                </h3> */}
                <div id="calendar">
                <Calendar disabledDate={(d) => d > moment(`${ndate.getFullYear()}/${ndate.getMonth()+1}/${ndate.getDate()+1}`)} 
                onPanelChange={(value)=>{setDate(value.toString().substring(0, 15));window.scrollTo(0,0);}} 
                onSelect={(value)=>{ setDate(value.toString().substring(0, 15)); window.scrollTo(0,0);}} style={{width: '100%'}} fullscreen={false} />
                <br/>
                
                <br/>
                <br/>
                <audio id="bgmusic" style={{height: '0px'}} loop>
                        <source src={ddbgmusic} type="audio/ogg" /> 
                        Your browser does not support the audio element.
                        </audio>
                </div>
            </Col>
 


{/* xs */}
            <Col xs={{span: 12}} md={{span: 0}}>
             <ButtonPrimary onClick={saveDiary} className = "bounce" styl={{position: 'fixed', bottom: '10px', right: '20px'}} text={savingDiary ? 'loading' : 'Save'}></ButtonPrimary>
            </Col>
            <Col xs={{span: 12}} md={{span: 0}}>
             <Button type="text" onClick={()=>{ document.getElementById('calendar').scrollIntoView({
  behavior: 'smooth'
}); }} style={{position: 'fixed', bottom: '10px', left: '20px'}}>Calender  <DownCircleOutlined /></Button>
            </Col>
        </Row>

        <Modal title="Mood" visible={moodModal} footer={[]} onCancel={()=>{setMoodModal(false)}}>
        <div  align="center">
            <h3>How was the day? <br/><sub>choose an emoji to record it in the diary</sub> </h3>
                        <Button title="very sad" style={{ fontSize: '25px'}} type="text" onClick={()=>{setMood('&#x1F613;', '-2'); setMoodModal(false);}}>&#x1F613;</Button>
                        
                        <Button title="not happy" style={{ fontSize: '25px'}} type="text" onClick={()=>{setMood('&#x1F615;', '-1'); setMoodModal(false);}}>&#x1F615;</Button>
                        <Button title="happy" style={{ fontSize: '25px'}} type="text" onClick={()=>{setMood('&#x1F60A;', '0'); setMoodModal(false);}}>&#x1F60A;</Button>
                        <Button title="very happy" style={{ fontSize: '25px'}} type="text" onClick={()=>{setMood('&#x1F603;', '1'); setMoodModal(false);}}>&#x1F603;</Button>
                        <Button title="Feeling blessed" style={{ fontSize: '25px'}} type="text" onClick={()=>{setMood('&#x1F607;', '2'); setMoodModal(false);}}>&#x1F607;</Button> 
        </div>
      </Modal>
    </>
  )
}
