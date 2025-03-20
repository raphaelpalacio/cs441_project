"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AppealRatesChart = ({ data }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Appeal Success Rates</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
          <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
          <YAxis type="category" dataKey="name" width={170} tick={{ fill: '#333' }} />
          <Tooltip 
            formatter={(value) => [`${value.toFixed(1)}%`, "Overturn Rate"]} 
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
          />
          <Bar dataKey="overturnRate" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 text-sm text-gray-600">
        <p>These insurers show notably high rates of overturning claim denials when appealed. The high success rates suggest many initial denials may be inappropriate.</p>
      </div>
    </div>
  );
};

export default AppealRatesChart;