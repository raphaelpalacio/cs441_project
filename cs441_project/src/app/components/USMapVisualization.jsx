"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

const USMapVisualization = ({ stateData }) => {
  const mapRef = useRef(null);
  const [usMapReady, setUsMapReady] = useState(false);
  const [activeProperty, setActiveProperty] = useState('denialRate'); // Default to showing denial rates

  useEffect(() => {
    if (!mapRef.current || usMapReady || !stateData || stateData.length === 0) return;

    const width = 700;
    const height = 450;
    
    // Clear previous SVG if any
    d3.select(mapRef.current).selectAll("*").remove();
    
    const svg = d3.select(mapRef.current)
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("preserveAspectRatio", "xMidYMid meet");
    
    const tooltip = d3.select(mapRef.current)
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("color", "#333")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("box-shadow", "0 0 10px rgba(0,0,0,0.1)")
      .style("pointer-events", "none")
      .style("font-size", "12px")
      .style("z-index", "100");
    
    // Color scale for denial rates
    const colorScale = d3.scaleSequential()
      .domain([10, 35]) // Minimum to maximum denial rate
      .interpolator(d3.interpolateReds);
    
    // Load US states GeoJSON
    fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json')
      .then(response => response.json())
      .then(us => {
        try {
          // Convert TopoJSON to GeoJSON
          const statesFeature = topojson.feature(us, us.objects.states);
          const states = statesFeature.features;
          
          // Create a projection for the map
          const projection = d3.geoAlbersUsa()
            .fitSize([width, height - 60], statesFeature);
          
          const path = d3.geoPath().projection(projection);
          
          // State name mapping for joining data
          const stateNameById = {};
          const stateLookup = {};
          
          // Process state data for lookup
          stateData.forEach(d => {
            stateLookup[d.state] = d;
          });
          
          // Get state names from topology
          us.objects.states.geometries.forEach(state => {
            const id = state.id;
            const stateName = state.properties?.name;
            stateNameById[id] = stateName;
          });

          // Draw the map with states
          svg.append("g")
            .selectAll("path")
            .data(states)
            .join("path")
            .attr("d", path)
            .attr("fill", d => {
              const stateCode = Object.keys(stateLookup).find(
                code => stateLookup[code].stateName === stateNameById[d.id]
              );
              return stateCode && stateLookup[stateCode] 
                ? colorScale(stateLookup[stateCode][activeProperty]) 
                : "#ccc";
            })
            .attr("stroke", "#fff")
            .attr("stroke-width", 0.5)
            .on("mouseover", function(event, d) {
              const stateCode = Object.keys(stateLookup).find(
                code => stateLookup[code].stateName === stateNameById[d.id]
              );
              
              if (stateCode && stateLookup[stateCode]) {
                const data = stateLookup[stateCode];
                tooltip
                  .style("visibility", "visible")
                  .html(`
                    <strong>${data.stateName}</strong><br>
                    Denial Rate: ${data.denialRate}%<br>
                    Appeal Rate: ${(data.appealRate * 100).toFixed(2)}%
                  `);
                
                d3.select(this)
                  .attr("stroke", "black")
                  .attr("stroke-width", 1.5);
              }
            })
            .on("mousemove", function(event) {
              tooltip
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 20) + "px");
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
          
          // Create gradient for legend
          const defs = svg.append("defs");
          const linearGradient = defs.append("linearGradient")
            .attr("id", "legend-gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%");
          
          linearGradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", colorScale(10));
          
          linearGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", colorScale(35));
          
          // Add legend rectangle
          svg.append("rect")
            .attr("x", legendX)
            .attr("y", legendY)
            .attr("width", legendWidth)
            .attr("height", legendHeight)
            .style("fill", "url(#legend-gradient)");
          
          // Add legend title
          svg.append("text")
            .attr("x", legendX)
            .attr("y", legendY - 5)
            .attr("text-anchor", "start")
            .style("font-size", "12px")
            .style("fill", "white")
            .text("Denial Rate (%)");
          
          // Add legend min/max labels
          svg.append("text")
            .attr("x", legendX)
            .attr("y", legendY + legendHeight + 15)
            .attr("text-anchor", "start")
            .style("font-size", "10px")
            .style("fill", "white")
            .text("10%");
          
          svg.append("text")
            .attr("x", legendX + legendWidth)
            .attr("y", legendY + legendHeight + 15)
            .attr("text-anchor", "end")
            .style("font-size", "10px")
            .style("fill", "white")
            .text("35%+");
          
          // Add title
          svg.append("text")
            .attr("x", width / 2)
            .attr("y", 20)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .style("fill", "white")
            .text("Healthcare Claims Denial Rates by State");
          
          setUsMapReady(true);
        } catch (error) {
          console.error("Error rendering map:", error);
        }
      })
      .catch(error => {
        console.error("Error loading map data:", error);
      });
  }, [mapRef, stateData, usMapReady, activeProperty]);

  // Toggle between showing denial rates and appeal rates
  const toggleMapData = () => {
    setActiveProperty(activeProperty === 'denialRate' ? 'appealRate' : 'denialRate');
    setUsMapReady(false); // Trigger re-render
  };

  return (
    <div className="relative bg-slate-800 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-white">U.S. Healthcare Data Map</h3>
        <button 
          onClick={toggleMapData}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {activeProperty === 'denialRate' ? 'Show Appeal Rates' : 'Show Denial Rates'}
        </button>
      </div>
      <div ref={mapRef} className="w-full h-[350px] relative"></div>
    </div>
  );
};

export default USMapVisualization;
