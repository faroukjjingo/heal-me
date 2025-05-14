// src/components/charts/AnalysisCharts.js
import React, { useMemo } from 'react';
import {
  Bar,
  BarChart,
  LineChart,
  PieChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from './chart';
import './AnalysisCharts.css';

const emotionColors = {
  joy: '#FFB400',
  sadness: '#0066FF',
  anger: '#FF3B3B',
  fear: '#6B2FEB',
  anxiety: '#7C4DFF',
  pain: '#E31B23',
  relief: '#4ADE80',
  concern: '#F472B6',
  hope: '#38BDF8',
  frustration: '#F43F5E',
  gratitude: '#FB923C',
  confusion: '#A855F7',
  disappointment: '#64748B',
  empowerment: '#06B6D4',
  loneliness: '#B45309',
  love: '#EC4899',
  guilt: '#475569',
  shame: '#1E293B',
  pride: '#F97316',
  curiosity: '#06B6D4',
};

const defaultColor = '#0EA5E9';

const getIntensityColor = (baseColor, intensity) => {
  const alpha = Math.max(0.4, intensity / 100);
  const hexAlpha = Math.round(alpha * 255).toString(16).padStart(2, '0');
  return `${baseColor}${hexAlpha}`;
};

const validateEmotionsData = (emotions) => {
  if (!emotions || typeof emotions !== 'object') {
    return false;
  }
  return Object.values(emotions).some(
    (value) =>
      value &&
      typeof value.percentage === 'number' &&
      !isNaN(value.percentage) &&
      value.percentage > 0 &&
      typeof value.intensity === 'string'
  );
};

const AnalysisCharts = ({
  analysisResults,
  visualization = 'bar',
  onVisualizationChange,
  maxEmotions = 10,
  showIntensity = true,
  showDetailedAnalysis = true,
}) => {
  const processedData = useMemo(() => {
    if (
      !analysisResults?.emotionAnalysis?.emotions ||
      !validateEmotionsData(analysisResults.emotionAnalysis.emotions)
    ) {
      return null;
    }

    const emotions = analysisResults.emotionAnalysis.emotions;

    const emotionsArray = Object.entries(emotions)
      .filter(([, value]) => value && value.percentage > 0)
      .map(([emotion, value]) => ({
        emotion,
        percentage: value.percentage,
        intensity: value.intensity,
        count: value.count,
        matches: value.matches,
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, maxEmotions);

    return emotionsArray.map((item) => ({
      emotion: item.emotion,
      percentage: item.percentage,
      intensity: item.intensity,
      count: item.count,
      matches: item.matches,
      fill: showIntensity
        ? getIntensityColor(emotionColors[item.emotion] || defaultColor, item.percentage)
        : emotionColors[item.emotion] || defaultColor,
    }));
  }, [analysisResults, maxEmotions, showIntensity]);

  const complexityData = useMemo(() => {
    return (
      analysisResults?.emotionAnalysis?.emotionalComplexity || {
        score: 0,
        activeEmotions: 0,
        totalEmotions: 0,
        complexity: 'low',
      }
    );
  }, [analysisResults]);

  const detailedAnalysis = useMemo(() => {
    return analysisResults?.emotionAnalysis?.emotionalAnalysis || null;
  }, [analysisResults]);

  const chartConfig = useMemo(() => {
    const config = {
      percentage: {
        label: 'Percentage',
      },
    };
    processedData?.forEach((item) => {
      config[item.emotion] = {
        label: item.emotion.charAt(0).toUpperCase() + item.emotion.slice(1),
        color: item.fill,
      };
    });
    return config;
  }, [processedData]);

  if (!processedData) {
    return (
      <div className="charts-container">
        <h2 className="chart-title">Enhanced Emotional Analysis</h2>
        <p className="no-emotions-text">No emotion data available.</p>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="charts-container">
        <div className="header">
          <h2 className="chart-title">Enhanced Emotional Analysis</h2>
          <div className="visualization-toggle">
            <button
              className={`toggle-button ${visualization === 'bar' ? 'active' : ''}`}
              onClick={() => onVisualizationChange('bar')}
            >
              Bar
            </button>
            <button
              className={`toggle-button ${visualization === 'line' ? 'active' : ''}`}
              onClick={() => onVisualizationChange('line')}
            >
              Line
            </button>
            <button
              className={`toggle-button ${visualization === 'pie' ? 'active' : ''}`}
              onClick={() => onVisualizationChange('pie')}
            >
              Pie
            </button>
          </div>
        </div>

        <div className="chart-wrapper">
          <ChartContainer config={chartConfig} className="chart-container">
            {visualization === 'bar' && (
              <BarChart accessibilityLayer data={processedData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="emotion"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis beginAtZero tickCount={5} />
                <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="percentage" radius={4}>
                  {processedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            )}
            {visualization === 'line' && (
              <LineChart accessibilityLayer data={processedData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="emotion"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis beginAtZero tickCount={5} />
                <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line
                  type="monotone"
                  dataKey="percentage"
                  stroke={defaultColor}
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            )}
            {visualization === 'pie' && (
              <PieChart>
                <Pie
                  data={processedData}
                  dataKey="percentage"
                  nameKey="emotion"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {processedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
              </PieChart>
            )}
          </ChartContainer>
        </div>

        <div className="complexity-section">
          <h3 className="section-title">Emotional Complexity Analysis</h3>
          <div className="complexity-stats">
            <div className="complexity-stat-item">
              <span className="stat-label">Complexity Score</span>
              <span className="stat-value">{complexityData.score.toFixed(1)}%</span>
            </div>
            <div className="complexity-stat-item">
              <span className="stat-label">Active Emotions</span>
              <span className="stat-value">
                {complexityData.activeEmotions} / {complexityData.totalEmotions}
              </span>
            </div>
            <div className="complexity-stat-item">
              <span className="stat-label">Complexity Level</span>
              <span
                className={`stat-value complexity-${
                  complexityData.complexity.charAt(0).toUpperCase() +
                  complexityData.complexity.slice(1)
                }`}
              >
                {complexityData.complexity.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {showDetailedAnalysis && detailedAnalysis && (
          <div className="detailed-analysis-section">
            <h3 className="section-title">Detailed Analysis</h3>
            {detailedAnalysis.pattern && (
              <div className="pattern-card">
                <span className="pattern-title">
                  Pattern Identified:{' '}
                  {detailedAnalysis.pattern.replace(/_/g, ' ')}
                </span>
              </div>
            )}
            <div className="analysis-details">
              <AnalysisItem
                title="Summary"
                content={detailedAnalysis.analysis.summary}
              />
              <AnalysisItem
                title="Emotional State"
                content={detailedAnalysis.analysis.emotional_state}
              />
              <AnalysisItem
                title="Treatment Attitude"
                content={detailedAnalysis.analysis.treatment_attitude}
              />
              <AnalysisItem
                title="Coping Mechanisms"
                content={detailedAnalysis.analysis.coping_mechanisms}
              />
              <AnalysisItem
                title="Social Support"
                content={detailedAnalysis.analysis.social_support}
              />
              <AnalysisItem
                title="Health Beliefs"
                content={detailedAnalysis.analysis.health_beliefs}
              />
              <AnalysisItem
                title="Motivation"
                content={detailedAnalysis.analysis.motivation}
              />
              <AnalysisItem
                title="Perceived Barriers"
                content={detailedAnalysis.analysis.perceived_barriers}
              />
              <AnalysisItem
                title="General Wellbeing"
                content={detailedAnalysis.analysis.general_wellbeing}
              />
              <AnalysisItem
                title="Cultural & Socioeconomic Influences"
                content={detailedAnalysis.analysis.cultural_soc_econ_influences}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AnalysisItem = ({ title, content }) => (
  <div className="analysis-item">
    <h4 className="analysis-item-title">{title}</h4>
    <p className="analysis-item-content">{content}</p>
  </div>
);

export default AnalysisCharts;