import ScrollytellingContainer from './components/ScrollytellingContainer'
import StatsSummary from './components/StatsSummary'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">
          Healthcare Claims Denials & Appeals
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Explore how healthcare claims are denied and appealed across the United States, with detailed statistics by state and provider.
        </p>
      </div>
      
      <StatsSummary />
      
      <div className="mt-10">
        <ScrollytellingContainer />
      </div>
      
      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>© 2023 Healthcare Data Project | CS441</p>
      </footer>
    </div>
  )
} 