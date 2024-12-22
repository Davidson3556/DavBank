"use client";
import React, { use } from "react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
      <div className="max-w-md">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-purple-700 mb-4">Oops!</h1>
        <p className="text-xl font-medium text-gray-800">
          Sorry, this page is not found
        </p>

        {/* Description */}
        <p className="mt-2 text-gray-600">
          You can search for the page you want here or return to the homepage.
        </p>

        {/* Illustration */}
        <div className="my-8">
          <img
            src="https://via.placeholder.com/150"
            alt="404 Illustration"
            className="mx-auto"
          />
        </div>

        {/* Go Back Button */}
        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 bg-purple-700 text-white rounded-lg shadow-md hover:bg-purple-600 transition"
        >
          Go Back
        </button>
      </div>

      {/* Footer Text */}
      <div className="mt-12 text-sm text-purple-500 space-x-1">
        <span>Error 404</span> <span>•</span> <span>Error 404</span>
        <span>•</span> <span>Error 404</span>
        <span>•</span> <span>Error 404</span>
      </div>
    </div>
  );
};

export default ErrorPage;
