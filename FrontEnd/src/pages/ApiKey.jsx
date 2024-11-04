import { Check, Clipboard } from 'lucide-react';
import React, { useState } from 'react';

const APIKey = () => {
  const [apiKey, setApiKey] = useState('');
  const [copied, setCopied] = useState(false);

  // Function to generate a random API key
  const generateApiKey = () => {
    const key = Array(32)
      .fill(null)
      .map(() => Math.random().toString(36).charAt(2)) // Generates random characters
      .join('');
    setApiKey(key);
    setCopied(false); // Reset the copied state
  };

  // Function to copy API key to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied status after 2 seconds
    });
  };

  return (
    <div className="flex items-center gap-2  rounded-lg w-full md:w-full mt-5">
      <h2 className="text-md md:text-xl font-semibold mb-4">API Key : </h2>
      
      {/* Display API Key or Placeholder */}
      <div className="flex items-center border border-gray-300 rounded-md p-2 w-fit mb-4">
        <input
          type="text"
          value={apiKey || 'Your API Key will appear here'}
          readOnly
          className=" w-full md:w-fit px-2 py-1 text-gray-700 bg-white border-none focus:outline-none"
        />
        <button
          onClick={copyToClipboard}
          disabled={!apiKey}
          className="text-black ml-2 hover:text-blue-700"
        >
          {copied ? <Check className="text-black" /> : <Clipboard height={20} />}
        </button>
      </div>

     
    </div>
  );
};

export default APIKey;
