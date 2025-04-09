import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from './components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Healthcare Appeals Visualization',
  description: 'Interactive visualization of healthcare claims denial and appeals data across the United States',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <NavBar />
        <main className="pt-4">
          {children}
        </main>
      </body>
    </html>
  )
} 