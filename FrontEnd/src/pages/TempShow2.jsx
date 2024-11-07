import React, { useState } from "react";

function TempShow2() {
  const [file, setFile] = useState(null);
  const [processedFile, setProcessedFile] = useState(null);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(URL.createObjectURL(selectedFile));

    const formData = new FormData();
    formData.append("file", selectedFile);
    // console.log(selectedFile)
    try {
      // console.log(formData)
      const response = await fetch("https://isdl-group-25.onrender.com/pencilsketch", {
        method: "POST",
        body: formData,
      });
      console.log(response);
      if (response.ok) {
        const blob = await response.blob();
        setProcessedFile(URL.createObjectURL(blob));
      } else {
        console.error("Failed to upload and process the image");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-slate-400 w-full min-h-screen">
      <input type="file" onChange={handleFileChange} />
      <div className="flex flex-col justify-between">
        {file && (
          <img className="m-2 p-2" src={file} alt="OriginalImage" />
        )}
        {processedFile && (
          <img
            className="m-2 p-2"
            src={processedFile}
            alt="ProcessedImage"
          />
        )}
      </div>
    </div>
  );
}

export default TempShow2;
