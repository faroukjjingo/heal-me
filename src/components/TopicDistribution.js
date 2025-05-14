// app/components/TopicDistribution.js
import React from 'react';

export const TopicDistribution = ({ topicAnalysis }) => {
  const sortedTopics = Object.entries(topicAnalysis || {})
    .map(([topic, data]) => ({
      topic,
      ...data
    }))
    .sort((a, b) => b.percentage - a.percentage);

  return (
    <div
      style={{
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <h2
        style={{
          fontSize: '1.375rem',
          fontWeight: '700',
          color: '#27C7B8',
          marginBottom: '0.9375rem',
        }}
      >
        Topic Distribution
      </h2>
      <div
        style={{
          padding: '0 0.9375rem',
          maxHeight: '25rem',
          overflowY: 'auto',
          scrollbarWidth: 'thin',
        }}
      >
        {sortedTopics.map(({ topic, percentage, count, matches }, index) => (
          <div
            key={topic}
            style={{
              backgroundColor: '#002432',
              padding: '0.9375rem',
              borderRadius: '0.625rem',
              marginBottom: '0.625rem',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem',
              }}
            >
              <span
                style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#FFFFFF',
                }}
              >
                {topic}
              </span>
              <span
                style={{
                  fontSize: '0.875rem',
                  color: '#A0A0A0',
                  fontWeight: '500',
                }}
              >
                ({count} matches)
              </span>
            </div>
            <div
              style={{
                height: '0.5rem',
                backgroundColor: '#DFE4E5',
                borderRadius: '0.3125rem',
                marginBottom: '0.5rem',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${Math.min(percentage, 100)}%`,
                  backgroundColor: '#27C7B8',
                  borderRadius: '0.3125rem',
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontSize: '0.875rem',
                  color: '#FFFFFF',
                  fontWeight: '500',
                }}
              >
                {percentage.toFixed(1)}%
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: '#A0A0A0',
                  flex: 1,
                  marginLeft: '0.625rem',
                  textAlign: 'right',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {matches.join(', ')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};