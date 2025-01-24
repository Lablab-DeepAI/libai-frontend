/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-bold mb-8 text-center animate-fade-in">
        Welcome to <span className="text-yellow-300">LibAI</span>
      </h1>
      <p className="text-xl mb-12 text-center animate-fade-in">
        Your AI-powered virtual librarian for seamless research.
      </p>
      <div className="flex flex-col md:flex-row gap-6 animate-fade-in-up">
        <Link
          to="/document-finder"
          className="bg-white text-blue-600 px-8 py-4 rounded-lg shadow-lg hover:bg-blue-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Smart Document Finder
        </Link>
        <Link
          to="/summarization"
          className="bg-white text-green-600 px-8 py-4 rounded-lg shadow-lg hover:bg-green-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          AI Summarization
        </Link>
        <Link
          to="/qa"
          className="bg-white text-purple-600 px-8 py-4 rounded-lg shadow-lg hover:bg-purple-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Interactive Q&A
        </Link>
      </div>
    </div>
  );
};

export default HomePage;