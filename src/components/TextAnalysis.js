// app/components/TextAnalysis.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileUpload } from './FileUpload';
import { TextEditor } from './TextEditor';
import { QuickStats } from './QuickStats';
import { MedicalTerms } from './MedicalTerms';
import { TopicDistribution } from './TopicDistribution';
import AnalysisCharts from './charts/AnalysisCharts';
import { Notes } from './Notes';
import { ProjectList } from './ProjectList';
import ExportOptions from './ExportOptions';
import { performCompleteAnalysis } from './analysis/Analysis';
import '../styles/TextAnalysisStyles.css';

const TextAnalysis = () => {
  const [textData, setTextData] = useState('');
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [codes, setCodes] = useState([]);
  const [selectedText, setSelectedText] = useState('');
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [notes, setNotes] = useState('');
  const [transcripts, setTranscripts] = useState([]);
  const [currentTranscript, setCurrentTranscript] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [medicalTerms, setMedicalTerms] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [lastSaved, setLastSaved] = useState(null);
  const [exportFormat, setExportFormat] = useState('json');
  const [visualization, setVisualization] = useState('bar');

  const autoSaveTimer = useRef(null);

  useEffect(() => {
    loadInitialData();
    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, []);

  const loadInitialData = async () => {
    try {
      const savedProjects = localStorage.getItem('textAnalysisProjects');
      if (savedProjects) setProjects(JSON.parse(savedProjects));
      
      const savedCategories = localStorage.getItem('analysisCategories');
      if (savedCategories) setCategories(JSON.parse(savedCategories));
    } catch (error) {
      alert('Failed to load saved data');
    }
  };

  const handleAnalyzeText = async () => {
    if (!textData) {
      alert('Please enter or upload text to analyze');
      return;
    }

    setLoading(true);
    try {
      const results = await performCompleteAnalysis(textData);
      setAnalysisResults(results);
      setMedicalTerms(results.medicalTermsFound);
      if (autoSaveEnabled) scheduleAutoSave();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const scheduleAutoSave = () => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(async () => {
      await saveProject();
      setLastSaved(new Date().toISOString());
    }, 30000);
  };

  const handleSaveProject = async () => {
    try {
      const project = {
        id: currentProject?.id || Date.now(),
        name: currentProject?.name || `Project ${projects.length + 1}`,
        textData,
        codes,
        analysisResults,
        notes,
        transcripts,
        categories,
        medicalTerms,
        lastModified: new Date().toISOString()
      };

      const updatedProjects = currentProject
        ? projects.map(p => p.id === currentProject.id ? project : p)
        : [...projects, project];

      localStorage.setItem('textAnalysisProjects', JSON.stringify(updatedProjects));
      setProjects(updatedProjects);
      setCurrentProject(project);
      setLastSaved(new Date().toISOString());

      alert('Project saved successfully');
    } catch (error) {
      alert('Failed to save project');
    }
  };

  const handleExport = async () => {
    try {
      const exportData = {
        project: currentProject,
        analysisResults,
        notes,
        medicalTerms,
        exportDate: new Date().toISOString()
      };

      let exportContent;
      switch (exportFormat) {
        case 'json':
          exportContent = JSON.stringify(exportData, null, 2);
          break;
        case 'csv':
          exportContent = convertToCSV(exportData);
          break;
        default:
          exportContent = JSON.stringify(exportData);
      }

      const blob = new Blob([exportContent], { type: `text/${exportFormat}` });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `analysis_export.${exportFormat}`;
      link.click();
      window.URL.revokeObjectURL(url);

      alert(`Data exported in ${exportFormat.toUpperCase()} format`);
    } catch (error) {
      alert(error.message);
    }
  };

  const convertToCSV = (data) => {
    const headers = ['Project', 'Analysis Results', 'Notes', 'Medical Terms', 'Export Date'];
    const rows = [[
      data.project?.name || '',
      JSON.stringify(data.analysisResults),
      data.notes,
      data.medicalTerms.join(','),
      data.exportDate
    ]];
    return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  };

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="scrollContainer">
        <FileUpload onFileSelect={setTextData} />
        
        <TextEditor
          textData={textData}
          onTextChange={(text) => {
            setTextData(text);
            if (autoSaveEnabled) scheduleAutoSave();
          }}
          onAnalyze={handleAnalyzeText}
          loading={loading}
        />

        {analysisResults && (
          <>
            <QuickStats 
              analysisResults={analysisResults}
              medicalTerms={medicalTerms}
            />
            
            <MedicalTerms terms={medicalTerms} />
            
            <TopicDistribution 
              topicAnalysis={analysisResults.topicAnalysis}
            />
            
            <AnalysisCharts
              analysisResults={analysisResults}
              visualization={visualization}
              onVisualizationChange={setVisualization}
            />
          </>
        )}

        <Notes
          notes={notes}
          onNotesChange={setNotes}
        />

        <ProjectList
          projects={projects}
          currentProject={currentProject}
          onProjectSelect={setCurrentProject}
          onSave={handleSaveProject}
          lastSaved={lastSaved}
        />

        <ExportOptions
          exportFormat={exportFormat}
          onFormatChange={setExportFormat}
          onExport={handleExport}
        />
      </div>
    </motion.div>
  );
};

export default TextAnalysis;