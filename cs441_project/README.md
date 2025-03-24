# Healthcare Appeals Data Visualization Project

A Next.js-based web application that visualizes healthcare insurance claim denial rates and appeals processes across the United States. This project uses D4.js and Recharts to create interactive data visualizations that help users understand the current state of healthcare insurance claims and appeals.

## Features

- Interactive US map visualization showing denial rates by state
- Detailed charts displaying denial and appeal rates
- Scrollytelling narrative explaining the healthcare appeals crisis
- Responsive design with modern UI components
- Built with Next.js 16 and TypeScript

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v19 or higher)
- npm (v10 or higher)

## Installation

2. Clone the repository:
```bash
git clone https://github.com/raphaelpalacio/cs441_project.git
cd cs441_project
```

2. Install dependencies:
```bash
npm install
```

This will install all required dependencies including:
- d3: For data visualization
- recharts: For React-based charts
- topojson-client: For US map visualization
- lucide-react: For icons
- next: The React framework
- react & react-dom: Core React libraries
- typescript: For type safety
- tailwindcss: For styling

## Development

To run the development server:

```bash
npm run dev
```

This will start the development server with Turbopack enabled. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Building for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── components/        # React components
│   │   ├── AppealRatesChart.jsx
│   │   ├── DenialRatesChart.jsx
│   │   ├── ScrollytellingContainer.jsx
│   │   ├── StatsSummary.jsx
│   │   └── USMapVisualization.jsx
│   ├── data/             # Data files
│   │   ├── articleContent.js
│   │   └── mockData.js
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── public/               # Static assets
└── types/               # TypeScript type definitions
```

## Technologies Used

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Visualization**: 
  - D3.js
  - Recharts
  - TopoJSON
- **Icons**: Lucide React
- **Development Tools**:
  - ESLint
  - TypeScript
  - Turbopack

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Data sourced from Kaiser Family Foundation (KFF)
- Built with Next.js and React
- Visualization tools from D3.js and Recharts
