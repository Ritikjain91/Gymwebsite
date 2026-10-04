import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDB, pool, memoryStore, getDBStatus } from './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Initialize DB connection
initDB();

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'RawFit Gym Backend API',
    database: getDBStatus(),
  });
});

// 1. Franchise Inquiry Submission
app.post('/api/inquiries', async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      phone,
      city,
      state,
      propertySize,
      investmentRange,
      hasProperty,
      preferredFormat,
      timeline,
      message,
    } = req.body;

    if (!fullName || !email || !phone || !city) {
      return res.status(400).json({
        success: false,
        error: 'Please provide full name, email, phone number, and city.',
      });
    }

    const dbStatus = getDBStatus();
    let recordId: number;

    if (dbStatus.connected) {
      const result = await pool.query(
        `INSERT INTO franchise_inquiries 
        (full_name, email, phone, city, state, property_size, investment_range, has_property, preferred_format, timeline, message)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING id`,
        [
          fullName,
          email,
          phone,
          city,
          state || '',
          propertySize ? parseInt(propertySize) : null,
          investmentRange || 'Prime (₹1.80 Cr)',
          Boolean(hasProperty),
          preferredFormat || 'Prime',
          timeline || 'Immediate (1-3 months)',
          message || '',
        ]
      );
      recordId = result.rows[0].id;
    } else {
      recordId = memoryStore.franchiseInquiries.length + 1;
      memoryStore.franchiseInquiries.unshift({
        id: recordId,
        full_name: fullName,
        email,
        phone,
        city,
        state: state || '',
        property_size: propertySize ? parseInt(propertySize) : null,
        investment_range: investmentRange,
        has_property: Boolean(hasProperty),
        preferred_format: preferredFormat,
        timeline: timeline || 'Immediate',
        message: message || '',
        status: 'NEW',
        created_at: new Date().toISOString(),
      });
    }

    console.log(`[New Franchise Lead] ${fullName} from ${city} (${preferredFormat}) - ID #${recordId}`);

    return res.status(201).json({
      success: true,
      message: 'Franchise inquiry received successfully. Our investment director will contact you within 24 hours.',
      inquiryId: recordId,
      pitchDeckUrl: '/docs/rawfit-franchise-prospectus-2026.pdf',
    });
  } catch (error: any) {
    console.error('Error creating franchise inquiry:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error while processing your inquiry.',
    });
  }
});

