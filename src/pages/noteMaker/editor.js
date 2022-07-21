import React, { useEffect, useRef, useState } from 'react' 
import { Editor } from '@tinymce/tinymce-react';
import ButtonPrimary from '../../components/Button';
import { Input } from 'antd';



export default function NoteEditor(props) {

const editorRef = useRef(null);
const [ title, setTitle ] = useState(props.title) ;

useEffect(()=> {
    
}, [props.noteBody])
 
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const onValueChange = (inst) => {
    alert(props.id);
    if (editorRef.current) {
    }
  };

  return ( 
    <div align="left">
      <Editor  
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={props.noteBody? props.noteBody : "<p>fsfs</p>"}
        init={{
        onchange_callback : {onValueChange},
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
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px;}}'
        }}
      /> 
      <br/>
      <ButtonPrimary onClick={log} text="Save"></ButtonPrimary>
    </div> 
  )
}
