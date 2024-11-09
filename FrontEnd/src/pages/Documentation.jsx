import React from "react";
import EndpointCard from "../components/EndpointCard";

const DocumentationPage = () => {
    const sampleEndpoints = [
        {
            requestType: "POST",
            routeUrl: "/api/v1/cartoonify",
            requestBodyExplanation: "Requires an image file to cartoonify.",
            parameterExplanation: "None",
            responseExplanation: "Returns the processed cartoonified image as JPEG.",
            description: "The Cartoonify endpoint processes an uploaded image, transforming it into a cartoon-like effect. This can add a unique, stylized look to images, ideal for social media or fun photo editing."
        },
        {
            requestType: "POST",
            routeUrl: "/api/v1/coolfilter",
            requestBodyExplanation: "Requires an image file to apply a cool filter.",
            parameterExplanation: "None",
            responseExplanation: "Returns the processed image with a cool filter as JPEG.",
            description: "The Cool Filter endpoint applies a filter to the uploaded image, enhancing it with cooler tones. This can be used to give images a calming, bluish effect suitable for portraits, landscapes, or any image where a cooler color tone is desired."
        },
        {
            requestType: "POST",
            routeUrl: "/api/v1/contrastenhancement",
            requestBodyExplanation: "Requires an image file to enhance contrast.",
            parameterExplanation: "None",
            responseExplanation: "Returns the processed image with enhanced contrast as JPEG.",
            description: "The Contrast Enhancement endpoint improves the contrast of an image, making colors more vivid and details more defined. This is particularly useful for images that look washed out or lack definition."
        },
        {
            requestType: "POST",
            routeUrl: "/api/v1/grainyeffect",
            requestBodyExplanation: "Requires an image file to apply a grainy effect.",
            parameterExplanation: "None",
            responseExplanation: "Returns the processed image with a grainy effect as JPEG.",
            description: "The Grainy Effect endpoint adds a grainy or film-like texture to the image, creating a vintage or retro look. This effect is ideal for stylizing photos with an old-school, textured appearance."
        },
        {
            requestType: "POST",
            routeUrl: "/api/v1/grayscale",
            requestBodyExplanation: "Requires an image file to convert to grayscale.",
            parameterExplanation: "None",
            responseExplanation: "Returns the grayscale version of the image as JPEG.",
            description: "The Grayscale endpoint converts a colored image into grayscale, removing all color and leaving shades of gray. This effect can be used to create classic, monochrome images with a timeless feel."
        },
        {
            requestType: "POST",
            routeUrl: "/api/v1/auth/signin",
            requestBodyExplanation: "Requires user credentials (email and password).",
            parameterExplanation: "None",
            responseExplanation: "Returns a success message and user details on successful sign-in.",
            description: "The Sign In endpoint allows registered users to log in with their credentials. It verifies the user's email and password, granting access to the application upon successful authentication."
        },
        {
            requestType: "POST",
            routeUrl: "/api/v1/pencilsketch",
            requestBodyExplanation: "Requires an image file to convert to a pencil sketch.",
            parameterExplanation: "None",
            responseExplanation: "Returns the pencil sketch version of the image as JPEG.",
            description: "The Pencil Sketch endpoint converts an uploaded image into a pencil sketch effect. This filter gives the appearance of a hand-drawn sketch, perfect for creating artistic representations of photos."
        },
        {
            requestType: "POST",
            routeUrl: "/api/v1/savefile",
            requestBodyExplanation: "Requires a user ID and an image file to be saved.",
            parameterExplanation: "user_id (string): The ID of the user uploading the image.",
            responseExplanation: "Returns the access URL of the saved file.",
            description: "The Save File endpoint stores the uploaded image file in the cloud, linking it to the specified user ID. This service provides users with a secure link to access or share the stored image."
        },
        {
            requestType: "POST",
            routeUrl: "/api/v1/auth/signup",
            requestBodyExplanation: "Requires user credentials (email and password) for sign-up.",
            parameterExplanation: "None",
            responseExplanation: "Returns a success message and user details on successful sign-up.",
            description: "The Sign Up endpoint allows new users to create an account by providing their email and password. This service registers the user in the system, enabling access to image processing features."
        },
        {
            requestType: "POST",
            routeUrl: "/api/v1/warmfilter",
            requestBodyExplanation: "Requires an image file to apply a warm filter.",
            parameterExplanation: "None",
            responseExplanation: "Returns the processed image with a warm filter as JPEG.",
            description: "The Warm Filter endpoint applies a warm color effect to the uploaded image, giving it a cozy, reddish hue. This effect is often used to create inviting and vibrant images, ideal for portraits and landscapes."
        },
        {
          requestType: "POST",
          routeUrl: "/api/v1/coolfilter",
          requestBodyExplanation: "Requires an image file to apply a cool filter.",
          parameterExplanation: "None",
          responseExplanation: "Returns the processed image with a cool filter as JPEG.",
          description: "The Cool Filter endpoint applies a cool color effect to the uploaded image, giving it a serene, bluish hue. This effect is often used to create calming and tranquil images, ideal for landscapes and cool-toned portraits."
      }      
    ];

  const listOfEndpoints = sampleEndpoints;

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