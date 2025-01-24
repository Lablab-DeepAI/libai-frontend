/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/─ HomePage';
import DocumentFinderPage from './pages/DocumentFinderPage';
import SummarizationPage from './pages/SummarizationPage';
import QAPage from './pages/QAPage';

function App() {
  return (




    <div className="p-6 bg-blue-100">
      <h1 className="text-3xl font-bold text-blue-800">Tailwind CSS is working!</h1>
  

    
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/document-finder" element={<DocumentFinderPage />} />
        <Route path="/summarization" element={<SummarizationPage />} />
        <Route path="/qa" element={<QAPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;