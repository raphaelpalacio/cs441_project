"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const DenialRatesChart = ({ data }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Highest Denial Rates</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
          <XAxis type="number" domain={[0, 55]} tickFormatter={(value) => `${value}%`} />
          <YAxis type="category" dataKey="name" width={150} tick={{ fill: '#333' }} />
          <Tooltip 
            formatter={(value) => [`${value.toFixed(1)}%`, "Denial Rate"]} 
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
          />
          <Bar dataKey="denialRate" fill="#3b82f6">
            {data && data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.denialRate > 40 ? "#dc2626" : "#3b82f6"} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 text-sm text-gray-600">
        <p>Insurers with rates above 40% are shown in red, indicating potentially problematic denial practices.</p>
      </div>
    </div>
  );
};

export default DenialRatesChart;