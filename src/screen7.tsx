import { useEffect, useState } from 'react'
import omniflowImg from './assets/omniflow_erp.png'

interface ScreenProps {
  setCurrentScreen: (screen: string) => void
}

function Screen7({ setCurrentScreen }: ScreenProps) {
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    // Atmospheric parallax on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01
      const cards = document.querySelectorAll('.glass-card')
      cards.forEach(card => {
        (card as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`
      })
    }
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const cases = [
    {
      id: 1,
      category: 'Fintech',
      title: 'Quantum Pay',
      desc: 'Modernized the architecture for a cross-border payment platform, optimizing transaction latency and security protocols.',
      tags: ['React', 'Node.js', 'AWS Lambda'],
      stat: '1M+ Users',
      statLabel: 'Scaled Successfully',
      imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCx5Y6KAoog4cwgRayg74zVGAfyCg0tqPC4wAxBoqPJz79LdFMu9wb5emW4jIck2qZ7aFnkcyHuq2Nej9Qp8LLulxDtt5976W8exGAV_by4ZwkX2Edwhyk0nxjFfuuVQqUViGJgqS_jq9c6gmozsh3wEw00aLsoMSrdiFkJH2u2B8OX6MWFjQKsnTxdu76BR2JhrBNzU5440_I3cyWsGSFuQrlG6HXrO0umaL9pSurKHl1WkpVNdyBegi3yawc2F_9f1D8yFve1J2BY',
      colSpan: 'lg:col-span-8',
      type: ['App', 'Web']
    },
    {
      id: 2,
      category: 'Health AI',
      title: 'NeuralDiagnostics',
      desc: 'Revolutionary diagnostic AI using convolutional neural networks to detect anomalies in radiological imaging with extreme precision.',
      tags: [],
      stat: '99.4%',
      statLabel: 'Accuracy Rate',
      imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPl2yH_dC7inqKVZKxcXDVjlPDqLwkYhwhsDBqp0pe_TTEaYfQdGY9T4Ez4vO-CTUGgHEj0vuY-XpzlpjHGb8u9DqlqwE3zwxTN3XVOO0YZDfgjQ3HJe3DY5VgstuHCAH1IXmm1A15FIRvkpS5Cw1Yr8cD2E9-QrsjpdunhHtsduD60SMATICnpF-sXE59u3N62pTVTzpNb4H7BtPv6MkDBjgaRWd9fMrcjvschYj4nNyyRJrYP8INJpaevC2EauBXWicgRvDSKgwT',
      colSpan: 'lg:col-span-4',
      type: ['AI']
    },
    {
      id: 3,
      category: 'SaaS',
      title: 'OmniFlow ERP',
      desc: 'Streamlining enterprise operations with automated workflow orchestration and integrated supply chain management.',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
      stat: '+40%',
      statLabel: 'Efficiency Boost',
      imgSrc: omniflowImg,
      colSpan: 'lg:col-span-4',
      type: ['Web', 'App']
    },
    {
      id: 4,
      category: 'SEO & Marketing',
      title: 'GlobalRetail SEO',
      desc: 'Strategic technical SEO overhaul for a multinational retailer, focusing on core web vitals and semantic search relevance.',
      tags: [],
      stat: '+300%',
      statLabel: 'Organic Growth',
      imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClhOFqakiFryqQSvbr44lxhZ2NrHjfTmi7rwLAlxLLaWycL916f3yesz-uCuF5y_Q3F8kHzEjK09TMjJvm6EsWsauulANwikPga_qoqWBB3hen6mnO-_smlj1pJmDqCJVa-_PeOtmjCeGEL6QcYv1dahop-wCnVGZB9tO5RByKxAnl8GVOQc6ne1jnlWdxl_gwz3v9FB7cQGwM6AmVXJlKmRlPC40aorPJAwQ2xk5e82gqELIOhzZbwiqhuLKpXjDFRrZL8d-42oRf',
      colSpan: 'lg:col-span-8',
      type: ['SEO', 'Web']
    }
  ]

  const filteredCases = activeFilter === 'All' 
    ? cases 
    : cases.filter(c => c.type.includes(activeFilter))

  return (
    <div className="bg-background text-on-surface font-body-base overflow-x-hidden min-h-screen selection:bg-primary/30 selection:text-primary">
      <main className="pt-32">
        {/* Hero Section */}
        <section className="relative max-w-container-max mx-auto px-margin-desktop mb-20 text-center">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-full h-[500px] pointer-events-none overflow-hidden opacity-30"></div>
          <div className="relative z-10">
            <span className="font-code-label text-code-label text-primary bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-6 tracking-widest uppercase">Showcase</span>
            <h1 className="font-display-lg text-display-lg text-on-surface mb-6 leading-tight">
              Our Portfolio of <span className="text-primary italic">Success</span>
            </h1>
            <p className="font-body-base text-body-base text-on-surface-variant max-w-2xl mx-auto text-lg">
              Real solutions, measurable results. We engineer digital excellence for high-performance teams.
            </p>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="max-w-container-max mx-auto px-margin-desktop mb-16">
          <div className="flex flex-wrap justify-center gap-3">
            {['All', 'Web', 'App', 'AI', 'SEO'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full border font-button-text transition-all duration-300 ${
                  activeFilter === filter 
                    ? 'border-primary bg-primary text-on-primary' 
                    : 'border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        {/* Case Study Bento Grid */}
        <section className="max-w-container-max mx-auto px-margin-desktop mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {filteredCases.map(c => (
              <div key={c.id} className={`${c.colSpan} glass-card rounded-xl overflow-hidden group transition-all duration-500`}>
                <div className="flex flex-col md:flex-row h-full">
                  <div className="flex-1 p-10 flex flex-col justify-between">
                    <div>
                      <span className="font-code-label text-code-label text-secondary mb-4 block">{c.category}</span>
                      <h3 className="font-headline-md text-headline-md mb-4 group-hover:text-primary transition-colors">{c.title}</h3>
                      <p className="text-on-surface-variant font-body-base mb-8">{c.desc}</p>
                      {c.tags.length > 0 && (
                        <div className="flex gap-3 mb-8">
                          {c.tags.map(t => (
                            <span key={t} className="tech-pill px-3 py-1 rounded text-xs text-on-surface">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
                      <span className="block font-headline-md text-headline-md text-primary font-bold">{c.stat}</span>
                      <span className="text-on-surface-variant font-code-label text-xs uppercase">{c.statLabel}</span>
                    </div>
                  </div>
                  {c.imgSrc ? (
                    <div className="w-full md:w-[400px] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent to-surface z-10 hidden md:block"></div>
                      <img 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        alt={c.title} 
                        src={c.imgSrc}
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-full md:w-[400px] flex items-center justify-center p-10 bg-gradient-to-br from-surface-container-high to-surface">
                      <div className="bg-secondary/10 p-8 rounded-xl border border-secondary/20 mb-8 text-center animate-float w-full">
                        <span className="text-4xl font-bold text-secondary">{c.stat}</span>
                        <p className="text-on-surface-variant font-body-base mt-2">{c.statLabel}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Client Wall */}
        <section className="bg-surface-container-low py-20">
          <div className="max-w-container-max mx-auto px-margin-desktop text-center">
            <h4 className="font-code-label text-code-label text-on-surface-variant uppercase tracking-[0.2em] mb-12">Trusted by Technical Leaders</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-gutter opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="h-12 flex items-center justify-center font-headline-md font-bold">TECHCORP</div>
              <div className="h-12 flex items-center justify-center font-headline-md font-bold italic">N LOGIC</div>
              <div className="h-12 flex items-center justify-center font-headline-md font-bold tracking-tighter">DATASTREAM</div>
              <div className="h-12 flex items-center justify-center font-headline-md font-bold">V-SHIFT</div>
              <div className="h-12 flex items-center justify-center font-headline-md font-bold italic tracking-widest">CYBERA</div>
              <div className="h-12 flex items-center justify-center font-headline-md font-bold">FLOW.IO</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-container-max mx-auto px-margin-desktop py-32 text-center">
          <div className="glass-card p-20 rounded-[2rem] relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-8">Ready to Scale?</h2>
              <p className="text-on-surface-variant font-body-base text-xl max-w-xl mx-auto mb-12">
                Partner with an agency that understands the code as well as the commerce. Let's build your next breakthrough.
              </p>
              <button onClick={() => setCurrentScreen('process')} className="bg-primary text-on-primary px-12 py-5 rounded-xl font-button-text text-lg hover:scale-105 hover:shadow-[0_0_40px_rgba(138,235,255,0.4)] transition-all duration-300 active:scale-95 flex items-center gap-3 mx-auto">
                Start Your Success Story
                <span className="material-symbols-outlined">trending_up</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Screen7
