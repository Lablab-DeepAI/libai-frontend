/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/─ HomePage';
import DocumentFinderPage from './pages/DocumentFinderPage';
import SummarizationPage from './pages/SummarizationPage';
import QAPage from './pages/QAPage';
import UploadPage from './pages/UploadPage'; // New page for file upload
import RecommendationsPage from './pages/RecommendationsPage'; // New page for recommendations

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/document-finder" element={<DocumentFinderPage />} />
        <Route path="/summarization" element={<SummarizationPage />} />
        <Route path="/qa" element={<QAPage />} />
        <Route path="/upload" element={<UploadPage />} /> {/* New route for file upload */}
        <Route path="/recommendations" element={<RecommendationsPage />} /> {/* New route for recommendations */}
      </Routes>
    </Router>
  );
}

export default App;