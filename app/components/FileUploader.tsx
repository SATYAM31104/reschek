import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useState } from 'react'

const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const [file, setFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const selectedFile = acceptedFiles[0] || null;
        setFile(selectedFile);
        onFileSelect?.(selectedFile);
    }, [onFileSelect])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        },
        maxSize: 20 * 1024 * 1024 // 20MB
    })

    return (
        <div className='w-full gradient-border'>
            <div {...getRootProps()} className={`p-8 border-2 border-dashed rounded-lg transition-colors cursor-pointer ${isDragActive ? 'border-cyan-400 bg-cyan-400/10' : 'border-gray-600 hover:border-cyan-400'}`}>
                <input {...getInputProps()} />
                <div className='space-y-4 text-center'>
                    {file ? (
                        <div className="uploader-selected-file" onClick={(e) => e.stopPropagation()}>
                            <img src='/images/pdf.png' alt='file' className='size-10' />
                            <div className='flex items-center space-x-3'>
                                <div>
                                    <p className='text-lg text-green-400'>File uploaded: {file.name}</p>
                                    <p className='text-sm text-gray-400'>Size: {formatSize(file.size)}</p>
                                </div>
                            </div>
                            <button className='p-2 cursor-pointer' onClick={(e) => {
                                e.stopPropagation();
                                setFile(null);
                                onFileSelect?.(null);
                            }}>
                                <img src='/icons/cross.svg' className='w-4 h-4' />
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className='mx-auto w-16 h-16 flex items-center justify-center'>
                                <img src='/icons/info.svg' alt='upload' className='size-20'></img>
                            </div>
                            <p className='text-lg text-white'>
                                <span className='font-semibold text-cyan-400'>
                                    Click to Upload
                                </span> or drag and drop
                            </p>
                            <p className='text-sm text-gray-400'>PDF, DOC, DOCX (max 20MB)</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FileUploader
