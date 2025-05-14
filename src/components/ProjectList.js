// app/components/ProjectManagement/ProjectList.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../styles/ProjectList.css';

export const ProjectList = ({ 
  projects, 
  currentProject, 
  onProjectSelect, 
  onSave,
  lastSaved 
}) => (
  <div className="section">
    <div className="projectHeader">
      <h2 className="sectionHeader">Projects</h2>
      <button 
        className="saveButton"
        onClick={onSave}
      >
        <FontAwesomeIcon icon={faSave} size="lg" color="#fff" />
        <span className="buttonText">Save Project</span>
      </button>
    </div>

    {lastSaved && (
      <p className="lastSaved">
        Last saved: {new Date(lastSaved).toLocaleString()}
      </p>
    )}

    <div className="projectList">
      {projects.map((item) => (
        <button
          key={item.id}
          className={`projectItem ${currentProject?.id === item.id ? 'activeProject' : ''}`}
          onClick={() => onProjectSelect(item)}
        >
          <div className="projectInfo">
            <span className="projectName">{item.name}</span>
            <span className="projectDate">
              {new Date(item.lastModified).toLocaleDateString()}
            </span>
          </div>
          <FontAwesomeIcon icon={faChevronRight} size="lg" color="#27C7B8" />
        </button>
      ))}
    </div>
  </div>
);