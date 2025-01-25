/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';

const DocumentFinderPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const searchDocuments = async () => {
    if (!query) {
      setError('Please enter a search query.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/search?q=${query}`);
      setResults(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch search results. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Smart Document Finder</h1>
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="Search for books, articles, or theses..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={searchDocuments}
          className="bg-blue-500 text-white px-6 py-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result) => (
          <div
            key={result.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{result.title}</h3>
            <p className="text-gray-600">{result.type}</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentFinderPage;