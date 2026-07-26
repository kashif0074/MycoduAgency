import { useEffect } from 'react'

interface ScreenProps {
  setCurrentScreen: (screen: string) => void
}

function Screen1({ setCurrentScreen }: ScreenProps) {
  // Micro-interaction for scroll reveals
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

    const elements = document.querySelectorAll('.glass-card')
    elements.forEach(el => {
        el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700')
        observer.observe(el)
    })

    return () => {
        elements.forEach(el => observer.unobserve(el))
    }
  }, [])

  const navigateToHomeAndScroll = (elementId: string) => {
    setCurrentScreen('home')
    setTimeout(() => {
      const element = document.getElementById(elementId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <div className="bg-background selection:bg-primary selection:text-on-primary min-h-screen text-on-surface">


      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[819px] flex items-center justify-center overflow-hidden py-20 px-margin-mobile">
          <div className="relative z-10 max-w-4xl text-center">
            <span className="font-code-label text-code-label text-primary mb-6 block tracking-widest uppercase">Precision Architecture</span>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-8">
              🌐 Modern <span className="text-gradient">Web Development</span>
            </h1>
            <p className="font-body-base text-body-base text-on-surface-variant max-w-2xl mx-auto mb-12">
              Custom business &amp; corporate websites built with performance and SEO at the core. We engineer high-speed digital engines that convert visitors into loyal clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-gutter justify-center">
              <button onClick={() => setCurrentScreen('process')} className="bg-primary text-on-primary px-8 py-4 rounded-lg font-button-text hover:scale-105 hover:shadow-primary/40 transition-all primary-glow text-on-primary-fixed">
                Start Your Web Project
              </button>
              <button onClick={() => navigateToHomeAndScroll('services')} className="border border-outline-variant text-on-surface px-8 py-4 rounded-lg font-button-text hover:bg-surface-variant/30 transition-all">
                View Technical Stack
              </button>
            </div>
          </div>
        </section>

        {/* Specific Solutions Bento Grid */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="mb-16">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Core Web Solutions</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Custom Business Sites */}
            <div className="md:col-span-8 glass-card p-10 rounded-xl hover-glow transition-all duration-500 flex flex-col justify-between overflow-hidden relative group">
              <div className="relative z-10">
                <span className="material-symbols-outlined text-primary text-4xl mb-6">corporate_fare</span>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Custom Business Sites</h3>
                <p className="text-on-surface-variant font-body-base text-body-base max-w-md">Tailored digital identities for enterprises that require bespoke functionality, unmatched security, and rapid scalability.</p>
              </div>
              <div className="absolute -right-20 -bottom-20 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-[200px]">architecture</span>
              </div>
            </div>

            {/* E-commerce */}
            <div className="md:col-span-4 glass-card p-10 rounded-xl hover-glow transition-all duration-500">
              <span className="material-symbols-outlined text-secondary text-4xl mb-6">shopping_cart</span>
              <h3 className="text-xl font-bold text-on-surface mb-4">E-commerce Solutions</h3>
              <p className="text-on-surface-variant font-body-base text-body-base mb-6">High-performance Shopify storefronts or fully custom headless commerce engines designed for conversion.</p>
              <ul className="space-y-3 font-code-label text-xs text-primary">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> CUSTOM CHECKOUTS</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> ERP INTEGRATION</li>
              </ul>
            </div>

            {/* CMS-based */}
            <div className="md:col-span-4 glass-card p-10 rounded-xl hover-glow transition-all duration-500">
              <span className="material-symbols-outlined text-tertiary text-4xl mb-6">article</span>
              <h3 className="text-xl font-bold text-on-surface mb-4">CMS Architecture</h3>
              <p className="text-on-surface-variant font-body-base text-body-base mb-6">From expert WordPress development to modern Headless CMS setups like Sanity or Contentful.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-surface-container rounded font-code-label text-xs text-on-surface-variant">WordPress</span>
                <span className="px-3 py-1 bg-surface-container rounded font-code-label text-xs text-on-surface-variant">Sanity</span>
              </div>
            </div>

            {/* High-Conversion Landing Pages */}
            <div className="md:col-span-8 glass-card p-10 rounded-xl hover-glow transition-all duration-500 flex items-center">
              <div className="md:w-1/2">
                <span className="material-symbols-outlined text-primary-container text-4xl mb-6">ads_click</span>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Conversion Engines</h3>
                <p className="text-on-surface-variant font-body-base text-body-base">Landing pages engineered with heat-map optimization and A/B testing frameworks to maximize your ROI.</p>
              </div>
              <div className="hidden md:block md:w-1/2 pl-10">
                <div className="bg-surface-container-high rounded-lg p-6 border border-white/5 shadow-inner">
                  <div className="h-2 w-3/4 bg-primary/20 rounded mb-4"></div>
                  <div className="h-2 w-full bg-primary/10 rounded mb-4"></div>
                  <div className="h-10 w-1/3 bg-primary rounded-lg ml-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Redesign Section */}
        <section className="py-24 bg-surface-container-lowest relative">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid md:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"></div>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video glass-card">
                <img className="w-full h-full object-cover" data-alt="Redesign workflow visualization." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3EIyIqPWa8vdPwCjONWyfoeNlFVNHrcQa-QlT5dJ4mpAmvlDLOEX9hNWSw9HVBmSsxQCvnmrj4W6kmLZuOsupgg6Pctm4zYuDwODUNuCvrfBeJ4QyzFYmf7zBmcQxASYemn3tP39sQf7YyBikb4a5dUYSk_8QeCD7PLsYKlTdeYhXb3s1tNA4hGrd-qys7gXvtXz1PSGUAxi05ts5p6aBLm2T2ilKVfYrHXIUZf5E3vkosgy5a_WRWWqNygs8xeP1WV7EclkaMFez"/>
              </div>
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Revamp Your Digital Presence</h2>
              <p className="font-body-base text-body-base text-on-surface-variant mb-8">
                Is your legacy website holding back your growth? We specialize in technical modernization—upgrading outdated stacks to modern, high-speed architectures without losing your established SEO equity.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">bolt</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">Lighthouse Score Optimization</h4>
                    <p className="text-sm text-on-surface-variant">We target perfect 100s for Performance, Accessibility, and SEO.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary">update</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">Cloud-Native Scalability</h4>
                    <p className="text-sm text-on-surface-variant">Migrating your infrastructure to edge-first platforms like Vercel or AWS.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Pills */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-12">The Web Intelligence Stack</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-3 px-6 py-3 glass-card rounded-full border border-white/5 hover:border-primary/50 transition-colors">
              <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#8aebff]"></div>
              <span className="font-code-label text-code-label uppercase">React.js</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 glass-card rounded-full border border-white/5 hover:border-primary/50 transition-colors">
              <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#8aebff]"></div>
              <span className="font-code-label text-code-label uppercase">Next.js 14</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 glass-card rounded-full border border-white/5 hover:border-primary/50 transition-colors">
              <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#8aebff]"></div>
              <span className="font-code-label text-code-label uppercase">Tailwind CSS</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 glass-card rounded-full border border-white/5 hover:border-primary/50 transition-colors">
              <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#8aebff]"></div>
              <span className="font-code-label text-code-label uppercase">TypeScript</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 glass-card rounded-full border border-white/5 hover:border-primary/50 transition-colors">
              <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#8aebff]"></div>
              <span className="font-code-label text-code-label uppercase">Headless CMS</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 glass-card rounded-full border border-white/5 hover:border-primary/50 transition-colors">
              <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#8aebff]"></div>
              <span className="font-code-label text-code-label uppercase">PostgreSQL</span>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-left"></div>
          <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile text-center">
            <h2 className="font-display-lg-mobile md:text-5xl font-extrabold text-on-surface mb-8">Ready to Build the Future?</h2>
            <p className="font-body-base text-body-base text-on-surface-variant max-w-xl mx-auto mb-12">
              Let's discuss your technical requirements and build a web solution that drives measurable business growth.
            </p>
            <button onClick={() => setCurrentScreen('process')} className="bg-primary text-on-primary px-12 py-5 rounded-lg font-button-text text-lg hover:scale-110 hover:shadow-primary/40 transition-all primary-glow text-on-primary-fixed">
              Start Your Web Project
            </button>
          </div>
        </section>
      </main>


    </div>
  )
}

export default Screen1
