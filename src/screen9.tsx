import { useEffect, useState } from 'react'

interface ScreenProps {
  setCurrentScreen: (screen: string) => void
}

function Screen9({ setCurrentScreen }: ScreenProps) {
  const [terminalLines, setTerminalLines] = useState<string[]>([])

  const navigateToHomeAndScroll = (elementId: string) => {
    setCurrentScreen('home')
    setTimeout(() => {
      const element = document.getElementById(elementId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 150)
  }

  useEffect(() => {
    const observerOptions = {
        threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0')
                entry.target.classList.remove('opacity-0', 'translate-y-10')
            }
        })
    }, observerOptions)

    const cards = document.querySelectorAll('.glass-card')
    cards.forEach(card => {
        card.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10')
        observer.observe(card)
    })

    // Animate terminal lines typing out
    const lines = [
      '# Initializing Audit...',
      '>>> Scan result: 98/100 Health Score',
      '>>> Backlink Authority: High',
      '>>> LCP: 0.8s',
      '_Executing organic growth script...'
    ]
    
    let timer1 = setTimeout(() => setTerminalLines([lines[0]]), 500)
    let timer2 = setTimeout(() => setTerminalLines([lines[0], lines[1]]), 1200)
    let timer3 = setTimeout(() => setTerminalLines([lines[0], lines[1], lines[2]]), 1900)
    let timer4 = setTimeout(() => setTerminalLines([lines[0], lines[1], lines[2], lines[3]]), 2600)
    let timer5 = setTimeout(() => setTerminalLines([lines[0], lines[1], lines[2], lines[3], lines[4]]), 3300)

    return () => {
        cards.forEach(card => observer.unobserve(card))
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
        clearTimeout(timer4)
        clearTimeout(timer5)
    }
  }, [])

  return (
    <div className="bg-background text-on-surface font-body-base overflow-x-hidden min-h-screen selection:bg-primary selection:text-on-primary">
      <main className="pt-20 overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[921px] flex items-center hero-mesh">
          <div className="max-w-container-max mx-auto px-margin-desktop relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-code-label text-code-label text-primary uppercase tracking-widest">Search Engine Optimization</span>
              </div>
              <h1 className="font-display-lg text-display-lg max-md:font-display-lg-mobile max-md:text-display-lg-mobile text-on-surface">
                Results-Driven <span className="text-primary">SEO Services</span>
              </h1>
              <p className="font-body-base text-body-base text-on-surface-variant max-w-xl">
                Dominating search results with technical mastery and strategic content. We don't just chase keywords; we engineer authority and build digital ecosystems that outrank the competition.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button onClick={() => setCurrentScreen('process')} className="bg-primary text-on-primary font-button-text px-8 py-4 rounded-lg primary-glow hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 text-on-primary-fixed">
                  Improve Your Rankings
                  <span className="material-symbols-outlined text-[18px]">trending_up</span>
                </button>
                <button onClick={() => setCurrentScreen('portfolio')} className="border border-outline text-on-surface font-button-text px-8 py-4 rounded-lg hover:bg-surface-container-high transition-colors">
                  View Case Studies
                </button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute -inset-10 bg-primary/10 blur-[100px] rounded-full"></div>
              <div className="glass-card p-8 rounded-xl relative overflow-hidden min-h-[250px] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-error"></div>
                    <div className="w-3 h-3 rounded-full bg-secondary"></div>
                    <div className="w-3 h-3 rounded-full bg-tertiary"></div>
                  </div>
                  <span className="font-code-label text-code-label text-on-surface-variant">terminal.seo</span>
                </div>
                <div className="font-code-label text-code-label space-y-2 flex-grow min-h-[100px]">
                  {terminalLines.map((line, idx) => (
                    <p key={idx} className={idx === 0 ? "text-tertiary" : idx === 4 ? "text-on-surface-variant opacity-50 mt-4" : idx === 1 ? "text-on-surface" : "text-on-surface"}>
                      {idx > 0 && idx < 4 && "> "}
                      {idx === 1 ? <>Scan result: <span className="text-primary">98/100 Health Score</span></> : idx === 2 ? <>Backlink Authority: <span className="text-secondary">High</span></> : idx === 3 ? <>LCP: <span className="text-tertiary">0.8s</span></> : line}
                    </p>
                  ))}
                  <p className="animate-pulse inline-block">_</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Offerings Section */}
        <section className="py-24 bg-surface-container-lowest relative z-10">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="mb-16">
              <span className="font-code-label text-code-label text-secondary uppercase block mb-2">Our Offerings</span>
              <h2 className="font-headline-md text-headline-md text-on-surface">Precision SEO Solutions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[280px]">
              {/* Technical SEO */}
              <div className="md:col-span-3 lg:col-span-4 glass-card p-8 rounded-xl flex flex-col justify-between group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                  <span className="material-symbols-outlined text-[28px]">settings_suggest</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-[24px] text-on-surface mb-2">Technical SEO Audits</h3>
                  <p className="font-body-base text-body-base text-on-surface-variant text-sm">Deep dive into site architecture, Core Web Vitals, and crawlability metrics.</p>
                </div>
              </div>

              {/* Keyword Research */}
              <div className="md:col-span-3 lg:col-span-4 glass-card p-8 rounded-xl flex flex-col justify-between group">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-all duration-300">
                  <span className="material-symbols-outlined text-[28px]">troubleshoot</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-[24px] text-on-surface mb-2">Keyword Research</h3>
                  <p className="font-body-base text-body-base text-on-surface-variant text-sm">Targeting intent-rich search terms that drive high-value conversion traffic.</p>
                </div>
              </div>

              {/* On-page */}
              <div className="md:col-span-6 lg:col-span-4 glass-card p-8 rounded-xl flex flex-col justify-between group">
                <div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary transition-all duration-300">
                  <span className="material-symbols-outlined text-[28px]">article</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-[24px] text-on-surface mb-2">On-page Optimization</h3>
                  <p className="font-body-base text-body-base text-on-surface-variant text-sm">Semantic content structure, metadata engineering, and internal linking strategies.</p>
                </div>
              </div>

              {/* Local SEO */}
              <div className="md:col-span-6 lg:col-span-8 glass-card p-8 rounded-xl flex flex-col md:flex-row gap-8 items-center group overflow-hidden">
                <div className="w-full md:w-1/2 h-full min-h-[160px] rounded-lg overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img className="w-full h-full object-cover" 
                    data-alt="Technical local SEO networks city map." 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBamqDKzByG_BPb_L-yyc7JH04dXTKwIArczmVlNuO0LQ6_sFN5BLuuFuQYLOWaOIP2nGHO-EPdd2xMzsAi9lXszp7Oc8OVCxY3G9LjV84qSVaSQCi54B8czrCwzoTX8HliIMWtEFdLYmjfoYX5WMFaoKWCBLUNw6KKjqwFfgD1GBL-tGjrlnQ2FuOZRR5zM8yyeIl6eHVN2kTl7tTvdbXyjXBYG2v0F93T9DWxookdqG7TB8daGx4g6THe-bRLC-lV7vpfwZpxvBU-"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="font-headline-md text-[24px] text-on-surface mb-2">Local SEO Mastery</h3>
                  <p className="font-body-base text-body-base text-on-surface-variant text-sm mb-4">Dominating geographical search queries and optimizing your Google Business Profile for maximum local visibility.</p>
                  <span className="inline-flex items-center gap-1 text-primary text-sm font-code-label">EXPLORE SERVICE <span className="material-symbols-outlined text-sm">arrow_forward</span></span>
                </div>
              </div>

              {/* Performance Reporting */}
              <div className="md:col-span-6 lg:col-span-4 glass-card p-8 rounded-xl bg-gradient-to-br from-surface-container-high to-surface-dim border-primary/20 flex flex-col justify-between group">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[28px]">analytics</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-[24px] text-on-surface mb-2">Performance Reporting</h3>
                  <p className="font-body-base text-body-base text-on-surface-variant text-sm">Transparent monthly insights, ranking shifts, and ROI tracking driven by raw data.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 max-w-container-max mx-auto px-margin-desktop relative z-10">
          <div className="text-center mb-20">
            <span className="font-code-label text-code-label text-primary uppercase block mb-2">Deployment Cycle</span>
            <h2 className="font-headline-md text-headline-md text-on-surface">Our Strategic Process</h2>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Connectors for Desktop */}
            <div className="hidden md:block absolute top-10 left-0 w-full h-[2px] bg-outline-variant/30 z-0"></div>
            {/* Step 1 */}
            <div className="relative z-10 group">
              <div className="w-20 h-20 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:border-primary group-hover:bg-primary/5">
                <span className="font-code-label text-headline-md text-on-surface-variant group-hover:text-primary transition-colors">01</span>
              </div>
              <div className="text-center">
                <h4 className="font-headline-md text-[20px] text-on-surface mb-3">Audit</h4>
                <p className="font-body-base text-body-base text-on-surface-variant text-sm">Comprehensive site health and competitor benchmarking.</p>
              </div>
            </div>
            {/* Step 2 */}
            <div className="relative z-10 group">
              <div className="w-20 h-20 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:border-secondary group-hover:bg-secondary/5">
                <span className="font-code-label text-headline-md text-on-surface-variant group-hover:text-secondary transition-colors">02</span>
              </div>
              <div className="text-center">
                <h4 className="font-headline-md text-[20px] text-on-surface mb-3">Strategy</h4>
                <p className="font-body-base text-body-base text-on-surface-variant text-sm">Engineering a custom keyword and content roadmap.</p>
              </div>
            </div>
            {/* Step 3 */}
            <div className="relative z-10 group">
              <div className="w-20 h-20 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:border-tertiary group-hover:bg-tertiary/5">
                <span className="font-code-label text-headline-md text-on-surface-variant group-hover:text-tertiary transition-colors">03</span>
              </div>
              <div className="text-center">
                <h4 className="font-headline-md text-[20px] text-on-surface mb-3">Execution</h4>
                <p className="font-body-base text-body-base text-on-surface-variant text-sm">Deploying optimizations and high-quality content assets.</p>
              </div>
            </div>
            {/* Step 4 */}
            <div className="relative z-10 group">
              <div className="w-20 h-20 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:border-primary group-hover:bg-primary/5">
                <span className="font-code-label text-headline-md text-on-surface-variant group-hover:text-primary transition-colors">04</span>
              </div>
              <div className="text-center">
                <h4 className="font-headline-md text-[20px] text-on-surface mb-3">Reporting</h4>
                <p className="font-body-base text-body-base text-on-surface-variant text-sm">Analyzing metrics and iterating for exponential growth.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 blur-[120px]"></div>
          <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
            <div className="glass-card p-12 lg:p-20 rounded-3xl text-center border-primary/20">
              <h2 className="font-display-lg text-display-lg max-md:font-display-lg-mobile max-md:text-display-lg-mobile text-on-surface mb-6">Ready to Own the First Page?</h2>
              <p className="font-body-base text-body-base text-on-surface-variant max-w-2xl mx-auto mb-10 text-lg">
                Stop leaving revenue on the table. Our SEO engineers are ready to build your dominant search presence.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={() => setCurrentScreen('portfolio')} className="bg-primary text-on-primary font-button-text text-button-text px-10 py-5 rounded-lg primary-glow hover:scale-105 active:scale-95 transition-all duration-300 text-on-primary-fixed">
                  Improve Your Rankings
                </button>
                <button onClick={() => navigateToHomeAndScroll('contact')} className="border border-outline text-on-surface font-button-text text-button-text px-10 py-5 rounded-lg hover:bg-surface-container-high transition-colors">
                  Book a Free Audit
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Screen9
