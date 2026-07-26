interface FooterProps {
  setCurrentScreen: (screen: string) => void
}

export default function Footer({ setCurrentScreen }: FooterProps) {
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
    <footer id="footer" className="w-full pt-20 pb-10 bg-surface-container-lowest border-t border-outline-variant relative z-10">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-gutter mb-16">
        <div className="space-y-6">
          <div 
            onClick={() => navigateTo('home')}
            className="font-headline-md text-headline-md font-extrabold text-on-surface tracking-tighter cursor-pointer hover:text-primary transition-colors"
          >
            Mycodu
          </div>
          <p className="text-sm text-on-surface-variant max-w-xs">
            Engineering technical mastery for the next generation of global enterprises. We bridge the gap between high-end design, robust systems, and production AI.
          </p>
          <div className="flex gap-4">
            <a className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:scale-105 transition-all duration-300" href="#"><span className="material-symbols-outlined">public</span></a>
            <a className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:scale-105 transition-all duration-300" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
          </div>
        </div>
        <div>
          <h5 className="text-on-surface font-bold mb-6 text-sm uppercase tracking-wider">Expertise</h5>
          <ul className="space-y-4 text-sm">
            <li><button className="text-on-surface-variant hover:text-primary transition-colors text-left" onClick={() => navigateTo('web-dev')}>Web Development</button></li>
            <li><button className="text-on-surface-variant hover:text-primary transition-colors text-left" onClick={() => navigateTo('full-stack')}>Full-Stack Solutions</button></li>
            <li><button className="text-on-surface-variant hover:text-primary transition-colors text-left" onClick={() => navigateTo('app-dev')}>App Development</button></li>
            <li><button className="text-on-surface-variant hover:text-primary transition-colors text-left" onClick={() => navigateTo('ai-eng')}>AI &amp; Machine Learning</button></li>
          </ul>
        </div>
        <div>
          <h5 className="text-on-surface font-bold mb-6 text-sm uppercase tracking-wider">Ecosystem</h5>
          <ul className="space-y-4 text-sm">
            <li><button className="text-on-surface-variant hover:text-primary transition-colors text-left" onClick={() => navigateTo('data-science')}>Data Engineering</button></li>
            <li><button className="text-on-surface-variant hover:text-primary transition-colors text-left" onClick={() => navigateTo('ai-auto')}>Automation</button></li>
            <li><button className="text-on-surface-variant hover:text-primary transition-colors text-left" onClick={() => navigateTo('seo')}>SEO Optimization</button></li>
            <li><button className="text-on-surface-variant hover:text-primary transition-colors text-left" onClick={() => navigateTo('portfolio')}>Case Studies (Portfolio)</button></li>
          </ul>
        </div>
        <div>
          <h5 className="text-on-surface font-bold mb-6 text-sm uppercase tracking-wider">Connect &amp; Legal</h5>
          <ul className="space-y-4 text-sm">
            <li><button className="text-on-surface-variant hover:text-primary transition-colors text-left" onClick={() => navigateToHomeAndScroll('contact')}>Contact Us</button></li>
            <li><a className="text-on-surface-variant hover:text-primary transition-colors block" href="#">Privacy Policy</a></li>
            <li><a className="text-on-surface-variant hover:text-primary transition-colors block" href="#">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-on-surface-variant text-sm opacity-60">
          © 2024 Mycodu Agency. Engineered for Technical Mastery.
        </p>
        <div className="flex gap-6">
          <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer hover:scale-110 transition-transform">terminal</span>
          <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer hover:scale-110 transition-transform">code</span>
          <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer hover:scale-110 transition-transform">hub</span>
        </div>
      </div>
    </footer>
  )
}
