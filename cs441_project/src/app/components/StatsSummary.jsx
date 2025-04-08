"use client";

import React from 'react';

const StatsSummary = () => {
  return (
    <div className="bg-gray-100 rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-6 text-center text-gray-800">Healthcare Appeals: The Numbers</h3>
      <div className="grid grid-cols-2 gap-6 w-full">
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <p className="text-4xl font-bold text-blue-700">19.7%</p>
          <p className="text-sm mt-2 text-gray-700">Average Denial Rate</p>
        </div>
        <div className="bg-orange-100 p-4 rounded-lg text-center">
          <p className="text-4xl font-bold text-orange-600">0.2%</p>
          <p className="text-sm mt-2 text-gray-700">Average Appeal Rate</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <p className="text-4xl font-bold text-green-700">60.3%</p>
          <p className="text-sm mt-2 text-gray-700">Average Appeal Success</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg text-center">
          <p className="text-4xl font-bold text-red-600">49.9%</p>
          <p className="text-sm mt-2 text-gray-700">Highest Denial Rate</p>
        </div>
      </div>
      
      <div className="mt-6 text-gray-700">
        <h4 className="font-medium mb-2">Key Takeaways:</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li>Nearly 1 in 5 healthcare claims are denied</li>
          <li>Only 2 in 1,000 denied claims are appealed</li>
          <li>Over 60% of appeals are successful</li>
          <li>This suggests many denials could be overturned if appealed</li>
        </ul>
      </div>
    </div>
  );
};

export default StatsSummary;