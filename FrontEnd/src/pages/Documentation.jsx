import React from "react";
import EndpointCard from "../components/EndpointCard";

const DocumentationPage = () => {
    const websiteUrl = "isdl-group-25.onrender.com";
    const finalEndpoints = [
      {
        requestType: "POST",
        routeUrl: websiteUrl + "/auth/signin",
        requestBody: { 
          email: "string", 
          password: "string" 
        },
        parameters: {},
        response: { 
          success: "true/false", 
          message: "message-string", 
          users: {
              "_id": "user-id",
              "email": "your-email@gamil.com",
              "api_key": "your-api-key"
            }
          },
        description: "The Sign In endpoint allows registered users to log in with their credentials."
      },
      {
        requestType: "POST",
        routeUrl: websiteUrl + "/auth/signup",
        requestBody: { 
          email: "string", 
          password: "string" 
        },
        parameters: {},
        response: { 
          success: "true/false", 
          message: "message-string", 
          users: {
            "email": "your-email@gamil.com",
            "api_key": "your-api-key"
          }
        },
        description: "The Sign Up endpoint allows new users to create an account by providing their email and password."
      },
      {
        requestType: "POST",
        routeUrl: websiteUrl + "/savefile",
        requestBody: { 
          file: "image/jpeg or image/png", 
          api_key: "your-api-key" 
        },
        parameters: { 
          user_id: "string" 
        },
        response: { 
          success: "true/false", 
          access_url: "access-url-of-saved-file" 
        },
        description: "The Save File endpoint stores the uploaded image file in the cloud, linking it to the specified user ID."
      },
      {
        requestType: "POST",
        routeUrl: websiteUrl+"/warmfilter",
        requestBody: { 
          file: "you-image-file.jpg", 
          api_key:"your-api-key" 
        },
        parameters: {},
        response: { 
          image: "cartoonified-image.jpg" 
        },
        description: "The Warm Filter endpoint applies a warm color effect to the uploaded image, giving it a cozy, reddish hue. This effect is often used to create inviting and vibrant images, ideal for portraits and landscapes."
      },
      {
        requestType: "POST",
        routeUrl: websiteUrl+"/coolfilter",
        requestBody: { 
          file: "you-image-file.jpg", 
          api_key:"your-api-key" 
        },
        parameters: {},
        response: { 
          image: "cartoonified-image.jpg" 
        },
        description: "The Cool Filter endpoint applies a cool color effect to the uploaded image, giving it a serene, bluish hue. This effect is often used to create calming and tranquil images, ideal for landscapes and cool-toned portraits."
      },  
      {
        requestType: "POST",
        routeUrl: websiteUrl+"/pencilsketch",
        requestBody: { 
          file: "you-image-file.jpg", 
          api_key:"your-api-key" 
        },
        parameters: {},
        response: { 
          image: "cartoonified-image.jpg" 
        },
        description: "The Pencil Sketch endpoint converts an uploaded image into a pencil sketch effect. This filter gives the appearance of a hand-drawn sketch, perfect for creating artistic representations of photos."
      },
      {
        requestType: "POST",
        routeUrl: websiteUrl + "/cartoonify",
        requestBody: { 
          file: "you-image-file.jpg", 
          api_key:"your-api-key" 
        },
        parameters: {},
        response: { 
          image: "cartoonified-image.jpg" 
        },
        description: "The Cartoonify endpoint processes an uploaded image, transforming it into a cartoon-like effect."
      },
      {
        requestType: "POST",
        routeUrl: websiteUrl+"/contrastenhancement",
        requestBody: { 
          file: "you-image-file.jpg", 
          api_key:"your-api-key" 
        },
        parameters: {},
        response: { 
          image: "cartoonified-image.jpg" 
        },
        description: "The Contrast Enhancement endpoint improves the contrast of an image, making colors more vivid and details more defined. This is particularly useful for images that look washed out or lack definition."
      },
      {
        requestType: "POST",
        routeUrl: websiteUrl+"/grainyeffect",
        requestBody: { 
          file: "you-image-file.jpg", 
          api_key:"your-api-key" 
        },
        parameters: {},
        response: { 
          image: "cartoonified-image.jpg" 
        },
        description: "The Grainy Effect endpoint adds a grainy or film-like texture to the image, creating a vintage or retro look. This effect is ideal for stylizing photos with an old-school, textured appearance."
      },
      {
        requestType: "POST",
        routeUrl: websiteUrl+"/grayscale",
        requestBody: { 
          file: "you-image-file.jpg", 
          api_key:"your-api-key" 
        },
        parameters: {},
        response: { 
          image: "cartoonified-image.jpg" 
        },
        description: "The Grayscale endpoint converts a colored image into grayscale, removing all color and leaving shades of gray. This effect can be used to create classic, monochrome images with a timeless feel."
      },
    ]


  const listOfEndpoints = finalEndpoints;

  return ( 
    <div className="p-8 overflow-y-scroll h-full custom-scrollbar  text-left">
      {/* Platform Introduction */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">How to use our API</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
          Our Image Processing Software as a Service (SaaS) platform offers a comprehensive suite of tools for both developers and end-users 
          to upload, manage, and enhance images with ease. From basic image adjustments to advanced filters, our platform simplifies 
          complex image processing tasks, allowing users to access high-quality, scalable image processing without managing extensive infrastructure.
        </p>
      </section>

      {/* Key Features */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Key Features
        </h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 max-w-3xl">
          <li><strong>Image Upload and Management:</strong> Upload and manage images with ease via a web interface or API.</li>
          <li><strong>Image Processing:</strong> Apply a range of effects and adjustments like contrast enhancement, cartoonification etc.</li>
          <li><strong>Scalability:</strong> The platform scales effortlessly to handle growing demands, ensuring consistent performance.</li>
          <li><strong>Third-Party Integration:</strong> Seamlessly integrate our API with other applications.</li>
          <li><strong>Secure Storage:</strong> Secure, reliable storage solutions for all processed images with GDPR compliance.</li>
        </ul>
      </section>

      {/* Technology Stack */}
      <section className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Technology Stack</h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
          Our platform leverages leading technologies to ensure reliable and efficient performance. Key technologies include:
      </p>
      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 max-w-3xl">
          <li><strong>React:</strong> A powerful JavaScript library for building user interfaces.</li>
          <li><strong>FastAPI:</strong> A modern web framework for backend API development, ensuring high performance.</li>
          <li><strong>OpenCV:</strong> A widely used library for image processing tasks.</li>
          <li><strong>MongoDB:</strong> Our choice for a scalable, document-based database for storing user data.</li>
      </ul>
      </section>

      {/* Usage Guide */}
      <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">API Usage Guide</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
          Users can easily upload an image to the platform, select from a variety of processing options, and receive an enhanced 
          version of the image or a link to the stored image. Developers can integrate our API into their applications, enabling 
          automated image processing at scale. Choose between volatile-mode for temporary processing and persistent-mode to retain 
          links to processed images.
          </p>
      </section>

      {/* Transition to Endpoint Descriptions */}
      <section className="mb-8">
      <p className="text-gray-600 dark:text-gray-300 max-w-3xl font-bold">
          Below is a detailed breakdown of each endpoint available through our API. These descriptions will guide you in 
          utilizing each image processing feature our platform provides. From uploading an image to applying filters and managing
          storage options, these endpoints offer everything needed for efficient and flexible image handling.
      </p>
      </section>
  
      {/* Flex container for Endpoint Cards */}
      <div className="flex flex-wrap gap-6 justify-left">
        {listOfEndpoints.map((endpoint, index) => (
          <EndpointCard key={index} endpoint={endpoint} />
        ))}
      </div>
    </div>
  );
  
};

export default DocumentationPage;