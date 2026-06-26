import { useState, useEffect } from 'react'
import './Admin.css'

export default function Admin() {
  const [contacts, setContacts] = useState([])
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('contacts') // 'contacts' or 'jobs'

  // Job form state
  const [showJobForm, setShowJobForm] = useState(false)
  const [editingJob, setEditingJob] = useState(null)
  const [jobForm, setJobForm] = useState({ title: '', category: '', location: '', type: '', description: '' })

  const fetchData = async () => {
    try {
      const [conRes, jobRes] = await Promise.all([
        fetch('http://localhost:3001/api/contacts'),
        fetch('http://localhost:3001/api/jobs')
      ])
      if (!conRes.ok || !jobRes.ok) throw new Error('Failed to fetch data')
      const conData = await conRes.json()
      const jobData = await jobRes.json()
      setContacts(conData.data)
      setJobs(jobData.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleJobFormChange = e => setJobForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submitJob = async e => {
    e.preventDefault()
    try {
      const url = editingJob ? `http://localhost:3001/api/jobs/${editingJob.id}` : 'http://localhost:3001/api/jobs'
      const method = editingJob ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobForm)
      })
      if (!res.ok) throw new Error('Failed to save job')
      
      await fetchData()
      setShowJobForm(false)
      setEditingJob(null)
      setJobForm({ title: '', category: '', location: '', type: '', description: '' })
    } catch (err) {
      alert(err.message)
    }
  }

  const deleteJob = async id => {
    if (!window.confirm('Are you sure you want to delete this job?')) return
    try {
      const res = await fetch(`http://localhost:3001/api/jobs/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete job')
      await fetchData()
    } catch (err) {
      alert(err.message)
    }
  }

  const editJobClick = job => {
    setEditingJob(job)
    setJobForm({
      title: job.title,
      category: job.category,
      location: job.location,
      type: job.type,
      description: job.description
    })
    setShowJobForm(true)
  }

  if (loading) return <div className="admin-page"><div className="container"><h2>Loading Dashboard...</h2></div></div>
  if (error) return <div className="admin-page"><div className="container"><h2 style={{color: 'red'}}>Error: {error}</h2></div></div>

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1>CMS Dashboard</h1>
          <p>Manage job postings and view contact form submissions.</p>
        </div>

        <div className="admin-tabs">
          <button className={`tab-btn ${activeTab === 'contacts' ? 'active' : ''}`} onClick={() => setActiveTab('contacts')}>
            Submissions ({contacts.length})
          </button>
          <button className={`tab-btn ${activeTab === 'jobs' ? 'active' : ''}`} onClick={() => setActiveTab('jobs')}>
            Job Postings ({jobs.length})
          </button>
        </div>

        {activeTab === 'contacts' && (
          <div className="admin-content">
            <div className="submissions-grid">
              {contacts.length === 0 ? (
                <p>No submissions yet.</p>
              ) : (
                contacts.map(contact => (
                  <div key={contact.id} className="submission-card">
                    <div className="sub-header">
                      <span className={`sub-type ${contact.type}`}>{contact.type === 'employer' ? 'Employer' : 'Job Seeker'}</span>
                      <span className="sub-date">{new Date(contact.created_at).toLocaleString()}</span>
                    </div>
                    <h3>{contact.name}</h3>
                    <div className="sub-details">
                      <p><strong>Email:</strong> <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
                      {contact.phone && <p><strong>Phone:</strong> {contact.phone}</p>}
                      {contact.company && <p><strong>Company:</strong> {contact.company}</p>}
                    </div>
                    <div className="sub-message">
                      <strong>Message:</strong>
                      <p>{contact.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="admin-content">
            <div className="jobs-header-actions" style={{marginBottom: '24px'}}>
              <button className="btn-primary" onClick={() => {
                setEditingJob(null)
                setJobForm({ title: '', category: '', location: '', type: '', description: '' })
                setShowJobForm(!showJobForm)
              }}>
                {showJobForm ? 'Cancel' : '+ Add New Job'}
              </button>
            </div>

            {showJobForm && (
              <div className="job-form-card" style={{background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e8ecf3', marginBottom: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)'}}>
                <h3 style={{marginBottom: '20px', fontSize: '1.2rem', color: '#0a1628'}}>{editingJob ? 'Edit Job' : 'Create New Job'}</h3>
                <form onSubmit={submitJob} className="admin-job-form">
                  <div className="form-row" style={{display: 'flex', gap: '20px', marginBottom: '16px'}}>
                    <div className="form-group" style={{flex: 1}}>
                      <label style={{display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 'bold', color: '#4a5568'}}>Job Title</label>
                      <input style={{width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px'}} name="title" value={jobForm.title} onChange={handleJobFormChange} required />
                    </div>
                    <div className="form-group" style={{flex: 1}}>
                      <label style={{display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 'bold', color: '#4a5568'}}>Category</label>
                      <input style={{width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px'}} name="category" value={jobForm.category} onChange={handleJobFormChange} placeholder="e.g. Software Engineering" required />
                    </div>
                  </div>
                  <div className="form-row" style={{display: 'flex', gap: '20px', marginBottom: '16px'}}>
                    <div className="form-group" style={{flex: 1}}>
                      <label style={{display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 'bold', color: '#4a5568'}}>Location</label>
                      <input style={{width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px'}} name="location" value={jobForm.location} onChange={handleJobFormChange} required />
                    </div>
                    <div className="form-group" style={{flex: 1}}>
                      <label style={{display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 'bold', color: '#4a5568'}}>Type</label>
                      <input style={{width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px'}} name="type" value={jobForm.type} onChange={handleJobFormChange} placeholder="e.g. Full-time, Contract" required />
                    </div>
                  </div>
                  <div className="form-group" style={{marginBottom: '20px'}}>
                    <label style={{display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 'bold', color: '#4a5568'}}>Description</label>
                    <textarea style={{width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px'}} name="description" rows="4" value={jobForm.description} onChange={handleJobFormChange} required />
                  </div>
                  <div className="form-actions" style={{display: 'flex', gap: '12px'}}>
                    <button type="submit" className="btn-primary" style={{padding: '10px 24px'}}>{editingJob ? 'Update Job' : 'Create Job'}</button>
                    <button type="button" className="btn-outline" onClick={() => setShowJobForm(false)} style={{padding: '10px 24px'}}>Cancel</button>
                  </div>
                </form>
              </div>
            )}

            <div className="admin-jobs-list" style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              {jobs.length === 0 ? (
                <p>No jobs found.</p>
              ) : (
                jobs.map(job => (
                  <div key={job.id} className="admin-job-item" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e8ecf3'}}>
                    <div className="aji-info">
                      <h4 style={{fontSize: '1.1rem', color: '#0a1628', marginBottom: '4px'}}>{job.title}</h4>
                      <span className="aji-meta" style={{fontSize: '0.85rem', color: '#6b7a8f'}}>{job.category} • {job.location} • {job.type}</span>
                    </div>
                    <div className="aji-actions" style={{display: 'flex', gap: '8px'}}>
                      <button className="btn-edit" onClick={() => editJobClick(job)} style={{background: '#f4f6fa', color: '#1e5fa8', border: 'none', padding: '6px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem'}}>Edit</button>
                      <button className="btn-delete" onClick={() => deleteJob(job.id)} style={{background: '#fff0f0', color: '#e74c3c', border: 'none', padding: '6px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem'}}>Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
