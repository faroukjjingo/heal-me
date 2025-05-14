// app/components/Notes/Notes.js
import React from 'react';

export const Notes = ({ notes, onNotesChange }) => (
  <div
    style={{
      padding: '1.25rem',
      backgroundColor: '#ffffff',
      borderRadius: '0.625rem',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
      marginBottom: '1.25rem',
      width: '100%',
      boxSizing: 'border-box',
    }}
  >
    <h2
      style={{
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#002432',
        marginBottom: '0.625rem',
      }}
    >
      Clinical Notes
    </h2>
    <textarea
      style={{
        height: '9.375rem',
        padding: '0.9375rem',
        borderRadius: '0.625rem',
        backgroundColor: '#F4F4F4',
        fontSize: '1rem',
        color: '#333',
        fontFamily: 'Arial, sans-serif',
        width: '100%',
        boxSizing: 'border-box',
        border: 'none',
        resize: 'vertical',
        outline: 'none',
      }}
      value={notes}
      onChange={(e) => onNotesChange(e.target.value)}
      placeholder="Add clinical observations and notes..."
    />
  </div>
);