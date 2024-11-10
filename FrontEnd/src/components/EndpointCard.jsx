import React from "react";

const EndpointCard = ({ endpoint }) => {
  return (
    <div className="mb-6 p-4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-3xl">
      {/* Header section with route and request type */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-gray-700 dark:text-white">
          {endpoint.routeUrl}
        </h3>
        <span className="text-white bg-gray-600 text-xs py-1 px-2 rounded-full">
          {endpoint.requestType}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 mb-4">{endpoint.description}</p>

      {/* Request Body */}
      <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        <p className="font-bold text-gray-900 dark:text-gray-100 mb-2">Request Body:</p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded text-xs overflow-auto">
          <code>{JSON.stringify(endpoint.requestBody, null, 2)}</code>
        </pre>
      </div>

      {/* Parameters */}
      <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        <p className="font-bold text-gray-900 dark:text-gray-100 mb-2">Parameters:</p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded text-xs overflow-auto">
          <code>{JSON.stringify(endpoint.parameters, null, 2)}</code>
        </pre>
      </div>

      {/* Response */}
      <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        <p className="font-bold text-gray-900 dark:text-gray-100 mb-2">Response:</p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded text-xs overflow-auto">
          <code>{JSON.stringify(endpoint.response, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
};

export default EndpointCard;