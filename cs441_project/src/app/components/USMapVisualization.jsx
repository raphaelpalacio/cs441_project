"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

const USMapVisualization = ({ stateData }) => {
  const mapRef = useRef(null);
  const [usMapReady, setUsMapReady] = useState(false);
  const legendGradientId = useRef(`legend-gradient-${Math.random().toString(36).substr(2, 9)}`);
  
  useEffect(() => {
    console.log("State data received:", stateData);
    
    if (usMapReady) {
      setUsMapReady(false);
    }
  }, [stateData]);

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
    
    // Clear previous SVG and tooltips if any
    d3.select(mapRef.current).selectAll("*").remove();
    d3.select("body").selectAll(".map-tooltip").remove();
    
    const svg = d3.select(mapRef.current)
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("preserveAspectRatio", "xMidYMid meet");
    
    // Create tooltip div
    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "map-tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("color", "#333")
      .style("padding", "12px")
      .style("border-radius", "6px")
      .style("box-shadow", "0 2px 10px rgba(0,0,0,0.2)")
      .style("pointer-events", "none")
      .style("font-size", "14px")
      .style("z-index", "9999")
      .style("max-width", "350px")
      .style("max-height", "80vh")
      .style("overflow-y", "auto")
      .style("border", "1px solid #ddd");

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
          
          // Create state name mapping
          const stateNameById = {};
          us.objects.states.geometries.forEach(state => {
            stateNameById[state.id] = state.properties.name;
          });

          // Log state names mapping
          console.log("State names mapping sample:", 
            Object.entries(stateNameById).slice(0, 5)
          );

          // Log some examples of matching
          Object.entries(stateNameById).slice(0, 5).forEach(([id, name]) => {
            const matchedState = stateData.find(s => s.stateName === name);
            console.log(`State ${name} (ID: ${id}) matched:`, matchedState ? "Yes" : "No");
          });

          // Draw states
          svg.append("g")
            .selectAll("path")
            .data(states)
            .join("path")
            .attr("d", path)
            .attr("fill", d => {
              const stateName = stateNameById[d.id];
              const state = stateData.find(s => s.stateName === stateName);
              return state ? colorScale(state.denialRate) : "#ccc";
            })
            .attr("stroke", "#fff")
            .attr("stroke-width", 0.5)
            .attr("cursor", "pointer")
            .on("mouseover", function(event, d) {
              const stateName = stateNameById[d.id];
              console.log("Mouseover state:", stateName);
              
              const state = stateData.find(s => s.stateName === stateName);
              
              if (state) {
                console.log("Found state data:", state);
                const stateColor = state.denialRate > 25 ? '#dc2626' : state.denialRate > 15 ? '#f97316' : '#22c55e';
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

                const tooltipContent = `
                  <div style="border-bottom: 2px solid ${stateColor}; margin-bottom: 12px;">
                    <div style="font-weight: bold; font-size: 18px; margin-bottom: 4px;">${state.stateName} (${state.state})</div>
                    <div style="font-size: 16px; margin-bottom: 8px;">
                      State Denial Rate: <span style="color: ${stateColor}; font-weight: bold;">${state.denialRate}%</span>
                    </div>
                  </div>
                  
                  <div style="margin-bottom: 8px;">
                    <div style="font-weight: bold; font-size: 16px; margin-bottom: 4px; border-bottom: 1px solid #ddd; padding-bottom: 4px;">
                      Healthcare Providers (${state.healthcareProviders?.length || 0})
                    </div>
                    ${providersHtml}
                  </div>
                `;

                // Position the tooltip near the cursor
                const mousePos = d3.pointer(event);
                const svgRect = svg.node().getBoundingClientRect();
                
                tooltip
                  .style("left", (event.clientX + svgRect.left + 15) + "px")
                  .style("top", (event.clientY + svgRect.top - 10) + "px")
                  .style("visibility", "visible")
                  .html(tooltipContent);
                
                d3.select(this)
                  .attr("stroke", "#1f2937")
                  .attr("stroke-width", 2);
              }
            })
            .on("mousemove", function(event) {
              const svgRect = svg.node().getBoundingClientRect();
              
              tooltip
                .style("left", (event.clientX + 15) + "px")
                .style("top", (event.clientY - 10) + "px");
            })
            .on("mouseout", function() {
              tooltip.style("visibility", "hidden");
              d3.select(this)
                .attr("stroke", "#fff")
                .attr("stroke-width", 0.5);
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

    // Cleanup function to remove tooltip when component unmounts
    return () => {
      d3.select("body").selectAll(".map-tooltip").remove();
    };
  }, [mapRef, stateData, usMapReady]);

  return (
    <div className="relative bg-slate-800 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-white">Healthcare Claims Denial Rates by State</h3>
      </div>
      <div ref={mapRef} className="w-full h-[350px] relative"></div>
      <div className="mt-4 text-sm text-gray-300">
        <p>Hover over each state to see detailed information about healthcare providers and their denial rates.</p>
      </div>
    </div>
  );
};

export default USMapVisualization;
