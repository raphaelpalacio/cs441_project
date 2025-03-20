// Provides mock data for the healthcare appeals visualizations
export const getInitialData = () => {
    // Insurers with high denial rates
    const highlightedInsurers = [
      { name: "Oscar Health Plan (Illinois)", denialRate: 29.5 },
      { name: "Ambetter from MHS (Indiana)", denialRate: 49.2 },
      { name: "Celtic Insurance Company", denialRate: 49.7 },
      { name: "Friday Health Plans", denialRate: 49.9 },
      { name: "Blue Cross Blue Shield (NC)", denialRate: 19.5 },
      { name: "Blue Care Network of Michigan", denialRate: 23.0 }
    ];
    
    // Appeals success data
    const appealsData = [
      { name: "Blue Care Network of Michigan", overturnRate: 88.6 },
      { name: "Moda Health Plan, Inc.", overturnRate: 76.9 },
      { name: "Providence Health Plan", overturnRate: 76.2 },
      { name: "McLaren Health Plan Community", overturnRate: 74.0 }
    ];
    
    // State-level data for map
    const stateData = [
      { state: "AL", stateName: "Alabama", denialRate: 32.4, appealRate: 0.08 },
      { state: "AK", stateName: "Alaska", denialRate: 14.2, appealRate: 0.12 },
      { state: "AZ", stateName: "Arizona", denialRate: 18.9, appealRate: 0.22 },
      { state: "AR", stateName: "Arkansas", denialRate: 14.1, appealRate: 0.44 },
      { state: "CA", stateName: "California", denialRate: 17.3, appealRate: 0.19 },
      { state: "CO", stateName: "Colorado", denialRate: 15.7, appealRate: 0.31 },
      { state: "CT", stateName: "Connecticut", denialRate: 12.6, appealRate: 0.27 },
      { state: "DE", stateName: "Delaware", denialRate: 27.8, appealRate: 0.05 },
      { state: "FL", stateName: "Florida", denialRate: 19.3, appealRate: 0.14 },
      { state: "GA", stateName: "Georgia", denialRate: 17.1, appealRate: 0.18 },
      { state: "HI", stateName: "Hawaii", denialRate: 10.3, appealRate: 0.35 },
      { state: "ID", stateName: "Idaho", denialRate: 13.8, appealRate: 0.29 },
      { state: "IL", stateName: "Illinois", denialRate: 20.5, appealRate: 0.13 },
      { state: "IN", stateName: "Indiana", denialRate: 24.2, appealRate: 0.09 },
      { state: "IA", stateName: "Iowa", denialRate: 13.6, appealRate: 0.34 },
      { state: "KS", stateName: "Kansas", denialRate: 22.1, appealRate: 0.16 },
      { state: "KY", stateName: "Kentucky", denialRate: 18.5, appealRate: 0.23 },
      { state: "LA", stateName: "Louisiana", denialRate: 31.6, appealRate: 0.11 },
      { state: "ME", stateName: "Maine", denialRate: 11.8, appealRate: 0.31 },
      { state: "MD", stateName: "Maryland", denialRate: 15.9, appealRate: 0.25 },
      { state: "MA", stateName: "Massachusetts", denialRate: 12.1, appealRate: 0.32 },
      { state: "MI", stateName: "Michigan", denialRate: 19.8, appealRate: 0.16 },
      { state: "MN", stateName: "Minnesota", denialRate: 13.2, appealRate: 0.28 },
      { state: "MS", stateName: "Mississippi", denialRate: 21.7, appealRate: 0.13 },
      { state: "MO", stateName: "Missouri", denialRate: 18.3, appealRate: 0.19 },
      { state: "MT", stateName: "Montana", denialRate: 14.9, appealRate: 0.24 },
      { state: "NE", stateName: "Nebraska", denialRate: 16.3, appealRate: 0.22 },
      { state: "NV", stateName: "Nevada", denialRate: 17.5, appealRate: 0.21 },
      { state: "NH", stateName: "New Hampshire", denialRate: 13.1, appealRate: 0.27 },
      { state: "NJ", stateName: "New Jersey", denialRate: 15.6, appealRate: 0.24 },
      { state: "NM", stateName: "New Mexico", denialRate: 16.8, appealRate: 0.23 },
      { state: "NY", stateName: "New York", denialRate: 14.3, appealRate: 0.26 },
      { state: "NC", stateName: "North Carolina", denialRate: 19.7, appealRate: 0.08 },
      { state: "ND", stateName: "North Dakota", denialRate: 12.9, appealRate: 0.29 },
      { state: "OH", stateName: "Ohio", denialRate: 17.6, appealRate: 0.20 },
      { state: "OK", stateName: "Oklahoma", denialRate: 21.5, appealRate: 0.14 },
      { state: "OR", stateName: "Oregon", denialRate: 11.4, appealRate: 1.94 },
      { state: "PA", stateName: "Pennsylvania", denialRate: 15.1, appealRate: 0.25 },
      { state: "RI", stateName: "Rhode Island", denialRate: 11.9, appealRate: 0.33 },
      { state: "SC", stateName: "South Carolina", denialRate: 20.3, appealRate: 0.15 },
      { state: "SD", stateName: "South Dakota", denialRate: 14.7, appealRate: 0.27 },
      { state: "TN", stateName: "Tennessee", denialRate: 19.9, appealRate: 0.17 },
      { state: "TX", stateName: "Texas", denialRate: 22.8, appealRate: 0.12 },
      { state: "UT", stateName: "Utah", denialRate: 15.5, appealRate: 0.26 },
      { state: "VT", stateName: "Vermont", denialRate: 10.8, appealRate: 0.36 },
      { state: "VA", stateName: "Virginia", denialRate: 16.7, appealRate: 0.21 },
      { state: "WA", stateName: "Washington", denialRate: 13.7, appealRate: 0.27 },
      { state: "WV", stateName: "West Virginia", denialRate: 18.2, appealRate: 0.18 },
      { state: "WI", stateName: "Wisconsin", denialRate: 16.2, appealRate: 0.23 },
      { state: "WY", stateName: "Wyoming", denialRate: 16.3, appealRate: 0.64 }
    ];
  
    return {
      stateData,
      highlightedInsurers,
      appealsData
    };
  };