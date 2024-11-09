import React, { useCallback, useEffect } from 'react'

import { useDropzone } from "react-dropzone";
import { onUpload } from './fileUploader';
import { useToast } from '@/hooks/use-toast';
import { useDispatch, useSelector } from 'react-redux';
import { handleFilterDispatch } from '@/lib/filterUtils';
import { cartoonify, contrastEnhancement, coolFilter, gothamEffect, grainyEffect, grayScale, hdrEffect, pencilSketch, saveImage, sepiaEffect, warmFilter } from '@/redux/AsyncThunk';
import { getapiKey, getId } from '@/redux/userSlice';
import { ImagePlus, Loader, Loader2 } from 'lucide-react';
import { getImageBlob, setImageBlob } from '@/redux/imageSlice';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const About = () => {
  const imageblob = useSelector(getImageBlob);
  const [file, setFile] = React.useState("");
  const [sentFile, setSentFile] = React.useState("");
  const [filteredImage, setFilteredImage] = React.useState("");
  const [selectedFilter, setSelectedFilter] = React.useState("");
  const [isDragActive, setIsDragActive] = React.useState(false);
  const [newfile, setNewFile] = React.useState(""); 
  const [isLoading, setIsLoading] = React.useState(false);
    const {toast} = useToast();
  const dispatch = useDispatch();
  const apiKey = useSelector(getapiKey)

  

  const applyFilter = async () => {
    if (!selectedFilter) {
      toast({title : "Please select filter" , type : "error"});
      return;
    }
  
    if (!file) {
      toast({title : "Please upload an image to apply filter" , type : "error"});
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
        case 'sepia':
          result = await handleFilterDispatch(dispatch, toast, sepiaEffect, sentFile, apiKey);
          break;
        case 'gotham':
          result = await handleFilterDispatch(dispatch, toast, gothamEffect, sentFile, apiKey);
          break;
        case 'hdreffect':
          result = await handleFilterDispatch(dispatch, toast, hdrEffect, sentFile, apiKey);
          break;
        default:
          toast({ title: 'Error', description: 'Invalid filter selected', type: 'error' });
          return;
      }
      console.log(result);
      const filteredImageFile = URL.createObjectURL(result);

      setFilteredImage(filteredImageFile);
    } catch (error) {
      console.error(error);
    }
    finally {
      setIsLoading(false); 
    }
  }
  const userId = useSelector(getId);

  const saveFile = async () => {
    if (!filteredImage) {
      toast({ title: 'No image to save', type: 'error' });
      return;
    }
    const response = await fetch(filteredImage);
    const blob = await response.blob();
    const file = new File([blob], "filteredImage.png", { type: "image/png" });
    console.log(file);
  

     await dispatch(saveImage({ file  , apiKey , userId})).unwrap().then((data) => {
        console.log(data);
        toast({ title: 'Image saved successfully', type: 'success' });
      }).catch((err) => {
        console.log(err);
        toast({ title: 'Failed to save image', type: 'error' });
      }
    )
  }
   

  console.log(sentFile)
  



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

<div className="max-w-3xl mx-auto p-6 space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Upload and Edit Your Image</h2>
        <p className="text-muted-foreground">
          Drop your image here or click to browse
        </p>
      </div>

      <Card className="border-2 border-dashed">
        <CardContent className="p-0">
          <div
            {...getRootProps()}
            className="relative h-64 cursor-pointer rounded-lg hover:bg-muted/50 transition-colors"
          >
            <input {...getInputProps()} onChange={async (data) => {
                  const t = await onUpload(data);
                  setFile(t);
                  setSentFile(data.target.files[0]);

                  // await dispatch(setImageBlob(URL.createObjectURL(data.target.files[0]));
                }} />
            {file ? (
              <img
                src={file}
                alt="Preview"
                className="w-full h-full object-contain rounded-lg"
                
              />
             

              
            ) : (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="rounded-full bg-muted p-4">
                  <ImagePlus className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="text-center space-y-2">
                  {isDragActive ? (
                    <p className="text-sm">Drop your image here</p>
                  ) : (
                    <>
                      <p className="text-sm">
                        <span className="font-medium">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        SVG, PNG, JPG or GIF (max. 800x400px)
                      </p>
                    </>
                  )}
                </div>
              </div>
            )
          }
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="grainy">Grainy Effect</SelectItem>
            <SelectItem value="warm">Warm Filter</SelectItem>
            <SelectItem value="cool">Cool Filter</SelectItem>
            <SelectItem value="pencil">Pencil Sketch</SelectItem>
            <SelectItem value="cartoon">Cartoon Effect</SelectItem>
            <SelectItem value="grey">Greyscale</SelectItem>
            <SelectItem value="contrast">Contrast Enhancement</SelectItem>
            <SelectItem value="sepia">Sepia</SelectItem>
            <SelectItem value="gotham">Gotham</SelectItem>
            <SelectItem value="hdreffect">HDR Effect</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2 w-full sm:w-auto">
          <Button 
            onClick={applyFilter} 
            disabled={!selectedFilter || !file || isLoading}
            className="flex-1 sm:flex-none"
          >
            {isLoading ? <Loader2 className="px-auto  w-full  animate-spin" /> : <p className=''>Apply Filter</p>}
            
          </Button>
          {filteredImage && (
            <Button variant="outline" className="flex-1 sm:flex-none" onClick={saveFile}>
              Save Image
            </Button>
          )}
        </div>
      </div>

      {filteredImage && !isLoading && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold text-center">Filtered Image Preview</h3>
            <img
              src={filteredImage}
              alt="Filtered preview"
              className="w-full h-64 object-contain rounded-lg"
            />
          </CardContent>
        </Card>
      )}

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}
    </div>


  )
}

export default About