// GET all inquiries (for admin/monitoring)
app.get('/api/inquiries', async (req: Request, res: Response) => {
  try {
    const dbStatus = getDBStatus();
    if (dbStatus.connected) {
      const result = await pool.query(
        `SELECT * FROM franchise_inquiries ORDER BY created_at DESC LIMIT 50`
      );
      return res.json({ success: true, data: result.rows });
    }
    return res.json({ success: true, data: memoryStore.franchiseInquiries });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 2. VIP Facility Tour Booking
app.post('/api/tours', async (req: Request, res: Response) => {
  try {
    const { fullName, phone, email, city, preferredFormat, preferredDate, preferredTime, interestArea } = req.body;

    if (!fullName || !phone || !preferredDate || !preferredTime) {
      return res.status(400).json({
        success: false,
        error: 'Full name, phone, date, and time are required.',
      });
    }

    const dbStatus = getDBStatus();
    let bookingId: number;

    if (dbStatus.connected) {
      const result = await pool.query(
        `INSERT INTO tour_bookings 
        (full_name, phone, email, city, preferred_format, preferred_date, preferred_time, interest_area)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id`,
        [fullName, phone, email || null, city || 'Flagship Club', preferredFormat || 'Luxury', preferredDate, preferredTime, interestArea || 'Full Experience Tour']
      );
      bookingId = result.rows[0].id;
    } else {
      bookingId = memoryStore.tourBookings.length + 1;
      memoryStore.tourBookings.unshift({
        id: bookingId,
        full_name: fullName,
        phone,
        email: email || '',
        city: city || 'Flagship Club',
        preferred_format: preferredFormat || 'Luxury',
        preferred_date: preferredDate,
        preferred_time: preferredTime,
        interest_area: interestArea || 'Full Experience Tour',
        status: 'CONFIRMED',
        created_at: new Date().toISOString(),
      });
    }

    return res.status(201).json({
      success: true,
      message: `VIP Tour confirmed for ${preferredDate} at ${preferredTime}! Check-in pass generated.`,
      bookingId,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 3. Calculator Lead Save
app.post('/api/calculate', async (req: Request, res: Response) => {
  try {
    const {
      formatType,
      cityTier,
      carpetArea,
      projectedMembers,
      ptConversionPct,
      estMonthlyRevenue,
      estMonthlyEbitda,
      estAnnualProfit,
      estPaybackMonths,
      estRoiPct,
      userName,
      userPhone,
      userEmail,
    } = req.body;

    const dbStatus = getDBStatus();
    let leadId: number;

    if (dbStatus.connected) {
      const result = await pool.query(
        `INSERT INTO calculator_leads 
        (format_type, city_tier, carpet_area, projected_members, pt_conversion_pct, est_monthly_revenue, est_monthly_ebitda, est_annual_profit, est_payback_months, est_roi_pct, user_name, user_phone, user_email)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING id`,
        [
          formatType,
          cityTier,
          carpetArea,
          projectedMembers,
          ptConversionPct,
          estMonthlyRevenue,
          estMonthlyEbitda,
          estAnnualProfit,
          estPaybackMonths,
          estRoiPct,
          userName || null,
          userPhone || null,
          userEmail || null,
        ]
      );
      leadId = result.rows[0].id;
    } else {
      leadId = memoryStore.calculatorLeads.length + 1;
      memoryStore.calculatorLeads.unshift({
        id: leadId,
        format_type: formatType,
        city_tier: cityTier,
        carpet_area: carpetArea,
        projected_members: projectedMembers,
        pt_conversion_pct: ptConversionPct,
        est_monthly_revenue: estMonthlyRevenue,
        est_monthly_ebitda: estMonthlyEbitda,
        est_annual_profit: estAnnualProfit,
        est_payback_months: estPaybackMonths,
        est_roi_pct: estRoiPct,
        user_name: userName,
        user_phone: userPhone,
        user_email: userEmail,
        created_at: new Date().toISOString(),
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Financial estimate saved successfully.',
      leadId,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 4. Class Trial Booking
app.post('/api/trials', async (req: Request, res: Response) => {
  try {
    const { name, phone, email, classId, className, preferredDate, fitnessGoal } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, error: 'Name and phone are required.' });
    }

    const dbStatus = getDBStatus();
    let trialId: number;

    if (dbStatus.connected) {
      const result = await pool.query(
        `INSERT INTO member_trial_bookings 
        (name, phone, email, class_id, class_name, preferred_date, fitness_goal)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id`,
        [name, phone, email || null, classId || null, className || 'General Trial Pass', preferredDate || 'Upcoming Session', fitnessGoal || 'Strength & Conditioning']
      );
      trialId = result.rows[0].id;
    } else {
      trialId = memoryStore.trialBookings.length + 1;
      memoryStore.trialBookings.unshift({
        id: trialId,
        name,
        phone,
        email: email || '',
        class_id: classId,
        class_name: className,
        preferred_date: preferredDate,
        fitness_goal: fitnessGoal,
        status: 'CONFIRMED',
        created_at: new Date().toISOString(),
      });
    }

    return res.status(201).json({
      success: true,
      message: `VIP Trial Pass confirmed for ${className}! We have sent your pass code to ${phone}.`,
      trialId,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`⚡ RawFit Gym Express server running on port ${PORT}`);
  console.log(`👉 API Health endpoint: http://localhost:${PORT}/api/health`);
});
