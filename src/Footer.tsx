import { useState } from 'react'
import LegalModal from './components/LegalModal'

interface FooterProps {
  setCurrentScreen: (screen: string) => void
}

export default function Footer({ setCurrentScreen }: FooterProps) {
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null)

  const navigateTo = (screen: string) => {
    setCurrentScreen(screen)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateToHomeAndScroll = (elementId: string) => {
    setCurrentScreen('home')
    setTimeout(() => {
      const element = document.getElementById(elementId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 150)
  }

  return (
    <>
      <footer id="footer" className="w-full pt-20 pb-10 bg-surface-container-lowest border-t border-outline-variant relative z-10">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-gutter mb-16">
          <div className="space-y-6">
            <div 
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <span className="w-7 h-7 rounded-md bg-primary text-on-primary-container font-black flex items-center justify-center text-sm">
                M
              </span>
              <span className="font-headline-md text-2xl font-extrabold text-on-surface tracking-tighter group-hover:text-primary transition-colors">
                Mycodu<span className="text-primary font-light">Agency</span>
              </span>
            </div>
            <p className="text-sm text-on-surface-variant max-w-xs leading-relaxed">
              Engineering technical mastery for the next generation of global enterprises. We bridge the gap between high-end design, robust systems, and production AI.
            </p>
            <div className="flex gap-3">
              <a 
                className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-all" 
                href="https://mycodu.com" 
                aria-label="Agency Website"
              >
                <span className="material-symbols-outlined text-lg">public</span>
              </a>
              <button 
                className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-all" 
                onClick={() => navigateToHomeAndScroll('contact')}
                aria-label="Email Inquiry"
              >
                <span className="material-symbols-outlined text-lg">alternate_email</span>
              </button>
            </div>
          </div>

          <div>
            <h5 className="text-on-surface font-bold mb-6 text-sm uppercase tracking-wider text-primary">Core Services</h5>
            <ul className="space-y-3.5 text-sm">
              <li><button className="text-on-surface-variant hover:text-primary transition-colors text-left" onClick={() => navigateTo('web-dev')}>Web Development</button></li>
              <li><button className="text-on-surface-variant hover:text-primary transition-colors text-left" onClick={() => navigateTo('app-dev')}>Mobile App Development</button></li>
              <li><button className="text-on-surface-variant hover:text-primary transition-colors text-left" onClick={() => navigateTo('full-stack')}>Full-Stack Solutions</button></li>
              <li><button className="text-on-surface-variant hover:text-primary transition-colors text-left" onClick={() => navigateTo('ai-eng')}>AI &amp; Machine Learning</button></li>
            </ul>
          </div>

          <div>
            <h5 className="text-on-surface font-bold mb-6 text-sm uppercase tracking-wider text-secondary">Ecosystem</h5>
            <ul className="space-y-3.5 text-sm">
              <li><button className="text-on-surface-variant hover:text-primary transition-colors text-left" onClick={() => navigateTo('data-science')}>Data Engineering</button></li>
              <li><button className="text-on-surface-variant hover:text-primary transition-colors text-left" onClick={() => navigateTo('ai-auto')}>AI Automation &amp; RPA</button></li>
              <li><button className="text-on-surface-variant hover:text-primary transition-colors text-left" onClick={() => navigateTo('seo')}>Technical SEO Optimization</button></li>
              <li><button className="text-on-surface-variant hover:text-primary transition-colors text-left" onClick={() => navigateTo('portfolio')}>Case Studies (Portfolio)</button></li>
              <li><button className="text-on-surface-variant hover:text-primary transition-colors text-left" onClick={() => navigateTo('process')}>Engineering Process</button></li>
            </ul>
          </div>

          <div>
            <h5 className="text-on-surface font-bold mb-6 text-sm uppercase tracking-wider text-tertiary">Connect &amp; Legal</h5>
            <ul className="space-y-3.5 text-sm">
              <li><button className="text-on-surface-variant hover:text-primary transition-colors text-left font-medium" onClick={() => navigateToHomeAndScroll('contact')}>Contact Us</button></li>
              <li><button className="text-on-surface-variant hover:text-primary transition-colors text-left" onClick={() => setLegalModalType('privacy')}>Privacy Policy</button></li>
              <li><button className="text-on-surface-variant hover:text-primary transition-colors text-left" onClick={() => setLegalModalType('terms')}>Terms of Service</button></li>
            </ul>
          </div>
        </div>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-on-surface-variant text-sm opacity-70">
            &copy; {new Date().getFullYear()} Mycodu Agency. Engineered for Technical Mastery.
          </p>
          <div className="flex gap-4 text-xs font-mono text-on-surface-variant opacity-60">
            <span>Next-Gen Systems</span>
            <span>&bull;</span>
            <span>Production AI</span>
            <span>&bull;</span>
            <span>Global Scale</span>
          </div>
        </div>
      </footer>

      {/* Legal Information Modal */}
      <LegalModal 
        isOpen={legalModalType !== null} 
        type={legalModalType} 
        onClose={() => setLegalModalType(null)} 
      />
    </>
  )
}
