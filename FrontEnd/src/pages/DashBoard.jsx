import React, { useEffect, useState } from "react";

import { DownloadCloud, Eye, Loader, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDispatch, useSelector } from "react-redux";
import { deleteImage, getImages } from "@/redux/AsyncThunk";
import { getId } from "@/redux/userSlice";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { getImage, setImage } from "@/redux/imageSlice";



export default function Dashboard() {
  const{ toast} = useToast();
  const download = (link) => {
    console.log(link);
    fetch(link, {
      method: "GET",
      headers: {}
    })
      .then(response => {
        response.arrayBuffer().then(function(buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const image2 = useSelector(getImage)

const [images, setImages] = useState(image2);
const [loading, setLoading] = useState(false);
const dispatch = useDispatch();
const userId = useSelector(getId);
    useEffect(() => {
      setLoading(true);
    const fetchImages = async () => {
      try {
        const response = await dispatch(getImages({ userId })).unwrap();
        setImages(response);
        dispatch(setImage(response))
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    fetchImages();

  setLoading(false)
  }, [userId]);


  const onDelete = async (file_id) => {
    console.log(file_id);
    dispatch(deleteImage({ file_id , userId })).unwrap().then((data) => {
      console.log(data);
      toast({ title: 'Image Deleted successfully' });
      setImages((prevImages) => prevImages.filter((image) => image.file_id !== file_id));
    }
    ).catch((err) => {
      console.log(err);
    });

   
  }




console.log(images)


  return (
    <div className="h-full  p-4 w-full ">
      <TooltipProvider>
        <div className=" mb-6 ">
          <h1 className="text-2xl font-serif font-bold tracking-tight">
            Stored Images
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage and view your stored images
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
         {loading && <Loader className="m-auto animate-spin" />}
          {images?.map((image) => (
            <Card key={image.file_id} className="overflow-hidden group">
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <img
                    src={image.link}
                    alt={image.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Tooltip>
                      <TooltipTrigger>
                        <Link to={image.link}>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-9 w-9 text-white"
                          >
                          <Eye className="h-5 w-5" />
                        </Button>
                          </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className=" jakarta font-bold ">View</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-9 w-9 text-white"
                          onClick={() => download(image.link)}
                        >
                          <DownloadCloud className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="jakarta font-bold ">Download</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-9 w-9 text-white"
                          onClick={() => onDelete(image.file_id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="  jakarta font-bold ">Delete</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
               
              </CardContent>
            </Card>
          ))}
          {images?.length == null && <p className=" text-md min-w-full ">Get started by using Filter </p>}
        </div>
      </TooltipProvider>
    </div>
    
  );
}
