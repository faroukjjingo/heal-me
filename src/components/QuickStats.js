// app/components/AnalysisResults/QuickStats.js
import React from 'react';
import '../styles/QuickStats.css';

export const QuickStats = ({ analysisResults, medicalTerms }) => (
  <div className="quick-stats-container">
    <div className="stat-card">
      <span className="stat-label">Word Count</span>
      <span className="stat-value">{analysisResults.wordCount}</span>
    </div>
    <div className="stat-card">
      <span className="stat-label">Readability</span>
      <span className="stat-value">{analysisResults.readabilityScore.toFixed(1)}</span>
    </div>
    <div className="stat-card">
      <span className="stat-label">Medical Terms</span>
      <span className="stat-value">{medicalTerms.length}</span>
    </div>
    <div className="stat-card">
      <span className="stat-label">Sentiment</span>
      <span className="stat-value">{analysisResults.sentimentData.score.toFixed(1)}%</span>
    </div>
  </div>
);