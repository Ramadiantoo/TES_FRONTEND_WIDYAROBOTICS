import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[200px] bg-background rounded-lg shadow-md p-6">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary border-opacity-75"></div>
      <p className="ml-4 text-primary text-lg font-medium mt-4">Loading data...</p>
    </div>
  );
};

export default LoadingSpinner;