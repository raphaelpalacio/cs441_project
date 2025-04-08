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
    const stateColor = state.denialRate > 25 ? '#dc2626' : state.denialRate > 15 ? '#f97316' : '#22c55e';
    
    // Format healthcare providers
    const providersHtml = state.healthcareProviders 
      ? state.healthcareProviders.map(p => {
          const providerColor = p.denialRate > 25 ? '#dc2626' : p.denialRate > 15 ? '#f97316' : '#22c55e';
          return `
            <div style="margin: 8px 0; border-left: 3px solid ${providerColor}; padding-left: 8px;">
              <div style="font-weight: 500;">${p.name}</div>
              <div>Denial Rate: <span style="color: ${providerColor}; font-weight: 500;">${p.denialRate}%</span></div>
            </div>
          `;
        }).join("")
      : "<div>No provider data available</div>";
    
    // Create tooltip content
    const tooltipContent = `
      <div style="border-bottom: 2px solid ${stateColor}; margin-bottom: 12px; padding-bottom: 8px;">
        <div style="font-weight: bold; font-size: 18px; margin-bottom: 6px;">${state.stateName} (${state.state})</div>
        <div style="font-size: 16px;">
          State Denial Rate: <span style="color: ${stateColor}; font-weight: bold;">${state.denialRate}%</span>
        </div>
      </div>
      
      <div>
        <div style="font-weight: bold; font-size: 16px; margin-bottom: 8px; border-bottom: 1px solid #ddd; padding-bottom: 4px;">
          Healthcare Providers (${state.healthcareProviders?.length || 0})
        </div>
        ${providersHtml}
      </div>
    `;
    
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
      .range(['#4CAF50', '#FFA500', '#FF0000']); // Green, Orange, Red
    
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
            .attr("stop-color", "#FFA500");
          
          linearGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#FF0000");
          
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
    <div className="relative bg-slate-800 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-white">Healthcare Claims Denial Rates by State</h3>
      </div>
      <div ref={mapRef} className="w-full h-[350px] relative"></div>
      <div className="mt-4 text-sm text-gray-300">
        <p>Hover over each state to see detailed information about healthcare providers and their denial rates.</p>
        {highlightedStates && highlightedStates.length > 0 && (
          <p className="mt-2">
            Highlighted states: {highlightedStates.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
};

export default USMapVisualization;
