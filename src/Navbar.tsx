import { useState, useEffect } from 'react'

interface NavbarProps {
  currentScreen: string
  setCurrentScreen: (screen: string) => void
}

export default function Navbar({ currentScreen, setCurrentScreen }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false)
    if (currentScreen === 'home') {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      setCurrentScreen('home')
      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 150)
    }
  }

  const navigateTo = (screen: string) => {
    setIsMobileMenuOpen(false)
    setCurrentScreen(screen)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getLinkClass = (screen: string) => {
    const base = "font-body-base text-body-base pb-1 transition-all duration-300 "
    if (currentScreen === screen) {
      return base + "text-primary border-b-2 border-primary font-semibold"
    }
    return base + "text-on-surface-variant hover:text-primary hover:scale-105"
  }

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-primary/10 transition-all duration-300 ${isScrolled ? 'py-2 h-16' : 'py-0 h-20'}`}>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center h-full">
          <div 
            onClick={() => navigateTo('home')}
            className="font-headline-md text-headline-md font-bold text-primary tracking-tighter cursor-pointer hover:scale-105 transition-transform duration-300"
          >
            Mycodu Agency
          </div>
          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button className="font-body-base text-body-base text-on-surface-variant hover:text-primary transition-colors hover:scale-105 pb-1" onClick={() => handleLinkClick('services')}>Services</button>
            <button className={getLinkClass('portfolio')} onClick={() => navigateTo('portfolio')}>Portfolio</button>
            <button className="font-body-base text-body-base text-on-surface-variant hover:text-primary transition-colors hover:scale-105 pb-1" onClick={() => handleLinkClick('why-choose-us')}>About</button>
            <button className={getLinkClass('process')} onClick={() => navigateTo('process')}>Process</button>
            <button className="font-body-base text-body-base text-on-surface-variant hover:text-primary transition-colors hover:scale-105 pb-1" onClick={() => handleLinkClick('contact')}>Contact</button>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => handleLinkClick('contact')} className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-button-text hover:scale-105 hover:shadow-primary/20 transition-all duration-300 active:scale-95 text-on-primary-fixed">
              Get a Quote
            </button>
          </div>
          {/* Mobile Menu Icon */}
          <button className="md:hidden text-primary hover:scale-110 active:scale-90 transition-transform p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span className="material-symbols-outlined text-3xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-surface-container/95 border-b border-white/10 px-6 py-8 space-y-6 flex flex-col items-stretch absolute top-full left-0 w-full z-40 backdrop-blur-2xl transition-all duration-300 shadow-2xl">
            <button className="text-left text-on-surface-variant hover:text-primary transition-colors py-2 border-b border-white/5 font-medium text-lg" onClick={() => handleLinkClick('services')}>Services</button>
            <button className="text-left text-on-surface-variant hover:text-primary transition-colors py-2 border-b border-white/5 font-medium text-lg" onClick={() => navigateTo('portfolio')}>Portfolio</button>
            <button className="text-left text-on-surface-variant hover:text-primary transition-colors py-2 border-b border-white/5 font-medium text-lg" onClick={() => handleLinkClick('why-choose-us')}>About</button>
            <button className="text-left text-on-surface-variant hover:text-primary transition-colors py-2 border-b border-white/5 font-medium text-lg" onClick={() => navigateTo('process')}>Process</button>
            <button className="text-left text-on-surface-variant hover:text-primary transition-colors py-2 border-b border-white/5 font-medium text-lg" onClick={() => handleLinkClick('contact')}>Contact</button>
            <button onClick={() => handleLinkClick('contact')} className="bg-primary text-on-primary py-3.5 rounded-lg font-button-text text-center text-on-primary-fixed font-semibold shadow-lg shadow-primary/20">
              Get a Quote
            </button>
          </div>
        )}
      </nav>
    </>
  )
}
