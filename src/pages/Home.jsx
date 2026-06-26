import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const heroSlides = [
  {
    tagline: 'TALENT SOLUTIONS',
    title: 'Connecting Elite IT Talent\nWith Industry Leaders',
    sub: 'divineTEK matches the best and brightest technology professionals with Fortune 100 & 500 companies, SMBs, and startups.',
  },
  {
    tagline: 'TECHNOLOGY DRIVEN',
    title: 'Smart. Agile.\nReady to Work.',
    sub: 'We live and breathe information technology, moving at the pace of your business to deliver the right talent at the right moment.',
  },
  {
    tagline: 'PARTNERING WITH YOU',
    title: 'Your Success Is\nOur Mission',
    sub: 'For more than 30 years, divineTEK has been a trusted preferred provider partner for companies across every major industry.',
  },
]

const stats = [
  { value: 9982, suffix: '', label: 'Completed Projects', icon: '🏆' },
  { value: 13138, suffix: '', label: 'Careers Elevated', icon: '🚀' },
  { value: 9275, suffix: '', label: 'Cups of Coffee', icon: '☕' },
  { value: 30, suffix: '+', label: 'Years in Business', icon: '⭐' },
]

const services = [
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="16" width="56" height="36" rx="4" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M12 36h8M28 28h16M28 36h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="48" cy="32" r="8" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M45 32l2 2 4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 24h56" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="12" cy="20" r="2" fill="currentColor"/>
        <circle cx="20" cy="20" r="2" fill="currentColor"/>
      </svg>
    ),
    title: 'Employers',
    subtitle: '(Staffing Clients)',
    desc: "There's a reason divineTEK is a preferred provider for many leading companies — we've worked for it. We listen and deliver the right talent for the job.",
    link: '/clients',
    color: '#1e5fa8',
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M32 14v4M32 46v4M14 32h4M46 32h4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="32" cy="32" r="10" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M22 22l4 4M38 38l4 4M22 42l4-4M38 26l4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="32" cy="32" r="3" fill="currentColor"/>
      </svg>
    ),
    title: 'Professional Services',
    subtitle: '(CyberSecurity Clients)',
    desc: 'We meet you where you are on your CyberSecurity journey. Expert solutions, risk assessments, and managed security services tailored to your needs.',
    link: '/professional-services',
    color: '#c9a84c',
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="20" r="10" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M12 52c0-11.046 8.954-20 20-20s20 8.954 20 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M40 36l4 4-4 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M44 40H36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Job Seekers',
    subtitle: '',
    desc: 'Do you have stellar IT skills, dedication, and focus? Want to work for the world\'s most respected companies on the hottest projects? Let\'s talk.',
    link: '/job-seekers',
    color: '#2ecc71',
  },
]

const testimonials = [
  {
    quote: "I have appreciated my association with divineTEK. Everyone with whom I have had contact has been helpful, friendly, professional and knowledgeable. I can't think of a better combination for my first contract job!",
    name: '– Melinda',
    role: 'Project Manager',
  },
  {
    quote: "Our divineTEK consultant far exceeded my expectations with an amazing job on my project, taking on any and every task assigned as well as making key suggestions for improvement.",
    name: '– Hiring Manager',
    role: 'Multi-National Financial Services Firm',
  },
  {
    quote: "My divineTEK recruiter is a top-notch professional in every way. I've been amazed at how quickly she could keep this position moving forward. I look forward to working with divineTEK again.",
    name: '– Cynthia',
    role: 'Program Manager, PMP',
  },
  {
    quote: "Time is a premium in my organization. divineTEK gets our needs correct the first time and has consistently out-performed other vendors in coming to the table with the right resource.",
    name: '– Vice President',
    role: 'Fortune 100 Company',
  },
]

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

