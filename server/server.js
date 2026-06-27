const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Create Contacts table
    db.run(`CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT,
      type TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Create Jobs table
    db.run(`CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      location TEXT NOT NULL,
      type TEXT NOT NULL,
      description TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (!err) {
        // Seed some initial jobs if table is empty
        db.get("SELECT COUNT(*) AS count FROM jobs", (err, row) => {
          if (row.count === 0) {
            const seedJobs = [
              {
                title: 'Senior React Developer',
                category: 'Software Engineering',
                location: 'Remote',
                type: 'Full-time',
                description: 'Looking for a senior React developer with 5+ years of experience to lead frontend architecture for a fast-growing SaaS startup.'
              },
              {
                title: 'Cloud Security Architect',
                category: 'CyberSecurity',
                location: 'New York, NY (Hybrid)',
                type: 'Contract-to-Hire',
                description: 'We need an expert to design and implement security controls across AWS and Azure environments for a Fortune 500 financial client.'
              },
              {
                title: 'DevOps Engineer',
                category: 'DevOps & Cloud',
                location: 'Austin, TX',
                type: 'Full-time',
                description: 'Seeking a strong DevOps engineer with Kubernetes, Terraform, and CI/CD pipeline expertise.'
              }
            ];

            const stmt = db.prepare("INSERT INTO jobs (title, category, location, type, description) VALUES (?, ?, ?, ?, ?)");
            seedJobs.forEach(job => {
              stmt.run(job.title, job.category, job.location, job.type, job.description);
            });
            stmt.finalize();
            console.log('Seeded initial job postings.');
          }
        });
      }
    });
  }
});

// --- Email Transporter Setup ---
let transporter;
nodemailer.createTestAccount((err, account) => {
  if (err) {
    console.error('Failed to create a testing account. ' + err.message);
  } else {
    transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass
      }
    });
    console.log('Ethereal email transporter configured');
  }
});

// --- API Endpoints ---

// 1. Get all jobs
app.get('/api/jobs', (req, res) => {
  db.all("SELECT * FROM jobs ORDER BY created_at DESC", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// 2. Submit contact form
app.post('/api/contact', (req, res) => {
  const { name, email, phone, company, type, message } = req.body;
  
  if (!name || !email || !message || !type) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  const sql = `INSERT INTO contacts (name, email, phone, company, type, message) VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [name, email, phone, company, type, message];

  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const newContactId = this.lastID;

    // Send email notification
    if (transporter) {
      let mailOptions = {
        from: '"DivineTEK System" <noreply@divinetek.com>',
        to: 'admin@divinetek.com',
        subject: `New Lead: ${type.toUpperCase()} - ${name}`,
        text: `New submission from ${name} (${email})\nPhone: ${phone}\nCompany: ${company}\nMessage: ${message}`
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error occurred sending email:', error.message);
        } else {
          console.log('Email sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
      });
    }

    res.json({
      message: 'success',
      data: { id: newContactId }
    });
  });
});

// 3. Admin: Get all contacts
app.get('/api/contacts', (req, res) => {
  db.all("SELECT * FROM contacts ORDER BY created_at DESC", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// 4. Create Job
app.post('/api/jobs', (req, res) => {
  const { title, category, location, type, description } = req.body;
  if (!title || !category || !location || !type || !description) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  const sql = `INSERT INTO jobs (title, category, location, type, description) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [title, category, location, type, description], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'success', data: { id: this.lastID } });
  });
});

// 5. Update Job
app.put('/api/jobs/:id', (req, res) => {
  const { title, category, location, type, description } = req.body;
  const sql = `UPDATE jobs SET title = ?, category = ?, location = ?, type = ?, description = ? WHERE id = ?`;
  db.run(sql, [title, category, location, type, description, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'success', changes: this.changes });
  });
});

// 6. Delete Job
app.delete('/api/jobs/:id', (req, res) => {
  db.run(`DELETE FROM jobs WHERE id = ?`, req.params.id, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'success', changes: this.changes });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
