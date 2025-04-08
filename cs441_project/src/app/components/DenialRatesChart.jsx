"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const DenialRatesChart = ({ data }) => {
  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4 text-white">Highest Denial Rates</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
          <XAxis 
            type="number" 
            domain={[0, 55]} 
            tickFormatter={(value) => `${value}%`}
            stroke="#fff"
            tick={{ fill: '#fff' }}
          />
          <YAxis 
            type="category" 
            dataKey="name" 
            width={170} 
            tick={{ fill: '#fff' }}
            stroke="#fff"
          />
          <Tooltip 
            formatter={(value) => [`${value.toFixed(1)}%`, "Denial Rate"]} 
            contentStyle={{ 
              backgroundColor: '#1f2937', 
              border: '1px solid #374151',
              borderRadius: '6px',
              color: '#fff'
            }}
            labelStyle={{ color: '#fff' }}
          />
          <Bar dataKey="denialRate" fill="#3b82f6">
            {data && data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.denialRate > 40 ? "#dc2626" : entry.denialRate > 25 ? "#f97316" : "#3b82f6"} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 text-sm text-gray-300">
        <p>Insurers with rates above 40% are shown in red and those above 25% in orange, indicating potentially problematic denial practices.</p>
      </div>
    </div>
  );
};

export default DenialRatesChart;