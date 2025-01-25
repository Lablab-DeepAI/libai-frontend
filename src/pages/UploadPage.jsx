/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setContent(response.data.content);
      setError('');
    } catch (err) {
      setError('Failed to upload file. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Upload PDF</h1>
      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Upload
        </button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {content && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Extracted Content:</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
        </div>
      )}
    </div>
  );
};

export default UploadPage;