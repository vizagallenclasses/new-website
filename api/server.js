require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration - Allow specific origins
const allowedOrigins = [
    'https://vizagallenclasses.in',
    'https://www.vizagallenclasses.in',
    'http://localhost',
    'http://localhost:80',
    'http://127.0.0.1'
];

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('vizagallenclasses')) {
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            callback(null, true); // Allow all for now, log for debugging
        }
    },
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    optionsSuccessStatus: 200 // For legacy browser support
}));

// Handle preflight requests explicitly
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create SMTP transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    tls: {
        rejectUnauthorized: false // Accept self-signed certificates
    }
});

// Verify SMTP connection on startup
transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP Connection Error:', error);
    } else {
        console.log('✅ SMTP Server is ready to send emails');
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'API is running' });
});

// Send email endpoint
app.post('/api/send-email', async (req, res) => {
    try {
        const { name, email, mobile, city, program } = req.body;

        // Validate required fields
        if (!name || !email || !mobile || !city || !program) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required: name, email, mobile, city, program'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Validate phone number (basic validation)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(mobile.replace(/\D/g, ''))) {
            return res.status(400).json({
                success: false,
                message: 'Invalid mobile number. Please enter a 10-digit number'
            });
        }

        // Create email HTML content
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%); color: white; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
        .header p { margin: 10px 0 0; opacity: 0.9; font-size: 14px; }
        .content { padding: 30px; }
        .info-card { background: #f8f9fa; border-left: 4px solid #1a237e; padding: 15px 20px; margin-bottom: 15px; border-radius: 0 8px 8px 0; }
        .info-card label { display: block; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
        .info-card span { display: block; font-size: 16px; color: #333; font-weight: 500; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; }
        .badge { display: inline-block; background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%); color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 500; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎓 New Enquiry Received</h1>
            <p>Ask our Experts - Vizag's ALLENCLASSES</p>
        </div>
        <div class="content">
            <div class="info-card">
                <label>👤 Student Name</label>
                <span>${name}</span>
            </div>
            <div class="info-card">
                <label>📧 Email Address</label>
                <span>${email}</span>
            </div>
            <div class="info-card">
                <label>📱 Mobile Number</label>
                <span>${mobile}</span>
            </div>
            <div class="info-card">
                <label>📍 City</label>
                <span>${city}</span>
            </div>
            <div class="info-card">
                <label>📚 Program Interested</label>
                <span class="badge">${program}</span>
            </div>
        </div>
        <div class="footer">
            <p>This enquiry was submitted from the Vizag's ALLENCLASSES website.</p>
            <p>© ${new Date().getFullYear()} Vizag's ALLENCLASSES. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
        `;

        // Plain text version for email clients that don't support HTML
        const textContent = `
New Enquiry from Vizag's ALLENCLASSES Website
============================================

Student Name: ${name}
Email: ${email}
Mobile: ${mobile}
City: ${city}
Program: ${program}

---
Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
        `;

        // Send email
        const mailOptions = {
            from: `"Vizag's ALLENCLASSES" <${process.env.SENDER_EMAIL}>`,
            to: process.env.RECIPIENT_EMAIL,
            subject: `🎓 New Enquiry: ${name} - ${program}`,
            text: textContent,
            html: htmlContent,
            replyTo: email // So you can reply directly to the student
        };

        await transporter.sendMail(mailOptions);

        console.log(`✅ Email sent successfully for enquiry from: ${name} (${email})`);

        res.json({
            success: true,
            message: 'Thank you! Your enquiry has been submitted successfully. Our team will contact you shortly.'
        });

    } catch (error) {
        console.error('❌ Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send enquiry. Please try again or contact us directly.'
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 API Server running on port ${PORT}`);
    console.log(`📧 Emails will be sent to: ${process.env.RECIPIENT_EMAIL}`);
});
