import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Navigate } from "react-router-dom";


export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState('');


    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ align: [] }],
        
            [{ list: 'ordered'}, { list: 'bullet' }],
            [{ indent: '-1'}, { indent: '+1' }],
        
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['link', 'image', 'video'],
            [{ color: [] }, { background: [] }],
        
            ['clean'],
          ]
    };

    const formats = [
        'bold', 'italic', 'underline', 'strike',
        'align', 'list', 'indent',
        'size', 'header',
        'link', 'image', 'video',
        'color', 'background',
        'clean',
    ];


    async function createNewPost(ev){
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        ev.preventDefault();
        console.log(files);
        const response = await fetch('http://localhost:3500/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
        });
        if (response.ok){
            setRedirect(true)
        }
    }


    if (redirect){
       return <Navigate to={'/'} />
    }



    return(
        <form onSubmit={createNewPost}>
            <input type="title" placeholder={'Title'} value={title} onChange={ev => setTitle(ev.target.value)}/>
            <input type="summary" placeholder={'Summary'} value={summary} onChange={ev => setSummary(ev.target.value)}/>
            <input type="file"  onChange={ev => setFiles(ev.target.files)}/>
            <ReactQuill value={content} modules={modules} formats={formats} onChange={newValue => setContent(newValue)}/>

            <button style={{marginTop:'10px'}}>Make Post</button>

        </form>
    );

}