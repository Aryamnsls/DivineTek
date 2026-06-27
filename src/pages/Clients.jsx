import { Link } from 'react-router-dom'
import './Clients.css'

const services = [
  {
    icon: '🔍',
    title: 'Contract Staffing',
    desc: 'Flexible IT staffing solutions for project-based needs. Scale your team up or down based on demand with pre-vetted, ready-to-deploy professionals.',
  },
  {
    icon: '🎯',
    title: 'Direct Hire',
    desc: 'Find your next full-time IT star. We identify, screen, and deliver candidates who align with your technical needs and company culture.',
  },
  {
    icon: '🔄',
    title: 'Contract-to-Hire',
    desc: 'Try before you commit. Evaluate a consultant\'s performance before making a permanent hiring decision, reducing risk significantly.',
  },
  {
    icon: '🏢',
    title: 'Managed Staffing',
    desc: 'Let us handle your entire contingent workforce program. We manage vendors, compliance, and talent pipelines so you don\'t have to.',
  },
  {
    icon: '⚙️',
    title: 'Project-Based Solutions',
    desc: 'Need a full team for a specific initiative? We assemble entire project teams with the right mix of skills to deliver on time and on budget.',
  },
  {
    icon: '🌐',
    title: 'Nationwide Reach',
    desc: 'Our network spans the entire country. No matter where your company is located, we can find the right IT talent for your needs.',
  },
]

const techAreas = [
  'Software Development', 'DevOps & Cloud', 'Data Science & AI', 'Cybersecurity',
  'Network Engineering', 'Database Administration', 'QA & Testing', 'Project Management',
  'Business Analysis', 'IT Infrastructure', 'UX/UI Design', 'ERP Systems',
]

export default function Clients() {
  return (
    <div className="clients-page">
      {/* Hero */}
      <section className="clients-hero">
        <div className="clients-hero-overlay" />
        <div className="container">
          <span className="section-label">For Employers</span>
          <h1>CLIENTS</h1>
          <div className="hero-divider" />
          <p>There's a reason DivineTEK is a "preferred provider" for many leading companies — we've worked for it. We listen and deliver the right talent for the job.</p>
          <div className="hero-btns">
            <Link to="/contact" className="btn-primary">Request Talent</Link>
            <a href="#client-services" className="btn-outline">Our Services</a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="client-why">
        <div className="container">
          <div className="client-why-grid">
            <div className="client-why-content">
              <span className="section-label">Why DivineTEK</span>
              <h2 className="section-title">THE PREFERRED VENDOR ADVANTAGE</h2>
              <div className="section-divider left" />
              <p>DivineTEK has earned preferred vendor status with some of the world's most prestigious companies — and we didn't get there by accident. We got there by consistently delivering the right talent at the right time, every single time.</p>
              <p>Our team of dedicated account executives learns your business inside and out. We understand the technologies you use, the projects you run, and the culture you've built — and we use that knowledge to make better matches.</p>
              <ul className="client-features">
                <li><span>✓</span> Pre-screened, skills-tested candidates only</li>
                <li><span>✓</span> Dedicated account executive for every client</li>
                <li><span>✓</span> 100% satisfaction guarantee on all placements</li>
                <li><span>✓</span> Fast turnaround — often within 48-72 hours</li>
                <li><span>✓</span> Nationwide talent pool with local expertise</li>
                <li><span>✓</span> Competitive rates without sacrificing quality</li>
              </ul>
              <Link to="/contact" className="btn-primary" style={{ marginTop: '16px', display: 'inline-flex' }}>Work With Us</Link>
            </div>
            <div className="client-why-stats">
              {[
                { value: '9,982+', label: 'Projects Completed' },
                { value: '30+', label: 'Years Experience' },
                { value: '100%', label: 'Satisfaction Guarantee' },
                { value: '48hrs', label: 'Average Response Time' },
              ].map((s, i) => (
                <div key={i} className="client-stat">
                  <div className="client-stat-value">{s.value}</div>
                  <div className="client-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="client-services" id="client-services">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="section-label">What We Offer</span>
            <h2 className="section-title" style={{ textAlign: 'center' }}>CLIENT SERVICES</h2>
            <div className="section-divider" />
            <p className="section-sub">From contract staffing to direct hire, we offer comprehensive talent solutions tailored to your unique needs.</p>
          </div>
          <div className="services-grid">
            {services.map((svc, i) => (
              <div key={i} className="service-item">
                <div className="service-icon">{svc.icon}</div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Areas */}
      <section className="tech-areas">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-label">Specializations</span>
            <h2 className="section-title white" style={{ textAlign: 'center' }}>TECHNOLOGY AREAS WE COVER</h2>
            <div className="section-divider" />
          </div>
          <div className="tech-grid">
            {techAreas.map((area, i) => (
              <div key={i} className="tech-tag">{area}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="client-process">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="section-label">How It Works</span>
            <h2 className="section-title" style={{ textAlign: 'center' }}>OUR PROCESS</h2>
            <div className="section-divider" />
          </div>
          <div className="process-steps">
            {[
              { step: '01', title: 'Consultation', desc: 'We meet to understand your business, culture, and exact technical requirements.' },
              { step: '02', title: 'Sourcing', desc: 'Our recruiters tap into our extensive network to identify the best candidates.' },
              { step: '03', title: 'Screening', desc: 'Rigorous technical and cultural assessments ensure only the best move forward.' },
              { step: '04', title: 'Placement', desc: 'We present top matches and facilitate interviews at your convenience.' },
              { step: '05', title: 'Support', desc: 'Ongoing check-ins ensure the placement is working perfectly for everyone.' },
            ].map((p, i) => (
              <div key={i} className="process-step">
                <div className="step-number">{p.step}</div>
                <div className="step-line" />
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="client-cta">
        <div className="cta-bg" />
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Find Your Next IT Professional?</h2>
            <p>Contact our team today and experience why leading companies trust DivineTEK as their preferred IT staffing partner.</p>
            <Link to="/contact" className="btn-gold">Request Talent Today</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
