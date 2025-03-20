"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import Components
import DenialRatesChart from './DenialRatesChart';
import AppealRatesChart from './AppealRatesChart';
import USMapVisualization from './USMapVisualization';
import StatsSummary from './StatsSummary';
import { articleSections } from '../data/articleContent';
import { getInitialData } from '../data/mockData';

const ScrollytellingContainer = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [stateData, setStateData] = useState([]);
  const [highlightedInsurers, setHighlightedInsurers] = useState([]);
  const [appealsData, setAppealsData] = useState([]);
  const sections = useRef([]);
  
  // Load data
  useEffect(() => {
    const { stateData, highlightedInsurers, appealsData } = getInitialData();
    setStateData(stateData);
    setHighlightedInsurers(highlightedInsurers);
    setAppealsData(appealsData);
  }, []);

  // Navigation functions
  const goToNextSection = () => {
    if (currentSection < sections.current.length - 1) {
      setCurrentSection(currentSection + 1);
      sections.current[currentSection + 1].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToPrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      sections.current[currentSection - 1].scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Map section visualizations to components with US map for context
  const sectionVisualizations = [
    // Introduction section with US map
    () => <USMapVisualization stateData={stateData} />,
    
    // Denial rates section with bar chart and small map
    () => (
      <div className="space-y-6">
        <DenialRatesChart data={highlightedInsurers} />
        <div className="border-t border-gray-300 pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Geographic Context</h4>
          <USMapVisualization stateData={stateData} />
        </div>
      </div>
    ),
    
    // Appeals section with appeal rates chart
    () => (
      <div className="space-y-6">
        <AppealRatesChart data={appealsData} />
        <div className="border-t border-gray-300 pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Geographic Context</h4>
          <USMapVisualization stateData={stateData} />
        </div>
      </div>
    ),
    
    // Summary section
    () => <StatsSummary />
  ];

  useEffect(() => {
    // Initialize section refs
    sections.current = sections.current.slice(0, articleSections.length);
  }, [articleSections.length]);

  return (
    <div className="bg-slate-800 min-h-screen text-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Denies and Dismissed: The Current Healthcare Appeals Crisis</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side - Scrollable article */}
          <div className="bg-slate-700 rounded-lg p-6 overflow-y-auto h-[80vh] relative">
            {articleSections.map((section, index) => (
              <div 
                key={section.id}
                ref={el => (sections.current[index] = el)}
                className={`mb-8 pb-8 border-b border-gray-600 ${currentSection === index ? 'opacity-100' : 'opacity-70'}`}
              >
                <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                {section.content}
              </div>
            ))}
            
            {/* Navigation buttons */}
            <div className="sticky bottom-0 flex justify-between bg-slate-700 py-4">
              <button 
                onClick={goToPrevSection}
                disabled={currentSection === 0}
                className={`flex items-center px-4 py-2 rounded-full ${currentSection === 0 ? 'bg-gray-600 text-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                <ChevronLeft size={16} className="mr-1" />
                Previous
              </button>
              <button 
                onClick={goToNextSection}
                disabled={currentSection === articleSections.length - 1}
                className={`flex items-center px-4 py-2 rounded-full ${currentSection === articleSections.length - 1 ? 'bg-gray-600 text-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                Next
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
          
          {/* Right side - Visualizations */}
          <div className="bg-slate-700 rounded-lg p-6 h-[80vh] overflow-y-auto">
            {articleSections.map((section, index) => (
              <div 
                key={`viz-${section.id}`}
                className={`transition-opacity duration-500 ${currentSection === index ? 'opacity-100 block' : 'opacity-0 hidden'}`}
              >
                {sectionVisualizations[index]()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollytellingContainer;