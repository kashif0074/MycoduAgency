import { useEffect, useState } from 'react'

interface ScreenProps {
  setCurrentScreen: (screen: string) => void
}

function Screen6({ setCurrentScreen }: ScreenProps) {
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  
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

    const panels = document.querySelectorAll('.glass-panel')
    const handleMouseMove = (e: MouseEvent, panel: HTMLElement) => {
        const rect = panel.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        panel.style.setProperty('--mouse-x', `${x}px`)
        panel.style.setProperty('--mouse-y', `${y}px`)
    }

    const listeners = Array.from(panels).map(panelEl => {
        const panel = panelEl as HTMLElement
        const listener = (e: MouseEvent) => handleMouseMove(e, panel)
        panel.addEventListener('mousemove', listener)
        return { panel, listener }
    })

    // Animate terminal lines typing out
    const lines = [
      '> Initializing AI Agent: SupportBot_01...',
      '> Analyzing incoming data stream...',
      '> Optimized 42 manual tasks found.',
      '> Error reduction: 99.4%'
    ]
    
    let timer1 = setTimeout(() => setTerminalLines([lines[0]]), 500)
    let timer2 = setTimeout(() => setTerminalLines([lines[0], lines[1]]), 1200)
    let timer3 = setTimeout(() => setTerminalLines([lines[0], lines[1], lines[2]]), 2000)
    let timer4 = setTimeout(() => setTerminalLines([lines[0], lines[1], lines[2], lines[3]]), 2800)

    return () => {
        elements.forEach(el => observer.unobserve(el))
        listeners.forEach(({ panel, listener }) => {
            panel.removeEventListener('mousemove', listener)
        })
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
        clearTimeout(timer4)
    }
  }, [])

  return (
    <div className="bg-background text-on-surface font-body-base overflow-x-hidden min-h-screen selection:bg-primary selection:text-on-primary">
      <main className="relative pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[921px] flex items-center overflow-hidden">
          <div className="max-w-container-max mx-auto px-margin-desktop relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-code-label text-code-label text-primary uppercase">Autonomous AI Solutions</span>
              </div>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg leading-tight">
                Intelligent <span className="text-primary">AI Automation</span>
              </h1>
              <p className="text-on-surface-variant text-xl max-w-xl">
                Streamlining operations with custom workflow automation and AI agents. We engineer the bridge between raw data and actionable intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button onClick={() => setCurrentScreen('process')} className="bg-primary text-on-primary-fixed font-button-text px-8 py-4 rounded-xl primary-button-glow hover:scale-105 transition-all">
                  Automate Your Workflow
                </button>
                <button onClick={() => setCurrentScreen('process')} className="border border-outline text-on-surface font-button-text px-8 py-4 rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">play_circle</span>
                  View Process
                </button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="glass-panel p-8 rounded-3xl glow-primary relative overflow-hidden min-h-[300px] flex flex-col justify-between">
                <div className="scanline-auto"></div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>
                  <span className="font-code-label text-code-label text-on-surface-variant">terminal.sh</span>
                </div>
                <div className="font-code-label text-code-label text-tertiary-fixed-dim space-y-2 flex-grow min-h-[120px]">
                  {terminalLines.map((line, index) => (
                    <p key={index} className={index === 1 ? "text-on-surface-variant" : index > 1 ? "text-primary" : ""}>
                      {line}
                    </p>
                  ))}
                  <p className="animate-pulse inline-block">_</p>
                </div>
              </div>
              {/* Decorative Floating Card */}
              <div className="absolute -bottom-10 -left-10 glass-panel p-6 rounded-2xl glow-primary flex items-center gap-4 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="bg-secondary/20 p-3 rounded-lg">
                  <span className="material-symbols-outlined text-secondary">trending_up</span>
                </div>
                <div>
                  <div className="text-2xl font-bold">85%</div>
                  <div className="text-xs text-on-surface-variant">Efficiency Gain</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Efficiency Focus Banner */}
        <section className="bg-surface-container-lowest py-20 relative border-y border-outline-variant">
          <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div className="space-y-2">
              <h3 className="font-headline-md text-headline-md text-primary">-90%</h3>
              <p className="text-on-surface-variant">Manual Overhead Reduction</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-headline-md text-headline-md text-tertiary">0.01%</h3>
              <p className="text-on-surface-variant">Human-Induced Error Rate</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-headline-md text-headline-md text-secondary">24/7</h3>
              <p className="text-on-surface-variant">Automated Logic Uptime</p>
            </div>
          </div>
        </section>

        {/* Solutions Bento Grid */}
        <section className="py-24 max-w-container-max mx-auto px-margin-desktop">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="font-headline-md text-headline-md mb-4">Enterprise-Grade <span className="text-primary">Automation Solutions</span></h2>
            <p className="text-on-surface-variant">We don't just build scripts; we build intelligent ecosystems that evolve with your business needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            {/* Internal Tool Ops */}
            <div className="md:col-span-3 glass-panel p-8 rounded-3xl glow-hover flex flex-col justify-between group">
              <div className="flex justify-between items-start">
                <div className="bg-primary/10 p-4 rounded-2xl group-hover:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined text-primary text-4xl">dashboard_customize</span>
                </div>
                <span className="font-code-label text-code-label opacity-30">01</span>
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-2">Internal Tool Ops</h4>
                <p className="text-on-surface-variant">Custom dashboards and admin tools that connect disparate SaaS stacks into a single source of truth.</p>
              </div>
            </div>

            {/* AI Agents */}
            <div className="md:col-span-3 glass-panel p-8 rounded-3xl glow-hover flex flex-col justify-between group overflow-hidden relative">
              <div className="flex justify-between items-start relative z-10">
                <div className="bg-tertiary/10 p-4 rounded-2xl group-hover:bg-tertiary/20 transition-colors">
                  <span className="material-symbols-outlined text-tertiary text-4xl">smart_toy</span>
                </div>
                <span className="font-code-label text-code-label opacity-30">02</span>
              </div>
              <div className="relative z-10">
                <h4 className="text-2xl font-bold mb-2">AI Agents for Sales/Support</h4>
                <p className="text-on-surface-variant">Autonomous LLM-powered agents that handle tier-1 inquiries and lead qualification with human-like precision.</p>
              </div>
            </div>

            {/* RPA */}
            <div className="md:col-span-2 glass-panel p-8 rounded-3xl glow-hover flex flex-col justify-between group">
              <div className="flex justify-between items-start">
                <div className="bg-secondary/10 p-4 rounded-2xl group-hover:bg-secondary/20 transition-colors">
                  <span className="material-symbols-outlined text-secondary text-4xl">precision_manufacturing</span>
                </div>
                <span className="font-code-label text-code-label opacity-30">03</span>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">RPA Solutions</h4>
                <p className="text-on-surface-variant text-sm">Robotic Process Automation for legacy systems where APIs don't exist.</p>
              </div>
            </div>

            {/* Data Processing */}
            <div className="md:col-span-4 glass-panel p-8 rounded-3xl glow-hover flex flex-col justify-between group relative overflow-hidden min-h-[200px]">
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity bg-cover bg-center" 
                data-alt="Binary streams data data-visualizer background."
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBt-w7kjTuySGGMYyXbXYrwMo63s-uIiz40m5RfAB_SwUHseLaiT0YwTUg0vITgRytDAZr4rW8IotqeWi4bakWk8t6zkwpBnAyNqwrp8SOoYJ8xq33K7E18KksBSbB9rsgRZwlokbPVXwLlEEk9Ju0D_DKQXJi7ucJZRVSYpl1dFuSj8E4UFQTZ6gMSwQZQ49LVVn8BvvkUEbd6LqejteFwTcz27v7ITHNRvcjOZgsfpX6ltuHUAR1cNMja7Zde_7D2dSwlT4CsukII')" }}
              ></div>
              <div className="flex justify-between items-start relative z-10">
                <div className="bg-primary/10 p-4 rounded-2xl group-hover:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined text-primary text-4xl">data_exploration</span>
                </div>
                <span className="font-code-label text-code-label opacity-30">04</span>
              </div>
              <div className="relative z-10">
                <h4 className="text-2xl font-bold mb-2">Automated Data Processing</h4>
                <p className="text-on-surface-variant">End-to-end pipelines that ingest, clean, and analyze gigabytes of data in real-time without human intervention.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-24 bg-surface-container-low">
          <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <h2 className="font-headline-md text-headline-md">Our Programmatic <span className="text-tertiary">Approach</span></h2>
              <div className="space-y-12 relative">
                {/* Connecting Line */}
                <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-gradient-to-b from-primary via-tertiary to-secondary"></div>
                {/* Step 1 */}
                <div className="flex gap-10 items-start relative">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high border-2 border-primary flex items-center justify-center relative z-10 glow-primary">
                    <span className="font-code-label text-primary">01</span>
                  </div>
                  <div>
                    <h5 className="text-xl font-bold mb-2">Audit &amp; Identification</h5>
                    <p className="text-on-surface-variant">We map your existing workflows to identify high-latency manual tasks ripe for automation.</p>
                  </div>
                </div>
                {/* Step 2 */}
                <div className="flex gap-10 items-start relative">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high border-2 border-tertiary flex items-center justify-center relative z-10">
                    <span className="font-code-label text-tertiary">02</span>
                  </div>
                  <div>
                    <h5 className="text-xl font-bold mb-2">Architecting Logic</h5>
                    <p className="text-on-surface-variant">Our engineers design a fault-tolerant logic map using state-of-the-art AI frameworks.</p>
                  </div>
                </div>
                {/* Step 3 */}
                <div className="flex gap-10 items-start relative">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high border-2 border-secondary flex items-center justify-center relative z-10">
                    <span className="font-code-label text-secondary">03</span>
                  </div>
                  <div>
                    <h5 className="text-xl font-bold mb-2">Deployment &amp; Optimization</h5>
                    <p className="text-on-surface-variant">Seamless integration into your current tech stack with continuous monitoring and fine-tuning.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-square rounded-3xl glass-panel overflow-hidden relative">
                <img className="w-full h-full object-cover" 
                  data-alt="A professional server rack close-up visual." 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBamqDKzByG_BPb_L-yyc7JH04dXTKwIArczmVlNuO0LQ6_sFN5BLuuFuQYLOWaOIP2nGHO-EPdd2xMzsAi9lXszp7Oc8OVCxY3G9LjV84qSVaSQCi54B8czrCwzoTX8HliIMWtEFdLYmjfoYX5WMFaoKWCBLUNw6KKjqwFfgD1GBL-tGjrlnQ2FuOZRR5zM8yyeIl6eHVN2kTl7tTvdbXyjXBYG2v0F93T9DWxookdqG7TB8daGx4g6THe-bRLC-lV7vpfwZpxvBU-"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="max-w-container-max mx-auto px-margin-desktop relative z-10 text-center">
            <div className="glass-panel p-16 rounded-[40px] glow-primary max-w-4xl mx-auto border border-primary/20">
              <h2 className="font-display-lg text-display-lg-mobile md:text-5xl mb-8">Ready to Scale Without the <span className="text-primary">Overhead?</span></h2>
              <p className="text-on-surface-variant text-xl mb-10 max-w-2xl mx-auto">
                Stop wasting cycles on repetitive tasks. Let Mycodu engineer an autonomous future for your operations.
              </p>
              <button onClick={() => setCurrentScreen('process')} className="bg-primary text-on-primary-fixed font-button-text px-12 py-5 rounded-2xl primary-button-glow hover:scale-105 transition-all text-lg">
                Automate Your Workflow
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Screen6
