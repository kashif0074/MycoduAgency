import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'

interface HomeScreenProps {
  setCurrentScreen: (screen: string) => void
}

function HomeScreen({ setCurrentScreen }: HomeScreenProps) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const slidesCount = 2
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitResponseMsg, setSubmitResponseMsg] = useState('')

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, email, and message.')
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const isLocal = ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
      const apiBaseUrl = import.meta.env.VITE_API_URL || (isLocal ? 'http://localhost:5000' : '');
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (data.success) {
        setSubmitResponseMsg(data.message || 'Thank you for reaching out. We will contact you shortly!')
        setFormSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => {
          setFormSubmitted(false)
          setSubmitResponseMsg('')
        }, 7000)
      } else {
        setErrorMessage(data.error || 'Could not send message. Please try again.')
      }
    } catch (error) {
      console.error('API Error:', error)
      setErrorMessage('Network error: Backend server is not reachable. Please check your connection.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const threeContainerRef = useRef<HTMLDivElement | null>(null)

  // Carousel functions
  const nextSlide = () => {
    setCurrentIdx((prev) => (prev + 1) % slidesCount)
  }

  const prevSlide = () => {
    setCurrentIdx((prev) => (prev - 1 + slidesCount) % slidesCount)
  }

  // Auto-scrolling carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slidesCount)
    }, 8000)
    return () => clearInterval(interval)
  }, [slidesCount])

  // --- ANIMATION 13: Hero Background Shader ---
  useEffect(() => {
    const canvas = heroCanvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    
    const geometry = new THREE.PlaneGeometry(2, 2)
    const uniforms = {
        u_time: { value: 1.0 },
        u_resolution: { value: new THREE.Vector2() },
        u_mouse: { value: new THREE.Vector2() }
    }

    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: `
            varying vec2 v_texCoord;
            void main() {
                v_texCoord = uv;
                gl_Position = vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            precision highp float;
            varying vec2 v_texCoord;
            uniform float u_time;
            uniform vec2 u_resolution;
            uniform vec2 u_mouse;

            void main() {
                vec2 uv = v_texCoord;
                vec2 mouse = u_mouse / u_resolution;
                
                float noise = sin(uv.x * 10.0 + u_time * 0.2) * cos(uv.y * 10.0 + u_time * 0.1);
                noise += sin(uv.y * 20.0 - u_time * 0.15) * cos(uv.x * 15.0 + u_time * 0.1);
                
                vec3 color1 = vec3(0.13, 0.83, 0.93); // Cyan
                vec3 color2 = vec3(0.04, 0.07, 0.15); // Dark Surface
                vec3 color3 = vec3(0.4, 0.2, 0.8);    // Subtle Violet
                
                vec3 finalColor = mix(color2, color1, noise * 0.15 + 0.05);
                finalColor = mix(finalColor, color3, length(uv - mouse) * 0.2);
                
                float scanline = sin(uv.y * 800.0) * 0.01;
                finalColor += scanline;

                gl_FragColor = vec4(finalColor, 1.0);
            }
        `
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const resize = () => {
        const width = window.innerWidth
        const height = window.innerHeight
        renderer.setSize(width, height)
        uniforms.u_resolution.value.set(width, height)
    }

    const handleMouseMove = (e: MouseEvent) => {
        uniforms.u_mouse.value.set(e.clientX, window.innerHeight - e.clientY)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)

    resize()

    let animationFrameId: number
    const animate = (time: number) => {
        uniforms.u_time.value = time * 0.001
        renderer.render(scene, camera)
        animationFrameId = requestAnimationFrame(animate)
    }
    animationFrameId = requestAnimationFrame(animate)

    return () => {
        window.removeEventListener('resize', resize)
        window.removeEventListener('mousemove', handleMouseMove)
        cancelAnimationFrame(animationFrameId)
        geometry.dispose()
        material.dispose()
        renderer.dispose()
    }
  }, [])

  // --- ANIMATION 14: 3D Network Nodes ---
  useEffect(() => {
    const container = threeContainerRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x22d3ee, 2)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    const group = new THREE.Group()
    scene.add(group)

    const nodeGeometry = new THREE.SphereGeometry(0.05, 16, 16)
    const nodeMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x22d3ee, 
        emissive: 0x22d3ee, 
        emissiveIntensity: 0.5 
    })

    const nodes: { mesh: THREE.Mesh; velocity: THREE.Vector3 }[] = []
    const nodeCount = 40

    for (let i = 0; i < nodeCount; i++) {
        const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial)
        mesh.position.set(
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4
        )
        group.add(mesh)
        nodes.push({
            mesh,
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01
            )
        })
    }

    camera.position.z = 5

    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    let animationFrameId: number
    const animate = () => {
        animationFrameId = requestAnimationFrame(animate)
        group.rotation.y += (mouseX * 0.5 - group.rotation.y) * 0.05
        group.rotation.x += (-mouseY * 0.5 - group.rotation.x) * 0.05
        group.rotation.y += 0.002

        nodes.forEach(node => {
            node.mesh.position.add(node.velocity)
            if (Math.abs(node.mesh.position.x) > 2.5) node.velocity.x *= -1
            if (Math.abs(node.mesh.position.y) > 2.5) node.velocity.y *= -1
            if (Math.abs(node.mesh.position.z) > 2.5) node.velocity.z *= -1
        })

        renderer.render(scene, camera)
    }

    const handleResize = () => {
        const w = container.clientWidth
        const h = container.clientHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)
    animate()

    return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('resize', handleResize)
        cancelAnimationFrame(animationFrameId)
        if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement)
        }
        nodeGeometry.dispose()
        nodeMaterial.dispose()
        renderer.dispose()
    }
  }, [])

  // --- Interaction & Scroll Logic ---
  useEffect(() => {
    // IntersectionObserver for Scroll Animations
    const observerOptions = { threshold: 0.1 }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible')
                // Trigger counter if present
                const counter = entry.target.querySelector('.counter') || 
                                (entry.target.classList.contains('counter') ? entry.target : null)
                if (counter && !(counter as HTMLElement).dataset.started) {
                    startCounter(counter as HTMLElement)
                }
            }
        })
    }, observerOptions)

    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach(el => observer.observe(el))

    // Stats Counter Animation
    function startCounter(el: HTMLElement) {
        el.dataset.started = "true"
        const target = parseInt(el.dataset.target || "0")
        const duration = 2000
        const stepTime = 20
        const steps = duration / stepTime
        const increment = target / steps
        let current = 0

        const timer = setInterval(() => {
            current += increment
            if (current >= target) {
                el.innerText = target + '+'
                clearInterval(timer)
            } else {
                el.innerText = Math.floor(current) + '+'
            }
        }, stepTime)
    }

    return () => {
        elements.forEach(el => observer.unobserve(el))
    }
  }, [])

  // --- 3D Tilt Effect ---
  useEffect(() => {
    const cards = document.querySelectorAll('.tilt-element')
    
    const handleMouseMove = (e: MouseEvent, card: HTMLElement) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = (y - centerY) / 15
        const rotateY = (centerX - x) / 15
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
    }

    const handleMouseLeave = (card: HTMLElement) => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`
    }

    const listeners = Array.from(cards).map(cardEl => {
        const card = cardEl as HTMLElement
        const moveListener = (e: MouseEvent) => handleMouseMove(e, card)
        const leaveListener = () => handleMouseLeave(card)

        card.addEventListener('mousemove', moveListener)
        card.addEventListener('mouseleave', leaveListener)

        return { card, moveListener, leaveListener }
    })

    return () => {
        listeners.forEach(({ card, moveListener, leaveListener }) => {
            card.removeEventListener('mousemove', moveListener)
            card.removeEventListener('mouseleave', leaveListener)
        })
    }
  }, [])

  // --- Magnetic Wrap Effect ---
  useEffect(() => {
    const wraps = document.querySelectorAll('.magnetic-wrap')

    const handleMouseMove = (e: MouseEvent, wrap: HTMLElement) => {
        const rect = wrap.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        wrap.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
    }

    const handleMouseLeave = (wrap: HTMLElement) => {
        wrap.style.transform = `translate(0, 0)`
    }

    const listeners = Array.from(wraps).map(wrapEl => {
        const wrap = wrapEl as HTMLElement
        const moveListener = (e: MouseEvent) => handleMouseMove(e, wrap)
        const leaveListener = () => handleMouseLeave(wrap)

        wrap.addEventListener('mousemove', moveListener)
        wrap.addEventListener('mouseleave', leaveListener)

        return { wrap, moveListener, leaveListener }
    })

    return () => {
        listeners.forEach(({ wrap, moveListener, leaveListener }) => {
            wrap.removeEventListener('mousemove', moveListener)
            wrap.removeEventListener('mouseleave', leaveListener)
        })
    }
  }, [])

  const scrollIntoView = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>


      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <canvas id="hero-canvas-bg" ref={heroCanvasRef}></canvas>
        <div className="max-w-container-max mx-auto px-margin-desktop relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
          <div className="space-y-8 animate-on-scroll">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping mr-2"></span>
              <span className="font-code-label text-code-label text-primary uppercase">Innovation Redefined</span>
            </div>
            <h1 className="font-display-lg text-display-lg leading-tight">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Technical Mastery</span> for Global Innovators
            </h1>
            <p className="font-body-base text-body-base text-on-surface-variant max-w-xl">
              Custom Full-Stack, Mobile &amp; AI Solutions built for scale and performance. We transform complex challenges into elegant, production-grade reality.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="magnetic-wrap">
                <button onClick={() => scrollIntoView('services')} className="bg-primary text-on-primary px-8 py-4 rounded-lg font-button-text text-button-text hover:scale-105 hover:shadow-primary/20 transition-all duration-500">
                  Start Your Project
                </button>
              </div>
              <div className="magnetic-wrap">
                <button onClick={() => scrollIntoView('portfolio')} className="bg-transparent border border-outline-variant text-on-surface px-8 py-4 rounded-lg font-button-text text-button-text hover:bg-surface-variant transition-all duration-500">
                  View Portfolio
                </button>
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative animate-on-scroll">
            <div className="w-full h-[600px] bg-transparent" id="three-container" ref={threeContainerRef}></div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="py-24 bg-surface-container-lowest relative z-10">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center mb-16 space-y-4 animate-on-scroll">
            <h2 className="font-headline-md text-headline-md">Our Core Expertise</h2>
            <p className="font-body-base text-body-base text-on-surface-variant max-w-2xl mx-auto">
              From deep-learning architectures to high-concurrency web apps, we deliver technical excellence across the entire stack.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service Card 1 */}
            <div className="glass-card p-8 rounded-xl primary-glow interactive-card group tilt-element animate-on-scroll">
              <span className="material-symbols-outlined text-primary text-4xl mb-6">language</span>
              <h3 className="font-headline-md text-xl mb-3">Web Development</h3>
              <p className="font-body-base text-on-surface-variant mb-6 text-sm">High-performance, responsive web applications built for modern browsers.</p>
              <button 
                onClick={() => { setCurrentScreen('web-dev'); window.scrollTo(0, 0); }}
                className="inline-flex items-center text-primary font-button-text hover:gap-2 transition-all duration-500"
              >
                Learn More <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
              </button>
            </div>
            {/* Service Card 2 */}
            <div className="glass-card p-8 rounded-xl primary-glow interactive-card group tilt-element animate-on-scroll">
              <span className="material-symbols-outlined text-primary text-4xl mb-6">layers</span>
              <h3 className="font-headline-md text-xl mb-3">Full-Stack Solutions</h3>
              <p className="font-body-base text-on-surface-variant mb-6 text-sm">End-to-end architecture handling everything from DB to UI.</p>
              <button 
                onClick={() => { setCurrentScreen('full-stack'); window.scrollTo(0, 0); }}
                className="inline-flex items-center text-primary font-button-text hover:gap-2 transition-all duration-500"
              >
                Learn More <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
              </button>
            </div>
            {/* Service Card 3 */}
            <div className="glass-card p-8 rounded-xl primary-glow interactive-card group tilt-element animate-on-scroll">
              <span className="material-symbols-outlined text-primary text-4xl mb-6">smartphone</span>
              <h3 className="font-headline-md text-xl mb-3">App Development</h3>
              <p className="font-body-base text-on-surface-variant mb-6 text-sm">Native and cross-platform mobile apps with seamless user experiences.</p>
              <button 
                onClick={() => { setCurrentScreen('app-dev'); window.scrollTo(0, 0); }}
                className="inline-flex items-center text-primary font-button-text hover:gap-2 transition-all duration-500"
              >
                Learn More <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
              </button>
            </div>
            {/* Service Card 4 */}
            <div className="glass-card p-8 rounded-xl primary-glow interactive-card group tilt-element animate-on-scroll">
              <span className="material-symbols-outlined text-primary text-4xl mb-6">psychology</span>
              <h3 className="font-headline-md text-xl mb-3">AI Engineering</h3>
              <p className="font-body-base text-on-surface-variant mb-6 text-sm">Custom LLMs, computer vision, and neural network development.</p>
              <button 
                onClick={() => { setCurrentScreen('ai-eng'); window.scrollTo(0, 0); }}
                className="inline-flex items-center text-primary font-button-text hover:gap-2 transition-all duration-500"
              >
                Learn More <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
              </button>
            </div>
            {/* Service Card 5 */}
            <div className="glass-card p-8 rounded-xl primary-glow interactive-card group tilt-element animate-on-scroll">
              <span className="material-symbols-outlined text-primary text-4xl mb-6">monitoring</span>
              <h3 className="font-headline-md text-xl mb-3">Data Science</h3>
              <p className="font-body-base text-on-surface-variant mb-6 text-sm">Extracting actionable insights from complex data ecosystems.</p>
              <button 
                onClick={() => { setCurrentScreen('data-science'); window.scrollTo(0, 0); }}
                className="inline-flex items-center text-primary font-button-text hover:gap-2 transition-all duration-500"
              >
                Learn More <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
              </button>
            </div>
            {/* Service Card 6 */}
            <div className="glass-card p-8 rounded-xl primary-glow interactive-card group tilt-element animate-on-scroll">
              <span className="material-symbols-outlined text-primary text-4xl mb-6">robot</span>
              <h3 className="font-headline-md text-xl mb-3">AI Automation</h3>
              <p className="font-body-base text-on-surface-variant mb-6 text-sm">Intelligent agents and workflow automation for maximum efficiency.</p>
              <button 
                onClick={() => { setCurrentScreen('ai-auto'); window.scrollTo(0, 0); }}
                className="inline-flex items-center text-primary font-button-text hover:gap-2 transition-all duration-500"
              >
                Learn More <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
              </button>
            </div>
            {/* Service Card 7 */}
            <div className="glass-card p-8 rounded-xl primary-glow interactive-card group tilt-element animate-on-scroll">
              <span className="material-symbols-outlined text-primary text-4xl mb-6">troubleshoot</span>
              <h3 className="font-headline-md text-xl mb-3">SEO Services</h3>
              <p className="font-body-base text-on-surface-variant mb-6 text-sm">Technical SEO and performance optimization to dominate search.</p>
              <button 
                onClick={() => { setCurrentScreen('seo'); window.scrollTo(0, 0); }}
                className="inline-flex items-center text-primary font-button-text hover:gap-2 transition-all duration-500"
              >
                Learn More <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
              </button>
            </div>
            {/* View All Placeholder */}
            <div onClick={() => scrollIntoView('services')} className="flex items-center justify-center border-2 border-dashed border-outline-variant rounded-xl opacity-50 hover:opacity-100 transition-all duration-500 cursor-pointer animate-on-scroll">
              <span className="font-button-text">View All Services</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Mycodu */}
      <section id="why-choose-us" className="py-24 relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 animate-on-scroll">
            <div className="max-w-2xl">
              <h2 className="font-headline-md text-headline-md mb-4">Why Global Brands Choose Us</h2>
              <p className="font-body-base text-on-surface-variant">We combine technical depth with agile delivery to provide a premium agency experience that scales with your growth.</p>
            </div>
            <div className="text-right hidden md:block">
              <div className="text-4xl font-bold text-primary counter" data-target="98">0%</div>
              <div className="text-xs font-code-label uppercase tracking-widest text-on-surface-variant">Client Retention Rate</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            <div className="space-y-4 animate-on-scroll">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">groups</span>
              </div>
              <h4 className="font-headline-md text-lg">Senior Engineers</h4>
              <p className="font-body-base text-sm text-on-surface-variant">100% in-house team of senior architects. No outsourcing, just elite talent.</p>
            </div>
            <div className="space-y-4 animate-on-scroll" style={{ transitionDelay: '100ms' }}>
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary">bolt</span>
              </div>
              <h4 className="font-headline-md text-lg">Fast Delivery</h4>
              <p className="font-body-base text-sm text-on-surface-variant">Agile sprints designed for rapid deployment without sacrificing code quality.</p>
            </div>
            <div className="space-y-4 animate-on-scroll" style={{ transitionDelay: '200ms' }}>
              <div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary">payments</span>
              </div>
              <h4 className="font-headline-md text-lg">Transparent Pricing</h4>
              <p className="font-body-base text-sm text-on-surface-variant">Clear, fixed-price or milestone billing. No hidden fees or surprise costs.</p>
            </div>
            <div className="space-y-4 animate-on-scroll" style={{ transitionDelay: '300ms' }}>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">support_agent</span>
              </div>
              <h4 className="font-headline-md text-lg">Post-Launch Support</h4>
              <p className="font-body-base text-sm text-on-surface-variant">Dedicated maintenance teams to ensure your platform evolves with the market.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Strip Carousel */}
      <section className="py-12 border-y border-white/5 bg-surface-container-low overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <h5 className="text-center font-code-label text-code-label opacity-40 uppercase mb-8 tracking-[0.2em] animate-on-scroll">Our Technology Ecosystem</h5>
          <div className="relative w-full overflow-hidden">
            <div className="infinite-scroll flex items-center gap-16 py-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="font-headline-md text-2xl whitespace-nowrap">React</span>
              <span className="font-headline-md text-2xl whitespace-nowrap">Next.js</span>
              <span className="font-headline-md text-2xl whitespace-nowrap">Node.js</span>
              <span className="font-headline-md text-2xl whitespace-nowrap">Python</span>
              <span className="font-headline-md text-2xl whitespace-nowrap">Flutter</span>
              <span className="font-headline-md text-2xl whitespace-nowrap">TensorFlow</span>
              <span className="font-headline-md text-2xl whitespace-nowrap">AWS</span>
              <span className="font-headline-md text-2xl whitespace-nowrap">GCP</span>
              <span className="font-headline-md text-2xl whitespace-nowrap">MongoDB</span>
              <span className="font-headline-md text-2xl whitespace-nowrap">PostgreSQL</span>
              {/* Duplicated for seamless loop */}
              <span className="font-headline-md text-2xl whitespace-nowrap">React</span>
              <span className="font-headline-md text-2xl whitespace-nowrap">Next.js</span>
              <span className="font-headline-md text-2xl whitespace-nowrap">Node.js</span>
              <span className="font-headline-md text-2xl whitespace-nowrap">Python</span>
              <span className="font-headline-md text-2xl whitespace-nowrap">Flutter</span>
              <span className="font-headline-md text-2xl whitespace-nowrap">TensorFlow</span>
              <span className="font-headline-md text-2xl whitespace-nowrap">AWS</span>
              <span className="font-headline-md text-2xl whitespace-nowrap">GCP</span>
              <span className="font-headline-md text-2xl whitespace-nowrap">MongoDB</span>
              <span className="font-headline-md text-2xl whitespace-nowrap">PostgreSQL</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section id="portfolio" className="py-24 relative z-10">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="flex justify-between items-center mb-16 animate-on-scroll">
            <h2 className="font-headline-md text-headline-md">Success Stories</h2>
            <button onClick={() => { setCurrentScreen('portfolio'); window.scrollTo(0, 0); }} className="font-button-text text-primary flex items-center gap-2 hover:underline">
              View Full Portfolio <span className="material-symbols-outlined">north_east</span>
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
            {/* Project 1 */}
            <div className="group cursor-pointer tilt-element animate-on-scroll" onClick={() => setCurrentScreen('full-stack')}>
              <div className="relative h-[400px] rounded-2xl overflow-hidden mb-6 glass-card">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="A futuristic dashboard UI for a fintech application featuring neon blue charts and glowing data visualizations on a dark glassmorphic background. The lighting is cold and professional, suggesting high-security and real-time financial tracking for a global user base." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUyZfhxxgiHGJd5V58XtYiq0CCB6tZ_frTIhgaGhxoD7_SDEhKkSoxsFPhUPgwCgxv4SxDIRfqAiv5z_LPtSnMvyJ74FNPV6wSoiF6SPJ70RxjaYRBwM_JDYbsFnuCE0wUqvFTVbfSCMxMTAetRGSB65SabWh3AHDGLko_LgN_tp863W-orA65mUIfeZEN4KEOo7x_Srg2Kh58TmEptwisQ6Ets6QhIQMkSabGbhJmciGvgN9qOCUERFVccl858gWIMfXKhwhs94Qp"/>
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
                <div className="absolute bottom-6 left-6">
                  <span className="bg-primary text-on-primary px-3 py-1 rounded font-code-label text-xs uppercase">Fintech</span>
                </div>
              </div>
              <h3 className="font-headline-md text-2xl mb-2 group-hover:text-primary transition-colors duration-500">Quantum Pay</h3>
              <p className="font-body-base text-on-surface-variant mb-4">Scalable payment infrastructure serving 1M+ active users globally.</p>
              <div className="flex items-center gap-4 text-primary font-code-label text-sm">
                <span>Scale: 1M+ users</span>
              </div>
            </div>
            {/* Project 2 */}
            <div className="group cursor-pointer tilt-element animate-on-scroll" style={{ transitionDelay: '150ms' }} onClick={() => setCurrentScreen('ai-eng')}>
              <div className="relative h-[400px] rounded-2xl overflow-hidden mb-6 glass-card">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="An abstract visualization of an AI healthcare platform, showing neural network strands glowing in violet and cyan colors connecting to human health icons. The design is clean, clinical, and futuristic, with a sense of high accuracy and advanced medical diagnostic power." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPl2yH_dC7inqKVZKxcXDVjlPDqLwkYhwhsDBqp0pe_TTEaYfQdGY9T4Ez4vO-CTUGgHEj0vuY-XpzlpjHGb8u9DqlqwE3zwxTN3XVOO0YZDfgjQ3HJe3DY5VgstuHCAH1IXmm1A15FIRvkpS5Cw1Yr8cD2E9-QrsjpdunhHtsduD60SMATICnpF-sXE59u3N62pTVTzpNb4H7BtPv6MkDBjgaRWd9fMrcjvschYj4nNyyRJrYP8INJpaevC2EauBXWicgRvDSKgwT"/>
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
                <div className="absolute bottom-6 left-6">
                  <span className="bg-secondary text-on-secondary px-3 py-1 rounded font-code-label text-xs uppercase">AI Health</span>
                </div>
              </div>
              <h3 className="font-headline-md text-2xl mb-2 group-hover:text-primary transition-colors duration-500">NeuralDiagnostics</h3>
              <p className="font-body-base text-on-surface-variant mb-4">AI-driven platform for automated medical imaging analysis.</p>
              <div className="flex items-center gap-4 text-secondary font-code-label text-sm">
                <span>Accuracy: 99.4%</span>
              </div>
            </div>
            {/* Project 3 */}
            <div className="group cursor-pointer tilt-element animate-on-scroll" style={{ transitionDelay: '300ms' }} onClick={() => setCurrentScreen('full-stack')}>
              <div className="relative h-[400px] rounded-2xl overflow-hidden mb-6 glass-card">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="A sleek corporate office environment at night with large windows overlooking a glowing city. In the foreground, a professional laptop displays complex enterprise SaaS workflows and resource management tools with glowing cyan highlights, emphasizing extreme efficiency and modern productivity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuClhOFqakiFryqQSvbr44lxhZ2NrHjfTmi7rwLAlxLLaWycL916f3yesz-uCuF5y_Q3F8kHzEjK09TMjJvm6EsWsauulANwikPga_qoqWBB3hen6mnO-_smlj1pJmDqCJVa-_PeOtmjCeGEL6QcYv1dahop-wCnVGZB9tO5RByKxAnl8GVOQc6ne1jnlWdxl_gwz3v9FB7cQGwM6AmVXJlKmRlPC40aorPJAwQ2xk5e82gqELIOhzZbwiqhuLKpXjDFRrZL8d-42oRf"/>
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
                <div className="absolute bottom-6 left-6">
                  <span className="bg-tertiary text-on-tertiary px-3 py-1 rounded font-code-label text-xs uppercase">Enterprise</span>
                </div>
              </div>
              <h3 className="font-headline-md text-2xl mb-2 group-hover:text-primary transition-colors duration-500">OmniFlow ERP</h3>
              <p className="font-body-base text-on-surface-variant mb-4">Enterprise SaaS solution optimizing supply chain performance.</p>
              <div className="flex items-center gap-4 text-tertiary font-code-label text-sm">
                <span>Efficiency: +40%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-20 bg-surface-container relative z-10">
        <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-2 lg:grid-cols-4 gap-gutter text-center">
          <div className="animate-on-scroll">
            <div className="font-display-lg text-4xl lg:text-5xl text-primary mb-2 counter" data-target="150">0+</div>
            <div className="font-code-label text-xs uppercase tracking-widest text-on-surface-variant">Projects Delivered</div>
          </div>
          <div className="animate-on-scroll" style={{ transitionDelay: '100ms' }}>
            <div className="font-display-lg text-4xl lg:text-5xl text-primary mb-2 counter" data-target="50">0+</div>
            <div className="font-code-label text-xs uppercase tracking-widest text-on-surface-variant">Happy Clients</div>
          </div>
          <div className="animate-on-scroll" style={{ transitionDelay: '200ms' }}>
            <div className="font-display-lg text-4xl lg:text-5xl text-primary mb-2 counter" data-target="8">0+</div>
            <div className="font-code-label text-xs uppercase tracking-widest text-on-surface-variant">Years Active</div>
          </div>
          <div className="animate-on-scroll" style={{ transitionDelay: '300ms' }}>
            <div className="font-display-lg text-4xl lg:text-5xl text-primary mb-2 counter" data-target="12">0+</div>
            <div className="font-code-label text-xs uppercase tracking-widest text-on-surface-variant">Countries Served</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative z-10">
        <div className="max-w-container-max mx-auto px-margin-desktop text-center">
          <h2 className="font-headline-md text-headline-md mb-12 animate-on-scroll">Client Feedback</h2>
          <div className="relative max-w-4xl mx-auto overflow-hidden animate-on-scroll" id="testimonial-carousel">
            <div className="flex transition-transform duration-700 ease-in-out" id="carousel-track" style={{ transform: `translateX(-${currentIdx * 100}%)` }}>
              {/* Slide 1 */}
              <div className="w-full flex-shrink-0 px-4">
                <div className="glass-card p-12 rounded-3xl border-white/5 italic">
                  <span className="material-symbols-outlined text-6xl text-primary/20 mb-6 block">format_quote</span>
                  <p className="text-2xl font-light mb-8">"Mycodu Agency didn't just build our app; they helped us redefine our entire technical architecture. Their senior talent is undeniable."</p>
                  <div>
                    <h5 className="font-bold text-on-surface">James Chen</h5>
                    <p className="text-sm text-on-surface-variant">CTO at FinSphere Global</p>
                  </div>
                </div>
              </div>
              {/* Slide 2 */}
              <div className="w-full flex-shrink-0 px-4">
                <div className="glass-card p-12 rounded-3xl border-white/5 italic">
                  <span className="material-symbols-outlined text-6xl text-primary/20 mb-6 block">format_quote</span>
                  <p className="text-2xl font-light mb-8">"The precision and speed at which they deliver high-complexity AI models is unparalleled. A true partner for any tech-driven company."</p>
                  <div>
                    <h5 className="font-bold text-on-surface">Sarah Miller</h5>
                    <p className="text-sm text-on-surface-variant">Product Head at HealthAI</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Controls */}
            <div className="flex justify-center gap-4 mt-8">
              <button onClick={prevSlide} className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-variant transition-colors" id="prevBtn">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button onClick={nextSlide} className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-variant transition-colors" id="nextBtn">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-24 max-w-container-max mx-auto px-margin-desktop relative z-10 animate-on-scroll">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse mr-2"></span>
            <span className="font-code-label text-code-label text-primary uppercase">Get In Touch</span>
          </div>
          <h2 className="font-headline-md text-headline-md">Connect With Our Engineers</h2>
          <p className="font-body-base text-body-base text-on-surface-variant max-w-2xl mx-auto">
            Let's discuss your technical goals. Reach out via email, phone, visit our office, or drop us a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
          {/* Left Column: Contact Info Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Phone Card */}
            <div className="glass-card p-8 rounded-2xl border-white/5 hover:border-primary/30 transition-all duration-300 flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300 shadow-md">
                <span className="material-symbols-outlined text-[28px]">phone</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-code-label text-code-label text-primary uppercase tracking-wider">Phone Number</h4>
                <p className="text-xl font-bold text-on-surface hover:text-primary transition-colors">
                  <a href="tel:03445089015">03445089015</a>
                </p>
                <p className="text-xs text-on-surface-variant">Available Monday – Friday, 9am – 6pm</p>
              </div>
            </div>

            {/* Email Card */}
            <div className="glass-card p-8 rounded-2xl border-white/5 hover:border-primary/30 transition-all duration-300 flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300 shadow-md">
                <span className="material-symbols-outlined text-[28px]">mail</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-code-label text-code-label text-primary uppercase tracking-wider">Email Address</h4>
                <p className="text-xl font-bold text-on-surface hover:text-primary transition-colors break-all">
                  <a href="mailto:malik.kaxif7@gmail.com">malik.kaxif7@gmail.com</a>
                </p>
                <p className="text-xs text-on-surface-variant">We respond within 24 business hours</p>
              </div>
            </div>

            {/* Address Card */}
            <div className="glass-card p-8 rounded-2xl border-white/5 hover:border-primary/30 transition-all duration-300 flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300 shadow-md">
                <span className="material-symbols-outlined text-[28px]">location_on</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-code-label text-code-label text-primary uppercase tracking-wider">Our Headquarters</h4>
                <p className="text-lg font-bold text-on-surface leading-tight">
                  Office 1, Plaza 44, Bahria Phase 7, Rawalpindi
                </p>
                <p className="text-xs text-on-surface-variant">Come visit our engineering hub</p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-10 rounded-2xl border-white/5 h-full relative overflow-hidden flex flex-col justify-center">
              {formSubmitted ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto text-primary animate-bounce">
                    <span className="material-symbols-outlined text-5xl">task_alt</span>
                  </div>
                  <h3 className="text-2xl font-bold text-on-surface">Message Received!</h3>
                  <p className="text-on-surface-variant max-w-md mx-auto">
                    {submitResponseMsg}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-error/10 border border-error/30 text-error text-sm flex items-center gap-3">
                      <span className="material-symbols-outlined text-xl shrink-0">error</span>
                      <span>{errorMessage}</span>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-code-label uppercase text-on-surface-variant tracking-wider">Your Name</label>
                      <input
                        type="text"
                        required
                        disabled={isSubmitting}
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-surface-container/60 border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-code-label uppercase text-on-surface-variant tracking-wider">Email Address</label>
                      <input
                        type="email"
                        required
                        disabled={isSubmitting}
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-surface-container/60 border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-code-label uppercase text-on-surface-variant tracking-wider">Subject / Inquiry</label>
                    <input
                      type="text"
                      disabled={isSubmitting}
                      placeholder="Project architecture discussion"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-surface-container/60 border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-code-label uppercase text-on-surface-variant tracking-wider">Brief Message</label>
                    <textarea
                      required
                      rows={4}
                      disabled={isSubmitting}
                      placeholder="Tell us about your project goals and scope..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-surface-container/60 border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary/50 transition-colors resize-none disabled:opacity-50"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-on-primary font-button-text font-bold py-4 rounded-lg hover:scale-[1.02] hover:shadow-primary/20 transition-all duration-300 text-on-primary-fixed disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-on-primary-fixed border-t-transparent rounded-full animate-spin"></span>
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-24 max-w-container-max mx-auto px-margin-desktop mb-24 relative z-10 animate-on-scroll">
        <div className="relative glass-card rounded-[2rem] p-16 text-center overflow-hidden">
          <div className="relative z-10 space-y-8">
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg">Ready to build something <span className="text-primary italic">extraordinary?</span></h2>
            <p className="font-body-base text-on-surface-variant max-w-2xl mx-auto">Let's discuss your roadmap and how our technical expertise can accelerate your vision to production.</p>
            <div className="flex justify-center">
              <div className="magnetic-wrap">
                <button onClick={() => scrollIntoView('contact')} className="bg-primary text-on-primary px-12 py-5 rounded-xl font-button-text text-lg shadow-2xl shadow-primary/30 hover:scale-105 transition-all duration-500">
                  Get a Free Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button (Positioned Bottom-Left to prevent overlap with Chatbot) */}
      <a className="fixed bottom-8 left-8 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl z-[90] group hover:scale-110 transition-transform duration-300" href="https://wa.me/923445089015" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
        </svg>
        <span className="absolute left-full ml-4 bg-surface text-on-surface px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-xl">Talk to an Engineer</span>
      </a>
    </>
  )
}

export default HomeScreen
