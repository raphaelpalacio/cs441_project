"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

const USMapVisualization = ({ stateData, currentSection, highlightedStates = [], showAllTooltips = false }) => {
  const mapRef = useRef(null);
  const tooltipRef = useRef(null);
  const [usMapReady, setUsMapReady] = useState(false);
  const legendGradientId = useRef(`legend-gradient-${Math.random().toString(36).substr(2, 9)}`);
  
  useEffect(() => {
    console.log("State data received:", stateData);
    console.log("Current section:", currentSection);
    console.log("Highlighted states:", highlightedStates);
    console.log("Show all tooltips:", showAllTooltips);
    
    if (usMapReady) {
      setUsMapReady(false);
    }
  }, [stateData, currentSection, highlightedStates, showAllTooltips]);

  // Create tooltip on component mount
  useEffect(() => {
    // Remove any existing tooltips
    const existingTooltip = document.getElementById('map-tooltip');
    if (existingTooltip) {
      existingTooltip.remove();
    }
    
    // Create new tooltip with fixed positioning
    const tooltip = document.createElement('div');
    tooltip.id = 'map-tooltip';
    tooltip.style.position = 'fixed'; // Fixed positioning relative to viewport
    tooltip.style.visibility = 'hidden';
    tooltip.style.backgroundColor = 'white';
    tooltip.style.color = '#333';
    tooltip.style.padding = '16px';
    tooltip.style.borderRadius = '6px';
    tooltip.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.fontSize = '14px';
    tooltip.style.zIndex = '9999';
    tooltip.style.maxWidth = '350px';
    tooltip.style.maxHeight = '400px'; // Limit height to prevent overflow
    tooltip.style.overflowY = 'auto';
    tooltip.style.border = '1px solid #ddd';
    
    document.body.appendChild(tooltip);
    tooltipRef.current = tooltip;
    
    // Clean up on unmount
    return () => {
      if (tooltip && document.body.contains(tooltip)) {
        document.body.removeChild(tooltip);
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || usMapReady || !stateData || stateData.length === 0 || !tooltipRef.current) {
      console.log("Skipping map render:", { 
        hasMapRef: !!mapRef.current,
        usMapReady,
        hasStateData: !!stateData,
        stateDataLength: stateData?.length || 0,
        hasTooltip: !!tooltipRef.current
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
    
    // Extract the tooltip element
    const tooltip = tooltipRef.current;
    
    // Function to show tooltip
    function showTooltip(event, state) {
      if (!state) {
        console.log("No state data provided to tooltip");
        return;
      }
      
      // Format denial rate color based on value
      const stateColor = state.denialRate > 25 ? '#dc2626' : state.denialRate > 15 ? '#f97316' : '#22c55e';
      
      // Format healthcare providers with colored bars based on their denial rates
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
      
      // Update tooltip content
      tooltip.innerHTML = tooltipContent;
      tooltip.style.visibility = 'visible';
      
      // Calculate tooltip position relative to viewport
      const padding = 15;
      const tooltipWidth = 320; // Approximate width
      const tooltipHeight = 300; // Approximate height
      
      // Position to the right of cursor by default
      let tooltipX = event.clientX + padding;
      let tooltipY = event.clientY - (tooltipHeight / 4); // Position slightly above cursor
      
      // Adjust if tooltip would go off right edge of screen
      if (tooltipX + tooltipWidth > window.innerWidth) {
        tooltipX = event.clientX - tooltipWidth - padding;
      }
      
      // Adjust if tooltip would go off bottom of screen
      if (tooltipY + tooltipHeight > window.innerHeight) {
        tooltipY = window.innerHeight - tooltipHeight - padding;
      }
      
      // Adjust if tooltip would go off top of screen
      if (tooltipY < 0) {
        tooltipY = padding;
      }
      
      tooltip.style.left = `${tooltipX}px`;
      tooltip.style.top = `${tooltipY}px`;

      console.log("Showing tooltip for:", state.stateName);
    }

    // Function to hide tooltip
    function hideTooltip() {
      tooltip.style.visibility = 'hidden';
    }

    // Function to move tooltip with cursor
    function moveTooltip(event) {
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
    
    // Function to check if a state should be highlighted
    function shouldHighlightState(stateCode) {
      // If no states are highlighted (intro or conclusion), show all states normally
      if (highlightedStates.length === 0) {
        return true;
      }
      // Otherwise, only highlight states in the list
      return highlightedStates.includes(stateCode);
    }
    
    // Function to get direct DOM event handler
    function createEventHandlers(element, state, path) {
      if (!state) return;
      
      element.onmouseover = function(event) {
        console.log(`Mouse over ${state.stateName} (${state.state}), denialRate: ${state.denialRate}`);
        showTooltip(event, state);
        path.attr("stroke", "#1f2937")
            .attr("stroke-width", 2);
      };
      
      element.onmousemove = function(event) {
        moveTooltip(event);
      };
      
      element.onmouseout = function() {
        hideTooltip();
        path.attr("stroke", "#fff")
            .attr("stroke-width", 0.5);
      };
    }
    
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
          
          // Create state name and code mappings
          const stateNameById = {};
          const stateCodeById = {};
          
          // Initialize mappings from GeoJSON
          us.objects.states.geometries.forEach(state => {
            stateNameById[state.id] = state.properties.name;
          });
          
          // Map state names to codes from our data
          const stateNameToCode = {};
          stateData.forEach(state => {
            if (state.stateName && state.state) {
              stateNameToCode[state.stateName] = state.state;
            }
          });
          
          // Fill in state codes
          Object.entries(stateNameById).forEach(([id, name]) => {
            stateCodeById[id] = stateNameToCode[name];
          });
          
          console.log("State code mapping examples:", 
            Object.entries(stateCodeById).slice(0, 5).map(([id, code]) => 
              `${id}: ${stateNameById[id]} → ${code || 'unknown'}`
            )
          );

          // Draw states
          const statePaths = svg.append("g")
            .selectAll("path")
            .data(states)
            .join("path")
            .attr("d", path)
            .attr("fill", d => {
              const stateName = stateNameById[d.id];
              const stateCode = stateCodeById[d.id];
              const state = stateData.find(s => s.stateName === stateName);
              
              // If this state should be highlighted, use its color based on denial rate
              if (state && shouldHighlightState(stateCode)) {
                return colorScale(state.denialRate);
              } 
              // Otherwise, use a gray color
              return "#ccc";
            })
            .attr("opacity", d => {
              const stateCode = stateCodeById[d.id];
              return shouldHighlightState(stateCode) ? 1 : 0.5;
            })
            .attr("stroke", "#fff")
            .attr("stroke-width", 0.5)
            .attr("cursor", "pointer");

          // Add tooltips to all states regardless of highlighting
          statePaths.each(function(d) {
            const path = d3.select(this);
            const stateName = stateNameById[d.id];
            const state = stateData.find(s => s.stateName === stateName);
            
            if (state) {
              // Always add tooltip event handlers regardless of highlighting
              createEventHandlers(this, state, path);
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
  }, [mapRef, stateData, usMapReady, highlightedStates, showAllTooltips]);

  return (
    <div className="relative bg-slate-800 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-white">Healthcare Claims Denial Rates by State</h3>
      </div>
      <div ref={mapRef} className="w-full h-[350px] relative"></div>
      <div className="mt-4 text-sm text-gray-300">
        <p>Hover over each state to see detailed information about healthcare providers and their denial rates.</p>
        {highlightedStates.length > 0 && (
          <p className="mt-2">
            Highlighted states: {highlightedStates.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
};

export default USMapVisualization;
