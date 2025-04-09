"use client";

import kffData from './kffTransparencyData.json';

/**
 * Get all data required for the healthcare visualizations
 * @returns {Object} Object containing stateData, highlightedInsurers, and appealsData
 */
export const getAllData = () => {
  console.log("Getting all data from KFF Transparency dataset:", kffData !== undefined);
  return kffData;
};

/**
 * Get data for a specific state
 * @param {string} stateCode - Two-letter state code (e.g., "CA")
 * @returns {Object} State data including healthcare providers
 */
export const getStateData = (stateCode) => {
  const state = kffData.stateData.find(state => state.state === stateCode);
  console.log(`Getting state data for ${stateCode}:`, state !== undefined);
  return state;
};

/**
 * Get all state data for map visualization
 * @returns {Array} Array of state data
 */
export const getAllStateData = () => {
  console.log("Getting all state data:", kffData.stateData.length);
  return kffData.stateData;
};

/**
 * Get data for highlighted insurers with high denial rates
 * @returns {Array} Array of insurers with high denial rates
 */
export const getHighlightedInsurers = () => {
  console.log("Getting highlighted insurers:", kffData.highlightedInsurers.length);
  return kffData.highlightedInsurers;
};

/**
 * Get data for appeals success rates
 * @returns {Array} Array of insurers with appeal overturn rates
 */
export const getAppealsData = () => {
  console.log("Getting appeals data:", kffData.appealsData.length);
  return kffData.appealsData;
}; 