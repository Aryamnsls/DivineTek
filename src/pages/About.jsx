import { Link } from 'react-router-dom'
import './About.css'

const testimonials = [
  {
    quote: "I have appreciated my association with divineTEK. Everyone with whom I have had contact has been helpful, friendly, professional and knowledgeable.",
    name: '– Melinda',
    role: 'Project Manager',
  },
  {
    quote: "Our divineTEK consultant far exceeded my expectations with an amazing job on my project. There is no way we could have completed as many enhancements as we did on time, on budget without divineTEK consultants.",
    name: '– Hiring Manager',
    role: 'Multi-National Financial Services Firm',
  },
  {
    quote: "My divineTEK recruiter is a top-notch professional in every way. I've been amazed at how quickly she could keep this position moving forward.",
    name: '– Cynthia',
    role: 'Program Manager, PMP',
  },
  {
    quote: "Time is a premium in my organization. divineTEK gets our needs correct the first time and has consistently out-performed other vendors.",
    name: '– Vice President',
    role: 'Fortune 100 Company',
  },
]

export default function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="page-hero about-hero">
        <div className="hero-overlay" />
        <div className="container">
          <h1>ABOUT US</h1>
          <p>We love what we do — placing top talent with industry leaders, mid-sized enterprises, and startups. Find out why our clients come back (again and again.)</p>
          <div className="hero-divider" />
        </div>
      </section>

      {/* Credentials */}
      <section className="credentials-section">
        <div className="container">
          <div className="credentials-grid">
            <div className="credential-card">
              <div className="credential-badge preferred">✦</div>
              <h3>PREFERRED VENDOR</h3>
              <p>Working hard for over 30 years means that divineTEK is a preferred vendor for companies across the nation — from Fortune 100 and 500 companies to SMBs.</p>
            </div>
            <div className="credential-card">
              <div className="credential-badge platinum">★</div>
              <h3>EXCEPTIONAL TALENT</h3>
              <p>Only the best IT talent works for divineTEK. That's how we've maintained our great partnerships with clients for decades while attracting new companies every day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="about-testimonials">
        <div className="container">
          <span className="section-label">Client Feedback</span>
          <h2 className="section-title white">WHAT PEOPLE ARE SAYING</h2>
          <div className="section-divider" />
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-item">
                <div className="testimonial-quote-mark">"</div>
                <p>{t.quote}</p>
                <div className="testimonial-cite">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="our-story">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <span className="section-label">Our History</span>
              <h2 className="section-title">OUR STORY</h2>
              <div className="section-divider left" />
              <blockquote className="story-quote">
                "Be a yardstick of quality. Some people aren't used to an environment where excellence is expected."
                <cite>— Steve Jobs</cite>
              </blockquote>
              <p>divineTEK has lived by this principle since the day we first opened our doors in 1990. Excellence extends through every consultant, client, and interaction we have. Our No. 1 focus is to deliver the smartest and most dedicated IT talent that matches our clients' needs across all major industries and technologies.</p>
              <p>We have maintained laser-focus for over 30 years running. We've grown by leaps and bounds, but without sacrificing our boutique-firm feel and personal attention to every client and consultant.</p>
              <p>Our consultant recruiting and screening process is one of the most rigorous in the industry, and we 100% guarantee our services. Through each and every project, divineTEK account executives constantly reassess needs to make sure the consultant is the right fit for the position.</p>
              <p>Our clients love us because we listen to their needs and match their exact job specifications with the right candidate to fill them, no matter how straightforward or complex the project, while maximizing their IT investment. That's how divineTEK backs up its "preferred vendor" status with leading companies.</p>
              <p><strong>Excellence is the way we do business.</strong></p>
              <Link to="/contact" className="btn-primary" style={{ marginTop: '24px', display: 'inline-flex' }}>Get in Touch</Link>
            </div>
            <div className="story-visual">
              <div className="timeline">
                {[
                  { year: '1990', label: 'Founded', desc: 'divineTEK opens its doors with a vision of excellence in IT staffing.' },
                  { year: '2000', label: 'Growth', desc: 'Expanded to serve Fortune 500 companies across the nation.' },
                  { year: '2010', label: 'Leadership', desc: 'Achieved preferred vendor status with dozens of top corporations.' },
                  { year: '2020', label: 'Innovation', desc: 'Launched professional CyberSecurity services division.' },
                  { year: 'Now', label: 'Excellence', desc: '30+ years of connecting the best talent with the best opportunities.' },
                ].map((item, i) => (
                  <div key={i} className="timeline-item">
                    <div className="timeline-year">{item.year}</div>
                    <div className="timeline-dot" />
                    <div className="timeline-content">
                      <strong>{item.label}</strong>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="section-label">Our Foundation</span>
            <h2 className="section-title" style={{ textAlign: 'center' }}>CORE VALUES</h2>
            <div className="section-divider" />
          </div>
          <div className="values-grid">
            {[
              { icon: '🎯', title: 'Excellence', desc: 'We hold ourselves to the highest standards in every placement, every interaction, every day.' },
              { icon: '🤝', title: 'Partnership', desc: 'We build lasting relationships based on trust, transparency, and mutual success.' },
              { icon: '⚡', title: 'Agility', desc: 'We move at the speed of technology, always ready to respond when opportunity knocks.' },
              { icon: '🔍', title: 'Precision', desc: 'We listen carefully to match the exact skills and culture fit our clients need.' },
            ].map((v, i) => (
              <div key={i} className="value-card">
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
