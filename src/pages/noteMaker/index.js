import { Col, Row, Collapse, Button, Input, Modal } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Viewer from './viewer';
import { Editor } from '@tinymce/tinymce-react';
import ButtonPrimary from '../../components/Button';
import {  DeleteOutlined, EditOutlined, LoadingOutlined, PlusCircleOutlined, ShareAltOutlined, StepBackwardOutlined, SyncOutlined } from '@ant-design/icons';
import { API_BASE } from '../../apiConfig';
import { bearer_token_key } from './../../localStorageConfig';
import { toast, ToastContainer } from 'react-toastify';
import { noteMaker } from '../../assets';
import { btnBackgroundColor, secondaryColor } from '../../uiConfig';
import Fee from './fee';


export default function NoteMaker() { 
 
  let noteHTMLCharacterLimit = 1000000;

  const [currentBookEditable, setCurrentBookEditable ] = useState(true);

  const [ sharing, setSharing ] = useState(false);
  const [share, setShare ] = useState(false); 
  const [shareWithEmail, setShareWithEmail ] = useState("");
 
  const [ currentNoteId, setCurrentNoteId] = useState(null);
  const [ currentNoteTitle, setCurrentNoteTitle] = useState(null);
  const [ currentBook, setCurrentBook] = useState(null);
  const [ currentNoteBody, setCurrentNoteBody] = useState("<p>No content, edit note to add content</p>");

  const [ edit, setEdit ] = useState(false);
  const [notes, setNotes ] = useState(null);
  const [ newNoteWindow, setNewNoteWindow ] = useState(false);

  const [ loadingNoteBody, setLoadingNoteBody ] = useState(false);
  const [ savingNoteProcess, setSavingNoteProcess ] = useState(false);
  const [ updatingNoteProcess, setUpdatingNoteProcess ] = useState(false);
  const [ deleteNoteProcess, setDeleteNoteProcess ] = useState(false);
  const [ editorLoaded, setEditorLoaded ] = useState(false);

  const [ userHasAccess, setUserHasAccess ] = useState(null);

  const editorRef = useRef(null);

  

  useEffect(() => { 
    const script = document.createElement('script');
    
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.async = true;
    script.setAttribute('data-payment_button_id' , "pl_JxBuBqoSa0PGbf");
 

    if(document.getElementById('rz_form')) document.getElementById('rz_form').appendChild(script); 


    return () => { 

    }
  }, [userHasAccess]);

  
     

  useEffect(() => {
    axios.post(API_BASE + '/api/user/getUserOwnedProducts', {
      email: localStorage.getItem('bitsjoy_email'),
      // paymentId: "pay_JxGlP9laUhy2wW",
      // product: "Notes"
  },{ 
    headers : {
    'Authorization' : localStorage.getItem(bearer_token_key),
    'Content-Type': 'application/json'
}}).then(res => {
  console.log(res);
      if(res.data.ownedProducts.includes("Notes")){
        setUserHasAccess(true);
 // window.location.reload();

      } else {
        setUserHasAccess(false);
      }
}).catch((err) => {
  toast.error(err.response.data.message);
})
  }, [])

  

  useEffect(()=>{
    //alert("1");
    if(notes == null){
    axios.post(API_BASE + '/api/user/getUserNotes', {
        email: localStorage.getItem('bitsjoy_email')
    }, { 
        headers : {
        'Authorization' : localStorage.getItem(bearer_token_key),
        'Content-Type': 'application/json'
    }}).then(res => {
        
        setNotes(Object.keys(res.data.notes)
        .sort()
        .reduce((accumulator, key) => {
          accumulator[key] = res.data.notes[key];
      
          return accumulator;
        }, {}));
        console.log(res.data);
    }).catch((err) => {
        toast.error(err.message);
    })
}
  }, [])


  useEffect(()=>{ 
    if(currentNoteId != null && currentNoteId != ""){
    setLoadingNoteBody(true);
    console.log(currentNoteId);
    axios.post(API_BASE + '/api/notes/getNote', {
        noteId: currentNoteId,
        idOfAccessor: localStorage.getItem('bitsjoy_userId')
    },{
        headers : {
            'Authorization' : localStorage.getItem(bearer_token_key),
            'Content-Type': 'application/json'
        }
    }).then((res)=>{
      console.log(res.data);
        setCurrentNoteBody(res.data.body);
    setLoadingNoteBody(false);

      //  alert(res.data.body);
    }).catch((err)=>{
    toast.error(err.response.data.message);
    setLoadingNoteBody(false);

    })}
  }, [currentNoteId])

  const closeViewer = () => {
    setCurrentNoteId(null);
  }


  const saveNote = () => {
    // console.log(editorRef.current.getContent().length);
    if(editorRef.current.getContent().length > noteHTMLCharacterLimit){
      toast.error("Reduce content of the file");
      document.getElementById('word_limit_reached').style.display = 'block';

    } else {

    if(currentBook == null || currentNoteTitle == null){
      toast.error("collection-name and note-title are empty");
    } else {
    console.log(editorRef.current.getContent());
    setSavingNoteProcess(true);
    const date = new Date();
    if (editorRef.current) {
      console.log(editorRef.current.getContent());

      axios.post(API_BASE + '/api/notes/createNote', { 
        "dateUpdated": date,
        "dateCreated": date,
        "title": currentNoteTitle,
        "body": editorRef.current.getContent() == "" ? "<i>No content, edit note to add content</i>": editorRef.current.getContent(),
        "author": {
            id: localStorage.getItem('bitsjoy_userId'),
            fullName: localStorage.getItem('bitsjoy_name'),
            ppImageLink: localStorage.getItem('bitsjoy_ppImageLink'),
        },
        "accessibleTo": [localStorage.getItem('bitsjoy_userId')],
        "bookTitle": currentBook, 
      },
      {
        headers : {
            'Authorization' : localStorage.getItem(bearer_token_key),
            'Content-Type': 'application/json'
        }
      }).then((res)=>{
        console.log(res);
        toast.success('Collection updated')
       // window.location.reload(); // also resets the state variables
    setSavingNoteProcess(false);
      }).catch(err => {   
        toast.error(err.response.data.message);
    setSavingNoteProcess(false);

      })
    }
  }
}
  };


  const updateNote = () => {
     console.log(editorRef.current.getContent().length);

    if(editorRef.current.getContent().length > noteHTMLCharacterLimit){
      toast.error("Reduce content of the file");
      document.getElementById('word_limit_reached').style.display = 'block';

    } else {
    if(currentBook == null || currentNoteTitle == null){
      alert("Note-title is empty");
    } else {
    setUpdatingNoteProcess(true);
    const date = new Date();
    if (editorRef.current) {
      console.log(editorRef.current.getContent());

      axios.put(API_BASE + '/api/notes/updateNote', { 
        "dateUpdated": date,
        "title": currentNoteTitle,
        "noteBody": editorRef.current.getContent() == "" ? "<i>No content, edit note to add content</i>": editorRef.current.getContent(),
        "authorId": localStorage.getItem('bitsjoy_userId'),
        "accessibleTo": [localStorage.getItem('bitsjoy_userId')],
        "bookTitle": currentBook,
        "noteId": currentNoteId
      },
      {
        headers : {
            'Authorization' : localStorage.getItem(bearer_token_key),
            'Content-Type': 'application/json'
        }
      }).then((res)=>{
        console.log(res);
        toast.success("Note updated");
    setUpdatingNoteProcess(false);
      }).catch(err => {  
        toast.error(err.data.response.message);
    setUpdatingNoteProcess(false);

      })
    }
  }}
  };
 

  return ( 
    <>
     <Row>
          <Col span={24}>
            <h3 id="word_limit_reached" style={{display: 'none', backgroundColor: '#FF9494', color: 'white'}}>Word limit reached</h3>
          </Col>
        </Row>
    {
      userHasAccess === true ?  
      <Row id="lp" align="center">
       
        <Col xs={{span: 24}} md={{span: 18}}>
            {
                edit && <div align="left">
                {currentBookEditable && <> Collection Name: <Input id="collectionName" type="text" value={currentBook} onChange={(e)=>{
                   
                   let val = e.target.value.toString().toLowerCase().replace(/\b(\w)/g, x => x.toUpperCase());
                   setCurrentBook(val.trim() == "" ? null : val);
               }} style={{fontWeight: '700', textTransform: 'capitalize'}} />    <br/>
               <br/></> }
             
               {!currentBookEditable && <span style={{borderBottom: `1px solid ${btnBackgroundColor}`}}> {currentBook}    <br/>
              <br/></span> }
                    Note Title:
                <Input required type="text" value={currentNoteTitle} onChange={(e)=>{
                    setCurrentNoteTitle(e.target.value.trim() == "" ? null : e.target.value);
               }} style={{fontWeight: '700'}} />
                <br/> 
                <ShareAltOutlined onClick={()=>{setShare(true)}} style={{fontSize: '22px'}} />
                <br/> 
                <br/> 
                { !editorLoaded && <><SyncOutlined spin />&nbsp; &nbsp; Loading editor ...<br/><br/></>}
                <Editor  
                  onInit={(evt, editor) => editorRef.current = editor}
                  initialValue={currentNoteBody}
                  onChange={(e)=>{
                    console.log(noteHTMLCharacterLimit);
                    if(editorRef.current.getContent().length > noteHTMLCharacterLimit){
                      document.getElementById('word_limit_reached').style.display = 'block';
                    } else {
                      document.getElementById('word_limit_reached').style.display = 'none';
                    }
                  }}
                  onLoadContent={()=>{
                   // alert("FAFAFAF");
                    setEditorLoaded(true);
                  }} 
                  init={{  
                    init_instance_callback: function (editor) {
                      document.querySelector('.tox-statusbar__wordcount').click();
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
                    autosave_ask_before_unload: true,  
                    autosave_restore_when_empty: false,
                    autosave_retention: '2m',
                     
                    image_advtab: false, 
                    importcss_append: true,
                    templates: [
                          { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
                      { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
                      { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
                    ],
                    height: 500,
                    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
                    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]', 
                    image_caption: true,
                    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                    noneditable_noneditable_class: 'mceNonEditable',
                    toolbar_mode: 'sliding',
                    spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
                    tinycomments_mode: 'embedded',
                    content_style: 'body {font-weight: 300; font-size:14px;}',
                    contextmenu: 'link image imagetools table configurepermanentpen',
                    a11y_advanced_options: true, 
                    /*
                    The following settings require more configuration than shown here.
                    For information on configuring the mentions plugin, see:
                    https://www.tiny.cloud/docs/plugins/premium/mentions/.
                    */ 
                    mentions_item_type: 'profile'
                  
                  }}
                />  
              </div>
            }


            {
                newNoteWindow && <div align="left">
                {currentBookEditable && <> Collection Name: <Input id="collectionName" type="text" value={currentBook} onChange={(e)=>{
                   
                    let val = e.target.value.toString().toLowerCase().replace(/\b(\w)/g, x => x.toUpperCase());
                    setCurrentBook(val.trim() == "" ? null : val);
                }} style={{fontWeight: '700', textTransform: 'capitalize'}} />    <br/>
                <br/></> }
              
                {!currentBookEditable && <span style={{borderBottom: `1px solid ${btnBackgroundColor}`}}> Adding note to {currentBook}    <br/>
               <br/></span> }
                
                Note Title : <Input type="text" value={currentNoteTitle} onChange={(e)=>{
                    let val = e.target.value.toString().toLowerCase().replace(/\b(\w)/g, x => x.toUpperCase());
                    setCurrentNoteTitle(val.trim() == "" ? null : val);
                }} style={{fontWeight: '700', textTransform: 'capitalize'}} />
                <br/>
                <br/>
                { !editorLoaded && <><SyncOutlined spin />&nbsp; &nbsp; Loading editor ...<br/><br/></>}
                <Editor  
                  onInit={(evt, editor) => editorRef.current = editor}
                  initialValue={currentNoteBody}
                  onChange={(e)=>{
                    console.log(noteHTMLCharacterLimit);
                    if(editorRef.current.getContent().length > noteHTMLCharacterLimit){
                      document.getElementById('word_limit_reached').style.display = 'block';
                    } else {
                      document.getElementById('word_limit_reached').style.display = 'none';
                    }
                  }}
                  onLoadContent={()=>{
                    // alert("FAFAFAF");
                     setEditorLoaded(true);
                   }}
                   init={{ 
                    init_instance_callback: function (editor) {
                      document.querySelector('.tox-statusbar__wordcount').click();   
                   },
                    selector: 'textarea#full-featured',
                    plugins: 'preview link media lists checklist linkchecker emoticons',
                    tinydrive_token_provider: 'URL_TO_YOUR_TOKEN_PROVIDER',
                    tinydrive_dropbox_app_key: 'YOUR_DROPBOX_APP_KEY',
                    tinydrive_google_drive_key: 'YOUR_GOOGLE_DRIVE_KEY',
                    tinydrive_google_drive_client_id: 'YOUR_GOOGLE_DRIVE_CLIENT_ID',
                    tinydrive_max_image_dimension: 100,

                    mobile: {
                      plugins: 'preview link media lists checklist linkchecker emoticons',
                    },
                    menu: {
                      tc: {
                        title: 'Comments',
                        items: 'addcomment showcomments deleteallconversations'
                      }
                    }, 
                    height: 500,

                    menubar: false,
                    toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
                    autosave_ask_before_unload: true,  
                    autosave_restore_when_empty: false,
                    autosave_retention: '2m',
                    image_advtab: true,  
                    importcss_append: true,
                    templates: [
                          { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
                      { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
                      { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
                    ],
                    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
                    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]', 
                    image_caption: true,
                    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                    noneditable_noneditable_class: 'mceNonEditable',
                    toolbar_mode: 'sliding',
                    spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
                    tinycomments_mode: 'embedded',
                    content_style: 'body {font-weight: 300; font-size:14px;}',
                    contextmenu: 'link image imagetools table configurepermanentpen',
                    a11y_advanced_options: true, 
                    /*
                    The following settings require more configuration than shown here.
                    For information on configuring the mentions plugin, see:
                    https://www.tiny.cloud/docs/plugins/premium/mentions/.
                    */ 
                    mentions_item_type: 'profile',
                  }}
                />  
              </div> 
            }

            {
                !edit && currentNoteId && <><Viewer close={closeViewer} loading={loadingNoteBody} rawHtmlBody={currentNoteBody} noteId={currentNoteId} title={currentNoteTitle} bookTitle={currentBook}/></>
            }
            {
                !currentNoteId && currentNoteId != "" && <div align="center" style={{paddingTop: '20px'}}>
                  <br/><br/>
                <img id="notes-hero" src={noteMaker} style={{width: '45%', border: '0px solid black'}} alt="noteMaker" />
                 
                </div>
            }
             
        </Col>










        
        <Col style={{overflowY: 'auto', height: '75vh'}} xs={{span: 0}} md={{span: 6}} align="center">
        {
                !currentNoteId && currentNoteId != "" && <div align="left" style={{paddingTop: '20px', overflowX: 'hidden'}}>
                
                <ButtonPrimary styl={{fontSize: '15px', width: '100%'}} className="bounce" id="new-collection" text={<span> <PlusCircleOutlined /> New collection </span>} onClick={(e)=>{ 
                  // document.getElementById("new-collection").style.transform = 'translate(1000px, 0px)';
                  document.getElementById("notes-hero").style.transform = 'translate(0px, -1000px)';
                  setTimeout(()=>{
                    setCurrentBook(null); setNewNoteWindow(true); setCurrentNoteId(""); setCurrentNoteTitle('Sample note title'); setCurrentNoteBody("<p>This is the first note of this collection, you can delete it later"); 

                  }, 500);
    }}></ButtonPrimary> 
    <br/>
    <br/>
    <br/>
    <br/>
    </div>
            }
            
        {!edit && !newNoteWindow && 
        <div align="left">
          {/* <h3 style={{color: btnBackgroundColor}} align="left">{Object.keys(notes? notes : {}).length !== 0 ? "Collections" : "Collections will be shown here"}</h3>  */}
         
        <Collapse style={{fontWeight: '700', width: 'auto',  border: '0px', display: 'inline'}} defaultActiveKey={['0']} onChange={()=>{}} align="left">
            {
                notes ? Object.keys(notes).length !== 0 ? Object.keys(notes).map((Key, i) => {
                    return notes[Key].find(x => x.deleted !== true) ? <Collapse.Panel style={{border: `0px solid silver`, borderBottom: '0px'}} header={Key} key={i}>
                        <div align="left">
        <Button type="link" style={{border: `0px solid ${btnBackgroundColor}`, color: 'black'}} onClick={()=>{setNewNoteWindow(true); setCurrentNoteId(""); setCurrentBook(Key); setCurrentNoteTitle('type here'); setCurrentBookEditable(false); setCurrentNoteBody('<p>Sample text for new note, click to edit </p>')}}><span> 
            <span onMouseOver={()=>{
           // document.getElementById('addMoreNotes').style.display = 'inline';
        }}
        onMouseOut={()=>{
           // document.getElementById('addMoreNotes').style.display = 'none';
        }}
        ><PlusCircleOutlined /> Add more to {Key}</span> &nbsp; </span></Button>
<br/> 
                        {
                            notes[Key].map(note => {
                                return    <> 
                                <Button align="left" title={note.noteTitle} style={{maxWidth: '70%', color: btnBackgroundColor,
                                overflow: 'hidden', textOverflow: 'ellipsis'}} onClick={()=>{
                                    // fetch note and set the variables in state with the returned data
                                    window.scrollTo(0,0);
                                    
                                    console.log(Key.toString(), note.noteId, note.noteTitle);
                                    setCurrentBook(Key.toString()); setCurrentNoteTitle(note.noteTitle); setCurrentNoteId(note.noteId);
                                }} type="link">{note.noteTitle}</Button> 
                                &nbsp;
                                {
                                    currentNoteId === note.noteId && <><EditOutlined  title="edit"  onClick={()=>{
                                        // setCurrentBook(Key.toString()); setCurrentNoteTitle(note.noteTitle); setCurrentNoteId(note.noteId); setCurrentNoteBody("lolpoo");
                                        setEdit(true);
                                        setCurrentBookEditable(false);
                                    }}/>
                                &nbsp;
                                &nbsp;

                                    <DeleteOutlined title="delete" style={{fontSize:''}} onClick={()=>{
                                        setDeleteNoteProcess(true);
                if(window.confirm("Are you sure you want to delete this note?")){
                    axios.put(API_BASE+ '/api/notes/deleteNote', { 
                        "authorId": localStorage.getItem('bitsjoy_userId'), 
                        "bookTitle": currentBook,
                        "noteId": currentNoteId
                      },
                      {
                        headers : {
                            'Authorization' : localStorage.getItem(bearer_token_key),
                            'Content-Type': 'application/json'
                        }
                      }).then((res)=>{
                        console.log(res);
                        setDeleteNoteProcess(false);
                        window.location.reload();
                   // setUpdatingNoteProcess(false);
                      }).catch(err => {  
                        toast.error(err.message);
                    // setUpdatingNoteProcess(false);
                    setDeleteNoteProcess(false);
                
                      })
                }
            }}/> {
                deleteNoteProcess ? <SyncOutlined spin /> : null
            }
                                    </>
                                 }
                                 <br/>
                                {/* <DeleteOutlined style={{position: 'absolute', right: '5px'}}/> */}
                                </> 
                            })
                        }


                        </div>
                    </Collapse.Panel> : null
                }) : "" : <SyncOutlined spin />
            }
    </Collapse></div>}

    {
        edit && <><br/><ButtonPrimary disabledCondition={currentBook == null || currentNoteTitle == null} styl={{width: '70%'}} onClick={updateNote} text={updatingNoteProcess ? 'loading' : 'Update'}></ButtonPrimary>
        <br/>
<br/>
<Button type="link" onClick={()=>{ 
  window.scrollTo(0,0);
     window.location.reload();
}} style={{color: btnBackgroundColor}}><StepBackwardOutlined /> Back to library</Button></>
    }

{
        newNoteWindow && <><br/><ButtonPrimary disabledCondition={currentBook == null || currentNoteTitle == null} styl={{width: '70%'}} onClick={saveNote} text={savingNoteProcess ? 'loading' : 'Save'}></ButtonPrimary>
<br/>
<br/>
<Button type="link" onClick={()=>{ 
  window.scrollTo(0,0);

  window.location.reload();
}} style={{color: btnBackgroundColor}}><StepBackwardOutlined /> Back to library</Button>


</>
    }
        </Col>









{/* to hide the save/update buttons in mobile and show buttons that stick at the bottom */}
        <Col style={{overflowY: 'auto', height: '75vh'}} xs={{span: 24}} md={{span: 0}} align="left">


        {
                !currentNoteId && currentNoteId != "" && <div align="left" style={{paddingTop: '20px', overflowX: 'hidden'}}>
                
                <ButtonPrimary styl={{fontSize: '15px', width: '100%'}} className="bounce" id="new-collection" text={<span> <PlusCircleOutlined /> New collection </span>} onClick={(e)=>{ 
                  // document.getElementById("new-collection").style.transform = 'translate(1000px, 0px)';
                  document.getElementById("notes-hero").style.transform = 'translate(0px, -1000px)';
                  setTimeout(()=>{
                    setCurrentBook(null); setNewNoteWindow(true); setCurrentNoteId(""); setCurrentNoteTitle('Sample note title'); setCurrentNoteBody("<p>This is the first note of this collection, you can delete it later"); 

                  }, 500);
    }}></ButtonPrimary> 
    <br/>
    <br/>
    <br/>
    <br/>
    </div>
            }





        {!edit && !newNoteWindow && <div align="left">
        <br/> 
          <h3 style={{color: btnBackgroundColor}} align="left">{Object.keys(notes? notes : {}).length !== 0 ? "Collections" : "Collections will be shown here"}</h3> 
        
        
        <Collapse style={{fontWeight: '700', width: 'auto',  border: '0px', display: 'inline'}} defaultActiveKey={['0']} onChange={()=>{}} align="left">
            {
                notes ? Object.keys(notes).length !== 0 ? Object.keys(notes).map((Key, i) => {
                    return notes[Key].find(x => x.deleted !== true) ? <Collapse.Panel style={{border: `0px solid silver`, borderBottom: '0px'}} header={Key} key={i}>
                        <div align="left">
        <Button type="link" style={{border: `0px solid ${btnBackgroundColor}`, color: 'black'}} onClick={()=>{setNewNoteWindow(true); setCurrentNoteId(""); setCurrentBook(Key); setCurrentNoteTitle('type here'); setCurrentBookEditable(false);}}><span> 
            <span onMouseOver={()=>{
           // document.getElementById('addMoreNotes').style.display = 'inline';
        }}
        onMouseOut={()=>{
           // document.getElementById('addMoreNotes').style.display = 'none';
        }}
        ><PlusCircleOutlined /> Add more to {Key}</span> &nbsp; </span></Button>
<br/> 
                        {
                            notes[Key].map(note => {
                                return    <> 
                                <Button align="left" title={note.noteTitle} style={{maxWidth: '70%', color: btnBackgroundColor,
                                overflow: 'hidden', textOverflow: 'ellipsis'}} onClick={()=>{
                                    // fetch note and set the variables in state with the returned data
                                    window.scrollTo(0,0);
                                    console.log(Key.toString(), note.noteId, note.noteTitle);
                                    setCurrentBook(Key.toString()); setCurrentNoteTitle(note.noteTitle); setCurrentNoteId(note.noteId);
                                }} type="link">{note.noteTitle}</Button> 
                                &nbsp;
                                {
                                    currentNoteId === note.noteId && <><EditOutlined  title="edit"  onClick={()=>{
                                        // setCurrentBook(Key.toString()); setCurrentNoteTitle(note.noteTitle); setCurrentNoteId(note.noteId); setCurrentNoteBody("lolpoo");
                                        setEdit(true);
                                    }}/>
                                &nbsp;
                                &nbsp;

                                    <DeleteOutlined title="delete" style={{fontSize:''}} onClick={()=>{
                                        setDeleteNoteProcess(true);
                if(window.confirm("Are you sure you want to delete this note?")){
                    axios.put(API_BASE+ '/api/notes/deleteNote', { 
                        "authorId": localStorage.getItem('bitsjoy_userId'), 
                        "bookTitle": currentBook,
                        "noteId": currentNoteId
                      },
                      {
                        headers : {
                            'Authorization' : localStorage.getItem(bearer_token_key),
                            'Content-Type': 'application/json'
                        }
                      }).then((res)=>{
                        console.log(res);
                        setDeleteNoteProcess(false);
                        window.location.reload();
                   // setUpdatingNoteProcess(false);
                      }).catch(err => {  
                        toast.error(err.message);
                    // setUpdatingNoteProcess(false);
                    setDeleteNoteProcess(false);
                
                      })
                }
            }}/> {
                deleteNoteProcess ? <SyncOutlined spin /> : null
            }
                                    </>
                                 }
                                 <br/>
                                {/* <DeleteOutlined style={{position: 'absolute', right: '5px'}}/> */}
                                </> 
                            })
                        }


                        </div>
                    </Collapse.Panel> : null
                }) : "" : <SyncOutlined spin />
            }
    </Collapse></div>}


          </Col>






<Row>
        <Col xs={{span: 24}} md={{span: 0}} align="center">
            <div style={{position: 'fixed', bottom: '10px', right: '20px'}}>
            {
        edit && <><ButtonPrimary styl={{width: '100%'}} onClick={updateNote} text={updatingNoteProcess ? 'loading' : 'Update'}></ButtonPrimary>
        
</>
    }

{
        newNoteWindow && <>
        
        <ButtonPrimary style={{display: 'inline'}}  styl={{width: '100%'}} onClick={saveNote} text={savingNoteProcess ? 'loading' : 'Save'}></ButtonPrimary>




</>
    }
            </div>

            <div style={{position: 'fixed', bottom: '10px', left: '20px'}}>

{ edit &&  <Button type="link" onClick={()=>{ 
  window.scrollTo(0,0);
     window.location.reload();
}} style={{color: btnBackgroundColor}}><StepBackwardOutlined /> Close</Button>}



           

            {
        newNoteWindow && <>
        <Button type="link" onClick={()=>{ 
  window.scrollTo(0,0);

  window.location.reload();
}} style={{color: btnBackgroundColor, padding: '0px'}}><StepBackwardOutlined /> Close</Button>
   


</>
    }
            </div>
</Col>
</Row>
      </Row>
      : userHasAccess === false ? 
      <div>
        <Fee />
      </div> : <span style={{width: '100%', position: 'relative', top: '37vh'}}><SyncOutlined spin style={{fontSize: '25px'}} /></span>
  }

<Modal title="Share with" visible={share} onOk={()=>{}} onCancel={()=>{setShare(false)}}

footer={[
  <Button key="back" onClick={() => {setShare(false);}}>
    Cancel
  </Button>,
   
]}>

       Enter Email :
       <Input value={shareWithEmail} onChange={(e)=>{
        setShareWithEmail(e.target.value);
       }} id="shareWithEmail" type="email" ></Input>

<br/>
          
       <ButtonPrimary text={sharing ? <SyncOutlined spin /> : 'Share' } onClick={()=>{
        let k = document.getElementById('shareWithEmail').value;
        if(k.includes('@') && k.includes('.') && !k.trim().includes(' ')){
        setSharing(true);

        // let currentShareWith = shareWith;
        // if(!currentShareWith.includes(k)){ 
        setShareWithEmail("");

        axios.put(API_BASE + '/api/notes/updateNoteAccessibleTo', {
          noteId: currentNoteId,
          authorId: localStorage.getItem('bitsjoy_userId'),
          list: [k]
      },{
          headers : {
              'Authorization' : localStorage.getItem(bearer_token_key),
              'Content-Type': 'application/json'
          }
      }).then((res)=>{
        console.log(res.data);
        setShare(false);
        toast.success('Shared successfully');
        setSharing(false); 
    
        //  alert(res.data.body);
      }).catch((err)=>{
          toast.error(err.response.data.message);
          setSharing(false); 
    
    
    
      })
        // }
        } else {
          toast.error('Please provide a valid email');
        }
        }}>
        </ButtonPrimary>
        
      </Modal>
    </> 
  )
}
