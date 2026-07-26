import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import HomeScreen from './HomeScreen'
import Screen1 from './screen1' // Web Development
import Screen2 from './screen2' // App Development
import Screen3 from './screen3' // Full-Stack Solutions
import Screen4 from './screen4' // AI Engineering
import Screen5 from './screen5' // Data Science & Analytics
import Screen6 from './screen6' // AI Automation
import Screen7 from './screen7' // Portfolio & Case Studies
import Screen8 from './screen8' // Our Process
import Screen9 from './screen9' // SEO Services

function App() {
  const [currentScreen, setCurrentScreen] = useState('home')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any })
  }, [currentScreen])

  const renderScreen = () => {
    switch (currentScreen) {
      case 'web-dev': return <Screen1 setCurrentScreen={setCurrentScreen} />
      case 'app-dev': return <Screen2 setCurrentScreen={setCurrentScreen} />
      case 'full-stack': return <Screen3 setCurrentScreen={setCurrentScreen} />
      case 'ai-eng': return <Screen4 setCurrentScreen={setCurrentScreen} />
      case 'data-science': return <Screen5 setCurrentScreen={setCurrentScreen} />
      case 'ai-auto': return <Screen6 setCurrentScreen={setCurrentScreen} />
      case 'portfolio': return <Screen7 setCurrentScreen={setCurrentScreen} />
      case 'process': return <Screen8 setCurrentScreen={setCurrentScreen} />
      case 'seo': return <Screen9 setCurrentScreen={setCurrentScreen} />
      case 'home':
      default:
        return <HomeScreen setCurrentScreen={setCurrentScreen} />
    }
  }

  return (
    <div className="bg-background min-h-screen text-on-surface flex flex-col">
      <Navbar currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      <main className="flex-grow">
        <div key={currentScreen} className="fade-in-route">
          {renderScreen()}
        </div>
      </main>
      <Footer setCurrentScreen={setCurrentScreen} />
    </div>
  )
}

export default App
