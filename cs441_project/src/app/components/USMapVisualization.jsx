"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

const USMapVisualization = ({ stateData, currentSection, highlightedStates = [], showAllTooltips = false }) => {
  const mapRef = useRef(null);
  const tooltipRef = useRef(null);
  const [usMapReady, setUsMapReady] = useState(false);
  const legendGradientId = useRef(`legend-gradient-${Math.random().toString(36).substr(2, 9)}`);
  
  // Initialize tooltip
  useEffect(() => {
    // Create tooltip element if it doesn't exist
    if (!tooltipRef.current) {
      const tooltip = document.createElement('div');
      tooltip.id = 'map-tooltip';
      
      // Set tooltip styles directly to avoid any issues
      Object.assign(tooltip.style, {
        position: 'fixed',
        visibility: 'hidden',
        backgroundColor: 'white',
        color: '#333',
        padding: '16px',
        borderRadius: '6px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        pointerEvents: 'none',
        fontSize: '14px',
        zIndex: '9999',
        maxWidth: '350px',
        maxHeight: '400px',
        overflowY: 'auto',
        border: '1px solid #ddd',
        display: 'block'
      });
      
      document.body.appendChild(tooltip);
      tooltipRef.current = tooltip;
    }
    
    // Clean up on component unmount
    return () => {
      if (tooltipRef.current && document.body.contains(tooltipRef.current)) {
        document.body.removeChild(tooltipRef.current);
        tooltipRef.current = null;
      }
    };
  }, []);
  
  useEffect(() => {
    console.log("State data received:", stateData?.length);
    console.log("Current section:", currentSection);
    
    if (usMapReady) {
      setUsMapReady(false);
    }
  }, [stateData, currentSection, highlightedStates]);

  // Separate function to show tooltip
  function showTooltip(event, state) {
    if (!tooltipRef.current || !state) return;
    
    const tooltip = tooltipRef.current;
    
    // Format color based on denial rate
    const stateColor = state.denialRate > 25 ? '#F44336' : state.denialRate > 15 ? '#FFC107' : '#4CAF50';
    
    // Get color based on denial rate
    const getDenialRateColor = (rate) => {
      return rate > 25 ? '#F44336' : rate > 15 ? '#FFC107' : '#4CAF50';
    };
    
    // Format healthcare providers for tooltip
    const providersHtml = state.healthcareProviders?.map(provider => {
      const denialRateColor = getDenialRateColor(provider.denialRate);
      let html = `
        <div style="padding: 4px 0; border-bottom: 1px solid #333;">
          <div style="font-weight: medium; color: white;">${provider.name}</div>
          <div style="font-size: 14px; color: #e0e0e0;">
            Denial Rate: <span style="color: ${denialRateColor}; font-weight: bold;">${provider.denialRate}%</span>
          </div>
      `;
      
      // Add overturn rate if available
      if (provider.overturnRate) {
        html += `<div style="font-size: 14px; color: #e0e0e0;">
          Appeal Overturn Rate: <span style="color: #4ade80; font-weight: bold;">${provider.overturnRate}%</span>
        </div>`;
      }
      
      html += `</div>`;
      return html;
    }).join('') || '<div style="color: #999;">No provider data available</div>';
    
    // Create tooltip content
    const tooltipContent = `
      <div style="border-bottom: 2px solid ${stateColor}; margin-bottom: 12px; padding-bottom: 10px;">
        <div style="font-weight: bold; font-size: 18px; margin-bottom: 6px; color: white;">${state.stateName} (${state.state})</div>
        <div style="font-size: 16px; color: #e0e0e0;">
          State Denial Rate: <span style="color: ${stateColor}; font-weight: bold;">${state.denialRate}%</span>
        </div>
      </div>
      
      <div>
        <div style="font-weight: bold; font-size: 16px; margin-bottom: 8px; border-bottom: 1px solid #333; padding-bottom: 4px; color: white;">
          Healthcare Providers (${state.healthcareProviders?.length || 0})
        </div>
        ${providersHtml}
      </div>
      
      <div style="margin-top: 10px; font-size: 11px; color: #999; border-top: 1px solid #333; padding-top: 8px;">
        Data source: KFF Health Insurance Marketplace Transparency Data
      </div>
    `;
    
    // Update tooltip styles
    Object.assign(tooltip.style, {
      backgroundColor: '#1a1a1a',
      color: 'white',
      border: '1px solid #333',
      borderRadius: '6px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
      padding: '16px',
      maxWidth: '350px',
    });
    
    // Update tooltip content and make it visible
    tooltip.innerHTML = tooltipContent;
    tooltip.style.visibility = 'visible';
    
    // Position tooltip
    const padding = 15;
    const tooltipWidth = 320;
    const tooltipHeight = 300;
    
    let tooltipX = event.clientX + padding;
    let tooltipY = event.clientY - (tooltipHeight / 4);
    
    // Keep tooltip within viewport
    if (tooltipX + tooltipWidth > window.innerWidth) {
      tooltipX = event.clientX - tooltipWidth - padding;
    }
    
    if (tooltipY + tooltipHeight > window.innerHeight) {
      tooltipY = window.innerHeight - tooltipHeight - padding;
    }
    
    if (tooltipY < 0) {
      tooltipY = padding;
    }
    
    tooltip.style.left = `${tooltipX}px`;
    tooltip.style.top = `${tooltipY}px`;
    
    console.log("Showing tooltip for:", state.stateName);
  }
  
  // Function to hide tooltip
  function hideTooltip() {
    if (tooltipRef.current) {
      tooltipRef.current.style.visibility = 'hidden';
    }
  }
  
  // Function to move tooltip
  function moveTooltip(event) {
    if (!tooltipRef.current) return;
    
    const tooltip = tooltipRef.current;
    const padding = 15;
    const tooltipWidth = 320;
    const tooltipHeight = 300;
    
    let tooltipX = event.clientX + padding;
    let tooltipY = event.clientY - (tooltipHeight / 4);
    
    if (tooltipX + tooltipWidth > window.innerWidth) {
      tooltipX = event.clientX - tooltipWidth - padding;
    }
    
    if (tooltipY + tooltipHeight > window.innerHeight) {
      tooltipY = window.innerHeight - tooltipHeight - padding;
    }
    
    if (tooltipY < 0) {
      tooltipY = padding;
    }
    
    tooltip.style.left = `${tooltipX}px`;
    tooltip.style.top = `${tooltipY}px`;
  }

  // Get color based on denial rate and whether the state is highlighted
  const getStateColor = (stateData, isHighlighted) => {
    if (!isHighlighted) {
      return '#666666'; // Grey out non-highlighted states
    }
    
    const rate = stateData?.denialRate || 0;
    return rate > 25 ? '#F44336' : rate > 15 ? '#FFC107' : '#4CAF50';
  };

  // Map rendering useEffect
  useEffect(() => {
    if (!mapRef.current || usMapReady || !stateData || stateData.length === 0) {
      console.log("Skipping map render:", { 
        hasMapRef: !!mapRef.current,
        usMapReady,
        hasStateData: !!stateData,
        stateDataLength: stateData?.length || 0
      });
      return;
    }

    console.log("Rendering map with data:", stateData.length);
    
    const width = 700;
    const height = 450;
    
    // Clear previous SVG
    d3.select(mapRef.current).selectAll("*").remove();
    
    const svg = d3.select(mapRef.current)
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("preserveAspectRatio", "xMidYMid meet");
    
    // Color scale for denial rates
    const colorScale = d3.scaleThreshold()
      .domain([15, 25]) // Thresholds for color changes
      .range(['#4CAF50', '#FFC107', '#F44336']); // Green, Yellow, Red
    
    // Load US states GeoJSON
    fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json')
      .then(response => response.json())
      .then(us => {
        try {
          const statesFeature = topojson.feature(us, us.objects.states);
          const states = statesFeature.features;
          
          const projection = d3.geoAlbersUsa()
            .fitSize([width, height - 60], statesFeature);
          
          const path = d3.geoPath().projection(projection);
          
          // Create state mappings
          const stateNameById = {};
          const stateCodeById = {};
          
          // Get properties from GeoJSON
          us.objects.states.geometries.forEach(state => {
            stateNameById[state.id] = state.properties.name;
          });
          
          // Create lookup map for state names to codes
          const stateNameToCode = {};
          stateData.forEach(state => {
            if (state.stateName && state.state) {
              stateNameToCode[state.stateName] = state.state;
            }
          });
          
          // Map IDs to codes
          Object.entries(stateNameById).forEach(([id, name]) => {
            stateCodeById[id] = stateNameToCode[name];
          });
          
          // Map states in UI to state data objects for quicker lookup
          const stateDataByName = {};
          stateData.forEach(state => {
            if (state.stateName) {
              stateDataByName[state.stateName] = state;
            }
          });
          
          // Create and attach all path elements directly
          const stateG = svg.append("g");
          const statePaths = stateG.selectAll("path")
            .data(states)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", d => {
              const stateName = stateNameById[d.id];
              const stateCode = stateCodeById[d.id];
              const state = stateDataByName[stateName];
              
              if (state) {
                // If no highlighted states or this state is in the list, color by denial rate
                if (!highlightedStates || highlightedStates.length === 0 || highlightedStates.includes(stateCode)) {
                  return colorScale(state.denialRate);
                }
              }
              return "#ccc";
            })
            .attr("opacity", d => {
              const stateCode = stateCodeById[d.id];
              return (!highlightedStates || highlightedStates.length === 0 || highlightedStates.includes(stateCode)) ? 1 : 0.5;
            })
            .attr("stroke", "#fff")
            .attr("stroke-width", 0.5)
            .attr("cursor", "pointer");
          
          // Apply mouse event listeners to all paths
          statePaths.each(function(d) {
            const stateName = stateNameById[d.id];
            const stateObj = stateDataByName[stateName];
            
            if (stateObj) {
              const pathEl = this;
              
              // Event listener for hover
              pathEl.onmouseenter = function(event) {
                d3.select(pathEl)
                  .attr("stroke", "#000")
                  .attr("stroke-width", 1.5);
                
                // Use global ShowTooltip function
                showTooltip(event, stateObj);
              };
              
              // Event listener for mouse movement
              pathEl.onmousemove = function(event) {
                moveTooltip(event);
              };
              
              // Event listener for mouse leave
              pathEl.onmouseleave = function() {
                d3.select(pathEl)
                  .attr("stroke", "#fff")
                  .attr("stroke-width", 0.5);
                
                hideTooltip();
              };
            }
          });
          
          // Add legend
          const legendWidth = 200;
          const legendHeight = 20;
          const legendX = width - legendWidth - 10;
          const legendY = height - 40;
          
          const defs = svg.append("defs");
          const linearGradient = defs.append("linearGradient")
            .attr("id", legendGradientId.current)
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%");
          
          linearGradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#4CAF50");
          
          linearGradient.append("stop")
            .attr("offset", "50%")
            .attr("stop-color", "#FFC107");
          
          linearGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#F44336");
          
          // Add legend background
          svg.append("rect")
            .attr("x", legendX - 10)
            .attr("y", legendY - 25)
            .attr("width", legendWidth + 20)
            .attr("height", legendHeight + 45)
            .attr("fill", "#1f2937")
            .attr("rx", 5);
          
          svg.append("rect")
            .attr("x", legendX)
            .attr("y", legendY)
            .attr("width", legendWidth)
            .attr("height", legendHeight)
            .style("fill", `url(#${legendGradientId.current})`);
          
          svg.append("text")
            .attr("x", legendX)
            .attr("y", legendY - 5)
            .attr("text-anchor", "start")
            .style("font-size", "12px")
            .style("fill", "white")
            .text("Denial Rate (%)");
          
          svg.append("text")
            .attr("x", legendX)
            .attr("y", legendY + legendHeight + 15)
            .attr("text-anchor", "start")
            .style("font-size", "10px")
            .style("fill", "white")
            .text("Low (<15%)");
          
          svg.append("text")
            .attr("x", legendX + legendWidth/2)
            .attr("y", legendY + legendHeight + 15)
            .attr("text-anchor", "middle")
            .style("font-size", "10px")
            .style("fill", "white")
            .text("Medium (15-25%)");
          
          svg.append("text")
            .attr("x", legendX + legendWidth)
            .attr("y", legendY + legendHeight + 15)
            .attr("text-anchor", "end")
            .style("font-size", "10px")
            .style("fill", "white")
            .text("High (>25%)");
          
          setUsMapReady(true);
          console.log("Map rendered successfully");
        } catch (error) {
          console.error("Error rendering map:", error);
        }
      })
      .catch(error => {
        console.error("Error loading map data:", error);
      });
  }, [mapRef, stateData, usMapReady, highlightedStates, currentSection]);

  return (
    <div className="relative bg-black rounded-lg p-6 shadow-xl border border-zinc-800">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-xl font-semibold text-white">Healthcare Claims Denial Rates by State</h3>
      </div>
      <div 
        ref={mapRef} 
        className="w-full h-[350px] relative bg-zinc-900 rounded-lg overflow-hidden p-2 border border-zinc-800"
      ></div>
      <div className="mt-5 text-sm text-gray-300">
        <p className="italic">Hover over each state to see detailed information about healthcare providers and their denial rates.</p>
        {highlightedStates && highlightedStates.length > 0 && (
          <div className="mt-3 p-3 bg-zinc-900 rounded-md border border-zinc-800">
            <p className="font-medium text-white mb-2">
              Highlighted states:
            </p>
            <div className="flex flex-wrap gap-2">
              {highlightedStates.map(state => {
                // Find state data to determine color based on denial rate
                const stateInfo = stateData?.find(s => s.state === state);
                const stateColor = stateInfo?.denialRate > 25 ? '#F44336' : 
                                 stateInfo?.denialRate > 15 ? '#FFC107' : '#4CAF50';
                
                return (
                  <span 
                    key={state} 
                    className="px-3 py-1 rounded-md text-sm font-medium flex items-center"
                    style={{ 
                      backgroundColor: 'rgba(0,0,0,0.7)', 
                      color: 'white',
                      border: `2px solid ${stateColor || '#888'}`
                    }}
                  >
                    {state}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default USMapVisualization;
