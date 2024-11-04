import React, { useCallback } from 'react'

import { useDropzone } from "react-dropzone";
import { onUpload } from './fileUploader';

const About = () => {
  const [file, setFile] = React.useState("");
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div className='w-full flex-col p-4'>
      <h1 className=' text-2xl  font-serif px-2 '>Upload Image  </h1>
      <div className=" flex justify-center border bg-[#2563EB]  items-center    rounded-md w-full h-1/4   focus-within:ring-offset-1">
            <div {...getRootProps()} className="file-upload w-full h-full">
            
                  <input
                    type="file"
                    {...getInputProps()}
                    onChange={async (data) => {
                     
                      const t = await onUpload(data);
                      setFile(t);
                    }}
                  ></input>
              {file && file.length > 0 ? (
                <>
                  <img
                    src={file}
                    
                    className="w-1/2 h-auto rounded-lg shadow-lg"
                  />
                </>
              ) : (
                <>
                  <div className="file-upload_label text-center text-white">
                    <p className="text-14-regular ">
                      <span className="">Click to upload </span>
                      or drag and drop
                    </p>
                    <p className="text-12-regular">
                      SVG, PNG, JPG or GIF (max. 800x400px)
                    </p>
                  </div>
                </>
              )}

              
            </div>
            <div className=""></div>
          </div>
    </div>
  )
}

export default About
