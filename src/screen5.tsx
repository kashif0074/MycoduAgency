import { useEffect } from 'react'

interface ScreenProps {
  setCurrentScreen: (screen: string) => void
}

function Screen5({ setCurrentScreen }: ScreenProps) {
  useEffect(() => {
    const observerOptions = {
        threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible')
            }
        })
    }, observerOptions)

    const elements = document.querySelectorAll('.scroll-reveal')
    elements.forEach(el => observer.observe(el))

    const cards = document.querySelectorAll('.glass-card')
    const handleMouseMove = (e: MouseEvent, card: HTMLElement) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        card.style.setProperty('--mouse-x', `${x}px`)
        card.style.setProperty('--mouse-y', `${y}px`)
    }

    const listeners = Array.from(cards).map(cardEl => {
        const card = cardEl as HTMLElement
        const listener = (e: MouseEvent) => handleMouseMove(e, card)
        card.addEventListener('mousemove', listener)
        return { card, listener }
    })

    return () => {
        elements.forEach(el => observer.unobserve(el))
        listeners.forEach(({ card, listener }) => {
            card.removeEventListener('mousemove', listener)
        })
    }
  }, [])

  return (
    <div className="bg-background text-on-surface font-body-base overflow-x-hidden min-h-screen selection:bg-primary selection:text-on-primary">
      <main className="relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative pt-40 pb-24 md:pt-56 md:pb-40 px-margin-mobile md:px-margin-desktop">
          <div className="max-w-container-max mx-auto relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-outline-variant mb-6">
                <span className="material-symbols-outlined text-primary text-sm">database</span>
                <span className="font-code-label text-code-label text-on-surface-variant">ENGINEERED ANALYTICS</span>
              </div>
              <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-8">
                <span className="text-gradient">Data Science</span> &amp; Actionable Analytics
              </h1>
              <p className="font-body-base text-body-base text-on-surface-variant text-lg md:text-xl max-w-2xl mb-12">
                Turning raw data into strategic business intelligence. We architect the infrastructure and intelligence layers that transform complex datasets into clear, competitive advantages.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setCurrentScreen('process')} className="bg-primary text-on-primary px-8 py-4 rounded-xl font-button-text primary-glow-hover transition-all duration-300">Unlock Your Data's Potential</button>
                <button onClick={() => setCurrentScreen('process')} className="bg-surface-container-high text-on-surface px-8 py-4 rounded-xl font-button-text border border-outline-variant hover:bg-surface-variant transition-all">View Our Tech Stack</button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Bento Grid */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest relative z-10">
          <div className="scanline-ds"></div>
          <div className="max-w-container-max mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
              {/* Service 1 */}
              <div className="md:col-span-8 glass-card p-8 md:p-12 rounded-3xl group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-primary/10 group-hover:text-primary/20 transition-colors">
                  <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_tree</span>
                </div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <span className="font-code-label text-code-label text-primary mb-4 block">01 / ARCHITECTURE</span>
                    <h3 className="font-headline-md text-headline-md mb-6">Data Pipeline Engineering (ETL)</h3>
                    <p className="font-body-base text-body-base text-on-surface-variant max-w-md mb-8">
                      Robust, scalable extraction, transformation, and loading systems. We build real-time streaming architectures that ensure data integrity from source to warehouse.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-1.5 rounded-full bg-background border border-outline-variant font-code-label text-[12px] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span> APACHE KAFKA
                    </span>
                    <span className="px-4 py-1.5 rounded-full bg-background border border-outline-variant font-code-label text-[12px] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span> SNOWFLAKE
                    </span>
                    <span className="px-4 py-1.5 rounded-full bg-background border border-outline-variant font-code-label text-[12px] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span> AIRFLOW
                    </span>
                  </div>
                </div>
              </div>

              {/* Service 2 */}
              <div className="md:col-span-4 glass-card p-8 rounded-3xl group">
                <div className="mb-12 flex justify-between items-start">
                  <div className="w-16 h-16 rounded-2xl bg-primary-container/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-3xl">monitoring</span>
                  </div>
                  <span className="font-code-label text-code-label text-on-surface-variant">02</span>
                </div>
                <h3 className="font-headline-md text-headline-md mb-4 text-2xl">BI Dashboards</h3>
                <p className="font-body-base text-body-base text-on-surface-variant mb-8">
                  Executive-grade visual interfaces that provide a single source of truth for your mission-critical KPIs.
                </p>
                <div className="h-1 w-full bg-outline-variant rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-2/3"></div>
                </div>
              </div>

              {/* Service 3 */}
              <div className="md:col-span-5 glass-card p-8 rounded-3xl group">
                <div className="mb-12 flex justify-between items-start">
                  <div className="w-16 h-16 rounded-2xl bg-secondary-container/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary text-3xl">psychology</span>
                  </div>
                  <span className="font-code-label text-code-label text-on-surface-variant">03</span>
                </div>
                <h3 className="font-headline-md text-headline-md mb-4 text-2xl">Predictive Analytics &amp; Forecasting</h3>
                <p className="font-body-base text-body-base text-on-surface-variant">
                  Leveraging machine learning models to anticipate market shifts, customer behavior, and operational risks before they happen.
                </p>
              </div>

              {/* Service 4 */}
              <div className="md:col-span-7 glass-card p-8 md:p-12 rounded-3xl group overflow-hidden relative">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-1/2">
                    <span className="font-code-label text-code-label text-tertiary mb-4 block">04 / SCALE</span>
                    <h3 className="font-headline-md text-headline-md mb-4">Big Data Processing</h3>
                    <p className="font-body-base text-body-base text-on-surface-variant">
                      Managing petabyte-scale data lakes with optimized query performance and distributed computing frameworks.
                    </p>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-surface-container rounded-xl border border-white/5 text-center">
                        <div className="text-primary font-headline-md text-2xl mb-1">99.9%</div>
                        <div className="text-[10px] text-on-surface-variant uppercase tracking-widest">Accuracy</div>
                      </div>
                      <div className="p-4 bg-surface-container rounded-xl border border-white/5 text-center">
                        <div className="text-secondary font-headline-md text-2xl mb-1">&lt;200ms</div>
                        <div className="text-[10px] text-on-surface-variant uppercase tracking-widest">Latency</div>
                      </div>
                      <div className="p-4 bg-surface-container rounded-xl border border-white/5 text-center">
                        <div className="text-tertiary font-headline-md text-2xl mb-1">PB+</div>
                        <div className="text-[10px] text-on-surface-variant uppercase tracking-widest">Capacity</div>
                      </div>
                      <div className="p-4 bg-surface-container rounded-xl border border-white/5 text-center">
                        <div className="text-on-surface font-headline-md text-2xl mb-1">24/7</div>
                        <div className="text-[10px] text-on-surface-variant uppercase tracking-widest">Uptime</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Showcase Section */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop relative">
          <div className="max-w-container-max mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-1/2">
                <div className="inline-block px-3 py-1 rounded-full bg-tertiary/10 border border-tertiary/20 mb-6">
                  <span className="font-code-label text-code-label text-tertiary">VISUAL INTELLIGENCE</span>
                </div>
                <h2 className="font-headline-md text-headline-md mb-8 text-4xl md:text-5xl">
                  Custom data visualization tools for <span className="text-tertiary">complex datasets.</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="mt-1 w-6 h-6 flex-shrink-0 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-xs">done</span>
                    </div>
                    <p className="font-body-base text-body-base text-on-surface-variant">Interactive 3D representations for multi-dimensional spatial analysis.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1 w-6 h-6 flex-shrink-0 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-xs">done</span>
                    </div>
                    <p className="font-body-base text-body-base text-on-surface-variant">Real-time heatmaps and cluster mapping for rapid pattern recognition.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1 w-6 h-6 flex-shrink-0 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-xs">done</span>
                    </div>
                    <p className="font-body-base text-body-base text-on-surface-variant">Dynamic storytelling layers for stakeholder presentations.</p>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 h-[450px] rounded-3xl overflow-hidden relative glass-card group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 mix-blend-overlay"></div>
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  data-alt="A sophisticated 3D data visualization dashboard."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuClhOFqakiFryqQSvbr44lxhZ2NrHjfTmi7rwLAlxLLaWycL916f3yesz-uCuF5y_Q3F8kHzEjK09TMjJvm6EsWsauulANwikPga_qoqWBB3hen6mnO-_smlj1pJmDqCJVa-_PeOtmjCeGEL6QcYv1dahop-wCnVGZB9tO5RByKxAnl8GVOQc6ne1jnlWdxl_gwz3v9FB7cQGwM6AmVXJlKmRlPC40aorPJAwQ2xk5e82gqELIOhzZbwiqhuLKpXjDFRrZL8d-42oRf"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-8 left-8">
                  <div className="flex gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="font-code-label text-[10px] text-primary tracking-[0.2em]">LIVE DATA STREAM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10"></div>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-headline-md text-headline-md md:text-5xl mb-8">Ready to transform your data into <span className="text-primary">market dominance?</span></h2>
            <p className="font-body-base text-body-base text-on-surface-variant text-lg mb-12">
              Our team of data architects and scientists are ready to audit your current stack and propose a path toward actionable intelligence.
            </p>
            <button onClick={() => setCurrentScreen('process')} className="bg-primary text-on-primary px-10 py-5 rounded-2xl font-button-text text-lg primary-glow-hover transition-all duration-300">Unlock Your Data's Potential</button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Screen5
