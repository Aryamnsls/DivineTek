import { Link } from 'react-router-dom'
import './ProfessionalServices.css'

const services = [
  {
    icon: '🛡️',
    title: 'Security Assessment',
    desc: 'Comprehensive evaluation of your current security posture, identifying vulnerabilities before attackers do. We deliver actionable roadmaps to strengthen your defenses.',
  },
  {
    icon: '🔐',
    title: 'Penetration Testing',
    desc: 'Ethical hacking simulations that test your systems, networks, and applications to reveal real-world security weaknesses before malicious actors find them.',
  },
  {
    icon: '📊',
    title: 'Risk Management',
    desc: 'Identify, analyze, and prioritize security risks to your business. We help you allocate resources effectively and build a risk-aware culture.',
  },
  {
    icon: '☁️',
    title: 'Cloud Security',
    desc: 'Secure your AWS, Azure, and Google Cloud environments with expert configuration, monitoring, and compliance management tailored to your architecture.',
  },
  {
    icon: '🔍',
    title: 'Incident Response',
    desc: 'Rapid response to security breaches. Our team contains threats quickly, minimizes damage, restores operations, and helps you recover with confidence.',
  },
  {
    icon: '📋',
    title: 'Compliance & Governance',
    desc: 'Navigate SOC 2, ISO 27001, HIPAA, PCI-DSS, and NIST frameworks with expert guidance to achieve and maintain compliance efficiently.',
  },
  {
    icon: '👁️',
    title: 'Security Monitoring',
    desc: '24/7 monitoring and alerting through our Security Operations Center (SOC), providing real-time visibility and response to potential threats.',
  },
  {
    icon: '🎓',
    title: 'Security Awareness Training',
    desc: 'Empower your employees to be your first line of defense with engaging, effective cybersecurity training programs tailored to your organization.',
  },
]

const journey = [
  {
    phase: 'Assess',
    title: 'Where Are You Now?',
    desc: 'We begin with a thorough assessment of your current security state — technology, processes, people, and policies.',
    color: '#e74c3c',
  },
  {
    phase: 'Plan',
    title: 'Where Do You Need to Be?',
    desc: 'We develop a strategic roadmap that balances security requirements with business objectives and budget realities.',
    color: '#f39c12',
  },
  {
    phase: 'Implement',
    title: 'How Do You Get There?',
    desc: 'Our experts implement solutions and improvements systematically, minimizing disruption while maximizing security gains.',
    color: '#2ecc71',
  },
  {
    phase: 'Monitor',
    title: 'Staying Protected',
    desc: 'Continuous monitoring, testing, and improvement keep your security posture strong as threats evolve.',
    color: '#1e5fa8',
  },
]

export default function ProfessionalServices() {
  return (
    <div className="prof-services-page">
      {/* Hero */}
      <section className="ps-hero">
        <div className="ps-hero-overlay" />
        <div className="ps-hero-grid">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="ps-grid-cell" />
          ))}
        </div>
        <div className="container">
          <span className="section-label">CyberSecurity Division</span>
          <h1>PROFESSIONAL SERVICES</h1>
          <div className="hero-divider" />
          <p>We meet you where you are on your CyberSecurity journey. Expert guidance, cutting-edge solutions, and dedicated specialists ready to protect what matters most.</p>
          <div className="hero-btns">
            <Link to="/contact" className="btn-primary">Start Your Assessment</Link>
            <a href="#ps-services" className="btn-outline">Our Services</a>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="journey-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="section-label">Our Approach</span>
            <h2 className="section-title" style={{ textAlign: 'center' }}>YOUR CYBERSECURITY JOURNEY</h2>
            <div className="section-divider" />
            <p style={{ color: '#6b7a8f', maxWidth: '600px', margin: '0 auto', lineHeight: '1.75' }}>
              We meet every client exactly where they are and build a path to where they need to be — no one-size-fits-all solutions.
            </p>
          </div>
          <div className="journey-grid">
            {journey.map((j, i) => (
              <div key={i} className="journey-card" style={{ '--j-color': j.color }}>
                <div className="journey-phase">{j.phase}</div>
                <h3>{j.title}</h3>
                <p>{j.desc}</p>
                {i < journey.length - 1 && <div className="journey-arrow">›</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="ps-services" id="ps-services">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="section-label">What We Offer</span>
            <h2 className="section-title white" style={{ textAlign: 'center' }}>CYBERSECURITY SERVICES</h2>
            <div className="section-divider" />
          </div>
          <div className="ps-services-grid">
            {services.map((svc, i) => (
              <div key={i} className="ps-service-card">
                <div className="ps-service-icon">{svc.icon}</div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Threat Landscape */}
      <section className="threat-section">
        <div className="container">
          <div className="threat-grid">
            <div className="threat-content">
              <span className="section-label">The Challenge</span>
              <h2 className="section-title">THE MODERN THREAT LANDSCAPE</h2>
              <div className="section-divider left" />
              <p>Cyber threats are not slowing down. Every day, organizations face thousands of attack attempts targeting their data, systems, and people. The question isn't if your organization will be targeted — it's whether you'll be ready.</p>
              <div className="threat-stats">
                {[
                  { stat: '$4.45M', label: 'Average cost of a data breach (2023)' },
                  { stat: '277 days', label: 'Average time to identify a breach' },
                  { stat: '83%', label: 'Of organizations experienced more than one breach' },
                ].map((t, i) => (
                  <div key={i} className="threat-stat">
                    <div className="t-stat-value">{t.stat}</div>
                    <div className="t-stat-label">{t.label}</div>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-primary" style={{ marginTop: '24px', display: 'inline-flex' }}>
                Protect Your Organization
              </Link>
            </div>
            <div className="threat-visual">
              <div className="shield-wrap">
                <div className="shield">
                  <div className="shield-icon">🛡️</div>
                  <div className="shield-text">divineTEK</div>
                  <div className="shield-sub">Protected</div>
                </div>
                <div className="threat-orbs">
                  {['Ransomware', 'Phishing', 'DDoS', 'Malware', 'Insider Threats', 'Zero-day'].map((t, i) => (
                    <div key={i} className="threat-orb" style={{ '--i': i }}>{t}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ps-cta">
        <div className="cta-bg" />
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Strengthen Your CyberSecurity?</h2>
            <p>Schedule a free consultation with one of our cybersecurity experts today. We'll assess your needs and recommend the best path forward.</p>
            <div className="cta-btns">
              <Link to="/contact" className="btn-gold">Schedule Free Consultation</Link>
              <Link to="/about" className="btn-outline">Learn About divineTEK</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
