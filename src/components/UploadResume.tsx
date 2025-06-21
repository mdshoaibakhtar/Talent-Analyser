import React, { useRef, useState } from 'react';
import Dropzone from './DropZone';

interface UploadResumeProps {
    onUpload?: (file: File) => void;
}

const UploadResume: React.FC<UploadResumeProps> = ({ onUpload }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.name.match(/\.(pdf|doc|docx)$/i)) {
                setError('Please upload a PDF, DOC, or DOCX file.');
                setSelectedFile(null);
                return;
            }
            setError(null);
            setSelectedFile(file);
            onUpload?.(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <button type="button" onClick={handleButtonClick}>
                Upload Resume
            </button>
            <input
                type="file"
                accept=".pdf,.doc,.docx"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            {selectedFile && (
                <div>
                    <p>Selected file: {selectedFile.name}</p>
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Dropzone/>
        </div>
    );
};

export default UploadResume;