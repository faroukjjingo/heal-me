// app/components/TextEditor.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import '../styles/TextEditor.css';
import { analyzeSentiment } from './analysis/SentimentAnalyzer';
import { analyzeTextComplexity } from './analysis/ComplexityAnalyzer';
import { countSyllables } from './analysis/ComplexityAnalyzer';

export const TextEditor = ({
  textData = '',
  onTextChange,
  onAnalyze,
  loading
}) => {
  const [realTimeAnalysis, setRealTimeAnalysis] = useState({
    sentiment: {
      score: 0,
      distribution: { positive: 0, negative: 0, neutral: 0 }
    },
    complexity: 0,
    wordCount: 0,
    syllableCount: 0
  });

  useEffect(() => {
    const analyzeText = () => {
      if (!textData?.trim()) {
        setRealTimeAnalysis({
          sentiment: {
            score: 0,
            distribution: { positive: 0, negative: 0, neutral: 0 }
          },
          complexity: 0,
          wordCount: 0,
          syllableCount: 0
        });
        return;
      }

      const sentimentResults = analyzeSentiment(textData);
      const { readabilityScore = 0 } = analyzeTextComplexity(textData);
      
      const tokens = textData.split(/\s+/).filter(token => token.length > 0);
      const syllablesCount = tokens.reduce((acc, word) => acc + countSyllables(word), 0);

      setRealTimeAnalysis({
        sentiment: {
          score: sentimentResults.score,
          distribution: sentimentResults.distribution
        },
        complexity: readabilityScore,
        wordCount: tokens.length,
        syllableCount: syllablesCount
      });
    };

    analyzeText();
  }, [textData]);

  const getSentimentColor = (score) => {
    if (score > 25) return '#4CAF50';
    if (score < -25) return '#f44336';
    return '#FFA726';
  };

  const getSentimentLabel = (score) => {
    if (score > 25) return 'Positive';
    if (score < -25) return 'Negative';
    return 'Neutral';
  };

  return (
    <div className="section">
      <div className="realTimeStats">
        <span className="statText">
          Words: {realTimeAnalysis.wordCount}
        </span>
        <span 
          className="statText"
          style={{ color: getSentimentColor(realTimeAnalysis.sentiment.score) }}
        >
          Sentiment: {getSentimentLabel(realTimeAnalysis.sentiment.score)}
        </span>
        <span className="statText">
          Complexity: {Math.round(realTimeAnalysis.complexity)}
        </span>
        <span className="statText">
          Syllables: {realTimeAnalysis.syllableCount}
        </span>
      </div>

      <div className="sentimentDistribution">
        <span className="distributionText">
          Positive: {realTimeAnalysis.sentiment.distribution.positive.toFixed(1)}%
        </span>
        <span className="distributionText">
          Negative: {realTimeAnalysis.sentiment.distribution.negative.toFixed(1)}%
        </span>
        <span className="distributionText">
          Neutral: {realTimeAnalysis.sentiment.distribution.neutral.toFixed(1)}%
        </span>
      </div>

      <textarea
        className="textArea"
        value={textData}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Enter or paste medical text for analysis..."
      />

      <button
        className="analyzeButton"
        onClick={onAnalyze}
        disabled={loading}
      >
        {loading ? (
          <div className="loader"></div>
        ) : (
          <div className="buttonContent">
            <FontAwesomeIcon icon={faStethoscope} size="lg" color="#fff" />
            <span className="buttonText">Analyze Clinical Text</span>
          </div>
        )}
      </button>
    </div>
  );
};