import React from "react";

import { DownloadCloud, Eye, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const defaultImages = [
  {
    id: "1",
    url: "/placeholder.svg?height=400&width=400",
    name: "image-01.jpg",
    size: "2.4 MB",
    uploadedAt: "2 hours ago",
  },
  {
    id: "2",
    url: "/placeholder.svg?height=400&width=400",
    name: "screenshot-2023.png",
    size: "1.8 MB",
    uploadedAt: "5 hours ago",
  },
  {
    id: "3",
    url: "/placeholder.svg?height=400&width=400",
    name: "profile-picture.jpg",
    size: "3.2 MB",
    uploadedAt: "1 day ago",
  },
  {
    id: "4",
    url: "/placeholder.svg?height=400&width=400",
    name: "background.png",
    size: "4.7 MB",
    uploadedAt: "3 days ago",
  },
];

export default function Dashboard() {
  return (
    <div className="h-full w-3/4 p-4 ">
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
          {defaultImages.map((image) => (
            <Card key={image.id} className="overflow-hidden group">
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="object-cover transition-transform group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-9 w-9 text-white"
                        >
                          <Eye className="h-5 w-5" />
                        </Button>
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
                <div className="p-4">
                  <h3 className="font-medium truncate">{image.name}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-muted-foreground">
                      {image.size}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {image.uploadedAt}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
}
