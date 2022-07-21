import { Col, Row, Collapse, Button, Input } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Viewer from './viewer';
import { Editor } from '@tinymce/tinymce-react';
import ButtonPrimary from '../../components/Button';
import { BackwardFilled, BackwardOutlined, CloseSquareOutlined, DeleteOutlined, EditOutlined, FileAddOutlined, FolderAddOutlined, FolderAddTwoTone, LoadingOutlined, PlusCircleOutlined, PlusOutlined, PlusSquareOutlined, StepBackwardOutlined, SyncOutlined } from '@ant-design/icons';
import { API_BASE } from '../../apiConfig';
import { bearer_token_key } from './../../localStorageConfig';
import { toast } from 'react-toastify';
import { noteMaker } from '../../assets';
import { btnBackgroundColor } from '../../uiConfig';


export default function NoteMaker() {
 
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


     
const editorRef = useRef(null);

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
        setCurrentNoteBody(res.data.body)
    setLoadingNoteBody(false);

      //  alert(res.data.body);
    }).catch((err)=>{
        toast.error(err.message);
    setLoadingNoteBody(false);

    })}
  }, [currentNoteId])

  const closeViewer = () => {
    setCurrentNoteId(null);
  }


  const saveNote = () => {
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
  };


  const updateNote = () => {
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
  };
 

  return ( 
    <>
      <Row id="lp" align="center">
        <Col xs={{span: 0}} md={{span: 18}}>
            {
                edit && <div align="right">
                <Input required type="text" value={currentNoteTitle} onChange={(e)=>{
                    setCurrentNoteTitle(e.target.value.trim() == "" ? null : e.target.value);
               }} style={{fontWeight: '700'}} />
                <br/>
                <br/>
                { !editorLoaded && <><SyncOutlined spin />&nbsp; &nbsp; Loading editor ...<br/><br/></>}
                <Editor  
                  onInit={(evt, editor) => editorRef.current = editor}
                  initialValue={currentNoteBody}
                  onLoadContent={()=>{
                   // alert("FAFAFAF");
                    setEditorLoaded(true);
                  }}
                  init={{ 
                    height: 500,
                    menubar: false,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | ' +
                      'bold italic forecolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style: 'body {font-weight: 300; font-size:14px;}'
                  }}
                />  
              </div>
            }


{
                newNoteWindow && <div align="left">
                Collection Name: <Input id="collectionName" type="text" value={currentBook} onChange={(e)=>{
                   
                    let val = e.target.value.toString().toLowerCase().replace(/\b(\w)/g, x => x.toUpperCase());
                    setCurrentBook(val.trim() == "" ? null : val);
                }} style={{fontWeight: '700', textTransform: 'capitalize'}} /> 
                
                    <br/>
                <br/>
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
                  onLoadContent={()=>{
                    // alert("FAFAFAF");
                     setEditorLoaded(true);
                   }}
                  init={{ 
                    height: 500,
                    menubar: false,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | ' +
                      'bold italic forecolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style: 'body {font-weight: 300; font-size:14px;}'
                  }}
                />  
              </div> 
            }

            {
                !edit && currentNoteId && <><Viewer close={closeViewer} loading={loadingNoteBody} rawHtmlBody={currentNoteBody} noteId={currentNoteId} title={currentNoteTitle} bookTitle={currentBook}/></>
            }
            {
                !currentNoteId && currentNoteId != "" && <div style={{paddingTop: '20px'}}><img src={noteMaker} style={{width: '30%'}} alt="noteMaker" />
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <ButtonPrimary text={<span> <PlusCircleOutlined /> New collection </span>} onClick={()=>{ setCurrentBook(null); setNewNoteWindow(true); setCurrentNoteId(""); setCurrentNoteTitle('Sample Note'); setCurrentNoteBody("<p>This is the first note of this collection, you can delete it later"); 
    }}></ButtonPrimary>
                
                </div>
            }
             
        </Col>
        
        <Col style={{overflowY: 'scroll', height: '75vh'}} xs={{span: 0}} md={{span: 6}} align="center">
            
        {!edit && !newNoteWindow && <div align="left"><h3 style={{color: btnBackgroundColor}} align="left">{Object.keys(notes? notes : {}).length !== 0 ? "Collections" : "Collections will be shown here"}</h3> 
        
        <br/> 
        <Collapse style={{fontWeight: '700', width: '100%',  border: '0px',}} defaultActiveKey={['0']} onChange={()=>{}} align="left">
            {
                notes ? Object.keys(notes).length !== 0 ? Object.keys(notes).map((Key, i) => {
                    return notes[Key].find(x => x.deleted !== true) ? <Collapse.Panel style={{border: `0px solid silver`, borderBottom: '0px'}} header={Key} key={i}>
                        <div align="left">
        <Button type="link" style={{border: `0px solid ${btnBackgroundColor}`, color: 'black'}} onClick={()=>{setNewNoteWindow(true); setCurrentNoteId(""); setCurrentBook(Key); setCurrentNoteTitle(null)}}><span> 
            <span onMouseOver={()=>{
           // document.getElementById('addMoreNotes').style.display = 'inline';
        }}
        onMouseOut={()=>{
           // document.getElementById('addMoreNotes').style.display = 'none';
        }}
        ><PlusCircleOutlined /> Add more</span> &nbsp; </span></Button>
<br/> 
                        {
                            notes[Key].map(note => {
                                return    <> 
                                <Button align="left" title={note.noteTitle} style={{maxWidth: '70%', color: btnBackgroundColor,
                                overflow: 'hidden', textOverflow: 'ellipsis'}} onClick={()=>{
                                    // fetch note and set the variables in state with the returned data
                                  
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

    {
        edit && <><ButtonPrimary disabledCondition={currentBook == null || currentNoteTitle == null} styl={{width: '70%'}} onClick={updateNote} text={updatingNoteProcess ? 'loading' : 'Update'}></ButtonPrimary>
        <br/>
<br/>
<Button type="link" onClick={()=>{ 
   if(window.confirm("are you sure? Unsaved changes will be lost") == true) window.location.reload();
}} style={{color: btnBackgroundColor}}><StepBackwardOutlined /> Back to library</Button></>
    }

{
        newNoteWindow && <><br/><ButtonPrimary disabledCondition={currentBook == null || currentNoteTitle == null} styl={{width: '70%'}} onClick={saveNote} text={savingNoteProcess ? 'loading' : 'Save'}></ButtonPrimary>
<br/>
<br/>
<Button type="link" onClick={()=>{ 
   if(window.confirm("are you sure? Unsaved changes will be lost") == true) window.location.reload();
}} style={{color: btnBackgroundColor}}><StepBackwardOutlined /> Back to library</Button>


</>
    }
        </Col>
      </Row>
    </> 
  )
}
