import { useState, useEffect, useRef } from 'react'

interface NavbarProps {
  currentScreen: string
  setCurrentScreen: (screen: string) => void
}

export default function Navbar({ currentScreen, setCurrentScreen }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsServicesDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false)
    setIsServicesDropdownOpen(false)
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
    setIsServicesDropdownOpen(false)
    setCurrentScreen(screen)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getLinkClass = (screen: string) => {
    const base = "font-body-base text-sm pb-1 transition-all duration-300 "
    if (currentScreen === screen) {
      return base + "text-primary border-b-2 border-primary font-semibold"
    }
    return base + "text-on-surface-variant hover:text-primary hover:scale-105"
  }

  const isServiceScreen = ['web-dev', 'app-dev', 'full-stack', 'ai-eng', 'data-science', 'ai-auto', 'seo'].includes(currentScreen)

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-primary/10 transition-all duration-300 ${isScrolled ? 'py-2 h-16' : 'py-0 h-20'}`}>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center h-full">
          {/* Brand Logo */}
          <div 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-on-primary-container font-black text-lg shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              M
            </span>
            <span className="font-headline-md text-xl md:text-2xl font-extrabold text-primary tracking-tighter group-hover:text-white transition-colors">
              Mycodu<span className="text-secondary font-light">Agency</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-7">
            {/* Services Dropdown */}
            <div 
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setIsServicesDropdownOpen(true)}
              onMouseLeave={() => setIsServicesDropdownOpen(false)}
            >
              <button 
                onClick={() => handleLinkClick('services')}
                className={`flex items-center gap-1 font-body-base text-sm pb-1 transition-all duration-300 ${isServiceScreen ? 'text-primary border-b-2 border-primary font-semibold' : 'text-on-surface-variant hover:text-primary'}`}
              >
                Services
                <span className="material-symbols-outlined text-base transition-transform duration-200">
                  {isServicesDropdownOpen ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {/* Dropdown Menu */}
              {isServicesDropdownOpen && (
                <div className="absolute top-full -left-12 w-72 bg-surface-container-high/95 backdrop-blur-2xl border border-white/10 rounded-xl p-3 shadow-2xl space-y-1 animate-fade-in z-50">
                  <button 
                    onClick={() => navigateTo('web-dev')}
                    className="w-full text-left p-2 rounded-lg hover:bg-surface-variant/40 flex items-center gap-3 transition-colors text-sm"
                  >
                    <span className="material-symbols-outlined text-primary text-xl">language</span>
                    <div>
                      <div className="font-semibold text-on-surface">Web Development</div>
                      <div className="text-xs text-on-surface-variant">Modern React &amp; Next.js</div>
                    </div>
                  </button>

                  <button 
                    onClick={() => navigateTo('app-dev')}
                    className="w-full text-left p-2 rounded-lg hover:bg-surface-variant/40 flex items-center gap-3 transition-colors text-sm"
                  >
                    <span className="material-symbols-outlined text-secondary text-xl">smartphone</span>
                    <div>
                      <div className="font-semibold text-on-surface">Mobile Apps</div>
                      <div className="text-xs text-on-surface-variant">iOS &amp; Android Native / Expo</div>
                    </div>
                  </button>

                  <button 
                    onClick={() => navigateTo('full-stack')}
                    className="w-full text-left p-2 rounded-lg hover:bg-surface-variant/40 flex items-center gap-3 transition-colors text-sm"
                  >
                    <span className="material-symbols-outlined text-tertiary text-xl">layers</span>
                    <div>
                      <div className="font-semibold text-on-surface">Full-Stack Solutions</div>
                      <div className="text-xs text-on-surface-variant">APIs, Cloud &amp; Microservices</div>
                    </div>
                  </button>

                  <button 
                    onClick={() => navigateTo('ai-eng')}
                    className="w-full text-left p-2 rounded-lg hover:bg-surface-variant/40 flex items-center gap-3 transition-colors text-sm"
                  >
                    <span className="material-symbols-outlined text-primary text-xl">psychology</span>
                    <div>
                      <div className="font-semibold text-on-surface">AI Engineering</div>
                      <div className="text-xs text-on-surface-variant">Custom LLMs, RAG &amp; Agents</div>
                    </div>
                  </button>

                  <button 
                    onClick={() => navigateTo('data-science')}
                    className="w-full text-left p-2 rounded-lg hover:bg-surface-variant/40 flex items-center gap-3 transition-colors text-sm"
                  >
                    <span className="material-symbols-outlined text-secondary text-xl">database</span>
                    <div>
                      <div className="font-semibold text-on-surface">Data Science</div>
                      <div className="text-xs text-on-surface-variant">Predictive Analytics &amp; Pipelines</div>
                    </div>
                  </button>

                  <button 
                    onClick={() => navigateTo('ai-auto')}
                    className="w-full text-left p-2 rounded-lg hover:bg-surface-variant/40 flex items-center gap-3 transition-colors text-sm"
                  >
                    <span className="material-symbols-outlined text-tertiary text-xl">smart_toy</span>
                    <div>
                      <div className="font-semibold text-on-surface">AI Automation</div>
                      <div className="text-xs text-on-surface-variant">Workflow &amp; Operations RPA</div>
                    </div>
                  </button>

                  <button 
                    onClick={() => navigateTo('seo')}
                    className="w-full text-left p-2 rounded-lg hover:bg-surface-variant/40 flex items-center gap-3 transition-colors text-sm"
                  >
                    <span className="material-symbols-outlined text-primary text-xl">query_stats</span>
                    <div>
                      <div className="font-semibold text-on-surface">SEO Optimization</div>
                      <div className="text-xs text-on-surface-variant">Technical Search Authority</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button className={getLinkClass('portfolio')} onClick={() => navigateTo('portfolio')}>Portfolio</button>
            <button className="font-body-base text-sm text-on-surface-variant hover:text-primary transition-colors hover:scale-105 pb-1" onClick={() => handleLinkClick('why-choose-us')}>About</button>
            <button className={getLinkClass('process')} onClick={() => navigateTo('process')}>Process</button>
            <button className="font-body-base text-sm text-on-surface-variant hover:text-primary transition-colors hover:scale-105 pb-1" onClick={() => handleLinkClick('contact')}>Contact</button>
          </div>

          {/* Quote Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => handleLinkClick('contact')} 
              className="bg-primary text-on-primary px-5 py-2 rounded-lg text-sm font-semibold hover:scale-105 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 active:scale-95 text-on-primary-fixed"
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-primary hover:scale-110 active:scale-90 transition-transform p-2" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-3xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-surface-container-high/98 border-b border-white/10 px-6 py-6 space-y-4 flex flex-col items-stretch absolute top-full left-0 w-full z-40 backdrop-blur-2xl transition-all duration-300 shadow-2xl max-h-[80vh] overflow-y-auto">
            <button className="text-left text-on-surface-variant hover:text-primary transition-colors py-2 border-b border-white/5 font-medium text-base" onClick={() => handleLinkClick('services')}>
              🌐 All Services
            </button>
            <div className="grid grid-cols-2 gap-2 pl-2 pb-2">
              <button className="text-left text-xs text-primary py-1" onClick={() => navigateTo('web-dev')}>• Web Development</button>
              <button className="text-left text-xs text-primary py-1" onClick={() => navigateTo('app-dev')}>• Mobile Apps</button>
              <button className="text-left text-xs text-primary py-1" onClick={() => navigateTo('full-stack')}>• Full-Stack</button>
              <button className="text-left text-xs text-primary py-1" onClick={() => navigateTo('ai-eng')}>• AI Engineering</button>
              <button className="text-left text-xs text-primary py-1" onClick={() => navigateTo('data-science')}>• Data Science</button>
              <button className="text-left text-xs text-primary py-1" onClick={() => navigateTo('seo')}>• SEO Optimization</button>
            </div>
            <button className="text-left text-on-surface-variant hover:text-primary transition-colors py-2 border-b border-white/5 font-medium text-base" onClick={() => navigateTo('portfolio')}>💼 Portfolio &amp; Case Studies</button>
            <button className="text-left text-on-surface-variant hover:text-primary transition-colors py-2 border-b border-white/5 font-medium text-base" onClick={() => handleLinkClick('why-choose-us')}>⚡ About Us</button>
            <button className="text-left text-on-surface-variant hover:text-primary transition-colors py-2 border-b border-white/5 font-medium text-base" onClick={() => navigateTo('process')}>⚙️ Engineering Process</button>
            <button className="text-left text-on-surface-variant hover:text-primary transition-colors py-2 border-b border-white/5 font-medium text-base" onClick={() => handleLinkClick('contact')}>📬 Contact Us</button>
            <button onClick={() => handleLinkClick('contact')} className="bg-primary text-on-primary py-3 rounded-lg text-center text-on-primary-fixed font-bold shadow-lg shadow-primary/20">
              Get a Quote
            </button>
          </div>
        )}
      </nav>
    </>
  )
}
