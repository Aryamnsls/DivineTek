import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', type: 'employer', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      })
      
      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.error || 'Failed to submit')
      }
      
      setSubmitted(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-overlay" />
        <div className="container">
          <span className="section-label">Reach Out</span>
          <h1>GET IN TOUCH</h1>
          <div className="hero-divider" />
          <p>Ready to connect? Whether you're looking to hire top IT talent or find your next great opportunity, we're here to help.</p>
        </div>
      </section>

      {/* Contact main */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-grid">
            {/* Info */}
            <div className="contact-info">
              <span className="section-label">Contact Details</span>
              <h2 className="section-title">LET'S CONNECT</h2>
              <div className="section-divider left" />

              <div className="contact-cards">
                <div className="contact-info-card">
                  <div className="ci-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <h4>Office Address</h4>
                    <p>30 N Gould St Ste R<br/>Sheridan, WY 82801</p>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="ci-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.06 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>
                  </div>
                  <div>
                    <h4>Phone</h4>
                    <p><a href="tel:+13072758660">+1 307-275-8660</a></p>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="ci-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div>
                    <h4>General Inquiries</h4>
                    <p><a href="mailto:info@divinetek.com">info@divinetek.com</a></p>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="ci-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                  </div>
                  <div>
                    <h4>Submit Resumes</h4>
                    <p><a href="mailto:resumes@divinetek.com">resumes@divinetek.com</a></p>
                  </div>
                </div>
              </div>

              <div className="contact-hours">
                <h4>Business Hours</h4>
                <div className="hours-list">
                  <div className="hours-row"><span>Monday – Friday</span><span>8:00 AM – 6:00 PM MT</span></div>
                  <div className="hours-row"><span>Saturday</span><span>By Appointment</span></div>
                  <div className="hours-row"><span>Sunday</span><span>Closed</span></div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-wrap">
              {submitted ? (
                <div className="success-msg">
                  <div className="success-icon">✓</div>
                  <h3>Message Received!</h3>
                  <p>Thank you for reaching out to DivineTEK. A member of our team will be in touch with you within one business day.</p>
                  <button className="btn-primary" onClick={() => setSubmitted(false)}>Send Another Message</button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <h3 className="form-title">Send Us a Message</h3>

                  <div className="form-type-toggle">
                    <button
                      type="button"
                      className={`type-btn ${form.type === 'employer' ? 'active' : ''}`}
                      onClick={() => setForm(f => ({ ...f, type: 'employer' }))}
                    >
                      I'm an Employer
                    </button>
                    <button
                      type="button"
                      className={`type-btn ${form.type === 'jobseeker' ? 'active' : ''}`}
                      onClick={() => setForm(f => ({ ...f, type: 'jobseeker' }))}
                    >
                      I'm a Job Seeker
                    </button>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="John Smith" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="john@company.com" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="(555) 000-0000" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="company">Company / Organization</label>
                      <input id="company" name="company" type="text" value={form.company} onChange={handleChange} placeholder="Company Name" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea id="message" name="message" rows="5" required value={form.message} onChange={handleChange} placeholder={form.type === 'employer' ? 'Tell us about the position(s) you need to fill...' : 'Tell us about your skills and what type of role you\'re seeking...'} />
                  </div>

                  {error && <div style={{color: '#e74c3c', marginBottom: '16px', fontSize: '0.9rem', fontWeight: '500'}}>{error}</div>}

                  <button type="submit" className="btn-primary submit-btn" disabled={loading} style={{opacity: loading ? 0.7 : 1}}>
                    {loading ? 'Sending...' : 'Send Message'}
                    {!loading && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="map-section">
        <div className="map-placeholder">
          <div className="map-overlay">
            <div className="map-pin">📍</div>
            <h3>DivineTEK</h3>
            <p>30 N Gould St Ste R, Sheridan, WY 82801</p>
            <a
              href="https://maps.google.com/?q=30+N+Gould+St+Ste+R+Sheridan+WY+82801"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Open in Maps
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
