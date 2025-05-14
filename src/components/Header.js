// app/components/Header.js
import React from 'react';
import { motion } from 'framer-motion';

export const Header = () => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.25rem',
      backgroundColor: '#002432',
      borderBottom: '2px solid #27C7B8',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    }}
  >
    <h1
      style={{
        fontSize: '1.75rem',
        fontWeight: '700',
        color: '#DFE4E5',
        textAlign: 'center',
        marginBottom: '0.5rem',
        fontFamily: '"Helvetica Neue", Arial, sans-serif',
      }}
    >
      Clinical Text Analysis
    </h1>
    <p
      style={{
        fontSize: '1rem',
        fontWeight: '300',
        color: '#F78837',
        textAlign: 'center',
        marginTop: '0.25rem',
        fontFamily: '" Helena Neue", Arial, sans-serif',
      }}
    >
      Advanced Medical Documentation Analysis Tool
    </p>
  </motion.div>
);