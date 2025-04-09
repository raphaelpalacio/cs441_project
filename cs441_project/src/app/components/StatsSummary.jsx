"use client";

import React from 'react';

const StatsSummary = () => {
  return (
    <div className="bg-zinc-900 rounded-lg p-6 shadow-xl border border-zinc-800">
      <h3 className="text-xl font-semibold mb-6 text-center text-white">Healthcare Appeals: The Numbers</h3>
      <div className="grid grid-cols-2 gap-6 w-full">
        <div className="bg-black p-5 rounded-lg text-center shadow-lg border border-zinc-800">
          <p className="text-4xl font-bold text-white">19.7%</p>
          <p className="text-sm mt-2 text-gray-400">Average Denial Rate</p>
        </div>
        <div className="bg-black p-5 rounded-lg text-center shadow-lg border border-zinc-800">
          <p className="text-4xl font-bold text-white">0.2%</p>
          <p className="text-sm mt-2 text-gray-400">Average Appeal Rate</p>
        </div>
        <div className="bg-black p-5 rounded-lg text-center shadow-lg border border-zinc-800">
          <p className="text-4xl font-bold text-white">60.3%</p>
          <p className="text-sm mt-2 text-gray-400">Average Appeal Success</p>
        </div>
        <div className="bg-black p-5 rounded-lg text-center shadow-lg border border-zinc-800">
          <p className="text-4xl font-bold text-white">49.9%</p>
          <p className="text-sm mt-2 text-gray-400">Highest Denial Rate</p>
        </div>
      </div>
      
      <div className="mt-7 p-4 bg-black rounded-lg text-white border border-zinc-800">
        <h4 className="font-medium mb-3 text-white">Key Takeaways:</h4>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
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