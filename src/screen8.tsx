import { useEffect, useState } from 'react'

interface ScreenProps {
  setCurrentScreen: (screen: string) => void
}

function Screen8({ setCurrentScreen }: ScreenProps) {
  const [showDownloadToast, setShowDownloadToast] = useState(false)

  const handleDownload = () => {
    setShowDownloadToast(true)
    setTimeout(() => {
      setShowDownloadToast(false)
    }, 4500)
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

    return () => {
        cards.forEach(card => observer.unobserve(card))
    }
  }, [])

  return (
    <div className="bg-background text-on-surface font-body-base overflow-x-hidden min-h-screen selection:bg-primary selection:text-on-primary">
      <div className="fixed inset-0 noise-overlay z-[-1]"></div>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[716px] flex items-center justify-center overflow-hidden py-24 px-margin-mobile md:px-margin-desktop">
          <div className="relative z-10 text-center max-w-4xl">
            <span className="font-code-label text-code-label text-tertiary uppercase tracking-widest mb-4 inline-block">Methodology &amp; Workflow</span>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-6 text-on-surface">
              Our Systematic Approach to Excellence
            </h1>
            <p className="font-body-base text-body-base text-on-surface-variant text-xl md:text-2xl max-w-2xl mx-auto">
              From initial discovery to post-launch mastery. We engineer sophisticated digital ecosystems with a programmatic mindset.
            </p>
            <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-full border border-outline-variant">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                <span className="font-code-label text-xs uppercase text-on-surface">Agile Sprints</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-full border border-outline-variant">
                <span className="w-2 h-2 bg-tertiary rounded-full animate-pulse"></span>
                <span className="font-code-label text-xs uppercase text-on-surface">SLA Guaranteed</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-full border border-outline-variant">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                <span className="font-code-label text-xs uppercase text-on-surface">Tech-First Logic</span>
              </div>
            </div>
          </div>
        </section>

        {/* Process Timeline Section */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px timeline-line opacity-20 hidden md:block"></div>
          <div className="space-y-24 md:space-y-40">
            {/* Step 1 */}
            <div className="relative flex flex-col md:flex-row items-center gap-gutter">
              <div className="flex-1 md:text-right">
                <span className="font-code-label text-primary text-lg mb-2 block">01</span>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Discovery &amp; Consultation</h3>
                <p className="text-on-surface-variant max-w-lg md:ml-auto">
                  We begin by decoding your business DNA. Through user stories and strategic mapping, we define the roadmap for your technical success.
                </p>
              </div>
              <div className="flex-shrink-0 z-20">
                <div className="w-12 h-12 rounded-full bg-background border-4 border-primary step-node flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>search</span>
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="glass-card p-2 rounded-xl glow-hover transition-all duration-300">
                  <img className="w-full h-64 object-cover rounded-lg" 
                    data-alt="Discovery maps visualizer."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3EIyIqPWa8vdPwCjONWyfoeNlFVNHrcQa-QlT5dJ4mpAmvlDLOEX9hNWSw9HVBmSsxQCvnmrj4W6kmLZuOsupgg6Pctm4zYuDwODUNuCvrfBeJ4QyzFYmf7zBmcQxASYemn3tP39sQf7YyBikb4a5dUYSk_8QeCD7PLsYKlTdeYhXb3s1tNA4hGrd-qys7gXvtXz1PSGUAxi05ts5p6aBLm2T2ilKVfYrHXIUZf5E3vkosgy5a_WRWWqNygs8xeP1WV7EclkaMFez"
                  />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col md:flex-row-reverse items-center gap-gutter">
              <div className="flex-1 md:text-left">
                <span className="font-code-label text-tertiary text-lg mb-2 block">02</span>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Planning &amp; Proposal</h3>
                <p className="text-on-surface-variant max-w-lg">
                  Architecting the future. We provide rigorous technical specifications and a structural architecture plan that ensures scalability from day one.
                </p>
              </div>
              <div className="flex-shrink-0 z-20">
                <div className="w-12 h-12 rounded-full bg-background border-4 border-tertiary step-node flex items-center justify-center">
                  <span className="material-symbols-outlined text-tertiary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>architecture</span>
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="glass-card p-2 rounded-xl glow-hover transition-all duration-300">
                  <img className="w-full h-64 object-cover rounded-lg" 
                    data-alt="Planning 3D architecture diagrams."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZWbup0QQEIVknwHKjND6rwlEfxSdBdfWHNZMNWS8hw4Lg-ZI01dezAuBMm0TKYahQyz2p13HuKwXpxs4urC39gvAxStKKBK1E0Gt0wESKtzO1i3jKBDE4SQC7ieiiIg5QYsf43RM0olwoleFRsWiIxc9IyjxPJYBEPYWs6saYgqLl4y-xV2E-6mFWyK6qe9XWcITwE4FNf4VV4MXzRwa_4nEN3Oz__kscYAn4bzlO5KDEcDSDt-l4BjqO8reb1ugTWuQHnzbqg-1I"
                  />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col md:flex-row items-center gap-gutter">
              <div className="flex-1 md:text-right">
                <span className="font-code-label text-secondary text-lg mb-2 block">03</span>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4">UI/UX Design</h3>
                <p className="text-on-surface-variant max-w-lg md:ml-auto">
                  Crafting high-fidelity interactive prototypes. We focus on technological sophistication and seamless user journeys that convert visitors into advocates.
                </p>
              </div>
              <div className="flex-shrink-0 z-20">
                <div className="w-12 h-12 rounded-full bg-background border-4 border-secondary step-node flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>palette</span>
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="glass-card p-2 rounded-xl glow-hover transition-all duration-300">
                  <img className="w-full h-64 object-cover rounded-lg" 
                    data-alt="UI UX design screens mockup."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdWIbGORPXYI8BmqGFy9VlU0Y8gSOmwQirmYCCD25_LaWPuD_2Gs3SYbD8vRUXQxWvLFbY5VVYd_-RYO51d5tZk83QaePjkTe7MB9Ye82bn_SjLOpihAHX5vdslOYMPeYQ2wCMdRpYNh-1Hq2WKR7_yHkvsMFpRXJgzqrxA4BdVdbuE_hZndQ1xCLzrrNWcpZT8llyNac6-FfMdx8jQaPCT5liTw_rcoH2qkIuJEbTkG1Qiu1TuAS2tynWVCP6hIlPEQRdxktS3-Gr"
                  />
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative flex flex-col md:flex-row-reverse items-center gap-gutter">
              <div className="flex-1 md:text-left">
                <span className="font-code-label text-primary text-lg mb-2 block">04</span>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Development &amp; Testing</h3>
                <p className="text-on-surface-variant max-w-lg">
                  Agile sprints meet uncompromising quality. Our developers write clean, modular code followed by rigorous QA testing for ultimate reliability.
                </p>
              </div>
              <div className="flex-shrink-0 z-20">
                <div className="w-12 h-12 rounded-full bg-background border-4 border-primary step-node flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="glass-card p-2 rounded-xl glow-hover transition-all duration-300">
                  <img className="w-full h-64 object-cover rounded-lg" 
                    data-alt="Code editor code compiling screenshot."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZKJ4J4dHeUnOqLGpCu7HKLEdtBx3DWyLiuNIwHqKnNBgesrdAQeXEzxrEVXxe6u1wmpPrL6TJlYJpm1bFB11IJ-mkoE6hgIlTF8AE5XtU8PM7x3Amujy-lW5qfORFkmjSDFiwy13yYinR5STHgQtXKQUK0Kq1ozx-GhLYYbc28FhgeWwbnDFCcjXOsWG3ZTQbVNQFfkLfVo2i8dz9lQNuNIfcByR_Sz0WJZu_RvokbdXIi7pOZ2nUBL7hwJ9YaJ_kSgrDo1aa7clw"
                  />
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative flex flex-col md:flex-row items-center gap-gutter">
              <div className="flex-1 md:text-right">
                <span className="font-code-label text-tertiary text-lg mb-2 block">05</span>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Deployment &amp; Launch</h3>
                <p className="text-on-surface-variant max-w-lg md:ml-auto">
                  Precision launching. We manage cloud orchestration, server-side setup, and store publishing to ensure a flawless global debut.
                </p>
              </div>
              <div className="flex-shrink-0 z-20">
                <div className="w-12 h-12 rounded-full bg-background border-4 border-tertiary step-node flex items-center justify-center">
                  <span className="material-symbols-outlined text-tertiary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="glass-card p-2 rounded-xl glow-hover transition-all duration-300">
                  <img className="w-full h-64 object-cover rounded-lg" 
                    data-alt="World server nodes global map."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBamqDKzByG_BPb_L-yyc7JH04dXTKwIArczmVlNuO0LQ6_sFN5BLuuFuQYLOWaOIP2nGHO-EPdd2xMzsAi9lXszp7Oc8OVCxY3G9LjV84qSVaSQCi54B8czrCwzoTX8HliIMWtEFdLYmjfoYX5WMFaoKWCBLUNw6KKjqwFfgD1GBL-tGjrlnQ2FuOZRR5zM8yyeIl6eHVN2kTl7tTvdbXyjXBYG2v0F93T9DWxookdqG7TB8daGx4g6THe-bRLC-lV7vpfwZpxvBU-"
                  />
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className="relative flex flex-col md:flex-row-reverse items-center gap-gutter">
              <div className="flex-1 md:text-left">
                <span className="font-code-label text-secondary text-lg mb-2 block">06</span>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Support &amp; Maintenance</h3>
                <p className="text-on-surface-variant max-w-lg">
                  We remain your technical partners. Ongoing optimizations, security audits, and SLA-backed support keep your platform at the cutting edge.
                </p>
              </div>
              <div className="flex-shrink-0 z-20">
                <div className="w-12 h-12 rounded-full bg-background border-4 border-secondary step-node flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="glass-card p-2 rounded-xl glow-hover transition-all duration-300">
                  <img className="w-full h-64 object-cover rounded-lg" 
                    data-alt="3D shield icon visual security representation."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPl2yH_dC7inqKVZKxcXDVjlPDqLwkYhwhsDBqp0pe_TTEaYfQdGY9T4Ez4vO-CTUGgHEj0vuY-XpzlpjHGb8u9DqlqwE3zwxTN3XVOO0YZDfgjQ3HJe3DY5VgstuHCAH1IXmm1A15FIRvkpS5Cw1Yr8cD2E9-QrsjpdunhHtsduD60SMATICnpF-sXE59u3N62pTVTzpNb4H7BtPv6MkDBjgaRWd9fMrcjvschYj4nNyyRJrYP8INJpaevC2EauBXWicgRvDSKgwT"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-margin-mobile md:px-margin-desktop text-center relative overflow-hidden z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
          <div className="relative z-10 max-w-2xl mx-auto glass-card p-12 rounded-3xl border-primary/20 shadow-2xl shadow-primary/5">
            <h2 className="font-headline-md text-headline-md mb-6">Ready for a Technical Deep-Dive?</h2>
            <p className="font-body-base text-body-base text-on-surface-variant mb-10">
              Discover how our systematic approach can transform your complex requirements into a streamlined digital powerhouse.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => { setCurrentScreen('home'); window.scrollTo(0, 0); }}
                className="w-full sm:w-auto bg-primary text-on-primary px-8 py-4 rounded-lg font-button-text font-bold hover:scale-105 hover:shadow-primary/30 transition-all duration-300 text-on-primary-fixed"
              >
                Learn More About Our Methodology
              </button>
              <button onClick={handleDownload} className="w-full sm:w-auto px-8 py-4 rounded-lg border border-outline-variant hover:bg-white/5 transition-all duration-300 font-button-text">
                Download Process Deck
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Modern Glassmorphic Toast Notification */}
      {showDownloadToast && (
        <div className="fixed bottom-8 right-8 z-[100] max-w-sm glass-card border border-primary/30 border-l-4 border-l-primary p-5 rounded-r-xl shadow-2xl flex items-start gap-4 animate-fade-in-route backdrop-blur-2xl">
          <div className="w-10 h-10 rounded-full bg-primary/25 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined animate-pulse text-xl">downloading</span>
          </div>
          <div className="space-y-1">
            <h5 className="font-bold text-sm text-on-surface">Compiling Process Deck</h5>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Preparing your PDF package. The download process will begin in the background.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Screen8
