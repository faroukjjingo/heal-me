// app/components/FileUpload.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-regular-svg-icons';
import '../styles/FileUpload.css';

export const FileUpload = ({ onFileSelect }) => {
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      if (file.type === 'application/pdf') {
        alert('PDF parsing would be implemented here');
        return;
      }

      if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const fileContent = e.target.result;
          onFileSelect(fileContent);
        };
        reader.onerror = () => {
          alert('File upload failed');
        };
        reader.readAsText(file);
      } else {
        alert('Unsupported file format');
      }
    } catch (error) {
      alert('File upload failed');
    }
  };

  return (
    <div className="section">
      <h2 className="sectionHeader">Document Input</h2>
      <div className="uploadContainer">
        <label className="uploadButton">
          <FontAwesomeIcon icon={faFileAlt} size="lg" color="#27C7B8" />
          <span className="uploadButtonText">Upload Medical Document</span>
          <input
            type="file"
            accept=".txt,.pdf,.docx"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </label>
        <p className="supportedFormats">Supported: .txt, .pdf, .docx</p>
      </div>
    </div>
  );
};