import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { apiEndPoint, prompt } from './Constant';
import axios from 'axios';

const Dropzone: React.FC = () => {
    const [resumeExtractedData, setResumeExtractedData] = useState<string>('')
    const onDrop = useCallback((acceptedFiles: any) => {
        const reader = new FileReader();
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = () => {
            // Convert file data to base64
            let base64String = reader.result as string;
            base64String = base64String.replace(/^data:application\/pdf;base64,/, "");
            axios.post(apiEndPoint + '/upload-resume', {
                file_name: "Md_Shoaib.pdf",
                prompt: prompt,
                base64_data: base64String
            }).then(response => {
                console.log('File uploaded successfully:', response.data.response);
                setResumeExtractedData(response.data.response);
            })
            // console.log(base64String);
        };
        reader.readAsDataURL(acceptedFiles[0]);
    }, []);
    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (
        <div>
            <div {...getRootProps()}
                style={{
                    border: '2px dashed #cccccc',
                    padding: '20px',
                    textAlign: 'center',
                    cursor: 'pointer'
                }}>
                <p>Drag 'n' drop some files here, or click to select files</p>
                <input {...getInputProps()} />
            </div>
            <h2>Resume Extracted Data</h2>
            <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
                <pre>{resumeExtractedData}</pre>
            </div>
        </div>
    )
}

export default Dropzone;