import { useEffect } from 'react'

interface ScreenProps {
  setCurrentScreen: (screen: string) => void
}

function Screen3({ setCurrentScreen }: ScreenProps) {
  useEffect(() => {
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
        listeners.forEach(({ card, listener }) => {
            card.removeEventListener('mousemove', listener)
        })
    }
  }, [])

  return (
    <div className="bg-background text-on-surface font-body-base overflow-x-hidden min-h-screen selection:bg-primary selection:text-on-primary">
      <main className="relative pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[921px] flex items-center overflow-hidden">
          <div className="max-w-container-max mx-auto px-margin-desktop relative z-10 w-full py-20">
            <div className="max-w-3xl">
              <div className="inline-block py-1 px-4 mb-6 rounded-full bg-surface-container-high border border-outline-variant font-code-label text-code-label text-tertiary">
                0x01 // ENGINEERING_EXCELLENCE
              </div>
              <h1 className="font-display-lg text-display-lg md:text-display-lg text-on-surface mb-8 leading-tight">
                ⚙️ End-to-End <br/><span className="text-primary">Full-Stack Solutions</span>
              </h1>
              <p className="font-body-base text-headline-md text-on-surface-variant mb-12 max-w-2xl font-light">
                Scalable architecture from frontend interface to robust backend systems. We engineer digital products that perform under pressure.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setCurrentScreen('process')} className="bg-primary text-on-primary font-button-text px-10 py-5 rounded-lg hover:scale-105 hover:shadow-[0_0_32px_rgba(138,235,255,0.4)] transition-all duration-300 flex items-center gap-3 text-on-primary-fixed">
                  Request a Technical Consultation
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Breakdown (Bento Grid) */}
        <section className="py-24 bg-surface-container-lowest">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="mb-20 text-center">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Core Technology Matrix</h2>
              <p className="text-on-surface-variant font-body-base">Precision engineering across every layer of the modern tech stack.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
              {/* Frontend */}
              <div className="md:col-span-8 glass-card rounded-xl p-10 hover-lift group relative overflow-hidden">
                <div className="relative z-10">
                  <span className="material-symbols-outlined text-5xl text-primary mb-6">desktop_windows</span>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Frontend Engineering</h3>
                  <p className="text-on-surface-variant font-body-base mb-8 max-w-lg">Crafting immersive, high-performance user interfaces that prioritize speed, accessibility, and fluid motion.</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="tech-pill px-4 py-2 font-code-label text-code-label text-on-surface">React</span>
                    <span className="tech-pill px-4 py-2 font-code-label text-code-label text-on-surface">Next.js</span>
                    <span className="tech-pill px-4 py-2 font-code-label text-code-label text-on-surface">Vue.js</span>
                    <span className="tech-pill px-4 py-2 font-code-label text-code-label text-on-surface">TailwindCSS</span>
                    <span className="tech-pill px-4 py-2 font-code-label text-code-label text-on-surface">TypeScript</span>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 group-hover:opacity-20 transition-opacity">
                  <img className="object-cover w-full h-full" data-alt="Frontend 3D visualizer." src="https://lh3.googleusercontent.com/aida-public/AB6AXuClhOFqakiFryqQSvbr44lxhZ2NrHjfTmi7rwLAlxLLaWycL916f3yesz-uCuF5y_Q3F8kHzEjK09TMjJvm6EsWsauulANwikPga_qoqWBB3hen6mnO-_smlj1pJmDqCJVa-_PeOtmjCeGEL6QcYv1dahop-wCnVGZB9tO5RByKxAnl8GVOQc6ne1jnlWdxl_gwz3v9FB7cQGwM6AmVXJlKmRlPC40aorPJAwQ2xk5e82gqELIOhzZbwiqhuLKpXjDFRrZL8d-42oRf"/>
                </div>
              </div>

              {/* Backend */}
              <div className="md:col-span-4 glass-card rounded-xl p-10 hover-lift group">
                <span className="material-symbols-outlined text-5xl text-secondary mb-6">database</span>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Backend Mastery</h3>
                <p className="text-on-surface-variant font-body-base mb-8">Architecting resilient, distributed systems capable of handling millions of requests.</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    <span className="font-code-label text-code-label">Node.js (Runtime)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    <span className="font-code-label text-code-label">Django (Python)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    <span className="font-code-label text-code-label">.NET Core (Enterprise)</span>
                  </div>
                </div>
              </div>

              {/* Databases */}
              <div className="md:col-span-5 glass-card rounded-xl p-10 hover-lift">
                <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Data Infrastructure</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-surface-container rounded-lg border border-outline-variant hover:border-primary transition-colors">
                    <p className="font-code-label text-primary mb-1">PostgreSQL</p>
                    <p className="text-xs text-on-surface-variant italic">Relational Integrity</p>
                  </div>
                  <div className="p-4 bg-surface-container rounded-lg border border-outline-variant hover:border-primary transition-colors">
                    <p className="font-code-label text-primary mb-1">MongoDB</p>
                    <p className="text-xs text-on-surface-variant italic">NoSQL Flexibility</p>
                  </div>
                  <div className="p-4 bg-surface-container rounded-lg border border-outline-variant hover:border-primary transition-colors">
                    <p className="font-code-label text-primary mb-1">MySQL</p>
                    <p className="text-xs text-on-surface-variant italic">Universal Standard</p>
                  </div>
                  <div className="p-4 bg-surface-container rounded-lg border border-outline-variant hover:border-primary transition-colors">
                    <p className="font-code-label text-primary mb-1">Redis</p>
                    <p className="text-xs text-on-surface-variant italic">Ultra-fast Caching</p>
                  </div>
                </div>
              </div>

              {/* Integrations */}
              <div className="md:col-span-7 glass-card rounded-xl p-10 hover-lift flex flex-col justify-between">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Enterprise Integrations</h3>
                  <p className="text-on-surface-variant font-body-base mb-6">Seamlessly connecting your custom solution with global platforms and internal legacy systems.</p>
                </div>
                <div className="flex flex-wrap items-center gap-8 opacity-70">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary">api</span>
                    <span className="font-code-label">API Dev</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary">payments</span>
                    <span className="font-code-label">Stripe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary">sync</span>
                    <span className="font-code-label">CRM Sync</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary">settings_input_component</span>
                    <span className="font-code-label">ERP Bridge</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cloud & Deployment Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="lg:w-1/2">
                <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-8">Cloud &amp; <br/><span className="text-tertiary">DevOps Strategy</span></h2>
                <p className="font-body-base text-headline-md text-on-surface-variant mb-12">We don't just build code; we deploy production-ready ecosystems that scale automatically and never go down.</p>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-high border border-outline-variant flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary">cloud</span>
                    </div>
                    <div>
                      <h4 className="font-headline-md text-lg text-on-surface mb-2">AWS / Azure / GCP</h4>
                      <p className="text-on-surface-variant text-sm">Certified cloud architects designing multi-region, high-availability deployments tailored to your specific traffic needs.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-high border border-outline-variant flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-tertiary">terminal</span>
                    </div>
                    <div>
                      <h4 className="font-headline-md text-lg text-on-surface mb-2">CI/CD Workflows</h4>
                      <p className="text-on-surface-variant text-sm">Automated pipelines that ensure every line of code is tested, scanned for security vulnerabilities, and deployed seamlessly.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="relative aspect-square glass-card rounded-3xl overflow-hidden primary-glow">
                  <img className="w-full h-full object-cover" data-alt="High tech server room setup." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBamqDKzByG_BPb_L-yyc7JH04dXTKwIArczmVlNuO0LQ6_sFN5BLuuFuQYLOWaOIP2nGHO-EPdd2xMzsAi9lXszp7Oc8OVCxY3G9LjV84qSVaSQCi54B8czrCwzoTX8HliIMWtEFdLYmjfoYX5WMFaoKWCBLUNw6KKjqwFfgD1GBL-tGjrlnQ2FuOZRR5zM8yyeIl6eHVN2kTl7tTvdbXyjXBYG2v0F93T9DWxookdqG7TB8daGx4g6THe-bRLC-lV7vpfwZpxvBU-"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="p-6 bg-surface/80 backdrop-blur-md rounded-2xl border border-white/10">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></div>
                          <span className="font-code-label text-xs uppercase tracking-widest text-on-surface">Uptime Status</span>
                        </div>
                        <span className="font-code-label text-xs text-tertiary">99.99%</span>
                      </div>
                      <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                        <div className="bg-tertiary h-full w-[99.99%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Process Timeline */}
        <section className="py-24 bg-surface-container">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="text-center mb-16">
              <h2 className="font-headline-md text-headline-md text-on-surface">How We Build</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="relative">
                <div className="font-code-label text-primary text-4xl font-bold mb-4">01</div>
                <h4 className="font-headline-md text-xl text-on-surface mb-4">Discovery</h4>
                <p className="text-on-surface-variant text-sm">Deep dive into technical requirements, user stories, and system architecture mapping.</p>
                <div className="hidden md:block absolute top-10 right-0 w-full h-[1px] bg-outline-variant"></div>
              </div>
              <div className="relative">
                <div className="font-code-label text-primary text-4xl font-bold mb-4">02</div>
                <h4 className="font-headline-md text-xl text-on-surface mb-4">Sprint Cycles</h4>
                <p className="text-on-surface-variant text-sm">Agile development with bi-weekly demos and continuous feedback loops for rapid evolution.</p>
                <div className="hidden md:block absolute top-10 right-0 w-full h-[1px] bg-outline-variant"></div>
              </div>
              <div className="relative">
                <div className="font-code-label text-primary text-4xl font-bold mb-4">03</div>
                <h4 className="font-headline-md text-xl text-on-surface mb-4">Rigorous QA</h4>
                <p className="text-on-surface-variant text-sm">End-to-end testing, security audits, and load testing to ensure zero-day stability.</p>
                <div className="hidden md:block absolute top-10 right-0 w-full h-[1px] bg-outline-variant"></div>
              </div>
              <div className="relative">
                <div className="font-code-label text-primary text-4xl font-bold mb-4">04</div>
                <h4 className="font-headline-md text-xl text-on-surface mb-4">Deployment</h4>
                <p className="text-on-surface-variant text-sm">Orchestrated launch with post-release monitoring and proactive maintenance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="glass-card rounded-[32px] p-16 relative overflow-hidden flex flex-col items-center text-center">
              <div className="relative z-10 max-w-2xl">
                <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-8">Ready to Build the <br/><span className="text-primary">Next Big Thing?</span></h2>
                <p className="font-body-base text-headline-md text-on-surface-variant mb-12">Our engineers are ready to tackle your most complex technical challenges. Let's discuss your roadmap.</p>
                <button onClick={() => setCurrentScreen('process')} className="bg-primary text-on-primary font-button-text px-12 py-6 rounded-xl hover:scale-105 hover:shadow-primary/30 transition-all duration-300 active:scale-95 text-lg font-bold text-on-primary-fixed">
                  Request a Technical Consultation
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Screen3
