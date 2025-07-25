import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[250px] bg-white rounded-xl shadow-2xl p-8">
      <div className="relative">
        <div className="h-20 w-20 rounded-full border-4 border-gray-200"></div>
        <div className="absolute inset-0 animate-spin rounded-full h-20 w-20 border-4 border-t-blue-600 border-r-blue-600 border-b-blue-600 border-l-transparent"></div>
      </div>
      <p className="text-blue-700 text-2xl font-bold mt-6 animate-pulse">Memuat Data...</p>
    </div>
  );
};

export default LoadingSpinner;