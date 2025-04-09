"use client";

import kffData from './kffTransparencyData.json';
import additionalData from './additionalStatesData.json';
import additionalData2 from './additionalStatesData2.json';
import additionalData3 from './additionalStatesData3.json';

// Merge all state data
const mergedData = {
  ...kffData,
  stateData: [
    ...kffData.stateData,
    ...additionalData.additionalStates,
    ...additionalData2.moreStates,
    ...additionalData3.finalStates
  ]
};

/**
 * Get all data required for the healthcare visualizations
 * @returns {Object} Object containing stateData, highlightedInsurers, and appealsData
 */
export const getAllData = () => {
  console.log("Getting all data from KFF Transparency dataset:", mergedData !== undefined);
  return mergedData;
};

/**
 * Get data for a specific state
 * @param {string} stateCode - Two-letter state code (e.g., "CA")
 * @returns {Object} State data including healthcare providers
 */
export const getStateData = (stateCode) => {
  const state = mergedData.stateData.find(state => state.state === stateCode);
  console.log(`Getting state data for ${stateCode}:`, state !== undefined);
  return state;
};

/**
 * Get all state data for map visualization
 * @returns {Array} Array of state data
 */
export const getAllStateData = () => {
  console.log("Getting all state data:", mergedData.stateData.length);
  return mergedData.stateData;
};

/**
 * Get data for highlighted insurers with high denial rates
 * @returns {Array} Array of insurers with high denial rates
 */
export const getHighlightedInsurers = () => {
  console.log("Getting highlighted insurers:", mergedData.highlightedInsurers.length);
  return mergedData.highlightedInsurers;
};

/**
 * Get data for appeals success rates
 * @returns {Array} Array of insurers with appeal overturn rates
 */
export const getAppealsData = () => {
  console.log("Getting appeals data:", mergedData.appealsData.length);
  return mergedData.appealsData;
}; 