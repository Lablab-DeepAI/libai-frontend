/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';

const RecommendationsPage = () => {
  const [documentId, setDocumentId] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');

  const fetchRecommendations = async () => {
    if (!documentId) {
      setError('Please enter a document ID.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/recommend_from_document', {
        document_id: documentId,
      });
      setRecommendations(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch recommendations. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Document Recommendations</h1>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter Document ID"
          value={documentId}
          onChange={(e) => setDocumentId(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={fetchRecommendations}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Get Recommendations
        </button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {recommendations.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Recommended Documents:</h3>
          <ul>
            {recommendations.map((doc, index) => (
              <li key={index} className="text-gray-700">
                {doc.title} (Similarity: {doc.similarity.toFixed(2)})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecommendationsPage;