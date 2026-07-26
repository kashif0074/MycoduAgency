import { useEffect } from 'react'

interface ScreenProps {
  setCurrentScreen: (screen: string) => void
}

function Screen2({ setCurrentScreen }: ScreenProps) {
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

    // Parallax effect for the hero image
    const handleScroll = () => {
        const scrolled = window.pageYOffset
        const heroImage = document.querySelector('.hero-image-container') as HTMLElement | null
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`
        }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
        elements.forEach(el => observer.unobserve(el))
        window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="bg-background text-on-surface font-body-base overflow-x-hidden min-h-screen">
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[921px] flex items-center overflow-hidden">
          <div className="max-w-container-max mx-auto px-margin-desktop w-full relative z-10 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/10 border border-primary/20">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="font-code-label text-code-label text-primary">01 // MOBILE ECOSYSTEM</span>
                </div>
                <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg leading-none">
                  <span className="block">📱 Native &amp;</span>
                  <span className="text-gradient-cyan">Cross-Platform</span>
                  <span className="block">Mobile Apps</span>
                </h1>
                <p className="text-on-surface-variant text-lg max-w-lg">
                  Transforming ideas into high-performance iOS and Android applications with technical mastery and AI-driven precision.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button onClick={() => setCurrentScreen('process')} className="bg-primary text-on-primary-fixed px-8 py-4 rounded-lg font-button-text hover:scale-105 transition-transform glow-primary">
                    Build Your Mobile App
                  </button>
                  <button onClick={() => setCurrentScreen('portfolio')} className="bg-transparent border border-outline-variant text-on-surface px-8 py-4 rounded-lg font-button-text hover:bg-white/5 transition-colors">
                    View Portfolio
                  </button>
                </div>
              </div>
              <div className="relative hidden lg:block hero-image-container">
                <div className="glass-card p-4 rounded-3xl relative z-10 transform hover:-rotate-2 transition-transform duration-500">
                  <img className="rounded-2xl w-full h-[600px] object-cover" data-alt="Floating premium smartphone in tech studio." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdWIbGORPXYI8BmqGFy9VlU0Y8gSOmwQirmYCCD25_LaWPuD_2Gs3SYbD8vRUXQxWvLFbY5VVYd_-RYO51d5tZk83QaePjkTe7MB9Ye82bn_SjLOpihAHX5vdslOYMPeYQ2wCMdRpYNh-1Hq2WKR7_yHkvsMFpRXJgzqrxA4BdVdbuE_hZndQ1xCLzrrNWcpZT8llyNac6-FfMdx8jQaPCT5liTw_rcoH2qkIuJEbTkG1Qiu1TuAS2tynWVCP6hIlPEQRdxktS3-Gr"/>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/20 blur-[100px] rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 blur-[100px] rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Development Philosophies (Bento Grid) */}
        <section className="py-24 bg-surface-container-lowest">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="mb-16">
              <h2 className="font-headline-md text-headline-md mb-4">Precision Engineering</h2>
              <p className="text-on-surface-variant max-w-2xl">We bridge the gap between platform-specific performance and cross-platform efficiency.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {/* Native Focus */}
              <div className="md:col-span-2 glass-card p-10 rounded-3xl flex flex-col justify-between overflow-hidden relative group">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">Native Specialization</h3>
                  <p className="text-on-surface-variant max-w-md mb-8">Uncompromising performance and seamless OS integration using the official toolsets for both ecosystems.</p>
                  <div className="flex gap-8">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">apps</span>
                        <span className="font-bold">iOS</span>
                      </div>
                      <span className="font-code-label text-xs text-primary bg-primary/10 px-2 py-1 rounded">SWIFT</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary">robot</span>
                        <span className="font-bold">Android</span>
                      </div>
                      <span className="font-code-label text-xs text-tertiary bg-tertiary/10 px-2 py-1 rounded">KOTLIN</span>
                    </div>
                  </div>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-[200px]" style={{ fontVariationSettings: "'FILL' 1" }}>developer_mode_tv</span>
                </div>
              </div>

              {/* Cross-Platform */}
              <div className="glass-card p-10 rounded-3xl border-secondary/20">
                <span className="material-symbols-outlined text-secondary text-4xl mb-6">layers</span>
                <h3 className="text-2xl font-bold mb-4">Cross-Platform</h3>
                <p className="text-on-surface-variant mb-6 text-sm">Write once, deploy everywhere. We maximize efficiency without sacrificing the user experience.</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Flutter Development
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> React Native Scaling
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Unified Codebases
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Full Lifecycle Timeline */}
        <section className="py-24">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="text-center mb-20">
              <h2 className="font-headline-md text-headline-md mb-4">The App Lifecycle</h2>
              <p className="text-on-surface-variant">End-to-end technical mastery from first sketch to App Store #1.</p>
            </div>
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px timeline-gradient hidden md:block"></div>
              <div className="space-y-20">
                {/* Step 1 */}
                <div className="relative flex flex-col md:flex-row items-center gap-10 scroll-reveal">
                  <div className="flex-1 md:text-right hidden md:block">
                    <h4 className="text-xl font-bold">Strategic Architecture</h4>
                    <p className="text-on-surface-variant">Mapping the user journey and defining technical specs.</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-surface-container border-4 border-primary flex items-center justify-center relative z-10 shrink-0">
                    <span className="font-code-label text-primary">01</span>
                  </div>
                  <div className="flex-1">
                    <div className="glass-card p-6 rounded-2xl md:max-w-sm">
                      <h4 className="text-lg font-bold md:hidden">Strategic Architecture</h4>
                      <p className="text-sm text-on-surface-variant">Design thinking meets engineering requirements to build a solid foundation.</p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex flex-col md:flex-row-reverse items-center gap-10 scroll-reveal">
                  <div className="flex-1 hidden md:block">
                    <h4 className="text-xl font-bold">Agile Development</h4>
                    <p className="text-on-surface-variant">Iterative sprints with real-time feedback loops.</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-surface-container border-4 border-secondary flex items-center justify-center relative z-10 shrink-0">
                    <span className="font-code-label text-secondary">02</span>
                  </div>
                  <div className="flex-1 md:text-right">
                    <div className="glass-card p-6 rounded-2xl md:max-w-sm md:ml-auto">
                      <h4 className="text-lg font-bold md:hidden">Agile Development</h4>
                      <p className="text-sm text-on-surface-variant">Writing clean, scalable code with automated testing environments.</p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex flex-col md:flex-row items-center gap-10 scroll-reveal">
                  <div className="flex-1 md:text-right hidden md:block">
                    <h4 className="text-xl font-bold">Store Deployment</h4>
                    <p className="text-on-surface-variant">Navigating Apple and Google publishing protocols.</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-surface-container border-4 border-tertiary flex items-center justify-center relative z-10 shrink-0">
                    <span className="font-code-label text-tertiary">03</span>
                  </div>
                  <div className="flex-1">
                    <div className="glass-card p-6 rounded-2xl md:max-w-sm">
                      <h4 className="text-lg font-bold md:hidden">Store Deployment</h4>
                      <p className="text-sm text-on-surface-variant">Full optimization for App Store and Play Store visibility and approval.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Features Grid */}
        <section className="py-24 bg-surface-dim">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-gutter">
              <div className="lg:col-span-1 py-10">
                <h2 className="font-headline-md text-headline-md mb-6">Engineered Features</h2>
                <p className="text-on-surface-variant">Standard capabilities delivered with exceptional reliability and performance.</p>
              </div>
              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Feature 1 */}
                <div className="p-8 rounded-3xl border border-white/5 bg-white/5 hover:border-primary/50 transition-all group">
                  <span className="material-symbols-outlined text-primary mb-4 block text-3xl group-hover:scale-110 transition-transform">notifications_active</span>
                  <h4 className="font-bold mb-2">Push Notifications</h4>
                  <p className="text-sm text-on-surface-variant">Intelligent, behavior-triggered alerts to keep users engaged.</p>
                </div>
                {/* Feature 2 */}
                <div className="p-8 rounded-3xl border border-white/5 bg-white/5 hover:border-secondary/50 transition-all group">
                  <span className="material-symbols-outlined text-secondary mb-4 block text-3xl group-hover:scale-110 transition-transform">shopping_bag</span>
                  <h4 className="font-bold mb-2">In-App Purchases</h4>
                  <p className="text-sm text-on-surface-variant">Secure, frictionless monetization structures for digital assets.</p>
                </div>
                {/* Feature 3 */}
                <div className="p-8 rounded-3xl border border-white/5 bg-white/5 hover:border-tertiary/50 transition-all group">
                  <span className="material-symbols-outlined text-tertiary mb-4 block text-3xl group-hover:scale-110 transition-transform">analytics</span>
                  <h4 className="font-bold mb-2">Real-time Analytics</h4>
                  <p className="text-sm text-on-surface-variant">Deep data insights for data-driven product decisions.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="glass-card p-12 md:p-20 rounded-[40px] text-center relative overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                <h2 className="font-display-lg text-display-lg-mobile md:text-5xl leading-tight">Ready to build your next <span className="text-primary">breakthrough?</span></h2>
                <p className="text-on-surface-variant text-lg">Our engineering team is ready to scale your mobile product. Let's discuss your technical requirements.</p>
                <div className="pt-4">
                  <button onClick={() => setCurrentScreen('process')} className="bg-primary text-on-primary-fixed px-12 py-5 rounded-full font-button-text hover:scale-110 transition-all glow-primary uppercase tracking-widest">
                    Build Your Mobile App
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Screen2
