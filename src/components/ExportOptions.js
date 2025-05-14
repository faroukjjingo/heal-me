// app/components/ExportOptions.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import '../styles/ExportOptions.css';

export const ExportOptions = ({ 
  exportFormat, 
  onFormatChange, 
  onExport 
}) => (
  <div className="section">
    <div className="exportContainer">
      <button 
        className="exportButton"
        onClick={onExport}
      >
        <FontAwesomeIcon icon={faDownload} size="lg" color="#fff" />
        <span className="buttonText">Export Analysis</span>
      </button>
      <div className="formatSelector">
        {['json', 'csv'].map((format) => (
          <button
            key={format}
            className={`formatButton ${exportFormat === format ? 'activeFormat' : ''}`}
            onClick={() => onFormatChange(format)}
          >
            {format.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  </div>
);