function StatItem({ value, suffix, label, icon, start }) {
  const count = useCountUp(value, 2200, start)
  return (
    <div className="stat-item">
      <div className="stat-icon">{icon}</div>
      <div className="stat-number">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export default function Home() {
  const [slide, setSlide] = useState(0)
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef(null)
  const [testimonialIdx, setTestimonialIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide(s => (s + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true) },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  const nextTestimonial = () => setTestimonialIdx(i => (i + 1) % testimonials.length)
  const prevTestimonial = () => setTestimonialIdx(i => (i - 1 + testimonials.length) % testimonials.length)

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-overlay" />
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
            }} />
          ))}
        </div>

        <div className="container">
          <div className="hero-content">
            {heroSlides.map((s, i) => (
              <div key={i} className={`hero-slide ${i === slide ? 'active' : ''}`}>
                <div className="hero-tag">{s.tagline}</div>
                <h1 className="hero-title">
                  {s.title.split('\n').map((line, li) => (
                    <span key={li}>{line}{li < s.title.split('\n').length - 1 && <br />}</span>
                  ))}
                </h1>
                <p className="hero-sub">{s.sub}</p>
                <div className="hero-btns">
                  <Link to="/contact" className="btn-primary">Get Started</Link>
                  <Link to="/about" className="btn-outline">Learn More</Link>
                </div>
              </div>
            ))}
          </div>

          <div className="hero-brand-block">
            <div className="brand-wordmark">
              <span className="bw-divine">divine</span>
              <span className="bw-tek">TEK</span>
            </div>
            <div className="brand-divider" />
            <div className="brand-sub">TALENT · TECHNOLOGY · PARTNERS</div>
            <div className="brand-since">SINCE 1990</div>
          </div>
        </div>

        <div className="hero-dots">
          {heroSlides.map((_, i) => (
            <button key={i} className={`dot ${i === slide ? 'active' : ''}`} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>

        <div className="hero-scroll-indicator">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* About Strip */}
      <section className="about-strip">
        <div className="container">
          <span className="section-label">Who We Are</span>
          <h2 className="section-title">ABOUT</h2>
          <div className="section-divider left" />
          <p className="about-strip-text">
            Technology shifts and improves every industry. Projects ebb and flow. Companies want shiny new apps. 
            IT talent must be smart, agile, and ready to work when the moment strikes. That's why divineTEK lives 
            and breathes information technology and moves at the pace of our clients. For more than 30 years, we've been 
            matching the best and brightest IT talent with Fortune 100 and 500 companies, SMBs, and startups.
          </p>
          <Link to="/about" className="btn-primary" style={{ marginTop: '24px', display: 'inline-flex' }}>
            Our Story →
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">What We Offer</span>
            <h2 className="section-title" style={{ textAlign: 'center' }}>HOW WE CAN HELP</h2>
            <div className="section-divider" />
          </div>

          <div className="services-grid">
            {services.map((svc, i) => (
              <Link to={svc.link} key={i} className="service-card" style={{ '--accent': svc.color }}>
                <div className="service-icon-wrap">
                  {svc.icon}
                </div>
                <h3 className="service-card-title">{svc.title}</h3>
                {svc.subtitle && <span className="service-card-sub">{svc.subtitle}</span>}
                <p className="service-card-desc">{svc.desc}</p>
                <div className="service-card-cta">
                  Learn More <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section" ref={statsRef}>
        <div className="stats-bg" />
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <StatItem key={i} {...s} start={statsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="why-section">
        <div className="container">
          <div className="why-grid">
            <div className="why-content">
              <span className="section-label">Why Choose Us</span>
              <h2 className="section-title">THE DIVINETEK DIFFERENCE</h2>
              <div className="section-divider left" />
              <p className="why-text">
                "Be a yardstick of quality. Some people aren't used to an environment where excellence is expected." 
                — Steve Jobs
              </p>
              <p className="why-text">
                divineTEK has lived by this principle since the day we first opened our doors in 1990. Excellence extends 
                through every consultant, client, and interaction we have. Our No. 1 focus is to deliver the smartest 
                and most dedicated IT talent that matches our clients' needs across all major industries and technologies.
              </p>
              <div className="why-features">
                {[
                  { label: 'Preferred Vendor', desc: 'Trusted by Fortune 100 & 500 companies' },
                  { label: 'Rigorous Screening', desc: 'Most thorough vetting in the industry' },
                  { label: '100% Guarantee', desc: 'We stand behind every placement' },
                  { label: 'Boutique Feel', desc: 'Personal attention to every client' },
                ].map((f, i) => (
                  <div className="why-feature" key={i}>
                    <div className="why-check">✓</div>
                    <div>
                      <strong>{f.label}</strong>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-gold" style={{ marginTop: '8px' }}>Learn Our Story</Link>
            </div>

            <div className="why-visual">
              <div className="why-card why-card-1">
                <div className="why-card-icon">🏅</div>
                <strong>Preferred Vendor</strong>
                <p>For Fortune 100 & 500 Companies</p>
              </div>
              <div className="why-card why-card-2">
                <div className="why-card-icon">🔒</div>
                <strong>CyberSecurity</strong>
                <p>Enterprise-grade security solutions</p>
              </div>
              <div className="why-card why-card-3">
                <div className="why-card-icon">💡</div>
                <strong>30+ Years</strong>
                <p>Decades of IT staffing expertise</p>
              </div>
              <div className="why-card why-card-4">
                <div className="why-card-icon">🌐</div>
                <strong>Nationwide</strong>
                <p>Serving companies across the USA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Client Stories</span>
            <h2 className="section-title white">WHAT PEOPLE ARE SAYING</h2>
            <div className="section-divider" />
          </div>

          <div className="testimonials-slider">
            <div className="testimonial-card">
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">{testimonials[testimonialIdx].quote}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {testimonials[testimonialIdx].name.charAt(2)}
                </div>
                <div>
                  <strong>{testimonials[testimonialIdx].name}</strong>
                  <span>{testimonials[testimonialIdx].role}</span>
                </div>
              </div>
            </div>

            <div className="testimonial-controls">
              <button className="t-btn" onClick={prevTestimonial} aria-label="Previous">‹</button>
              <div className="t-dots">
                {testimonials.map((_, i) => (
                  <button key={i} className={`t-dot ${i === testimonialIdx ? 'active' : ''}`} onClick={() => setTestimonialIdx(i)} />
                ))}
              </div>
              <button className="t-btn" onClick={nextTestimonial} aria-label="Next">›</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="cta-bg" />
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Find Your Next IT Professional?</h2>
            <p>Whether you're an employer looking for top talent or a job seeker ready for your next opportunity — we're here to help.</p>
            <div className="cta-btns">
              <Link to="/clients" className="btn-gold">I'm an Employer</Link>
              <Link to="/job-seekers" className="btn-outline">I'm a Job Seeker</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
