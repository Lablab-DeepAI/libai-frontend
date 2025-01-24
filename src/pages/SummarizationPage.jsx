/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';

const SummarizationPage = () => {
  const [documentText, setDocumentText] = useState('');
  const [summary, setSummary] = useState('');

  const generateSummary = async () => {
    try {
      // Replace with your FastAPI backend endpoint
      const response = await axios.post('http://localhost:8000/api/summarize', { text: documentText });
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error generating summary:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">AI Summarization</h1>
      <textarea
        placeholder="Paste document text here..."
        value={documentText}
        onChange={(e) => setDocumentText(e.target.value)}
        className="w-full p-4 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows="8"
      />
      <button
        onClick={generateSummary}
        className="bg-green-500 text-white px-6 py-4 rounded-lg hover:bg-green-600 transition duration-300"
      >
        Generate Summary
      </button>
      {summary && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Summary:</h3>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default SummarizationPage;