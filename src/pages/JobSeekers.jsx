import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './JobSeekers.css'

const benefits = [
  {
    icon: '💼',
    title: 'Top Employers',
    desc: 'Access exclusive opportunities at Fortune 100 & 500 companies, top SMBs, and exciting startups.',
  },
  {
    icon: '💰',
    title: 'Competitive Rates',
    desc: 'We negotiate on your behalf to ensure you receive the compensation you deserve for your skills.',
  },
  {
    icon: '🤝',
    title: 'Dedicated Support',
    desc: 'Your personal recruiter is with you every step — from resume prep to contract completion.',
  },
  {
    icon: '🚀',
    title: 'Career Growth',
    desc: 'We match you with projects that challenge and advance your skills, not just fill a seat.',
  },
  {
    icon: '📋',
    title: 'Resume Assistance',
    desc: 'Expert guidance to make your skills shine and stand out to top hiring managers.',
  },
  {
    icon: '⚡',
    title: 'Fast Placements',
    desc: 'Our active client base means faster offers. Many placements happen within days.',
  },
]

const resources = [
  {
    title: 'Resume Tips for IT Professionals',
    desc: 'Learn how to craft a compelling technical resume that gets noticed by top employers.',
    tag: 'Career Advice',
  },
  {
    title: 'Interview Preparation Guide',
    desc: 'Technical interview best practices and how to showcase your skills confidently.',
    tag: 'Interview Tips',
  },
  {
    title: 'Contractor vs. Full-Time: What\'s Right for You?',
    desc: 'Understanding the pros and cons of contracting versus permanent employment in IT.',
    tag: 'Career Planning',
  },
]

export default function JobSeekers() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3001/api/jobs')
      .then(res => res.json())
      .then(data => {
        setJobs(data.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="job-seekers-page">
      {/* Hero */}
      <section className="job-hero">
        <div className="job-hero-overlay" />
        <div className="container">
          <span className="section-label">For IT Professionals</span>
          <h1>JOB SEEKERS</h1>
          <div className="hero-divider" />
          <p>Do you have stellar IT skills, dedication, and focus? Want to work for the world's most respected companies on the hottest projects? Let's talk.</p>
          <div className="hero-btns">
            <a href="#find-jobs" className="btn-primary">Browse Opportunities</a>
            <Link to="/contact" className="btn-outline">Submit Resume</Link>
          </div>
        </div>
      </section>

      {/* Value Prop */}
      <section className="job-value">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="section-label">Why Work With Us</span>
            <h2 className="section-title" style={{ textAlign: 'center' }}>THE DIVINETEK ADVANTAGE</h2>
            <div className="section-divider" />
            <p style={{ color: '#6b7a8f', maxWidth: '620px', margin: '0 auto', lineHeight: '1.75' }}>
              We're not just matching resumes to job descriptions. We're building careers and creating 
              lasting professional relationships built on trust and results.
            </p>
          </div>
          <div className="benefits-grid">
            {benefits.map((b, i) => (
              <div key={i} className="benefit-card">
                <div className="benefit-icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Areas */}
      <section className="job-areas" id="find-jobs">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-label">Opportunities</span>
            <h2 className="section-title white" style={{ textAlign: 'center' }}>OPEN POSITIONS</h2>
            <div className="section-divider" />
            <p style={{ color: '#9aa5b8', maxWidth: '560px', margin: '0 auto', lineHeight: '1.75' }}>
              Explore our current active roles. These are real opportunities from our database.
            </p>
          </div>
          
          {loading ? (
            <div style={{color: 'white', textAlign: 'center'}}>Loading opportunities...</div>
          ) : (
            <div className="live-jobs-grid">
              {jobs.map(job => (
                <div key={job.id} className="live-job-card">
                  <div className="job-meta">
                    <span className="job-cat">{job.category}</span>
                    <span className="job-type">{job.type}</span>
                  </div>
                  <h3>{job.title}</h3>
                  <div className="job-loc">📍 {job.location}</div>
                  <p>{job.description}</p>
                  <Link to="/contact" className="btn-outline" style={{marginTop: 'auto', padding: '8px 16px', fontSize: '0.8rem'}}>Apply Now</Link>
                </div>
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/contact" className="btn-primary">Submit General Resume</Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="job-process">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="section-label">Getting Started</span>
            <h2 className="section-title" style={{ textAlign: 'center' }}>HOW IT WORKS</h2>
            <div className="section-divider" />
          </div>
          <div className="job-steps">
            {[
              { num: '1', title: 'Submit Your Resume', desc: 'Send your resume to resumes@divinetek.com or fill out our contact form. Our team reviews every submission.' },
              { num: '2', title: 'Meet Your Recruiter', desc: 'A dedicated recruiter will reach out to learn about your skills, experience, and career goals.' },
              { num: '3', title: 'Get Matched', desc: 'We match you with opportunities that align with your skills, preferred work style, and compensation goals.' },
              { num: '4', title: 'Start Working', desc: 'Once placed, you\'ll have ongoing support from your recruiter to ensure your assignment is a success.' },
            ].map((step, i) => (
              <div key={i} className="job-step">
                <div className="job-step-num">{step.num}</div>
                <div className="job-step-content">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
                {i < 3 && <div className="job-step-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="job-resources" id="work-resources">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-label">Knowledge Base</span>
            <h2 className="section-title" style={{ textAlign: 'center' }}>CAREER RESOURCES</h2>
            <div className="section-divider" />
          </div>
          <div className="resources-grid">
            {resources.map((r, i) => (
              <div key={i} className="resource-card">
                <div className="resource-tag">{r.tag}</div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
                <div className="resource-cta">Read More →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="job-cta">
        <div className="cta-bg" />
        <div className="container">
          <div className="cta-inner">
            <div className="cta-text">
              <h2>Ready to Take Your IT Career to the Next Level?</h2>
              <p>Join the thousands of IT professionals who have advanced their careers through DivineTEK.</p>
            </div>
            <div className="cta-actions">
              <Link to="/contact" className="btn-gold">Submit Your Resume</Link>
              <a href="mailto:resumes@divinetek.com" className="btn-outline">Email: resumes@divinetek.com</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
