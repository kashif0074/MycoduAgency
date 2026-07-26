import { useEffect } from 'react'

interface ScreenProps {
  setCurrentScreen: (screen: string) => void
}

function Screen4({ setCurrentScreen }: ScreenProps) {
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
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          <div className="max-w-container-max mx-auto px-margin-desktop relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 glass-card rounded-full">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-code-label text-code-label text-primary uppercase">Production-Ready AI Engineering</span>
              </div>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg leading-tight">
                Future-Proof <br/>
                <span className="text-primary text-glow">AI Engineering</span>
              </h1>
              <p className="font-body-base text-body-base text-on-surface-variant max-w-xl text-lg">
                Leveraging custom models and LLMs to solve complex business challenges. We build the intelligence that scales with your ambition.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setCurrentScreen('process')} className="bg-primary text-on-primary-fixed px-8 py-4 rounded-lg font-button-text flex items-center gap-2 hover:scale-105 hover:shadow-primary/40 shadow-xl transition-all glow-primary">
                  Innovate with AI
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
                <button onClick={() => setCurrentScreen('portfolio')} className="px-8 py-4 glass-card rounded-lg font-button-text text-on-surface hover:bg-white/5 transition-all">
                  View Case Studies
                </button>
              </div>
            </div>
            {/* Hero Visual Element: Bento Cluster */}
            <div className="hidden lg:grid grid-cols-6 grid-rows-6 gap-4 h-[600px]">
              <div className="col-span-4 row-span-4 glass-card rounded-2xl overflow-hidden relative group">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  data-alt="A cinematic, high-detail visualization of a glowing neural network mesh." 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPl2yH_dC7inqKVZKxcXDVjlPDqLwkYhwhsDBqp0pe_TTEaYfQdGY9T4Ez4vO-CTUGgHEj0vuY-XpzlpjHGb8u9DqlqwE3zwxTN3XVOO0YZDfgjQ3HJe3DY5VgstuHCAH1IXmm1A15FIRvkpS5Cw1Yr8cD2E9-QrsjpdunhHtsduD60SMATICnpF-sXE59u3N62pTVTzpNb4H7BtPv6MkDBjgaRWd9fMrcjvschYj4nNyyRJrYP8INJpaevC2EauBXWicgRvDSKgwT"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              </div>
              <div className="col-span-2 row-span-3 glass-card rounded-2xl flex flex-col items-center justify-center p-6 text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-2">neurology</span>
                <div className="font-headline-md text-xl text-primary">99.9%</div>
                <div className="font-code-label text-xs text-on-surface-variant">Inference Uptime</div>
              </div>
              <div className="col-span-2 row-span-3 glass-card rounded-2xl flex flex-col items-center justify-center p-6 text-center mt-[-2rem]">
                <span className="material-symbols-outlined text-4xl text-secondary mb-2">speed</span>
                <div className="font-headline-md text-xl text-secondary">&lt;200ms</div>
                <div className="font-code-label text-xs text-on-surface-variant">Latency Optimized</div>
              </div>
              <div className="col-span-4 row-span-2 glass-card rounded-2xl p-6 flex items-center gap-4">
                <div className="flex -space-x-4">
                  <div className="w-10 h-10 rounded-full border-2 border-surface-container-high bg-primary"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-surface-container-high bg-secondary"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-surface-container-high bg-tertiary"></div>
                </div>
                <div>
                  <div className="font-button-text text-on-surface">LLM Integration Specialists</div>
                  <div className="font-code-label text-[10px] text-on-surface-variant">TRUSTED BY 50+ ENTERPRISES</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Pillars Section */}
        <section className="py-24 bg-surface-container-lowest relative overflow-hidden">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-headline-md text-headline-md text-on-surface">Core AI Pillars</h2>
              <p className="font-body-base text-body-base text-on-surface-variant max-w-2xl mx-auto">
                End-to-end intelligence built on the world's most advanced architectural foundations.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
              <div className="md:col-span-7 glass-card rounded-2xl p-10 flex flex-col justify-between group hover:border-primary/40 transition-colors">
                <div>
                  <span className="material-symbols-outlined text-5xl text-primary mb-6 group-hover:scale-110 transition-transform">model_training</span>
                  <h3 className="font-headline-md text-2xl mb-4">Custom ML Models</h3>
                  <p className="font-body-base text-on-surface-variant max-w-md">
                    Bespoke model training tailored to your proprietary datasets. We don't just use AI; we build your AI.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  <span className="px-3 py-1 glass-card rounded text-xs font-code-label text-primary">PyTorch</span>
                  <span className="px-3 py-1 glass-card rounded text-xs font-code-label text-primary">TensorFlow</span>
                  <span className="px-3 py-1 glass-card rounded text-xs font-code-label text-primary">Scikit-learn</span>
                </div>
              </div>
              <div className="md:col-span-5 glass-card rounded-2xl p-10 flex flex-col bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
                <span className="material-symbols-outlined text-5xl text-secondary mb-6">forum</span>
                <h3 className="font-headline-md text-2xl mb-4">LLM Integration</h3>
                <p className="font-body-base text-on-surface-variant mb-6">
                  Deep expertise in OpenAI, Claude, and Llama 3 ecosystem integration for enterprise workflows.
                </p>
                <div className="space-y-3 mt-auto">
                  <div className="flex items-center gap-3 text-sm text-on-surface">
                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                    RAG Architecture Implementation
                  </div>
                  <div className="flex items-center gap-3 text-sm text-on-surface">
                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                    Prompt Engineering &amp; Fine-tuning
                  </div>
                </div>
              </div>
              <div className="md:col-span-4 glass-card rounded-2xl p-8 flex flex-col group hover:border-tertiary/40 transition-all">
                <span className="material-symbols-outlined text-4xl text-tertiary mb-4">visibility</span>
                <h3 className="font-headline-md text-xl mb-2">Computer Vision</h3>
                <p className="font-body-base text-sm text-on-surface-variant">
                  Real-time object detection and spatial analysis for manufacturing and security.
                </p>
              </div>
              <div className="md:col-span-8 glass-card rounded-2xl p-8 flex items-center justify-between group overflow-hidden">
                <div className="max-w-md relative z-10">
                  <span className="material-symbols-outlined text-4xl text-primary-container mb-4">translate</span>
                  <h3 className="font-headline-md text-xl mb-2">NLP &amp; Chatbots</h3>
                  <p className="font-body-base text-sm text-on-surface-variant">
                    Transform customer experience with multi-lingual, empathetic, and task-oriented conversational agents.
                  </p>
                </div>
                <div className="hidden lg:block opacity-20 group-hover:opacity-40 transition-opacity">
                  <span className="material-symbols-outlined text-[160px] translate-x-12">smart_toy</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deployment & MLOps Section */}
        <section className="py-24 relative">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative">
                <div className="absolute -inset-10 bg-primary/10 blur-[100px] rounded-full"></div>
                <div className="glass-card p-1 rounded-2xl relative z-10">
                  <div className="bg-background rounded-xl p-8">
                    <div className="flex items-center justify-between mb-8 border-b border-outline-variant pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-error"></div>
                        <div className="w-3 h-3 rounded-full bg-tertiary"></div>
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                      </div>
                      <div className="font-code-label text-xs text-outline">mlops_deployment.yaml</div>
                    </div>
                    <div className="space-y-4 font-code-label text-sm">
                      <div className="flex gap-4"><span className="text-secondary">01</span> <span className="text-on-surface">deployment:</span></div>
                      <div className="flex gap-4"><span className="text-secondary">02</span> <span className="pl-4 text-on-surface">target:</span> <span className="text-primary">production-cluster</span></div>
                      <div className="flex gap-4"><span className="text-secondary">03</span> <span className="pl-4 text-on-surface">auto_scale:</span> <span className="text-tertiary">true</span></div>
                      <div className="flex gap-4"><span className="text-secondary">04</span> <span className="pl-4 text-on-surface">monitoring:</span></div>
                      <div className="flex gap-4"><span className="text-secondary">05</span> <span className="pl-8 text-on-surface">drift_detection:</span> <span className="text-primary">active</span></div>
                      <div className="flex gap-4"><span className="text-secondary">06</span> <span className="pl-8 text-on-surface">latency_threshold:</span> <span className="text-tertiary">150ms</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="relative aspect-square glass-card rounded-3xl overflow-hidden primary-glow">
                  <img className="w-full h-full object-cover" data-alt="A cinematic, detailed close-up of a high-tech server room." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBamqDKzByG_BPb_L-yyc7JH04dXTKwIArczmVlNuO0LQ6_sFN5BLuuFuQYLOWaOIP2nGHO-EPdd2xMzsAi9lXszp7Oc8OVCxY3G9LjV84qSVaSQCi54B8czrCwzoTX8HliIMWtEFdLYmjfoYX5WMFaoKWCBLUNw6KKjqwFfgD1GBL-tGjrlnQ2FuOZRR5zM8yyeIl6eHVN2kTl7tTvdbXyjXBYG2v0F93T9DWxookdqG7TB8daGx4g6THe-bRLC-lV7vpfwZpxvBU-"/>
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

export default Screen4
