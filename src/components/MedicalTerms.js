// app/components/MedicalTerms.js
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
import '../styles/MedicalTerms.css';

const API_KEY = '93185942-c015-4c67-b5c3-bfe498597dd0';
const BASE_URL = 'https://www.dictionaryapi.com/api/v3/references/medical/json/';

export const MedicalTerms = ({ terms = [], termFrequencies = {} }) => {
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [definition, setDefinition] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(null);
  const [termHistory, setTermHistory] = useState([]);

  const sortedTerms = useMemo(() => {
    return [...terms].sort((a, b) => 
      (termFrequencies[b] || 0) - (termFrequencies[a] || 0)
    );
  }, [terms, termFrequencies]);

  const getTermColor = useCallback((term) => {
    const frequency = termFrequencies[term] || 0;
    const maxFreq = Math.max(...Object.values(termFrequencies), 1);
    const intensity = Math.max(0.3, frequency / maxFreq);
    return `rgba(39, 199, 184, ${intensity})`;
  }, [termFrequencies]);

  const fetchDefinition = useCallback(
    debounce(async (term) => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${BASE_URL}${term}?key=${API_KEY}`);
        if (!response.ok) {
          throw new Error('API request failed');
        }
        
        const data = await response.json();
        
        if (data && data[0] && data[0].shortdef) {
          setDefinition(data[0].shortdef[0]);
          setTermHistory(prev => {
            if (prev.includes(term)) return prev;
            const newHistory = [...prev, term];
            return newHistory.slice(-4);
          });
        } else {
          setDefinition('No medical definition found.');
        }
      } catch (error) {
        setError('Error fetching definition. Please try again.');
        setDefinition('');
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  const handleTermPress = useCallback((term) => {
    setSelectedTerm(term);
    setModalVisible(true);
    fetchDefinition(term);
  }, [fetchDefinition]);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setError(null);
    setDefinition('');
  }, []);

  const renderHistory = useMemo(() => {
    if (termHistory.length === 0) return null;

    return (
      <div className="historySection">
        <h3 className="historyHeader">Recently Viewed</h3>
        <div className="historyScroll">
          {termHistory.map((term, index) => (
            <button 
              key={`history-${index}`}
              className="historyChip"
              onClick={() => handleTermPress(term)}
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    );
  }, [termHistory, handleTermPress]);

  return (
    <div className="container">
      <h2 className="analysisHeader">Key Medical Terms</h2>
      
      {renderHistory}

      <div className="termsScroll">
        {sortedTerms.map((term, index) => (
          <button 
            key={`term-${index}`}
            className="termChip"
            style={{ backgroundColor: getTermColor(term) }}
            onClick={() => handleTermPress(term)}
          >
            <span className="termText">{term}</span>
            {termFrequencies[term] > 0 && (
              <span className="frequencyBadge">
                {termFrequencies[term]}
              </span>
            )}
          </button>
        ))}
      </div>

      {modalVisible && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h3 className="modalTerm">{selectedTerm}</h3>
            
            {loading ? (
              <div className="loader"></div>
            ) : error ? (
              <p className="errorText">{error}</p>
            ) : (
              <div className="definitionScroll">
                <p className="modalDefinition">{definition}</p>
              </div>
            )}
            
            <button 
              className="closeButton"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};