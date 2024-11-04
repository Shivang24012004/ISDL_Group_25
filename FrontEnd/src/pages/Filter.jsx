import React, { useCallback, useEffect } from 'react'

import { useDropzone } from "react-dropzone";
import { onUpload } from './fileUploader';

const About = () => {
  const [file, setFile] = React.useState("");
  const [filteredImage, setFilteredImage] = React.useState("");
  const [selectedFilter, setSelectedFilter] = React.useState("");

  useEffect(() => {
    setFilteredImage(file);
  }, [file]);


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
//     <div className="w-full relative h-screen flex flex-col items-center justify-center p-4">
//   {/* Main Heading */}
//   <h1 className="absolute top-4 left-4 text-2xl font-serif font-bold">Upload Image</h1>
  
//   {/* Image Upload Box */}
//   <div className="flex justify-center border-dashed border-2 border-gray-400 items-center rounded-md w-1/2 h-64 focus-within:ring-offset-1">
//     <div {...getRootProps()} className="file-upload w-full h-full">
//       <input
//         type="file"
//         {...getInputProps()}
//         onChange={async (data) => {
//           const t = await onUpload(data);
//           setFile(t);
//         }}
//       />
//       {file && file.length > 0 ? (
//         <>
//           <img
//                 src={file}
//                 className="w-full h-full object-contain rounded-lg shadow-lg"
//                 alt="Uploaded file"
//               />
//         </>
//       ) : (
//         <>
//           <div className="file-upload_label text-center text-gray-700">
//                 <p className="text-sm">
//                   <span>Click to upload</span> or drag and drop
//                 </p>
//                 <p className="text-xs">SVG, PNG, JPG or GIF (max. 800x400px)</p>
//               </div>
//         </>
//       )}
//     </div>
//   </div>
// </div>
<div className="flex flex-col w-3/4 p-6 space-y-4">
{/* Heading */}
<h2 className="text-3xl font-bold text-center">Upload and Edit Your Image</h2>

{/* Image Upload Box */}
<div className="flex justify-center border-dashed border-2 border-gray-400 items-center rounded-md w-full h-64 focus-within:ring-offset-1">
  <div {...getRootProps()} className="file-upload w-full h-full">
    <input
      type="file"
      {...getInputProps()}
      onChange={async (data) => {
        const t = await onUpload(data);
        setFile(t);
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

{/* Filters Section */}
<div className="md:flex-row  items-center  mt-4 flex  gap-4 flex-col ">
  {/* Dropdown for Filters */}
  <label className="text-lg font-semibold">Select a Filter : </label>
  <select
    className="w-fit p-2 border rounded-lg"
    onChange={(e) => setSelectedFilter(e.target.value)}
  >
    <option value="">-- Choose Filter --</option>
    <option value="brightness">Brightness</option>
    <option value="contrast">Contrast</option>
    <option value="sepia">Sepia</option>
    <option value="grayscale">Grayscale</option>
    <option value="blur">Blur</option>
  </select>

  {/* Apply Filter Button */}
  <button
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
    <img src={filteredImage} alt="Filtered preview" className="w-full h-64 object-contain rounded-lg shadow-lg" />
  </div>
)}
</div>


  )
}

export default About
