// app/components/AnalysisResults/QuickStats.js
import React from 'react';

export const QuickStats = ({ analysisResults, medicalTerms }) => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: '1.25rem',
      padding: '0.9375rem',
      backgroundColor: '#002432',
      borderRadius: '0.625rem',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      gap: '0.9375rem',
    }}
  >
    <div
      style={{
        backgroundColor: '#27C7B8',
        padding: '0.9375rem',
        borderRadius: '0.5rem',
        width: 'calc(50% - 0.46875rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        '@media (max-width: 768px)': {
          width: '100%',
        },
      }}
    >
      <span
        style={{
          fontSize: '1rem',
          fontWeight: '700',
          color: '#DFE4E5',
          marginBottom: '0.3125rem',
        }}
      >
        Word Count
      </span>
      <span
        style={{
          fontSize: '1.125rem',
          fontWeight: '600',
          color: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        {analysisResults.wordCount}
      </span>
    </div>
    <div
      style={{
        backgroundColor: '#27C7B8',
        padding: '0.9375rem',
        borderRadius: '0.5rem',
        width: 'calc(50% - 0.46875rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        '@media (max-width: 768px)': {
          width: '100%',
        },
      }}
    >
      <span
        style={{
          fontSize: '1rem',
          fontWeight: '700',
          color: '#DFE4E5',
 |         marginBottom: '0.3125rem',
        }}
      >
        Readability
      </span>
      <span
        style={{
          fontSize: '1.125rem',
          fontWeight: '600',
          color: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        {analysisResults.readabilityScore.toFixed(1)}
      </span>
    </div>
    <div
      style={{
        backgroundColor: '#27C7B8',
        padding: '0.9375rem',
        borderRadius: '0.5rem',
        width: 'calc(50% - 0.46875rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        '@media (max-width: 768px)': {
          width: '100%',
        },
      }}
    >
      <span
        style={{
          fontSize: '1rem',
          fontWeight: '700',
          color: '#DFE4E5',
          marginBottom: '0.3125rem',
        }}
      >
        Medical Terms
      </span>
      <span
        style={{
          fontSize: '1.125rem',
          fontWeight: '600',
          color: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        {medicalTerms.length}
      </span>
    </div>
    <div
      style={{
        backgroundColor: '#27C7B8',
        padding: '0.9375rem',
        borderRadius: '0.5rem',
        width: 'calc(50% - 0.46875rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        '@media (max-width: 768px)': {
          width: '100%',
        },
      }}
    >
      <span
        style={{
          fontSize: '1rem',
          fontWeight: '700',
          color: '#DFE4E5',
          marginBottom: '0.3125rem',
        }}
      >
        Sentiment
      </span>
      <span
        style={{
          fontSize: '1.125rem',
          fontWeight: '600',
          color: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        {analysisResults.sentimentData.score.toFixed(1)}%
      </span>
    </div>
  </div>
);