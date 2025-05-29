import React from 'react';
import { useSpinner } from '../../../contexts/SpinnerContext';
import './spinner.scss';

const Spinner = () => {
  const { loading } = useSpinner();

  if (!loading) return null;

  return (
    <div className="spinner-overlay">
      <div className="spinner" />
    </div>
  );
};

export default Spinner;
