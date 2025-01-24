/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';

const QAPage = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const askQuestion = async () => {
    try {
      // Replace with your FastAPI backend endpoint
      const response = await axios.post('http://localhost:8000/api/ask', { question });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error('Error asking question:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Interactive Q&A</h1>
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="Ask your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-grow p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <button
          onClick={askQuestion}
          className="bg-purple-500 text-white px-6 py-4 rounded-lg hover:bg-purple-600 transition duration-300"
        >
          Ask
        </button>
      </div>
      {answer && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Answer:</h3>
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default QAPage;