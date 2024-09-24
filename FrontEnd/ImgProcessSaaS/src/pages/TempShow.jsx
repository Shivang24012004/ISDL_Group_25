import React, { useState } from 'react';

function TempShow() {
  const [file, setFile] = useState(null);
  const [processedFile, setProcessedFile] = useState(null);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(URL.createObjectURL(selectedFile));

    const formData = new FormData();
    formData.append('file', selectedFile);
    // console.log(selectedFile)
    try {
      // console.log(formData)
      const response = await fetch('http://localhost:8000/grayscale', {
        method: 'POST',
        body: formData,
      });
      console.log(response)
      if (response.ok) {
        const blob = await response.blob();
        setProcessedFile(URL.createObjectURL(blob));
      } else {
        console.error('Failed to upload and process the image');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-slate-400 h-screen">
      <input type="file" onChange={handleFileChange} />
      {processedFile && <img src={processedFile} alt="Processed" />}
    </div>
  );
}

export default TempShow;
