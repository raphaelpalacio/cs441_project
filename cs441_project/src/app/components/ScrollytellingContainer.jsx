"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import Components
import USMapVisualization from './USMapVisualization';
import StatsSummary from './StatsSummary';
import { articleSections } from '../data/articleContent';
import { getAllStateData } from '../data/dataService';

const ScrollytellingContainer = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [stateData, setStateData] = useState([]);
  const sections = useRef([]);
  
  // Load data
  useEffect(() => {
    console.log("Loading state data from dataService...");
    try {
      const data = getAllStateData();
      console.log(`Loaded ${data.length} states`);
      if (data && data.length > 0) {
        console.log("Sample state data:", data[0]);
      }
      setStateData(data);
    } catch (error) {
      console.error("Error loading state data:", error);
    }
  }, []);

  // Initialize section refs
  useEffect(() => {
    sections.current = sections.current.slice(0, articleSections.length);
  }, []);

  // Navigation functions
  const goToNextSection = () => {
    if (currentSection < articleSections.length - 1) {
      const nextSection = currentSection + 1;
      setCurrentSection(nextSection);
      sections.current[nextSection]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const goToPrevSection = () => {
    if (currentSection > 0) {
      const prevSection = currentSection - 1;
      setCurrentSection(prevSection);
      sections.current[prevSection]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  console.log("Rendering ScrollytellingContainer with stateData length:", stateData?.length || 0);

  // Define highlighted states for each section
  // An empty array means all states are highlighted and interactable
  const highlightedStates = {
    0: [], // Intro - all states are highlighted
    1: ["NC", "IL", "IN", "TX", "CO", "MI", "WY", "MT"], // High denial rates section
    2: ["CA", "TX", "FL", "WY", "MI", "OR", "NY", "MA", "WA"], // Appeals process section
    3: [] // Conclusion - all states are highlighted
  };

  // Map section visualizations to components with US map for context
  const sectionVisualizations = [
    // Introduction section with US map
    () => <USMapVisualization stateData={stateData} currentSection={currentSection} highlightedStates={highlightedStates[0]} showAllTooltips={true} />,
    
    // Denial rates section with map
    () => <USMapVisualization stateData={stateData} currentSection={currentSection} highlightedStates={highlightedStates[1]} showAllTooltips={true} />,
    
    // Appeals section with map
    () => <USMapVisualization stateData={stateData} currentSection={currentSection} highlightedStates={highlightedStates[2]} showAllTooltips={true} />,
    
    // Summary section
    () => <StatsSummary />
  ];

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
                ref={el => sections.current[index] = el}
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
                className={`flex items-center px-4 py-2 rounded-full ${currentSection === 0 ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                <ChevronLeft size={16} className="mr-1" />
                Previous
              </button>
              <button 
                onClick={goToNextSection}
                disabled={currentSection === articleSections.length - 1}
                className={`flex items-center px-4 py-2 rounded-full ${currentSection === articleSections.length - 1 ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
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