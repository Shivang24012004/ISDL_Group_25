import React, { useCallback, useEffect } from 'react'

import { useDropzone } from "react-dropzone";
import { onUpload } from './fileUploader';
import { useToast } from '@/hooks/use-toast';
import { useDispatch, useSelector } from 'react-redux';
import { handleFilterDispatch } from '@/lib/filterUtils';
import { cartoonify, contrastEnhancement, coolFilter, grainyEffect, grayScale, pencilSketch, warmFilter } from '@/redux/AsyncThunk';
import { getapiKey } from '@/redux/userSlice';
import { Loader } from 'lucide-react';

const About = () => {
  const [file, setFile] = React.useState("");
  const [sentFile, setSentFile] = React.useState("");
  const [filteredImage, setFilteredImage] = React.useState("");
  const [selectedFilter, setSelectedFilter] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);  const {toast} = useToast();
  const dispatch = useDispatch();
  const apiKey = useSelector(getapiKey)

  

  const applyFilter = async () => {
    if (!selectedFilter) {
      toast("Please select a filter to apply", "error");
      return;
    }
  
    if (!file) {
      toast("Please upload an image to apply the filter", "error");
      return;
    }
    setIsLoading(true);

    try {
      let result;
      switch (selectedFilter) {
        case 'grainy':
          result = await handleFilterDispatch(dispatch, toast, grainyEffect, sentFile, apiKey);
          break;
        case 'warm':
          result = await handleFilterDispatch(dispatch, toast, warmFilter, sentFile, apiKey);
          break;
        case 'cool':
      result = await handleFilterDispatch(dispatch, toast, coolFilter, sentFile, apiKey); 
          break;
        case 'pencil':
          result = await handleFilterDispatch(dispatch, toast, pencilSketch, sentFile, apiKey);
          break;
        case 'cartoon':
          result = await handleFilterDispatch(dispatch, toast, cartoonify, sentFile, apiKey);
          break;
        case 'contrast':
          result = await handleFilterDispatch(dispatch, toast, contrastEnhancement, sentFile, apiKey);
          break;
        case 'grey':
          result = await handleFilterDispatch(dispatch, toast, grayScale, sentFile, apiKey);
          break;
        default:
          toast({ title: 'Error', description: 'Invalid filter selected', type: 'error' });
          return;
      }
      console.log(result);
      setFilteredImage(result);
    } catch (error) {
      console.error(error);
    }
    finally {
      setIsLoading(false); 
    }
  }

  



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

<div className="flex flex-col w-3/4 p-6 space-y-4">
<h2 className="text-3xl font-bold text-center">Upload and Edit Your Image</h2>

<div className="flex justify-center  border-2 items-center rounded-md w-full h-64 focus-within:ring-offset-1">
  <div {...getRootProps()} className="file-upload w-full h-full">
    <input
      type="file"
      {...getInputProps()}
      onChange={async (data) => {
        const t = await onUpload(data);
        setFile(t);
        setSentFile(data.target.files[0]);
      }}
    />
    {file && file.length > 0 ? (
      <img
        src={file}
        className="w-full h-full object-contain rounded-lg shadow-lg"
        alt="Uploaded file"
      />
    ) : (
      <div className="file-upload_label text-center text-gray-700">
        <p className="text-sm">
          <span>Click to upload</span> or drag and drop
        </p>
        <p className="text-xs">SVG, PNG, JPG or GIF (max. 800x400px)</p>
      </div>
    )}
  </div>
</div>

<div className="md:flex-row  items-center  mt-4 flex  gap-4 flex-col ">
  <label className="text-lg font-semibold">Select a Filter : </label>
  <select
    className="w-fit p-2 border rounded-lg"
    onChange={(e) => setSelectedFilter(e.target.value)}
  >
    <option value="">-- Choose Filter --</option>
    <option value="grainy">Grainy Effect</option>
    <option value="warm">Warm Filter</option>
    <option value="cool">Cool Filter</option>
    <option value="pencil">Pencil Sketch</option>
    <option value="cartoon">Cartoon Effect</option>
    <option value="grey">Greyscale</option>
    <option value="contrast">Contrast Enhancement</option>



  </select>

  {/* Apply Filter Button */}
  <button onClick={applyFilter}
    className="px-6 py-2 border-black border   rounded-lg hover:bg-yellow-50 "
  >
    Apply Filter
  </button>
  {
    filteredImage && (
      <button
        className="px-6 py-2 border-black border   rounded-lg hover:bg-yellow-50 "
      >
        Save Image
      </button>
    )
  }
</div>


{/* Action Buttons */}


{/* Result Image Preview */}
{filteredImage && (
   <div className="mt-6">
   <h3 className="text-lg font-semibold text-center mb-4">Filtered Image Preview</h3>
   {isLoading ? (
     <div className="flex justify-center items-center h-64">
      <Loader color='black' size={30} className='animate-spin' />
     </div>
   ) : (
     <img src={filteredImage} alt="Filtered preview" className="w-full h-64 object-contain rounded-lg shadow-lg" />
   )}
 </div>
)}
</div>


  )
}

export default About
